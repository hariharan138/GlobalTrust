import React, { useState } from 'react'

import { Bell, ChevronDown, Home, LayoutDashboard, HandHeart, LogOut, Menu, Settings, User } from 'lucide-react'
import './Dash.css';
import { useNavigate } from 'react-router-dom';


const AllUser = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    let [apidata, setapidata] = useState([])
    let navigate = useNavigate()

    let apiFetch = async () => {
        let api = await fetch("https://fakestoreapi.com/products")
        let data = await api.json()
        console.log(data)
        setapidata(data)
    }
    apiFetch()


    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Dashboard</h2>
                    <button className="icon-button mobile-only" onClick={() => setSidebarOpen(false)}>
                        <ChevronDown />
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <button className="nav-button" onClick={() => navigate("/Home")}><Home /> Home</button>
                    <button className="nav-button" onClick={() => navigate("/alluser")}><LayoutDashboard />User</button>
                    <button className="nav-button" onClick={() => navigate("/alltrust")}><HandHeart />Trust</button>
                    <button className="nav-button"><User /> Profile</button>
                    <button className="nav-button" onClick={() => navigate("/set")}><Settings /> Settings</button>
                    <button className="nav-button logout"><LogOut /> Logout</button>
                </nav>
            </aside>



            {/* Main Content */}
            <div className="main-content">
                {/* Header */}
                <header className="header">
                    <button className="icon-button mobile-only" onClick={() => setSidebarOpen(true)}>
                        <Menu />
                    </button>
                    <h1>All Users</h1>
                    <div className="header-actions">
                        <input type="search" placeholder="Search..." className="search-input" />
                        <button className="icon-button">
                            <Bell />
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="dashboard-content">
                    <div className="card-grid">

                        {apidata.map((data) => {
                            return (
                                <>
                                    <div className="card">
                                        <div className="card-header">
                                            <h3>{data.title}</h3>
                                        </div>

                                        <div className="card-content">
                                            <div className="card-value"></div>
                                            <p className="card-subtext">{data.title}</p>
                                        </div>


                                    </div>


                                </>
                            )
                        })
                        }



                    </div>

                </main>
            </div>
        </div>
    )
}

export default AllUser;