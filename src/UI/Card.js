import React from "react";
import { useState } from "react";

import classes from "./Card.module.css";

const Card = (props) => {
  const [onOver, setOnOver] = useState(false);

  return (
    <div
      className={`${classes.card} ${props.className}`}
      onClick={() => {
        console.log("here");
        props.onClick(props.clickedPosition);
      }}
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </div>
  );
};

export default Card;