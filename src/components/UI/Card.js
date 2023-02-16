import React from "react";

import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div
      className={`${classes.card} ${props.className}`}
      onClick={() => {
        props.onClick(props.clickedBillboard);
      }}
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </div>
  );
};

export default Card;
