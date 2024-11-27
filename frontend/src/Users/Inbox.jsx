import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Inbox = ({setShowInbox}) => {

    
    let [notifications, setNotifications] = useState([])
    let [loading, setLoading] = useState(false)
    
    let getNotification = async()=>{
        setLoading(true)
        try{
            let {data} = await axios.get('http://localhost:4000/api/user/getnotification', {
                withCredentials: true
            })
    
            let finalData = data?.data
            if(finalData){
                setNotifications(finalData)
                setLoading(false)
                
            }
    }
        catch(err){
            console.log(err.response?.data?.msg)
        }
    }

    useEffect(()=>{
        getNotification()
    }, [])
    console.log(notifications)
    // if(loading) return <div style={{fontSize: "22px", fontWeight: "500", }}>Loading...</div>

    let mainContainer = {
            top: "110px",
            right: "20px",
         boxShadow: "2px 2px 5px 10px #000",
         position: "absolute",
         background: "#fff", 
         zIndex: 1}
  return (
    <div style={mainContainer}>
        <div style={{display: "flex",
             border: "2px solid red", justifyContent: "space-between", alignItems: "center", padding: "0 20px"}}>
        <h2>Notifications</h2>
        <span 
        style={{fontSize: "22px", cursor: "pointer"}}
        onClick={()=>{setShowInbox(false)}}
        >X</span>
        </div>
        {loading && <div style={{fontSize: "22px", fontWeight: "500", }}>Loading...</div>}
        <div>
            {notifications && notifications.length>0 ? notifications.map(({acceptedTrustName, acceptedBy, _id})=>(
                <div key={_id}>
                    <p>your order for {_id} is accepted by {acceptedTrustName}</p>
                </div>
            ))
            : 
            <div style={{fontSize: "22px", fontWeight: "500"}} >no notifications so far...</div>
            }
    </div>
    </div>
  )
}

export default Inbox