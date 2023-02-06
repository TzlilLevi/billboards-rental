import React, { useState } from "react";
import classes from "./BillboardsDateRangeDialog.module.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "react-datepicker/dist/react-datepicker.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetReserveTimes = () => {
    setDateState([
      {
        startDate: new Date(),
        endDate: null,
        key: "selection",
      },
    ]);
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
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent style={{ height: "400px" }}>
          <DialogContentText>{props.text}</DialogContentText>
          <div className={classes.container}>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                if (item.selection.startDate > Date.now()) {
                  setDateState([item.selection]);
                }
              }}
              moveRangeOnFirstSelection={false}
              ranges={dateState}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() =>
              props.updateBillboard(
                props.id,
                dateState,
                handleClose,
                resetReserveTimes
              )
            }
            color="primary"
          >
            RESERVE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
