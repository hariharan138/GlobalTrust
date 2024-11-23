import React from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import "./TrustLogin.css"; // Import the CSS file

const TrustLogin = () => {
  return (
    
    <Box className="trust-login-container">
      
      <Paper elevation={3} className="trust-login-paper">
        <Typography variant="h4" className="trust-login-title">
          Trust Login
        </Typography>
        <form>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="trust-login-button"
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default TrustLogin;
