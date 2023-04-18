import "../static/css/sidebar.css";
import { Drawer, List, ListItem, ListItemIcon, ListItemButton, ListItemText } from "@mui/material";

import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Sidebar(props){
  console.log('drawerWidth is %d', props.width);

  const textIcons = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Following', icon: <FavoriteIcon /> },
    { text: 'Message', icon: <MessageIcon /> },
    { text: 'Notification', icon: <NotificationsNoneIcon /> },
    { text: 'Profile', icon: <AccountCircleIcon />}
  ];

  return( 
    <Drawer anchor="left" variant="permanent"
    sx={{'& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.width }}}
    open
    >
      
      <List >
          {textIcons.map(item => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {item.icon}
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