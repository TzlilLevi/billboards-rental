import React, { useEffect, useState } from "react";
import classes from "./BillboardsMap.module.css";
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

  let component;
  const [positionsList, setPositionsList] = useState(positions);

  const [currentbillBoard, setCurrentbillBoard] = useState();

  // const UpdateBillBoard = (
  //   id,
  //   startDate,
  //   endDate,
  //   handleClose,
  //   dateValidation,
  //   resetReserveTimes
  // ) => {
  //   if (dateValidation()) {
  //     let newPositionList = positionsList.map((position) => {
  //       if (position.id == id) {
  //         position.available = false;
  //         position.startReserve = startDate;
  //         position.endReserve = endDate;
  //       }
  //       return position;
  //     });
  //     setPositionsList(newPositionList);
  //     handleClose();
  //     UpdateAvailableBillboards();
  //     resetReserveTimes();
  //   }
  //   return;
  // };

  const UpdateBillBoard = (id, dateState, handleClose, resetReserveTimes) => {
    let newPositionList = positionsList.map((position) => {
      if (position.id == id) {
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
        positions.endReserve = undefined;
      }
      return position;
    });
    setPositionsList(newPositionList);
  };

  useEffect(() => {
    UpdateAvailableBillboards();
  }, []);

  return (
    <div>
      <BillboardsNavbar />
      <div>
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
    </div>
  );
};

export default BillboardsMap;
