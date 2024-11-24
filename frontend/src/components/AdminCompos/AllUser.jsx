import React, { useEffect, useState } from 'react'

import { Bell, ChevronDown, Home, LayoutDashboard, HandHeart, LogOut, Menu, Settings, User } from 'lucide-react'
import './Dash.css';
import { useNavigate } from 'react-router-dom';
import DisplaygetData from './DisplaygetData';
import useGetAdm from './CustomHooks/useGetAdm';


const AllUser = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    let [apidata, setApidata] = useGetAdm(`http://localhost:4000/api/admin/getusers/1/10`)

    let navigate = useNavigate()

    console.log(apidata)

   


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

                    {apidata.length>0 && apidata.map(({Name, _id, email, address, phone, image}) => {
                            return (
                                <>
                                   
                                   <DisplaygetData  key={_id} _id={_id} Name={Name} email={email} address={address} image={image} phone={phone} />

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