import React, {useState, useEffect} from 'react';

import { TextField, InputAdornment, IconButton, Button, Stack} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import './static/css/App.css';

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return ( 
    <div className="App">
      <header className="App-header">
        {/* Title*/}
        <h1>Welcome to FatEar!</h1>
        {/* Input TextField */}
        <TextField label='Username' variant='outlined' type='text' margin='normal' style = {{width: 300}}
        />
        <TextField fullWidth
        label='Password' variant="outlined" type={showPassword ? "text" : "password"} margin='normal' style = {{width: 300}}
        InputProps={{ // <-- This is where the toggle button is added.
          endAdornment: (
        <InputAdornment position="end">
          <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          >
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
        </InputAdornment>
        )
        }}
        />

        {/*  Login Button */}
        <Stack spacing={2} direction='column' style={{margin: 20}}>
          <Button variant="outlined">Login</Button>
          <Button variant="contained">Sign Up</Button>
        </Stack>
      </header>
    </div>
  );
}

export default App;
