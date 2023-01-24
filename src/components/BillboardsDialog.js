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

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
// import { addDays } from "date-fns";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  // const [startDate, setStartDate] = useState();
  // const [endDate, setendDate] = useState();
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

  // const dateValidation = () => {
  //   let dateNow = Date.now();
  //   if (startDate === undefined || endDate === undefined) {
  //     return false;
  //   }
  //   return true;
  // };

  const formatDate = (date) => {
    console.log(date);
    let month = date.getMonth() + 1 + "";
    let day = "" + date.getDate();
    let year = date.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [year, month, day].join("-");
  };

  // const resetReserveTimes = () => {
  //   setStartDate(undefined);
  //   setendDate(undefined);
  // };

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
            {/* <DatePicker
              className={classes.datepicker}
              placeholderText={
                startDate === undefined
                  ? "Enter start date"
                  : formatDate(startDate)
              }
              onChange={(date) => setStartDate(date)}
            />
            <DatePicker
              className={classes.datepicker}
              placeholderText={
                endDate === undefined ? "Enter end date" : formatDate(endDate)
              }
              onChange={(date) => setendDate(date)}
            /> */}

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
            // onClick={() =>
            //   props.updateBillBoard(
            //     props.id,
            //     startDate,
            //     endDate,
            //     handleClose,
            //     dateValidation,
            //     resetReserveTimes
            //   )
            // }

            onClick={() =>
              props.updateBillBoard(
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
