import "../static/css/sidebar.css";
import { Drawer, List, ListItem, ListItemIcon, ListItemButton, ListItemText, Badge, Box } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

import FavoriteIcon from '@mui/icons-material/Favorite';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';





function Sidebar(props){
  const handleClick = () => {
    fetch("/logout", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        props.token()
      });
}

  const textIcons = [
    { text: 'Search', icon: <SearchIcon />, to: '/'},
    { text: 'News', icon: <HeadphonesIcon />, to: '/news'},
    { text: 'Subscription', icon: <FavoriteIcon />, to: '/subscription' },
    { text: 'Friends', icon: <PeopleIcon />, to: '/friends'},
    { text: 'Notification', icon: <NotificationsNoneIcon/>, to: '/notification'},
  ];

  return(
    <div>
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FatEar
          </Typography>
          <Button color="inherit" onClick={handleClick}>Logout</Button>
        </Toolbar>
      </AppBar>
    {localStorage.getItem("Visitor")==null ? 
    <Drawer variant="permanent"
    sx={{ flexShrink: 0, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.width }}}
    open
    >
      <Toolbar />

        <Box sx={{ overflow: 'auto' }}>
          <List >
            {textIcons.map(item => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton LinkComponent={Link} to={item.to}>
                  <ListItemIcon>
                    {(item.text == 'Notification') ? 
                    <Badge color="secondary" variant="dot">{item.icon}</Badge>
                    : item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          </Box>
    </Drawer>
    :(
      <></>
    )}
    </div>
  );
}

export default Sidebar;