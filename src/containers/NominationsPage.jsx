import React from "react";
import _ from "lodash";
import {
  Grid,
  withStyles,
  Box,
  Button,
  TextField,
  Snackbar,
} from "@material-ui/core/";
import { connect } from "react-redux";

import TransferList from "../components/styled/TransferList";
import AppBar from "../components/styled/AppBar";
import * as movieActions from "../redux/actions/movies";
import * as nominatedActions from "../redux/actions/nominated";
import ClipBoard from "../components/styled/ClipBoard";
import Alert from "@material-ui/lab/Alert";

const styles = {
  pageContainer: {
    padding: "4rem",
  },
};

class NominationsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clipboardOpen: false, openSnackBar: false };
  }

  onSearch = async (name) => {
    this.props.fetchMoviesByTitle(name);
  };

  componentDidMount() {
    const url = new URL(window.location.href);
    const params = url.searchParams.get("movieIds");

    // bug in dev where hot restart will grow the nominated list, too lazy to debug
    if (this.props.nominated.length >= 5) {
      return;
    }

    if (params) {
      const movieIds = _.split(params, ",");
      for (let i = 0; i < movieIds.length; i++) {
        this.props.fetchMoviesSharableLink(movieIds[i]);
      }
    }
  }

  handleClipboardClose = () => {
    this.setState({ clipboardOpen: false });
  };

  handleClipboardOpen = () => {
    this.setState({ clipboardOpen: true });
  };

  getShareableUrl = () => {
    const { nominated } = this.props;
    let movieIds = "";
    _.forEach(nominated, (movie) => {
      movieIds = movieIds + `,${movie.imdbID}`;
    });
    const shareableUrlParam = `?movieIds=${movieIds.substring(1)}`;

    return shareableUrlParam;
  };

  render() {
    const { classes, movies, nominated } = this.props;
    const { clipboardOpen, openSnackBar } = this.state;

    return (
      <Grid>
        <AppBar title="Shoppies" onSearch={this.onSearch} />
        <Box className={classes.pageContainer}>
          <TransferList
            rightTitle="Nominations"
            leftTitle="Searches for..."
            left={movies}
            right={nominated}
          />
        </Box>

        <Box>
          <Button
            variant="outlined"
            disabled={nominated.length < 5}
            onClick={this.handleClipboardOpen}
          >
            SHARE
          </Button>
        </Box>
        <ClipBoard
          title="Share Your Nomination List"
          open={clipboardOpen}
          inputDisabled={true}
          url={this.getShareableUrl()}
          handleClose={this.handleClipboardClose}
          handleOpenSnackBar={() => {
            this.setState({ openSnackBar: true });
          }}
        />
        <Snackbar
          open={openSnackBar}
          autoHideDuration={2000}
          onClose={() => {
            this.handleClipboardClose();
            this.setState({ openSnackBar: false });
          }}
        >
          <Alert
            onClick={() => {
              this.setState({ openSnackBar: false });
            }}
            severity="success"
          >
            Url Copied
          </Alert>
        </Snackbar>
      </Grid>
    );
  }
}

const StyledNominationsPage = withStyles(styles)(NominationsPage);
const select = ($$state) => _.pick($$state, ["movies", "nominated"]);
export default connect(select, { ...movieActions, ...nominatedActions })(
  StyledNominationsPage
);
