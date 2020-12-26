import React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Paper,
  withStyles,
} from "@material-ui/core/";

const styles = { list: { marginLeft: "10px" } };

const not = (a, b) => {
  return a.filter((value) => b.indexOf(value) === -1);
};

const intersection = (a, b) => {
  return a.filter((value) => b.indexOf(value) !== -1);
};

class NominationsPage extends React.Component {
  constructor() {
    super();
  }

  state = {
    left: [0, 1, 2, 3],
    right: [4, 5, 6, 7],
    checked: [],
  };

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

    this.setState({
      right: right.concat(this.leftChecked()),
      left: not(left, this.leftChecked()),
      checked: not(checked, this.leftChecked()),
    });
  };

  handleCheckedLeft = () => {
    const { right, left, checked } = this.state;

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

  customList = (items) => {
    const { checked } = this.state;
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <List dense component="div" role="list">
          {items.map((value) => {
            const labelId = `transfer-list-item-${value}-label`;

            return (
              <ListItem
                key={value}
                role="listitem"
                button
                onClick={this.handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`List item ${value + 1}`} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Paper>
    );
  };

  render() {
    const { right, left } = this.state;
    const { classes } = this.props;

    console.log(this.state);
    console.log(this.rightChecked());

    return (
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>{this.customList(left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={this.handleCheckedRight}
              disabled={this.leftChecked().length === 0}
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
        <Grid item>{this.customList(right)}</Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(NominationsPage);
