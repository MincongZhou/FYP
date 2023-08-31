import * as React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import AutoComplete from "react-google-autocomplete";

// Exporting a functional component CustomizedInputBase
export default function CustomizedInputBase() {
  // Initializing state to store longitude, latitude, and name of a selected place
  const [lgs, setLgs] = React.useState(null);
  // Handler to be called when a place is selected
  const onPlaceSelected = res => {
    setLgs({
      lng: res.geometry.location.lng(),
      lat: res.geometry.location.lat(),
      name: res.formatted_address
    });
  };

  // Function to handle redirection to a map view with the selected coordinates
  const bindClick = () => {
    if(!lgs){
      return
    }
    window.location.href = `/map?lng=${lgs.lng}&lat=${lgs.lat}`;
  }
  
  // Returning the JSX to render the component
  return (
    <Paper
      component="form"
      sx={{ display: "flex", alignItems: "center", height: "100%" }}
    >
      <AutoComplete
        className="location-search"
        onPlaceSelected={onPlaceSelected}
        apiKey="AIzaSyA-Tm0Wf5xc4QvSEcoy43Hc1l_JlESU3fk"
        fields={["address_components", "geometry.location"]}
      />
      <IconButton onClick={bindClick} type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      {}
    </Paper>
  );
}
