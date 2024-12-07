import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Button, TextField, Paper, Typography, Grid, Card, CardContent, Avatar, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PeopleIcon from '@mui/icons-material/People';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const UserCard = ({ user }) => {
  return (
    <Card elevation={3}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={user?.image?.url !== "N/A" ? user?.image?.url : "/placeholder.svg"}
          alt={user.name}
          sx={{ width: 60, height: 60 }}
        />
        <div>
          <Typography variant="h6">{user.Name}</Typography>
          <Typography variant="body2" color="text.secondary">
            <EmailIcon fontSize="small" sx={{ mr: 1 }} />
            {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
            {user.phone}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

const InboxMessage = ({ message, onAccept }) => {
  return (
    <Card elevation={2} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle1">
          <PeopleIcon fontSize="small" sx={{ mr: 1 }} />
          {message.senderName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
          {message.senderPhoneNumber}
        </Typography>
        <Typography variant="body2">
          <PeopleIcon fontSize="small" sx={{ mr: 1 }} />
          No. of People: {message.noOfPeople}
        </Typography>
        <Typography variant="body2">
          <RestaurantIcon fontSize="small" sx={{ mr: 1 }} />
          {message.veg ? "Vegetarian" : "Non-Vegetarian"}
        </Typography>
        <Typography variant="body2">
          <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
          {message.address}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="small" 
          onClick={() => onAccept(message._id)}
          sx={{ mt: 1 }}
        >
          Accept
        </Button>
      </CardContent>
    </Card>
  );
};

const Trust = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inboxMessages, setInboxMessages] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  const dataLimitPerPage = 10;

  const handlePageNo = (action) => {
    if (action === "prev" && pageNo > 1) {
      setPageNo((p) => p - 1);
    }
    if (action === "next") {
      setPageNo((p) => p + 1);
    }
  };

  const getRegisteredOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:4000/api/trust/getfoodorder`, {
        withCredentials: true
      });
      if (data?.data.length > 0) {
        setInboxMessages(data.data);
      }
    } catch (err) {
      console.log(err.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRegisteredOrders();
  }, []);

  const searchUser = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/trust/searchuser?search=${searchTerm}&page=${pageNo}`,
        { withCredentials: true }
      );
      setUsers(data?.data);
      setHasNext(data?.data.length < dataLimitPerPage);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchUser();
  }, [pageNo]);

  const acceptOrder = async (id) => {
    try {
      const { data } = await axios.post(`http://localhost:4000/api/trust/acceptfoodorder/${id}`, {}, {
        withCredentials: true
      });
      if (data?.data) {
        setInboxMessages(inboxMessages.filter(msg => msg._id !== data.data._id));
      }
    } catch (err) {
      console.log(err.response?.data?.msg);
    }
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar />
      <Paper elevation={0} sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to Trust Page
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search users Transaction ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={searchUser}>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Paper>

            {loading && <Typography align="center">Loading...</Typography>}
            {!loading && error && <Typography color="error" align="center">{error}</Typography>}

            <Grid container spacing={2}>
              {!loading && !error && users.length > 0 && users.map((user, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <UserCard user={user} />
                </Grid>
              ))}
            </Grid>

            {!loading && !error && users.length === 0 && (
              <Typography align="center" color="text.secondary" sx={{ mt: 2 }}>
                No users found. Try a different search term.
              </Typography>
            )}

            <Paper elevation={3} sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2, p: 1 }}>
              <Button
                variant="contained"
                startIcon={<ArrowBackIosIcon />}
                onClick={() => handlePageNo('prev')}
                disabled={pageNo < 2}
              >
                Prev
              </Button>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}
                onClick={() => handlePageNo("next")}
                disabled={hasNext}
              >
                Next
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Inbox</Typography>
              {inboxMessages.map((message) => (
                <InboxMessage key={message._id} message={message} onAccept={acceptOrder} />
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Trust;

