import CloseIcon from '@mui/icons-material/Close';
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

    let mainContainer = {
            top: "110px",
            right: "20px",
         boxShadow: "2px 2px 5px 2px #000",
         position: "absolute",
         background: "#fff", 
         height: "300px",
         width: "300px",
         padding: "10px 10px",
         overflow: "auto",
         zIndex: 1}
  return (
    <div style={mainContainer}>
        <div style={{
            display: "flex",
              justifyContent: "space-between", 
              alignItems: "center", 
              padding: "10px 0",
              borderBottom: "2px solid gray",
              position: "static",
              top: "0",
            //   width: "100%",
              backgroundColor: '#fff'}}>
        <h2>Notifications</h2>
        <span 
        style={{fontSize: "22px", cursor: "pointer"}}
        onClick={()=>{setShowInbox(false)}}
        ><CloseIcon /></span>
        </div>
        {loading && <div style={{fontSize: "22px", fontWeight: "500", }}>Loading...</div>}
        <div>
            {!loading && notifications && notifications.length>0 && notifications.map(({acceptedTrustName, acceptedTrustPhoneNumber, acceptedBy, _id, veg, noOfPeople})=>(
                <div key={_id} style={{padding: "5px",borderRadius: "10px" , boxShadow: "0px 2px 5px gray", margin: "10px"}}>
                        <p><span  style={{color: "#4299e1"}}>Order id:</span> <span style={{fontSize: "14px"}}>{_id}</span></p>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <p style={{fontSize: "20px", color: "#4299e1", margin: "0px"}}>{veg ? "veg" : "non-veg"}</p>
                        <p style={{fontSize: "16px", color: "#4299e1"}}>No Of People: <span style={{color: "#000"}}>{noOfPeople}</span></p>
                    </div>
                        <p style={{color: "#4299e1"}}>Accepted by: <span style={{color: "#000"}}>{acceptedTrustName}</span></p>
                        <p style={{color: "#4299e1"}}>Trust Phone No: <span style={{color: "#000"}}>{acceptedTrustPhoneNumber}</span></p>
                </div>
            ))
        }
           {!loading && !notifications.length>0 && <div style={{fontSize: "22px", fontWeight: "500"}} >no notifications so far...</div>
        }  
    </div>
    </div>
  )
}

export default Inbox