import React, { useState } from "react";
import classes from "./BillboardsNavbar.module.css";
import { FaSignInAlt, FaSearch } from "react-icons/fa";
import BillboardsSearchDialog from "./BillboardsSearchDialog";

const BillboardsNavbar = () => {
  const [searchClicked, setSearchClicked] = useState(false);

  const searchClickeOpen = () => {
    setSearchClicked(true);
  };

  const handleClose = () => {
    setSearchClicked(false);
    console.log("here");
  };

  return (
    <>
      <nav className={classes.nav}>
        <a className={classes.sitetitle}>Billboards-rental</a>
        <ul>
          <li>
            <a href="#Search" onClick={searchClickeOpen}>
              <FaSearch />
              &nbsp;Search
            </a>
          </li>
          <li>
            <a href="/Login">
              <FaSignInAlt />
              &nbsp;Login
            </a>
          </li>
        </ul>
      </nav>
      {searchClicked && (
        <BillboardsSearchDialog open={searchClicked} onClose={handleClose} />
      )}
    </>
  );
};

export default BillboardsNavbar;
