import React, { useState } from "react";
import classes from "./BillboardsSearchDialog.module.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const BillboardsSearchDialog = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">
          Search available boards
        </DialogTitle>
        <DialogContent style={{ height: "400px" }}>
          <DialogContentText>hello</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BillboardsSearchDialog;
