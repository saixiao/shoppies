import React from "react";
import _ from "lodash";
import { Grid, withStyles, Box } from "@material-ui/core/";
import { connect } from "react-redux";

import TransferList from "../components/styled/TransferList";
import AppBar from "../components/styled/AppBar";
import * as movieActions from "../redux/actions/movies";

const styles = {
  pageContainer: {
    padding: "4rem",
  },
};

class NominationsPage extends React.Component {
  onSearch = async (name) => {
    this.props.fetchMoviesByTitle(name);
  };

  render() {
    const { classes, movies } = this.props;
    return (
      <Grid>
        <AppBar title="Shoppies" onSearch={this.onSearch} />
        <Box className={classes.pageContainer}>
          <TransferList
            rightTitle="Nominations"
            leftTitle="Searches for..."
            left={movies}
          />
        </Box>

        {/* <SearchBar label="Search for Movies..." onClick={this.onSearch} /> */}
      </Grid>
    );
  }
}

const StyledNominationsPage = withStyles(styles)(NominationsPage);
const select = ($$state) => _.pick($$state, ["movies"]);
export default connect(select, { ...movieActions })(StyledNominationsPage);
