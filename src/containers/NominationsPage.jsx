import React from "react";
import { Grid, withStyles } from "@material-ui/core/";
import TransferList from "../components/TransferList";

class NominationsPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <TransferList />
      </Grid>
    );
  }
}

export default NominationsPage;
