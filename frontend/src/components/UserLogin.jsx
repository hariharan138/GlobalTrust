import React, { useState } from 'react'
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  let navigate = useNavigate()
  // sending the cookie name as "userlogintoken" 
  // so when youre working with login for user use the below line once you fetched the api
  // document.cookie = `userlogintoken=${response.data.token}; path=/;`;
  const [formUser, setFormUser] = useState({
    email: "",
    password: ""
  })

  const [errorMessage, setErrorMessage] = useState("")

  let handleChange = ({target: {name, value}}) => {
    setFormUser({...formUser, [name]: value})
  }

  let handleSubmit = async (e) => {
    try {
      e.preventDefault()

      if (!(formUser.email)) {
        setErrorMessage("Please enter the email") 
        return;
      }

      if (formUser.password.length < 8) {
        setErrorMessage("Password must be at least 8 characters") 
        return;
      }

      let response = await axios.post('http://localhost:4000/api/user/loginuser',
        formUser, 
        {withCredentials: true}
      )
        
      if (response.data.success) {
        document.cookie = `userlogintoken=${response.data.token}; path=/;`
        navigate('/userhome')
      } else {
        setErrorMessage(response.data.message)
      }
      console.log(response)
    } catch (err) {
      if (err.response) {
        console.error("Backend error:", err.response.data);
        setErrorMessage(err.response.data.message);
      } else {
        console.error("Network error:", err.message);
        setErrorMessage("A network error occurred. Please try again.");
      }
    }
  }

  return (
    <Box className="trust-login-container">
      
    <Paper elevation={3} className="trust-login-paper">
      <Typography variant="h4" className="trust-login-title">
        User Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          name='email'
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          value={formUser.email}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          margin="normal"
          variant="outlined"
          name='password'
          onChange={handleChange}
          value={formUser.password}
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
  
}

export default UserLogin
