import React, { useState } from 'react';
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

function UserPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    // Clear the error message if the user starts typing again
    if (errorMessage) setErrorMessage("");

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/user/register", formData);
      alert(response.data.message);
      
      // Clear form data after successful registration
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        address: "",
      });

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
            User
          </Typography>
          <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
          <Button color="inherit" onClick={()=>navigate('/contact')}>Contact Us</Button>
          <Button color="inherit" onClick={() => navigate('/userlogin')}>
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
          padding: 2,
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: "85%" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Registration Form
          </Typography>

          {errorMessage && <Typography color="error" align="center">{errorMessage}</Typography>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
             
              <Grid item xs={6}>
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
              
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
                  type="text"
                  variant="outlined"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <div style={{display:"flex", justifyContent:"center"}}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
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
}

export default UserPage;
