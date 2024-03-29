import React, { useEffect, useState, Fragment } from "react";
import classes from "./BillboardsContainer.module.css";
import L, { icon } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import BillboardsPopUp from "./BillboardsPopUp";
import BillboardsNavbar from "./BillboardsNavbar";
import BillboardsList from "./BillboardsList";
import UpdateMapCenter from "./UpdateMapCenter";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { addDays } from "date-fns";

const BillboardsContainer = () => {
  const billboards = [
    {
      pos: [31.30949, 34.62058],
      text: "Details on the board",
      address: "Ofakim",
      available: true,
      dateReserved: [
        {
          name: "Tzlil Levi",
          phone: "0527777315",
          startReserve: new Date(
            "Wen Feb 01 2023 00:00:00 GMT+0200 (Israel Standard Time)"
          ),
          endReserve: new Date(
            "Sun Feb 05 2023 00:00:00 GMT+0200 (Israel Standard Time)"
          ),
        },
        {
          name: "Itzhak Er",
          phone: "0527897617",
          startReserve: new Date(
            "Wen Feb 08 2023 00:00:00 GMT+0200 (Israel Standard Time)"
          ),
          endReserve: new Date(
            "Wen Feb 15 2023 00:00:00 GMT+0200 (Israel Standard Time)"
          ),
        },
      ],
      id: [31.30949, 34.62058].join(),
    },
    {
      pos: [31.32385, 34.6752],
      text: "Details on the board",
      address: "Tifrah",
      available: false,
      dateReserved: [
        {
          name: "Shai er",
          phone: "0527689512",
          startReserve: new Date(
            "Sun Jan 01 2023 00:00:00 GMT+0200 (Israel Standard Time)"
          ),
          endReserve: new Date(
            "Tue Feb 01 2023 00:00:00 GMT+0200 (Israel Standard Time)"
          ),
        },
        {
          name: "Dan Er",
          phone: "0527897617",
          startReserve: new Date(
            "Sun Feb 14 2023 00:00:00 GMT+0200 (Israel Standard Time)"
          ),
          endReserve: new Date(
            "Tue Feb 28 2023 00:00:00 GMT+0200 (Israel Standard Time)"
          ),
        },
      ],
      id: [31.32385, 34.6752].join(),
    },
  ];

  const billboardAvailable = "./assets/billboardAvailable.svg";
  const billboardNotAvailable = "./assets/billboardNotAvailable.svg";

  const [billboardsList, setBillboardsList] = useState(billboards);
  const [availableListByDate, setAvailableListByDate] = useState([]);
  const [currentBillboard, setCurrentBillboard] = useState([
    31.30949, 34.62058,
  ]);

  const UpdateBillboard = (id, dateState, handleClose, resetReserveTimes) => {
    let reservedDate = false;
    let newBillboardList = billboardsList.map((billboard) => {
      if (billboard.id === id) {
        billboard.dateReserved.forEach((reserved) => {
          if (
            !(
              dateState[0].endDate < reserved.startReserve ||
              dateState[0].startDate > reserved.endReserve
            )
          ) {
            alert(
              "The date range you selected is occupied, select other dates"
            );
            reservedDate = true;
            return billboard;
          }
        });
        if (reservedDate === false) {
          billboard.dateReserved.push({
            startReserve: dateState[0].startDate,
            endReserve: dateState[0].endDate,
          });
        }
      }
      return billboard;
    });

    if (reservedDate === true) {
      return;
    }
    setBillboardsList(newBillboardList);
    handleClose();
    resetReserveTimes();
    UpdateAvailableBillboards();
    return;
  };

  const UpdateAvailableBillboards = () => {
    let dateNow = Date.now();
    let newBillboardList = billboardsList.map((billboard) => {
      let change = false;
      billboard.dateReserved.map((reseved) => {
        if (
          reseved.startReserve <= dateNow &&
          dateNow <= reseved.endReserve &&
          change === false
        ) {
          billboard.available = false;
          change = true;
        } else if (change === false) {
          billboard.available = true;
        }
        if (billboard.endReserve > dateNow) {
          return reseved;
        }
      });
      return billboard;
    });
    setBillboardsList(newBillboardList);
  };

  useEffect(() => {
    UpdateAvailableBillboards();
    searchByRange([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: "selection",
      },
    ]);
  }, []);

  const searchByRange = (range) => {
    // setOpenSlide(true);
    const list = billboardsList.filter((billboard) => {
      let available = true;
      billboard.dateReserved.forEach((reserved) => {
        if (
          !(
            range[0].endDate < reserved.startReserve ||
            range[0].startDate > reserved.endReserve
          )
        ) {
          available = false;
          billboard.available = false;
        }
      });
      if (available === true) {
        billboard.available = true;
        return true;
      }
      return false;
    });

    setAvailableListByDate(list);
  };

  const UpdateCurrentBillboard = (billboard) => {
    setCurrentBillboard(billboard.pos);
  };

  return (
    // <div className={classes.container}>
    <Fragment>
      <div className={classes.nav}>
        <BillboardsNavbar search={searchByRange} />
      </div>

      <div className={classes.billboardsContainer}>
        <div className={classes.mapcontainer}>
          <MapContainer
            className={classes.map}
            center={currentBillboard}
            zoom={13}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <div>
              {billboardsList.map((billboard) => {
                let markerIcon = L.icon({
                  iconUrl:
                    billboard.available === true
                      ? billboardAvailable
                      : billboardNotAvailable,
                  iconSize: [40, 100],
                  popupAnchor: [0, -41],
                });

                return (
                  <Marker
                    key={billboard.id}
                    position={billboard.pos}
                    icon={markerIcon}
                  >
                    <BillboardsPopUp
                      title={billboard.address}
                      text={billboard.text}
                      available={billboard.available}
                      updateBillboard={UpdateBillboard}
                      id={billboard.id}
                    />
                  </Marker>
                );
              })}
            </div>
            <UpdateMapCenter center={currentBillboard} />
          </MapContainer>
        </div>
        <div className={classes.listcontainer}>
          <div className={classes.titlelist}>Available billboards</div>
          <div className={classes.billboardslist}>
            Available billboards on your dates:
            <BillboardsList
              billboards={availableListByDate}
              clickOnBillboard={UpdateCurrentBillboard}
            />
          </div>
        </div>
      </div>

      {/* <div>
        <SlidingPane
          className={classes.slidepane}
          isOpen={openSlide}
          title="Available billboards"
          width="350px"
          onRequestClose={() => {
            setOpenSlide(false);
          }}
        >
          <div>
            Available billboards on your dates:
            <BillboardsList
              billboards={availableListByDate}
              clickOnBillboard={UpdateCurrentBillboard}
            />
          </div>
          <br />
        </SlidingPane>
      </div> */}
      {/* </div> */}
    </Fragment>
  );
};

export default BillboardsContainer;
