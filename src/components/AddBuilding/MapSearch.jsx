import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
//import {useLeaf}
import { useEffect } from "react";

const MapSearch = () => {
  const { map } = useLeaflet();
  const provider = new OpenStreetMapProvider();
  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider,
    });

    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return <></>;
};

export default MapSearch;
