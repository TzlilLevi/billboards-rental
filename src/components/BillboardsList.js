import React from "react";

import Card from "./UI/Card";
import classes from "./BillboardsList.module.css";

const BillboardsList = (props) => {
  const mouseOver = (e) => {
    e.target.style.background = "#E6E6E6";
  };

  const mouseLeave = (e) => {
    e.target.style.background = "white";
  };

  return (
    <div className={classes.postionslist}>
      {props.billboards.map((billboard) => (
        <Card
          key={billboard.id}
          onClick={props.clickOnBillboard}
          clickedBillboard={billboard}
          onMouseOver={mouseOver}
          onMouseLeave={mouseLeave}
        >
          {billboard.address}
        </Card>
      ))}
    </div>
  );
};

export default BillboardsList;
