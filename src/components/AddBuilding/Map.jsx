import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState, useRef, useContext } from "react";
import "leaflet/dist/leaflet.css";
import BuildingContext from "../../store/building-context";
import MapSearch from "./MapSearch";
import axios from "axios";

const Map = () => {
  const context = useContext(BuildingContext);
  const center = [48.8566, 2.3522];
  const [location, setLocation] = useState({
    lat: center[0],
    lang: center[1],
    address: "town hall of bagnolet, 75004 paris, france",
  });
  const markerRef = useRef(null);
  const handleMarkerDrag = (newPosition) => {
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${newPosition.lat}&lon=${newPosition.lng}`
      )
      .then((response) => {
        setLocation({
          lat: newPosition.lat,
          lang: newPosition.lng,
          address: response.data.display_name,
        });
        context.setFormData((prev) => {
          return {
            ...prev,
            lat: newPosition.lat,
            lang: newPosition.lng,
            adresse: response.data.display_name,
          };
        });
      })
      .catch((error) => {
        console.error("Error while geocoding:", error);
      });
  };
  const DraggableMarker = ({ position, onMarkerDrag }) => {
    const map = useMapEvents({
      click(e) {
        //map.locate();
        onMarkerDrag(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
      locationfound(e) {
        onMarkerDrag(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return (
      <Marker
        draggable
        eventHandlers={{
          dragend(e) {
            onMarkerDrag(e.target.getLatLng());
          },
        }}
        position={position}
        ref={markerRef}
      />
    );
  };

  return (
    <MapContainer center={center} zoom={13} attributionControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker
        position={[location.lat, location.lang]}
        onMarkerDrag={handleMarkerDrag}
      />
      <MapSearch />
    </MapContainer>
  );
};

export default Map;
