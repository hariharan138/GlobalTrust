import React, { useContext, useEffect, useState } from 'react'
import {  Plus, Minus ,HandHeart,SendHorizontal,LogOut } from 'lucide-react'


import './User.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/UserProvider'
import Inbox from './Inbox'

const Users = () => {
  let naviagte = useNavigate()

  let {getProfileData} = useContext(UserContext)

  const [profileData, setProfileData] = useState(null)
  const [trusts, setTrusts] = useState([])

  // getting the profile data
  useEffect(()=>{
    getProfileData().then(res=>{
      setProfileData(res)
    })
  }, [])

  // const [count, setCount] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isVeg, setIsVeg] = useState(true)
  const [totalTrust, setTotalTrust] = useState(null)
  const [totalTrustLoading, setTotalTrustLoading] = useState(false)
  const [showInbox, setShowInbox] = useState(false)
  
  const [loading, setLoading] = useState(false)
  
  const [selectedTrust, setSelectedTrust] = useState([])
  const [createFoodDetail, setCreateFoodDetail] = useState({
    fromUserId: "",
    noOfPeople: 1,
    veg: true,
    preferred: [],
  })
  const [successfullCreated, setSuccessfullCreated] = useState(false)

  useEffect(()=>{
    // console.log(profileData)
    setCreateFoodDetail({...createFoodDetail, 
      fromUserId: profileData?._id,
      noOfPeople: quantity,
      veg: isVeg,
      preferred: selectedTrust
    })
  }, [profileData, selectedTrust, quantity, isVeg])

  const [searchQuery, setSearchQuery] = useState('')
  // const incrementCount = () => {
  //   setCount(prevCount => prevCount + quantity)
  // }

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10)
    setQuantity(isNaN(value) ? 0 : value)
  }

  const toggleVeg = () => {
    setIsVeg(prev => !prev)
  }

  let handleLogout = async () => {
    try {
      let { data } = await axios.post('http://localhost:4000/api/user/logoutuser', {}, {
        withCredentials: true
      })
      if (data.msg) {
        naviagte('/userlogin')
      }
    }
    catch (err) {
      console.log(err?.response.data.message)
      console.log(err?.data?.msg)
    }
  }

  // this function is to get the total trust present in the database
  let getTotalTrust = async ()=>{
    setTotalTrustLoading(true)
    try{
       let {data} = await axios.get(`http://localhost:4000/api/user/gettrust/1/10`, {
          withCredentials: true
        })

        if(data?.data){
          setTotalTrust(data?.data.length)
    }
  }
    catch(err){
      console.log(err.response?.data?.msg)
    }
    finally{
      setTotalTrustLoading(false)
    }
  }
 

  useEffect(()=>{
    getTotalTrust()
  }, [])


  let handleSelectTrust = (id, {target: {checked}})=>{
    if(!selectedTrust.includes(id) && checked && selectedTrust.length<5){
      setSelectedTrust((prev)=> [...prev, id])
    }
    else if(selectedTrust.includes(id) && !checked){
      let removePreferedTrust = selectedTrust.filter(ele=> ele != id)
      setSelectedTrust(removePreferedTrust)
    }
  }

  let createFoodOrder = async ()=>{
    try{
      let {data} = await axios.post('http://localhost:4000/api/user/foodRegister',
          createFoodDetail,    
      {
        withCredentials: true
      })
        // console.log(data?.data)
      if(data?.data){
        let resp = data?.data
        let foodstatus = data?.msg
        console.log(resp)
        setSuccessfullCreated(foodstatus=="food created" ? true : false)
        setTimeout(() => {
          setSuccessfullCreated(false)
        }, 2000);
      }
    }
    catch(err){
      console.log(err.response?.data?.msg)
      console.log(err)
    }
    finally{
      setCreateFoodDetail({...createFoodDetail, preferred: [], noOfPeople: 0})
    }
  }

  let getTrust = async  ()=>{
    try{
  setLoading(true)
  let { data } = await axios.get('http://localhost:4000/api/user/searchtrust?search=', {
    withCredentials: true
  })
  // console.log(data)
  if(data?.data){
      setTrusts(data?.data)
      setLoading(false)
  } 
}
catch (err) {
  console.error(err.response?.data?.message || 'Error fetching trusts');
}
finally{
  setLoading(false)
}

  }


