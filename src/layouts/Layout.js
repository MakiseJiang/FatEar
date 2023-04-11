import React from 'react';

import '../static/css/App.css';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';

const drawerWidth = "240px";

function Layout({ children }) {
    console.log(`calc(100% - ${drawerWidth}px)`)
  return (
    <div className='WelcomePage'>
      <Sidebar width={drawerWidth}/>
      <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, marginLeft: drawerWidth}}>
        {children}
      </Box>

    </div>
  );
}

export default Layout;