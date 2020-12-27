import React from "react";
import { Grid, withStyles } from "@material-ui/core/";
import { connect } from "react-redux";

import TransferList from "../components/TransferList";
import SearchBar from "../components/SearchBar";
import * as movieActions from "../redux/actions/movies";

class NominationsPage extends React.Component {
  onSearch = async (name) => {
    this.props.fetchMoviesByTitle(name);
  };

  render() {
    const { classes } = this.props;
    console.log(this.props);
    return (
      <Grid>
        <SearchBar onClick={this.onSearch} />
        <TransferList />
      </Grid>
    );
  }
}

export default connect(null, { ...movieActions })(NominationsPage);
