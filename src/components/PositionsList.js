import React from "react";

import Card from "../UI/Card";
import classes from "./PositionsList.module.css";

const PositionsList = (props) => {
  const mouseOver = (e) => {
    e.target.style.background = "#E6E6E6";
  };

  const mouseLeave = (e) => {
    e.target.style.background = "white";
  };

  return (
    <div className={classes.postionslist}>
      {props.positions.map((position) => (
        <Card
          key={position.id}
          onClick={() => {
            console.log(position.id);
          }}
          onMouseOver={mouseOver}
          onMouseLeave={mouseLeave}
        >
          {position.address} -----
        </Card>
      ))}
    </div>
  );
};

export default PositionsList;
