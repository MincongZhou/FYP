import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import SliderCaptcha from "../SliderCaptcha"
import fetch from '../../fetch'
import "./index.scss";
import { useEffect } from "react";
import Alert from "../Alert";

// Login functional component
function Login() {
  // Defining states for nickname (username), isCode (captcha verification flag), and password
  const [nickname, setUsername] = useState("");
  const [isCode, setIsCode] = useState(false);
  const [password, setPassword] = useState("");

  // useEffect hook to check if there is user information in the session storage
  // If found, it reloads the page and clears the user info
  useEffect(()=>{
    if(sessionStorage.userInfo){
      window.location.reload()
      sessionStorage.userInfo = ''
    }
  },[])

  // Handler to change the username
  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  // Handler to change the password
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  // Callback to set the captcha verification status
  const callback = e => {
    setIsCode(e)
  }

  // Handler to submit the login form
  const handleSubmit = event => {
    event.preventDefault();
    // Checking if captcha verification has passed
    if(!isCode){
      return Alert('The man-machine check is failed')
    }
    // Making a POST request to the login endpoint with the nickname and password
    fetch('/user/login', {
      method: 'POST',
      body: JSON.stringify({
        nickname: nickname,
        password
      })
    },res =>{
      // If successful, save the user info in session storage and redirect to the home page
      if(res.code === '200'){
        Alert('success')
        sessionStorage.userInfo = JSON.stringify(res.data)
        window.location = "/"
      }
    })
  };

  // Returning the JSX to render the component
  return (
    <div className="container">
      <div className="image-container">
        <img src="./images/background.png" alt="Login image" />
      </div>
      <div className="form-container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <TextField
            label="email"
            variant="outlined"
            value={nickname}
            onChange={handleUsernameChange}
            fullWidth
            InputProps={{
              startAdornment: <AccountCircle color="disabled" />,
            }}
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              startAdornment: <Lock color="disabled" />,
            }}
            fullWidth
            margin="normal"
          />
          <SliderCaptcha callback={callback}/>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
