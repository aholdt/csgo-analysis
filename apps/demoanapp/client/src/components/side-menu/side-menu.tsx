import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { NavLink } from "react-router-dom";
import Routes from "../../Routes";

export default function SideMenu(props: any) {
  const activeRoute = (routeName: any) => {
    return props.location?.pathname === routeName ? true : false;
  };

  return (
    <Box>
      <Drawer
        sx={{
          width: props.drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: props.drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {Routes.map((route, key) => (
            <NavLink to={route.path} style={{ textDecoration: "none" }} key={key}>
              <ListItem button key={route.sidebarName} selected={activeRoute(route.path)}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary={route.sidebarName} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
