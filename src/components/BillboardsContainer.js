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
import BillboardsList from "./BillboardsList";
import UpdateMapCenter from "./UpdateMapCenter";
import "react-sliding-pane/dist/react-sliding-pane.css";
import SlidingPane from "react-sliding-pane";

const BillboardsContainer = () => {
  const billboards = [
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

  const [billboardsList, setBillboardsList] = useState(billboards);
  const [availableListByDate, setAvailableListByDate] = useState();
  const [openSlide, setOpenSlide] = useState(false);
  const [currentBillboard, setCurrentBillboard] = useState([
    31.30949, 34.62058,
  ]);

  const UpdateBillboard = (id, dateState, handleClose, resetReserveTimes) => {
    let newBillboardList = billboardsList.map((billboard) => {
      if (billboard.id === id) {
        billboard.available = false;
        billboard.startReserve = dateState[0].startDate;
        billboard.endReserve = dateState[0].endDate;
      }
      console.log(billboard);
      return billboard;
    });
    console.log(newBillboardList);

    setBillboardsList(newBillboardList);
    console.log(newBillboardList);
    handleClose();
    resetReserveTimes();
    UpdateAvailableBillboards();
    return;
  };

  const UpdateAvailableBillboards = () => {
    let dateNow = Date.now();
    let newBillboardList = billboardsList.map((billboard) => {
      if (
        billboard.startReserve <= dateNow &&
        dateNow <= billboard.endReserve
      ) {
        billboard.available = false;
      } else {
        billboard.available = true;
      }
      if (billboard.endReserve < dateNow) {
        billboard.startReserve = undefined;
        billboard.endReserve = undefined;
      }
      return billboard;
    });
    setBillboardsList(newBillboardList);
  };

  useEffect(() => {
    UpdateAvailableBillboards();
  }, []);

  const searchByRange = (range) => {
    setOpenSlide(true);
    const list = billboardsList.filter(
      (billboard) =>
        (billboard.startReserve === undefined &&
          billboard.endReserve === undefined) ||
        range[0].endDate < billboard.startReserve ||
        range[0].startDate > billboard.endReserve
    );
    setAvailableListByDate(list);
    console.log(availableListByDate);
  };

  const UpdateCurrentBillboard = (billboard) => {
    console.log(billboard);
    setCurrentBillboard(billboard.pos);
    console.log(currentBillboard);
  };

  return (
    <div className={classes.container}>
      <div className={classes.nav}>
        <BillboardsNavbar search={searchByRange} />
      </div>
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
                iconSize: [50, 100],
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
            Available billboards on your dates:
            <BillboardsList
              billboards={availableListByDate}
              clickOnBillboard={UpdateCurrentBillboard}
            />
          </div>
          <br />
        </SlidingPane>
      </div>
    </div>
  );
};

export default BillboardsContainer;
