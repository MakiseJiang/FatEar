import React, { useState } from 'react';

import { TextField, InputAdornment, IconButton, Button, Stack} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import '../static/css/App.css';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  })
  // Handles show password icon
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // Handles click on Login
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/LoginAuth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  return ( 
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>

        {/* Title*/}
        <h1>Welcome to FatEar!</h1>

        {/* Username TextField */}
        <TextField label='Username' variant='outlined' type='text' name='username' margin='normal' style = {{width: 300}}
        onChange={handleChange}
        />

        {/* Password TextField with visibility toggle */}
        <TextField fullWidth
        label='Password' variant="outlined" type={showPassword ? "text" : "password"} name='password' margin='normal' style = {{width: 300}}
        onChange={handleChange}
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

        {/*  Login and Sign up Button */}
        <Stack spacing={2} direction='column'>
          <Button type="submit" variant="outlined" style={{ marginLeft: "200px", marginRight:"200px"}}>Login</Button>
          <Button variant="contained" style={{ marginLeft: "200px", marginRight:"200px"}}>Sign Up</Button>
        </Stack>


        </form>
      </header>
    </div>
  );
}

export default LoginPage;
