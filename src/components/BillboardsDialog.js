import React, { useState } from "react";
import classes from "./BillboardsDialog.module.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DialogContainer } from "@adobe/react-spectrum";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setendDate] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dateValidation = () => {
    if (startDate === undefined || endDate === undefined) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        RESERVE
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.text}</DialogContentText>
          <div className={classes.container}>
            <DatePicker
              className={classes.datepicker}
              placeholderText="Enter a start date"
              onChange={(date) => setStartDate(date)}
            />
            <DatePicker
              className={classes.datepicker}
              placeholderText="Enter an end date"
              onChange={(date) => setendDate(date)}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() =>
              props.updateBillBoard(props.id, handleClose, dateValidation)
            }
            // onClick={reserve}
            color="primary"
          >
            RESERVE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
