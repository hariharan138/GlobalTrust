import React, { useEffect, useState } from 'react'
import { Plus, Minus, HandHeart, SendHorizontal, LogOut } from 'lucide-react'


import './User.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Users = () => {
  let naviagte = useNavigate()
  const [count, setCount] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isVeg, setIsVeg] = useState(true)
  const [trusts, setTrusts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const incrementCount = () => {
    setCount(prevCount => prevCount + quantity)
  }

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




  let searchTrust = async () => {
    // use placeholdrs when you wnat to give value to the field ${} and use `` instead of '' or ""
    // eg: http://localhost:4000/api/user/gettrust/:page/:limit //this api is for getting all the trusts from DB
    // to get all the trust just remove page and limit query parameter and make the searh as empty 
    // eg: http://localhost:4000/api/user/searchtrust?search=
    try {
      let { data } = await axios.get('http://localhost:4000/api/user/searchtrust?search=', {
        withCredentials: true
      })
      console.log(data)
      setTrusts(data.data)
      

    }
    catch (err) {
      console.error(err.response?.data?.message || 'Error fetching trusts');
    }

  }
  useEffect(() => {
    searchTrust(); // Fetch all trusts by default
  }, []);
  const handleSearch = async () => {
    try {
      let { data } = await axios.get(`http://localhost:4000/api/user/searchtrust?search=${searchQuery}`, {
        withCredentials: true,
      });
      setTrusts(data.data);
    } catch (err) {
      console.error(err.response?.data?.message || 'Error fetching trusts');
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
              <div className="card-value">10</div>
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
            <button className="increment-button" onClick={incrementCount}>
              Send Food Availability
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
    <ul className="trusts-list">
      {trusts.length > 0 ? (
        trusts.map((trust, index) => (
          <li key={index} className="trust-item">
            <img src={trust.image} alt={trust.name} className="trust-image" />
            <h3 className="trust-name">{trust.trustName}</h3>
            {/* Add a checkbox here */}
            <input 
              type="checkbox" 
              id={`trust-checkbox-${index}`} 
              className="trust-checkbox" 
            />
          </li>
        ))
      ) : (
        <p>No trusts available.</p>
      )}
    </ul>
  </div>
</div>

        </div>
      </main>


    </div>
  )
}

export default Users