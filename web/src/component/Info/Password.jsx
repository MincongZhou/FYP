import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import Alert from "../Alert";
import SliderCaptcha from "../SliderCaptcha";

// Define the ChangePasswordDialog component
const ChangePasswordDialog = ({ open, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCode, setIsCode] = useState(false);

  // Function to handle the password change confirmation
  const handleConfirm = () => {
    // Validating captcha
    if (!isCode) {
      return Alert("The man-machine check is failed");
    }
    
    // Validating old password
    if (JSON.parse(sessionStorage.userInfo).password !== oldPassword) {
      return Alert("Wrong password");
    }

    // Checking if new password and confirmation password match
    if (newPassword !== confirmPassword) {
      return Alert("Password inconsistency");
    }

    // Password complexity checks
    if(!(/([a-z])/.test(newPassword))){
      return Alert('Missing lowercase letters')
    }
    if(!(/([A-Z])/.test(newPassword))){
      return Alert('Missing capital letters')
    }
    if(!(/([0-9])/.test(newPassword))){
      return Alert('Missing number')
    }
    if(!(/[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]/.test(newPassword))){
      return Alert('missing special symbol')
    }
    if(newPassword.length < 8){
      return Alert('The password must be larger than 8 digit')
    }

    // Closing the dialog, possibly passing the new password to the parent
    onClose(newPassword); 
  };

  // Callback function to handle slider captcha result
  const callback = e => {
    setIsCode(e);
  };

  // Component render
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <TextField
          label="Old password"
          type="password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <div style={{ marginLeft: "4%" }}>
        <SliderCaptcha callback={callback} />
      </div>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
