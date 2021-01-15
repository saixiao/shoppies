import React from "react";
import {
  Dialog,
  Button,
  DialogContent,
  DialogTitle,
  DialogActions,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";

const useStyles = makeStyles({
  dialogContent: {
    width: "400px",
  },
});

// TODO: Fix react warning findDOMNode
export default function ClipBoard(props) {
  const classes = useStyles();
  const {
    handleClose,
    open,
    title,
    url,
    inputDisabled,
    handleOpenSnackBar,
  } = props;

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle onClose={handleClose}>{title}</DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <TextField
          className={classes.dialogContent}
          defaultValue={`${window.location.host}/shoppies/${url}`}
          disabled={inputDisabled}
        />
      </DialogContent>
      <DialogActions>
        {/* hack since github pages doesnt have branch base url */}
        <CopyToClipboard text={`${window.location.host}/shoppies/${url}`}>
          <Button
            autoFocus
            onClick={() => {
              handleOpenSnackBar();
              handleClose();
            }}
            color="primary"
          >
            Copy
          </Button>
        </CopyToClipboard>

        <Button autoFocus onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
