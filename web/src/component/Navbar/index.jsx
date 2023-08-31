import Button from "@mui/material/Button";

// Import the useNavigate hook from react-router-dom for programmatically navigating between pages
import { useNavigate } from "react-router-dom";
import "./index.scss";

// Define the NavBar component
export default function NavBar() {

  // Get the navigate function from the useNavigate hook
  const history = useNavigate();

  // Check if the current page is the home page
  const isHome = window.location.pathname === "/";

  // Define styles to apply if the current page is the home page
  const style = {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 10,
  };

  // Retrieve user information from sessionStorage, or set it as an empty string if it doesn't exist
  const userInfo = sessionStorage.userInfo
    ? JSON.parse(sessionStorage.userInfo)
    : "";

  // Return the JSX to render the NavBar
  return (
    // Apply the style conditionally based on whether the current page is the home page
    <div className="nav-bar" style={isHome ? style : {}}>
      <div>
        <img src="images/logo.jpg" alt="" />
        <div style={{ marginLeft: "6%" }}>
          <Button onClick={() => history("/")}>home</Button>
          <Button onClick={() => history("/map")}>map</Button>
        </div>
      </div>
      <div className="nav-bar-right">
        {!userInfo && (
          <Button onClick={() => history("/register")}>register</Button>
        )}
        {!userInfo && <Button onClick={() => history("/login")}>log in</Button>}
        {userInfo && (
          <Button
            onClick={() => history("/table")}
            size="small"
            variant="contained"
          >
            Information
          </Button>
        )}
      </div>
    </div>
  );
}
