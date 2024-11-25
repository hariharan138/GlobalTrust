import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const UserCard = ({ user }) => {
  const userCardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  };

  const avatarStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '15px',
    '@media (max-width: 600px)': {
      marginRight: '0',
      marginBottom: '10px',
    },
  };

  const userInfoStyle = {
    flex: '1',
  };

  const nameStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0',
  };

  const emailStyle = {
    fontSize: '14px',
    color: '#666',
    margin: '5px 0 0',
  };

  return (
    <div style={userCardStyle}>
      <img
        src={user.avatar || '/placeholder.svg?height=50&width=50'}
        alt={user.name}
        style={avatarStyle}
      />
      <div style={userInfoStyle}>
        <h2 style={nameStyle}>{user.name}</h2>
        <p style={emailStyle}>{user.email}</p>
      </div>
    </div>
  );
};

const Inbox = ({ messages }) => {
  const inboxMessageStyle = {
    borderBottom: '1px solid #eee',
    padding: '10px 0',
  };

  const inboxSubjectStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const inboxSenderStyle = {
    color: '#666',
    fontSize: '14px',
  };

  return (
    <>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>Inbox</h2>
      {messages.map((message) => (
        <div key={message.id} style={inboxMessageStyle}>
          <div style={inboxSubjectStyle}>{message.subject}</div>
          <div style={inboxSenderStyle}>From: {message.sender}</div>
          <p>{message.content}</p>
        </div>
      ))}
    </>
  );
};

const Trust = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inboxMessages, setInboxMessages] = useState([
    { id: 1, sender: 'John Doe', subject: 'Welcome!', content: 'Welcome to our platform.' },
    { id: 2, sender: 'Jane Smith', subject: 'New features', content: 'Check out our latest updates.' },
    { id: 3, sender: 'Admin', subject: 'Important notice', content: 'Please update your profile.' },
  ]);

  const searchUser = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/trust/searchuser`,
        { params: { search: searchTerm }, withCredentials: true }
      );
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Implement logout functionality here
    console.log('Logout clicked');
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const flexContainerStyle = {
    display: 'flex',
    gap: '20px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  };

  const searchContainerStyle = {
    flex: '2',
  };

  const inboxContainerStyle = {
    flex: '1',
    borderLeft: '1px solid #ccc',
    paddingLeft: '20px',
    '@media (max-width: 768px)': {
      borderLeft: 'none',
      paddingLeft: '0',
    },
  };

  const inputStyle = {
    width: '65%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
  };

  const userGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <div style={containerStyle}>
        <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>Welcome to Trust Page</h1>

        <div style={flexContainerStyle}>
          <div style={searchContainerStyle}>
            <div>
              <input
                type="text"
                placeholder="Search users Transaction ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={inputStyle}
              />
              <button onClick={searchUser} style={buttonStyle}>Search</button>
            </div>

            <div style={userGridStyle}>
              {loading && <p>Loading...</p>}
              {users.map((user, index) => (
                <UserCard key={index} user={user} />
              ))}
              {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
              {!loading && users.length === 0 && !error && (
                <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
                  No users found. Try a different search term.
                </p>
              )}
            </div>
          </div>

          <div style={inboxContainerStyle}>
            <Inbox messages={inboxMessages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trust;

