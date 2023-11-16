import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "leaflet-geosearch/dist/geosearch.css";

const MapSearch = () => {
  const map = useMap();
  const searchControlRef = useRef(null);
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      showMarker: false,
      showPopup: false,
      searchLabel: t("body.enterLocation"),
      notFoundMessage: t("body.locationNotFound"),
    });
    map.addControl(searchControl);
    searchControlRef.current = searchControl;

    /*map.on("geosearch/showlocation", (data) => {
      if (data) {
        setAddress((prev) => {
          return { ...prev, address: data.location.label };
        });
      }
    });*/
    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return <div />;
};

export default MapSearch;
