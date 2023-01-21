import React, { useState } from "react";
import classes from "./BillboardsPopUp.module.css";
import Button from "./Button";
import { Popup } from "react-leaflet";
import BillboardsDialog from "./BillboardsDialog";

const BillboardsPopUp = (props) => {
  return (
    <div>
      <Popup>
        <h2 className={classes.header}>{props.title}</h2>
        {props.available && (
          // <Button onClick={props.openReserveBox} id={props.id}>
          //   RESERVE
          // </Button>
          <BillboardsDialog
            id={props.id}
            text={props.text}
            title={props.title}
            updateBillBoard={props.updateBillBoard}
          />
        )}
      </Popup>
    </div>
  );
};

export default BillboardsPopUp;
