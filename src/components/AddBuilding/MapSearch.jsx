import { useGeoSearchControl } from "./GeoSearch";

const MapSearch = () => {
  const searchControlRef = useGeoSearchControl();
  return <div ref={searchControlRef} />;
};

export default MapSearch;
