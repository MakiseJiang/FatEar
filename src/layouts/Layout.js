import React from 'react';

import '../static/css/App.css';
import Sidebar from '../components/Sidebar';
import { Box, CssBaseline, Toolbar } from '@mui/material';


const drawerWidth = "240px";

function Layout(props) {
  return (
    <div>
      <Sidebar width={drawerWidth} token={props.token}/>
      <Box
      component="main"
      sx={{ flexGrow: 1, p: 5, marginLeft: drawerWidth, overflow: 'auto'}}>
        <Toolbar />
        {props.children}
      </Box>

    </div>
  )
}

export default Layout;