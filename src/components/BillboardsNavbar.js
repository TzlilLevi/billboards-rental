import React, { useState, useRef, useEffect, Fragment } from "react";
import classes from "./BillboardsNavbar.module.css";
import { FaSignInAlt, FaSearch } from "react-icons/fa";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// import { Fragment } from "react";

const BillboardsNavbar = (props) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [openCalendar, setopenCalendar] = useState(false);
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hidenOnEscape, true);
    document.addEventListener("click", hidenOnClickOutside, true);
  }, []);

  const hidenOnEscape = (e) => {
    if (e.key === "Escape") {
      setopenCalendar(false);
    }
  };

  const hidenOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setopenCalendar(false);
    }
  };
  return (
    <Fragment>
      <nav className={classes.nav}>
        <a className={classes.sitetitle}>Billboards-rental</a>
        <ul>
          <li>
            <input
              value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(
                range[0].endDate,
                "MM/dd/yyyy"
              )}`}
              readOnly
              className={classes.inputBox}
              onClick={() => setopenCalendar((openCalendar) => !openCalendar)}
            />
            <div ref={refOne}>
              {openCalendar && (
                <DateRange
                  className={classes.calendarElement}
                  onChange={(item) => {
                    if (item.selection.startDate > Date.now()) {
                      setRange([item.selection]);
                    }
                  }}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  months={1}
                  direction="horizontal"
                />
              )}
            </div>
          </li>
          <li>
            <a href="#Search" onClick={() => props.search(range)}>
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
    </Fragment>
  );
};

export default BillboardsNavbar;
