import React, { useState } from 'react'
import {  Plus, Minus ,HandHeart,SendHorizontal,LogOut } from 'lucide-react'


import './User.css'

const Users = () => {
  const [count, setCount] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isVeg, setIsVeg] = useState(true)

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

  return (
    <div className="dashboard">

      <header className="dashboard-header">
        <h1>User Dashboard</h1>
        <div className="header-actions">
          <input type="search" placeholder="Search Trust..." className="search-input" />
          <button className="incrementx-button">Logout<LogOut className="button-icon"  /></button>
        </div>
      </header>
          
      <main className="dashboard-content">
        <div className="card-grid">
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
              {/* <Plus className="button-icon" /> */}
              Send Food Availablity
              <SendHorizontal className="button-icon" />
            </button>
          </div>
        </div>
      </main>
      
    </div>
  )
}

export default Users