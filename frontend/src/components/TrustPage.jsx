import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  Grid,
  Alert,
} from '@mui/material';

function TrustPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    trustName: '',
    trustId: '',
    trustEmail: '',
    address: '',
    trustPhoneNumber: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    if (errorMessage) setErrorMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      setIsSubmitting(false);
      return;
    }

    if (formData.phone.length !== 10 || formData.trustPhoneNumber.length !== 10) {
      setErrorMessage('Phone numbers must be 10 digits long.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/trust/addtrust', formData);
      setSuccessMessage(response.data.message || 'Registration successful!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        trustName: '',
        trustId: '',
        trustEmail: '',
        address: '',
        trustPhoneNumber: '',
      });
      setTimeout(() => navigate('/trustlogin'), 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Something went wrong!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Trust Registration
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/contact')}>Contact Us</Button>
          <Button color="inherit" onClick={() => navigate('/trustlogin')}>Login</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 2,
      }}>
        <Paper elevation={3} sx={{ padding: 4, width: '85%', maxWidth: 800 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Trust Registration Form
          </Typography>

          {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}
          {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  required
                  inputProps={{ maxLength: 10 }}
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
                  name="trustEmail"
                  value={formData.trustEmail}
                  onChange={handleChange}
                  fullWidth
                  label="Trust Email"
                  type="email"
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
                  inputProps={{ maxLength: 10 }}
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
                <Box display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      padding: 1.5,
                      backgroundColor: '#1976d2',
                      width: '25%',
                      borderRadius: 2,
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Register'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
}

export default TrustPage;

