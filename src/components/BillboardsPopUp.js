import React, { useState } from "react";
import classes from "./BillboardsPopUp.module.css";
import Button from "./Button";
import { Popup } from "react-leaflet";
import BillboardsDateRangeDialog from "./BillboardsDateRangeDialog";

const BillboardsPopUp = (props) => {
  return (
    <div>
      <Popup>
        <h2 className={classes.header}>{props.title}</h2>
        {props.available && (
          <BillboardsDateRangeDialog
            id={props.id}
            text={props.text}
            title={props.title}
            updateBillboard={props.updateBillboard}
          />
        )}
      </Popup>
    </div>
  );
};

export default BillboardsPopUp;
