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

const BillboardsMap = () => {
  const positions = [
    {
      pos: [31.30949, 34.62058],
      text: "Details on the board",
      address: "Ofakim",
      available: true,
      id: [31.30949, 34.62058].join(),
    },
    {
      pos: [31.32385, 34.6752],
      text: "Details on the board",
      address: "Tifrah",
      available: false,
      id: [31.32385, 34.6752].join(),
    },
    {
      pos: [31.331659, 34.65118],
      text: "Details on the board",
      address: "Gilat",
      available: true,
      id: [31.331659, 34.65118].join(),
    },
    {
      pos: [31.34949, 34.66058],
      text: "Details on the board",
      address: "Gilat forest",
      available: true,
      id: [31.34949, 34.66058].join(),
    },
    {
      pos: [31.4213546, 34.5884252],
      text: "Details on the board",
      address: "Netivot",
      available: true,
      id: [31.4213546, 34.5884252].join(),
    },
  ];

  const billboardAvailable = "./assets/billboardAvailable.svg";
  const billboardNotAvailable = "./assets/billboardNotAvailable.svg";

  const [positionsList, setPositionsList] = useState(positions);

  const [currentbillBoard, setCurrentbillBoard] = useState();

  // const reserveDialogOpen = (id) => {
  //   setCurrentbillBoard(id);
  //   console.log(currentbillBoard);
  // };

  const UpdateBillBoard = (id, handleClose, dateValidation) => {
    let newPositionList = positionsList.map((position) => {
      if (position.id == id) {
        position.available = false;
      }
      return position;
    });

    setPositionsList(newPositionList);
    handleClose();
  };

  return (
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
  );
};

export default BillboardsMap;
