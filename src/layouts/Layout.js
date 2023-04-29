import React from 'react';

import '../static/css/App.css';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';

const drawerWidth = "240px";

function Layout(props) {
  return (
    <div>
      <Sidebar width={drawerWidth}/>
      <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, marginLeft: drawerWidth}}>
        {props.children}
      </Box>

    </div>
  )
}

export default Layout;