import React from "react";
import _ from "lodash";
import { Grid, withStyles } from "@material-ui/core/";
import { connect } from "react-redux";

import TransferList from "../components/TransferList";
import SearchBar from "../components/SearchBar";
import * as movieActions from "../redux/actions/movies";

class NominationsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  onSearch = async (name) => {
    this.props.fetchMoviesByTitle(name);
  };

  render() {
    const { classes, movies } = this.props;
    console.log(this.props);
    return (
      <Grid>
        <SearchBar onClick={this.onSearch} />
        <TransferList left={movies} />
      </Grid>
    );
  }
}

const select = ($$state) => _.pick($$state, ["movies"]);
export default connect(select, { ...movieActions })(NominationsPage);
