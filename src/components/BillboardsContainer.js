import React, { useEffect, useState } from "react";
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
import PositionsList from "./PositionsList";

import "react-sliding-pane/dist/react-sliding-pane.css";
import SlidingPane from "react-sliding-pane";

const BillboardsMap = () => {
  const positions = [
    {
      pos: [31.30949, 34.62058],
      text: "Details on the board",
      address: "Ofakim",
      available: true,
      startReserve: undefined,
      endReserve: undefined,
      id: [31.30949, 34.62058].join(),
    },
    {
      pos: [31.32385, 34.6752],
      text: "Details on the board",
      address: "Tifrah",
      available: false,
      startReserve: new Date(
        "Sun Jan 01 2023 00:00:00 GMT+0200 (Israel Standard Time)"
      ),
      endReserve: new Date(
        "Tue Feb 28 2023 00:00:00 GMT+0200 (Israel Standard Time)"
      ),
      id: [31.32385, 34.6752].join(),
    },
    {
      pos: [31.331659, 34.65118],
      text: "Details on the board",
      address: "Gilat",
      available: true,
      startReserve: new Date(
        "Sun Jan 01 2023 00:00:00 GMT+0200 (Israel Standard Time)"
      ),
      endReserve: new Date(
        "Tue Feb 28 2023 00:00:00 GMT+0200 (Israel Standard Time)"
      ),
      id: [31.331659, 34.65118].join(),
    },
    {
      pos: [31.34949, 34.66058],
      text: "Details on the board",
      address: "Gilat forest",
      available: true,
      startReserve: undefined,
      endReserve: undefined,
      id: [31.34949, 34.66058].join(),
    },
    {
      pos: [31.4213546, 34.5884252],
      text: "Details on the board",
      address: "Netivot",
      available: true,
      startReserve: undefined,
      endReserve: undefined,
      id: [31.4213546, 34.5884252].join(),
    },
  ];

  const billboardAvailable = "./assets/billboardAvailable.svg";
  const billboardNotAvailable = "./assets/billboardNotAvailable.svg";

  const [positionsList, setPositionsList] = useState(positions);
  const [availableListByDate, setAvailableListByDate] = useState();
  const [openSlide, setOpenSlide] = useState(false);

  const UpdateBillBoard = (id, dateState, handleClose, resetReserveTimes) => {
    let newPositionList = positionsList.map((position) => {
      if (position.id === id) {
        position.available = false;
        position.startReserve = dateState[0].startDate;
        position.endReserve = dateState[0].endDate;
      }
      console.log(position);
      return position;
    });
    console.log(newPositionList);

    setPositionsList(newPositionList);
    console.log(newPositionList);
    handleClose();
    resetReserveTimes();
    UpdateAvailableBillboards();
    return;
  };

  const UpdateAvailableBillboards = () => {
    let dateNow = Date.now();
    let newPositionList = positionsList.map((position) => {
      if (position.startReserve <= dateNow && dateNow <= position.endReserve) {
        position.available = false;
      } else {
        position.available = true;
      }
      if (position.endReserve < dateNow) {
        position.startReserve = undefined;
        position.endReserve = undefined;
      }
      return position;
    });
    setPositionsList(newPositionList);
  };

  useEffect(() => {
    UpdateAvailableBillboards();
  }, []);

  const searchByRange = (range) => {
    setOpenSlide(true);
    const list = positionsList.filter(
      (position) =>
        (position.startReserve === undefined &&
          position.endReserve === undefined) ||
        range[0].endDate < position.startReserve ||
        range[0].startDate > position.endReserve
    );
    setAvailableListByDate(list);
    console.log(availableListByDate);
  };

  return (
    <div className={classes.container}>
      <div className={classes.nav}>
        <BillboardsNavbar search={searchByRange} />
      </div>
      <div className={classes.mapcontainer}>
        <MapContainer
          className={classes.map}
          center={[31.30949, 34.62058]}
          zoom={13}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <div>
            {positionsList.map((position) => {
              let markerIcon = L.icon({
                iconUrl:
                  position.available === true
                    ? billboardAvailable
                    : billboardNotAvailable,
                iconSize: [50, 100],
                popupAnchor: [0, -41],
              });
              return (
                <Marker
                  key={position.id}
                  position={position.pos}
                  icon={markerIcon}
                >
                  <BillboardsPopUp
                    title={position.address}
                    text={position.text}
                    available={position.available}
                    updateBillBoard={UpdateBillBoard}
                    id={position.id}
                  />
                </Marker>
              );
            })}
          </div>
        </MapContainer>
      </div>
      <div>
        <SlidingPane
          className={classes.slidepane}
          isOpen={openSlide}
          title="Available billboards"
          // subtitle="Optional subtitle."
          width="350px"
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            setOpenSlide(false);
          }}
        >
          <div>
            And I am pane content. BTW, what rocks?
            <PositionsList positions={availableListByDate} />
          </div>
          <br />
        </SlidingPane>
      </div>
    </div>
  );
};

export default BillboardsMap;
