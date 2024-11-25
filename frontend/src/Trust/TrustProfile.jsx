import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const TrustProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/trust/gettrustprofile', {
          withCredentials: true,
        });
        console.log(response.data.user);
        setProfile(response.data.user);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch trust profile. Please try again later.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  };

  const profileStyle = {
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '20px',
  };

  const headingStyle = {
    color: '#333',
    borderBottom: '2px solid #007bff',
    paddingBottom: '10px',
    marginBottom: '20px',
  };

  const infoStyle = {
    marginBottom: '10px',
  };

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <h1 style={headingStyle}>Trust Profile</h1>
        {loading ? (
          <p>Loading trust profile...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : profile ? (
          <div style={profileStyle}>
            <p style={infoStyle}>
              <strong>ID:</strong> {profile._id}
            </p>
            <p style={infoStyle}>
              <strong>Name:</strong> {profile.firstName} {profile.lastName}
            </p>
            <p style={infoStyle}>
              <strong>Email:</strong> {profile.email}
            </p>
            <p style={infoStyle}>
              <strong>Phone:</strong> {profile.phone}
            </p>
            <p style={infoStyle}>
              <strong>Address:</strong> {profile.address}
            </p>
            <p style={infoStyle}>
              <strong>Trust Name:</strong> {profile.trustName}
            </p>
            <p style={infoStyle}>
              <strong>Trust Phone:</strong> {profile.trustPhoneNumber}
            </p>
            <p style={infoStyle}>
              <strong>Created At:</strong> {new Date(profile.createdAt).toLocaleString()}
            </p>
            <p style={infoStyle}>
              <strong>Updated At:</strong> {new Date(profile.updatedAt).toLocaleString()}
            </p>
          </div>
        ) : (
          <p>No profile data available.</p>
        )}
      </div>
    </div>
  );
};

export default TrustProfile;
