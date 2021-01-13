import React from "react";
import {
  Grid,
  List,
  ListItem,
  Button,
  Paper,
  withStyles,
  Box,
  Typography,
} from "@material-ui/core/";
import Row from "./Row.jsx";

const styles = {
  root: {
    margin: "auto",
  },
  paper: {
    width: "500px",
    height: "800px",
    overflow: "auto",
  },
  button: {
    margin: "2rem",
  },
  listHeader: {
    height: "4rem",
    backgroundColor: "#008060",
  },
  listTitle: {
    color: "white",
    textAlign: "left",
    padding: "1rem",
  },
};

const not = (a, b) => {
  return a.filter((value) => b.indexOf(value) === -1);
};

const intersection = (a, b) => {
  return a.filter((value) => b.indexOf(value) !== -1);
};

class TransferList extends React.Component {
  constructor(props) {
    super(props);
    const { left, right, checked } = this.props;

    this.state = {
      left: left || [],
      right: right || [],
      checked: checked || [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.left !== this.props.left) {
      this.setState({ left: this.props.left });
    } else if (prevProps.right !== this.props.right) {
      this.setState({ right: this.props.right });
    }
  }

  leftChecked = () => {
    const { checked, left } = this.state;
    return intersection(checked, left);
  };

  rightChecked = () => {
    const { checked, right } = this.state;
    return intersection(checked, right);
  };

  handleCheckedRight = () => {
    const { right, left, checked } = this.state;

    this.props.updateNominatedList(right.concat(this.leftChecked()));

    this.setState({
      right: right.concat(this.leftChecked()),
      left: not(left, this.leftChecked()),
      checked: not(checked, this.leftChecked()),
    });
  };

  handleCheckedLeft = () => {
    const { right, left, checked } = this.state;

    this.props.updateNominatedList(not(right, this.rightChecked()));

    this.setState({
      right: not(right, this.rightChecked()),
      left: left.concat(this.rightChecked()),
      checked: not(checked, this.rightChecked()),
    });
  };

  handleToggle = (value) => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ checked: newChecked });
  };

  customList = (items, title) => {
    const { checked } = this.state;
    const { classes } = this.props;

    return (
      <Box>
        <Box className={classes.listHeader}>
          <Typography className={classes.listTitle} variant="h6">
            {title}
          </Typography>
        </Box>

        <Paper className={classes.paper}>
          <List dense component="div" role="list">
            {items.map((movie, i) => {
              return (
                <Row
                  movie={movie}
                  key={i}
                  checked={checked}
                  onClick={this.handleToggle}
                />
              );
            })}
            <ListItem />
          </List>
        </Paper>
      </Box>
    );
  };

  render() {
    const { right, left } = this.state;
    const { classes, leftTitle, rightTitle, maxNomSize = 5 } = this.props;
    const leftChecked = this.leftChecked();

    return (
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>{this.customList(left, leftTitle)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={this.handleCheckedRight}
              disabled={
                leftChecked.length === 0 ||
                right.length + leftChecked.length > maxNomSize
              }
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={this.handleCheckedLeft}
              disabled={this.rightChecked().length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>{this.customList(right, rightTitle)}</Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TransferList);
