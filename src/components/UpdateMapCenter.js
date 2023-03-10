import { useMap } from "react-leaflet";

const UpdateMapCenter = (props) => {
  const map = useMap();
  map.closePopup();
  map.panTo(props.center);
  return null;
};

export default UpdateMapCenter;
