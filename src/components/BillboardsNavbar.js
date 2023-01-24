import React from "react";
import classes from "./BillboardsNavbar.module.css";

const BillboardsNavbar = () => {
  return (
    <nav className={classes.nav}>
      <a className={classes.sitetitle}>Billboards-rental</a>
      <ul>
        <li>
          <a href="/Login">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default BillboardsNavbar;
