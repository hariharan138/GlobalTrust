import React, { useContext, useEffect, useState } from 'react'
import {  Plus, Minus ,HandHeart,SendHorizontal,LogOut } from 'lucide-react'


import './User.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/UserProvider'

const Users = () => {
  let naviagte = useNavigate()

  let {getProfileData} = useContext(UserContext)

  const [profileData, setProfileData] = useState(null)

  // getting the profile data
  useEffect(()=>{
    getProfileData().then(res=>{
      setProfileData(res)
    })
  }, [])

  const [count, setCount] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isVeg, setIsVeg] = useState(true)
  
  const [totalTrust, setTotalTrust] = useState(null)
  const [totalTrustLoading, setTotalTrustLoading] = useState(false)
  
  // sample api below one is 
  const [totalTrustItems, setTotalTrustItems] = useState([])
  
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

  let handleLogout = async ()=>{
    try{
      let {data} = await axios.post('http://localhost:4000/api/user/logoutuser', {}, {
        withCredentials: true
      })
      if(data.msg){
        naviagte('/userlogin')
      }
    }
    catch(err){
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
          setTotalTrustLoading(false)
    }
  }
    catch(err){
      console.log(err.response?.data?.msg)
    }
  }

  useEffect(()=>{
    getTotalTrust()
  }, [])


  // delete this code below, no longer needed
//   useEffect(()=>{
//    async function getTotalTrust(){
//     try{
//       let {data} = await axios.get(`http://localhost:4000/api/user/gettrust/1/10`, {
//         withCredentials: true
//       })
// if(data?.data){
//   let finalData = data?.data
//   console.log(finalData)
//   setTotalTrustItems(finalData)
// }
//     }
//     catch(err){
//       console.log(err.response?.data?.msg)
//     }
//    }
//    getTotalTrust()
//   }, [])


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
      }
    }
    catch(err){
      console.log(err.response?.data?.msg)
      console.log(err)
    }
  }

  // let searchTrust = async  ()=>{
  //   // use placeholdrs when you wnat to give value to the field ${} and use `` instead of '' or ""
  //   // eg: http://localhost:4000/api/user/gettrust/:page/:limit //this api is for getting all the trusts from DB
  //   // to get all the trust just remove page and limit query parameter and make the searh as empty 
  //   // eg: http://localhost:4000/api/user/searchtrust?search=
  //   let {data} = await axios.get('http://localhost:4000/api/user/searchtrust?search=gokulTrust&page=1&limit=2', {
  //     withCredentials: true
  //   })
  // }

  

  return (
    <div className="dashboard">

      <header className="dashboard-header">
        <h1>User Dashboard</h1>
        <div className="header-actions">
          <input type="search" placeholder="Search Trust..." className="search-input" />
          <button className="incrementx-button" onClick={handleLogout}>Logout<LogOut className="button-icon"  /></button>
        </div>
      </header>
          
     <div style={{display: 'flex'}}>
     <main className="dashboard-content">
        <div className="card-grid">
          <div className="card">
            <div className="card-header">
              <h2>Total Trust</h2>
              <HandHeart className="card-icon" />
              
            </div>
            <div className="card-content">
              <div className="card-value">{totalTrustLoading ?
              <div style={{fontSize: "16px"}}>loading</div>
              : totalTrust}</div>
              <p className="card-subtext">Active Trust in the system</p>
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
            <button className="increment-button"
             onClick={createFoodOrder}>
              {/* <Plus className="button-icon" /> */}
              Send Food Availablity
              <SendHorizontal className="button-icon" />
            </button>
          </div>
        </div>
      </main>

      <section className='render-items'>
        <div>
              {totalTrustItems.length>0 && totalTrustItems.map(ele=>(
                <div key={ele._id} style={{border: "2px solid black",  margin: "2px"}}>
                  <p>{ele.trustEmail}</p>
                  <p>
                    <input 
                   disabled={ selectedTrust.length === 4 && !selectedTrust.includes(ele._id)}
                    type="checkbox" 
                    onChange={(e)=> handleSelectTrust(ele._id, e)}/>
                  </p>
                  {/* <p>{ele.trustName}</p>
                  <p>{ele.address}</p> */}
                  </div>
              ))}
        </div>
      </section>
     </div>
      
    </div>
  )
}

export default Users