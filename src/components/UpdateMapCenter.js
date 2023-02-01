import React from "react";
import { useMap, useMapEvents } from "react-leaflet";

const UpdateCenterMap = (props) => {
  const map = useMap();
  map.panTo(props.center);
  return null;
};

export default UpdateCenterMap;
