import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import { useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import "leaflet-geosearch/dist/geosearch.css";
import BuildingContext from "../../store/building-context";

export const useGeoSearchControl = () => {
  const context = useContext(BuildingContext);
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

    map.on("geosearch/showlocation", (data) => {
      if (data) {
        console.log(data);
        context.setFormData((prev) => {
          return { ...prev, addresse: data.location.label };
        });
      }
    });
    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return searchControlRef;
};
