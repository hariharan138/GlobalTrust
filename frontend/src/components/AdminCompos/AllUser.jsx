import React, { useEffect, useState } from 'react'

import { Bell, ChevronDown, Home, LayoutDashboard, HandHeart, LogOut, Menu, Settings, User } from 'lucide-react'
import './Dash.css';
import { useNavigate } from 'react-router-dom';
import DisplaygetData from './DisplaygetData';
import useGetAdm from './CustomHooks/useGetAdm';
import InputSearch from './InputSearch';
import axios from 'axios';


const AllUser = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    let navigate = useNavigate()

    const [searchValue, setSearchValue] = useState("")
    const [searchFinal, setSearchFinal] = useState("")
    const [searchedResult, setSearchedResult] = useState([])

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    let [apidata, setApidata] = useGetAdm(`http://localhost:4000/api/admin/getusers/1/10`)
    // console.log(apidata)

    let handleSearch = ()=>{
        setSearchFinal(searchValue)
    }

    let getSearchValue = async ()=>{
        try{
            setLoading(true)
            // console.log("ente")
            let {data} = await axios.get(`http://localhost:4000/api/admin/searchuser?search=${searchFinal}`,  {
                withCredentials: true
            })
            console.log(data)
            if(data && data?.data && data.data.length>0){
                setSearchedResult(data?.data)
                setLoading(false)
            }
            else{
                setErrorMessage(data?.data?.msg)
                setLoading(false)
            }
        }
        catch(err){
            // console.log(err.message)
        console.log(err.response.data.message)
        }
    }

    useEffect(()=>{
       if(searchFinal){
        getSearchValue()
       }
       else{
        setSearchedResult([])
       }
    }, [searchFinal])

    useEffect(()=>{
       if(!searchFinal){
            setSearchedResult(apidata)
       }
    }, [searchFinal, apidata])
   
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
                    <InputSearch searchValue={searchValue} setSearchValue={setSearchValue} />

                    <button onClick={handleSearch}>search</button>

                        <button className="icon-button">
                            <Bell />
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="dashboard-content">
                    <div className="card-grid">

                    {loading && <div>Loading Please wait</div>}
                    {errorMessage && <div>{errorMessage}</div>}

                    {!loading && !errorMessage && searchedResult.length>0 && searchedResult.map(({Name, _id, email, address, phone, image, role}) => {
                            return (
                                
                           
                                   <DisplaygetData setSearchedResult={setSearchedResult} searchedResult={searchedResult}  key={_id} _id={_id} Name={Name} email={email} address={address} role={role} image={image} phone={phone} />

                                
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