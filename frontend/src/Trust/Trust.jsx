// import axios from 'axios'
// import React from 'react'
// import Navbar from './Navbar'

// const Trust = () => {


//   let searchUser = async  ()=>{
//     // use placeholdrs when you wnat to give value to the field ${} and use `` instead of '' or ""
//     // http://localhost:4000/api/trust/getusers/:page/:limit // this api is to get all the users in DB first params is for page second is for limit
//     // in blow api to get all the user just remove page and limit query parameter and make the searh as empty 
//     // eg: http://localhost:4000/api/trust/searchuser?search=
//     // the above one give all the result
//     let {data} = await axios.get(`http://localhost:4000/api/trust/searchuser?search=Ram&page=1&limit=2`, {
//       withCredentials: true
//     })
//   }
//   return (
//     <div>
//       <Navbar />
//         <h1>      welcome to trust Page</h1>
//     </div>
//   )
// }

// export default Trust


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Button } from '@mui/material';

const UserCard = ({ user }) => {
  const userCardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  };

  const avatarStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '15px',
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
        src={user.avatar || '/placeholder.svg'}
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

const Inbox = ({ inboxMessages , setInboxMessages}) => {


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

  
  let acceptOrder = async (id)=>{
    // console.log(id)
   try{
    let {data} = await axios.post(`http://localhost:4000/api/trust/acceptfoodorder/${id}`, {} ,{
      withCredentials: true
  })

  let finalData = data?.data
  if(finalData){
     let remainingMessages = inboxMessages.filter(({_id})=> _id != finalData._id )
      setInboxMessages(remainingMessages)
  }
   }
   catch(err){
      console.log(err.response?.data?.msg)
   }
  }

  return (
    <>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>Inbox</h2>
      {inboxMessages.map(({_id, fromUserId, noOfPeople, veg, address, createdAt}) => (
        <div key={_id} style={inboxMessageStyle}>
          <div style={inboxSubjectStyle}>{veg ? "Veg" : "Non-Veg"}</div>
          <div style={inboxSenderStyle}>Address: {address}</div>
          {/* <p>{address}</p> */}
            <Button 
            variant='contained'
             sx={{width: "30px", fontSize: "12px"}}
             onClick={()=> acceptOrder(_id)}
            >Accept</Button>
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
  const [inboxMessages, setInboxMessages] = useState([]);

  let getRegisteredOrders = async ()=>{
    // with pagination http://localhost:4000/api/trust/getfoodorder?limit=2&page=1
    setLoading(true)
   try{
    let {data} = await axios.get(`http://localhost:4000/api/trust/getfoodorder`, {
      withCredentials: true
    })
    
    let finalData = data?.data
    if(finalData.length>0){
      console.log(finalData)
      setInboxMessages(finalData)
    }
   }
   catch(err){
    console.log(err.response?.data?.msg)
   }
   finally{
    setLoading(false)
   }
  }

  useEffect(()=>{
    getRegisteredOrders()
    // console.log(inboxMessages)
  }, [])

  const searchUser = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/trust/searchuser?search=${searchTerm}`,
        {  withCredentials: true }
      );
      setUsers(data?.data);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
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
    flexWrap: 'wrap',
  };

  const searchContainerStyle = {
    flex: '2',
  };

  const inboxContainerStyle = {
    flex: '1',
    borderLeft: '1px solid #ccc',
    paddingLeft: '20px',
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

  useEffect(()=>{
    searchUser()
  }, [])

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
          Welcome to Trust Page
        </h1>

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
              <button onClick={searchUser} style={buttonStyle}>
                Search
              </button>
            </div>

            <div style={userGridStyle}>
              {loading && <p>Loading...</p>}
              {!loading && users.length && users.length>0 && users.map((user, index) => (
                <UserCard key={index} user={user}  />
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
            <Inbox inboxMessages={inboxMessages} setInboxMessages={setInboxMessages}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trust;
