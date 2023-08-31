import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import ChangePasswordDialog from "./Password";
import { useNavigate } from "react-router-dom";
import { AccountCircle, Person, Description, Phone } from "@mui/icons-material";
import SliderCaptcha from "../SliderCaptcha";
import fetch from "../../fetch";
import Alert from "../Alert";
import "./index.scss";

// Retrieving existing user information from sessionStorage
let userInfo = sessionStorage.userInfo
  ? JSON.parse(sessionStorage.userInfo)
  : {};

let password = userInfo.password || ""

// Register component definition
function Register() {
  // Initializing state for various user information fields
  const [nickname, setNickname] = useState(userInfo.nickname || "");
  const [name, setName] = useState(userInfo.name || "");
  const [intro, setIntro] = useState(userInfo.intro || "");
  const [phone, setPhone] = useState(userInfo.phone || "");
  const [category, setCategory] = useState(userInfo.category || "");
  const [isCode, setIsCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useNavigate();

  const [open, setOpen] = useState(false);

  // Handler for opening ChangePasswordDialog
  const handleOpen = () => {
    setOpen(true);
  };

  // Handler for closing ChangePasswordDialog and potentially submitting a new password
  const handleClose = res => {
    if (typeof res === "string") {
      password = res
      console.log(res)
      handleSubmit(false);
    }
    setOpen(false);
  };

  // Various handlers for managing the input fields
  const handleNicknameChange = event => {
    setNickname(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleIntroChange = event => {
    setIntro(event.target.value);
  };

  const handlePhoneChange = event => {
    setPhone(event.target.value);
  };

  // Handler for form submission, including validation and API call
  const handleSubmit = event => {
    event && event.preventDefault();
    const data = {
      ...userInfo,
      nickname,
      name,
      intro,
      phone,
      category,
      password,
    };
    if (event !== false && !isCode) {
      return Alert("The man-machine check is failed");
    }
    fetch(
      "/user/" + userInfo.id,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      res => {
        Alert("success");
        sessionStorage.userInfo = JSON.stringify({
          ...userInfo,
          ...data,
        });
      }
    );
  };

  // Callback to handle the result from the SliderCaptcha
  const callback = e => {
    setIsCode(e);
  };

  // JSX for rendering the component
  return (
    <div className="info-container">
      <div>
        <p>profile</p>
        <img src="/27ddc832-b720-420e-85ac-5b4ff3b63d8e.png" alt="" />
        <div
          onClick={handleOpen}
          style={{ height: "51px", background: "#ddd", lineHeight: "51px" }}
        >
          Change Password
        </div>
        <div
          onClick={() => history("/table")}
          style={{
            height: "51px",
            background: "#ddd",
            lineHeight: "51px",
            marginTop: "5px",
          }}
        >
          Manage Listing
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="email"
          variant="outlined"
          value={nickname}
          disabled
          onChange={handleNicknameChange}
          fullWidth
          InputProps={{
            startAdornment: <AccountCircle color="disabled" />,
          }}
          margin="normal"
        />
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          fullWidth
          InputProps={{
            startAdornment: <Person color="disabled" />,
          }}
          margin="normal"
        />
        <TextField
          label="Intro"
          variant="outlined"
          value={intro}
          onChange={handleIntroChange}
          fullWidth
          InputProps={{
            startAdornment: <Description color="disabled" />,
          }}
          margin="normal"
        />
        <TextField
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={handlePhoneChange}
          fullWidth
          InputProps={{
            startAdornment: <Phone color="disabled" />,
          }}
          margin="normal"
        />
        <div style={{ marginBottom: "4%" }}>
          <SliderCaptcha callback={callback} />
        </div>
        <ChangePasswordDialog open={open} onClose={handleClose} />
        {}
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Register;
