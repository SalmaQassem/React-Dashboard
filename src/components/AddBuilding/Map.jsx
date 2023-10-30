import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState, useRef, useEffect, useContext } from "react";
import "leaflet/dist/leaflet.css";
import MapSearch from "./MapSearch";
import BuildingContext from "../../store/building-context";

const Map = () => {
  const context = useContext(BuildingContext);
  const center = [48.8566, 2.3522];
  const [markerPosition, setMarkerPosition] = useState(center);
  const markerRef = useRef(null);
  const handleMarkerDrag = (newPosition) => {
    setMarkerPosition([newPosition.lat, newPosition.lng]);
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

  useEffect(() => {
    if (markerPosition[0] !== 48.8566 && markerPosition[1] !== 2.3522) {
      context.setFormData((prev) => {
        return { ...prev, lat: markerPosition[0], lang: markerPosition[1] };
      });
    }
  }, [markerPosition]);
  return (
    <MapContainer center={center} zoom={13} attributionControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker
        position={markerPosition}
        onMarkerDrag={handleMarkerDrag}
      />
      <MapSearch />
    </MapContainer>
  );
};

export default Map;