useEffect(() => {
  getTrust(); // Fetch all trusts by default
}, []);
  
const [searchError, setSearchError] = useState("")
const handleSearch = async () => {
  try {
    setLoading(true)
    let { data } = await axios.get(`http://localhost:4000/api/user/searchtrust?search=${searchQuery}`, {
      withCredentials: true,
    });
     if(data?.data){
       setSearchError("")
         setTrusts(data?.data)
     } 
  } catch (err) {
    console.log(err)
    if(err){
      setSearchError(err.response?.data?.message )
    }
    console.log(err.response?.data?.message || 'Error fetching trusts');
  }
  finally{
    setLoading(false)
  }
};
  

  return (
    <div className="dashboard">

      <header className="dashboard-header">
        <h1>User Dashboard</h1>
        <div className="header-actions">
        <input
  type="search"
  placeholder="Search Trust..."
  className="search-input"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') handleSearch();
  }}
/>
<button className="incrementx-button" onClick={handleSearch}>
  Search
</button>
    {!showInbox ? <button onClick={()=> setShowInbox(true)}>inbox</button>: <Inbox setShowInbox={setShowInbox}/>}
<button className="incrementx-button" onClick={handleLogout}>Logout<LogOut className="button-icon"  /></button>
        </div>
      </header>
          
      <main className="dashboard-content">
        <div className="card-container">
          {/* Total Trust Card */}
          <div className="card">
            <div className="card-header">
              <h2>Total Trust</h2>
              <HandHeart className="card-icon" />
            </div>
            <div className="card-content">
              <div className="card-value">{totalTrustLoading ?
              <div style={{fontSize: "16px"}}>loading</div>
              : totalTrust}</div>
              {/* <p className="card-subtext">Active Trust in the system</p> */}
              <p className='card-subtext'>{successfullCreated ? "food order created" : null}</p>
            </div>
            <div className="quantity-control">
              <label htmlFor="quantity" className="quantity-label">Quantity:</label>
              <div className="quantity-input-wrapper">
                <button className="quantity-button" onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>
                  <Minus className="button-icon" />
                </button>
                <input
                  type="number"
                  id="quantity"
                  className="quantity-input"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                />
                <button className="quantity-button" onClick={() => setQuantity(prev => prev + 1)}>
                  <Plus className="button-icon" />
                </button>
              </div>
            </div>
            <div className="toggle-control">
              <label htmlFor="veg-toggle" className="toggle-label">
                {isVeg ? 'Veg' : 'Non-veg'}
                <div className={`toggle-switch ${isVeg ? 'veg' : 'non-veg'}`} onClick={toggleVeg}>
                  <input
                    type="checkbox"
                    id="veg-toggle"
                    checked={isVeg}
                    onChange={toggleVeg}
                    className="toggle-input"
                  />
                  <button className="toggle-slider">Switch</button>
                </div>
              </label>
            </div>
            <button className="increment-button" onClick={createFoodOrder}>
              {/* <Plus className="button-icon" /> */}
              Send Food Availablity
              <SendHorizontal className="button-icon" />
            </button>
          </div>

         {/* All Trusts Card */}
<div className="card2">
  <div className="card-header">
    <h2>All Trusts</h2>
    <HandHeart className="card-icon" />
  </div>
  <div className="card-content">
{loading && <div style={{fontSize: "20px", textAlign: "center"}}>Loading..</div>}
{!loading && searchError && <div style={{fontSize: "20px", textAlign: "center"}}>{searchError}</div>}
 {!loading && !searchError && <ul className="trusts-list">
  {trusts.length > 0 && (
    trusts.map((trust, index) => (
      <li key={index} className="trust-item">
        <img src={trust.image} alt={trust.name} className="trust-image" />
        <h3 className="trust-name">{trust.trustName}</h3>
        {/* Add a checkbox here */}
        <input 
          type="checkbox" 
          id={`trust-checkbox-${index}`} 
          className="trust-checkbox" 
          disabled={selectedTrust.length>3 && !selectedTrust.includes(trust._id)}
          onChange={(e)=> handleSelectTrust(trust._id, e)}
        />
      </li>
    ))
  )}
</ul> }
          </div>
</div>

        </div>
      </main>
      
    </div>
  )
}

export default Users