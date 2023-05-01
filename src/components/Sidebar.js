import "../static/css/sidebar.css";
import { Drawer, List, ListItem, ListItemIcon, ListItemButton, ListItemText, Badge } from "@mui/material";
import { Link } from "react-router-dom";

import FavoriteIcon from '@mui/icons-material/Favorite';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';

function Sidebar(props){

  const textIcons = [
    { text: 'Search', icon: <SearchIcon />, to: '/'},
    { text: 'News', icon: <HeadphonesIcon />, to: '/news'},
    { text: 'Subscription', icon: <FavoriteIcon />, to: '/subscription' },
    { text: 'Friends', icon: <PeopleIcon />, to: '/friends'},
    { text: 'Notification', icon: <NotificationsNoneIcon/>, to: '/notification'},
    { text: 'Profile', icon: <AccountCircleIcon />, to: '/profile'}
  ];

  return( 
    <Drawer anchor="left" variant="permanent"
    sx={{'& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.width }}}
    open
    >
      
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
    </Drawer>
  );
}

export default Sidebar;