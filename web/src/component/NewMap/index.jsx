import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect } from "react";

// Define the size of the map container
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const MapWithMarker = (props = { onClick: Function, lng: "", lat: "" }) => {
  // Initialize marker's latitude and longitude
  const initialMarker = {
    lat: null,
    lng: null,
  };

  // State to manage marker's location
  const [marker, setMarker] = useState(initialMarker);
  // State to manage map's center
  const [center, setCenter] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });

  // Effect to notify parent component when the marker changes
  useEffect(() => {
    if (marker && marker.lat) {
      props.onClick(marker);
    }
  }, [marker]);
 
  // Effect to handle geolocation or initial coordinates
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        var data = { lat: Number(props.lat) || lat, lng: Number(props.lng) || lng }
        setCenter(data);
        if(props.lat){
          setMarker(data);
        }
      });
    }
  }, []);

  // Load the Google Maps script with the given API key
  const { isLoaded, loadError } = useLoadScript({
    language: 'en',
    googleMapsApiKey: "AIzaSyA-Tm0Wf5xc4QvSEcoy43Hc1l_JlESU3fk",
  });

  // Handle map click event
  const handleMapClick = event => {
    setMarker({
      lat: event.latLng.lat() || props.lat,
      lng: event.latLng.lng() || props.lng,
    });
  };

  // Handle marker click event
  const handleMarkerClick = () => {
    setMarker(initialMarker);
  };

  // Return errors if maps fail to load
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  // Render the Google Map along with the Marker
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      options={{ language: 'en' }}
      center={center}
      onClick={handleMapClick}
    >
      {marker.lat && marker.lng && (
        <Marker
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={handleMarkerClick}
        />
      )}
    </GoogleMap>
  );
};

export default MapWithMarker;
