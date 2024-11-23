import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  Grid,
} from "@mui/material";

const Trust = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    trustName: "",
    trustId: "",
    email: "",
    trustEmail: "",
    phoneNumber: "",
    trustPhoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
    upId: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/trust/register",
        formData
      );
      alert(response.data.message);
      navigate("/login"); // Redirect to login after successful registration
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Trust
          </Typography>
          <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
          <Button color="inherit" onClick={() => navigate("/contact")}>
            Contact Us
          </Button>
          <Button color="inherit" onClick={() => navigate("/trustlogin")}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Registration Form */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          padding: 0, // Make sure to remove any padding for full width
          width: "100%", // Ensure the Box spans full width
          margin: 0, // Remove default margins
          // border:"2px solid black"
        }}
      >
        <Paper
          elevation={3}
          sx={{
          // border:"2px solid black",
            padding: 4,
            width: "85%", // Ensure Paper takes full width of container
            // maxWidth: 1000, // Limit the maximum width for larger screens
            margin: "0 auto", // Center the Paper element
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Registration Form
          </Typography>

          {errorMessage && (
            <Typography color="error" align="center">
              {errorMessage}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="trustName"
                  value={formData.trustName}
                  onChange={handleChange}
                  fullWidth
                  label="Trust Name"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="trustId"
                  value={formData.trustId}
                  onChange={handleChange}
                  fullWidth
                  label="Trust ID"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="trustEmail"
                  value={formData.trustEmail}
                  onChange={handleChange}
                  fullWidth
                  label="Trust Email Address"
                  type="email"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="trustPhoneNumber"
                  value={formData.trustPhoneNumber}
                  onChange={handleChange}
                  fullWidth
                  label="Trust Phone Number"
                  type="tel"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  label="Address"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="upId"
                  value={formData.upId}
                  onChange={handleChange}
                  fullWidth
                  label="UPID"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <div style={{display:"flex",justifyContent:"center"}}>
                <Button 
                  type="submit"
                  variant="contained"
                  // fullWidth
                  
                  sx={{ padding: 1.5, backgroundColor: "#1976d2" ,width:"25%" }}
                >
                  Register
                </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Trust;
