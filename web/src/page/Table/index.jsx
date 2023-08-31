// Importing required React, Material UI components, React Router hooks, and icons
import * as React from "react";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { useNavigate, Outlet } from "react-router-dom";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import './index.scss'

// Width for the drawer (side navigation)
const drawerWidth = 240;

// Styling for the Drawer (side navigation) component
const SideNav = styled(Drawer)(({ theme }) => ({
  [`& .MuiDrawer-paper`]: {
    width: drawerWidth,
  },
}));

// Styling for the main content
const Content = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: "100vh",
  overflow: "auto",
}));

// Component for List items used for navigation, utilizes React Router for navigation
function ListItemLink(props) {
  const history = useNavigate();// Hook to navigate between pages

  const handleClick = event => {
    event.preventDefault();
    history(props.to);// Navigate to the specified route
  };

  return (
    <ListItem button onClick={handleClick}>
      {props.children}
    </ListItem>
  );
}

// Main Dashboard Layout component
const DashboardLayout = ({ children }) => {
  return (
    <div style={{}} className="table-height">
      <Box sx={{ display: "flex" }}>
        <SideNav
          variant="permanent"
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open={true}
        >
          <List>
            <ListItemLink to="/table">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="listing" />
            </ListItemLink>
            <ListItemLink to="/table/history">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="booking" />
            </ListItemLink>
            <ListItemLink to="/table/favorite">
              <ListItemIcon>
                <AllInboxIcon />
              </ListItemIcon>
              <ListItemText primary="favorite" />
            </ListItemLink>
            <ListItemLink to="/table/info">
              <ListItemIcon>
                <HowToRegIcon />
              </ListItemIcon>
              <ListItemText primary="profile" />
            </ListItemLink>
            <ListItemLink to="/table/bankCard">
              <ListItemIcon>
                <AllInboxIcon />
              </ListItemIcon>
              <ListItemText primary="billing" />
            </ListItemLink>
            {}
            <ListItemLink to="/login">
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="log out" />
            </ListItemLink>
          </List>
        </SideNav>
        <Content>
          
          <Outlet />
        </Content>
      </Box>
    </div>
  );
};

// Exporting the DashboardLayout component
export default DashboardLayout;
