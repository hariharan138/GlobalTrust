import React, { useState } from 'react'
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';


const DisplaygetData = ({ _id, Name, email, address, phone, image, role, searchedResult, setSearchedResult}) => {

  const [userDeleted, setUserDeleted] = useState(null)
  const [deleteErrorMsg, setDeleteErrorMsg] = useState(null)
// dummy data userDeleted={
  // email: "lasjd@gmail.com",
  // role: "trsut"}
 let deleteUser = async (userRole, id)=>{
  // console.log(userRole)
  // console.log(id) 
  try{
    let {data} = await axios.delete(`http://localhost:4000/api/admin/delete/${userRole}/${id}`, {
      withCredentials: true
    })
    console.log(data)
    if(data?.data){
      setDeleteErrorMsg(null)
      setUserDeleted(data?.data)
      setSearchedResult(searchedResult.filter(ele=> ele._id != data?.data._id))
    }
  }
catch(err){
  console.log(err.response?.data?.message)
}
finally{
  // console.log(userDeleted)
}
  

  
 }

  return (
    <div className="card" key={_id}>

                                        <div className="card-header">
                                            <img src={image.url!="N/A" ? image.url: "https://th.bing.com/th/id/OIP.5uW6Y-lSAO-logZJQosljAHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.6&pid=1.7"} alt="" style={{width: "100px", height: "100px"}}/>
                                            <h3>{Name}</h3>
                                        </div>

                                        <div className="card-content">
                                            <div className="card-value" style={{fontSize: "16px"}}>{address}</div>
                                            <div className="card-value" style={{fontSize: "16px"}}>{email}</div>
                                            <div className="card-value" style={{fontSize: "16px"}}>{phone}</div>
                                            <p className="card-subtext">{phone}</p>
                                            <IconButton 
                                            aria-label="delete"
                                            color='warning'
                                            style={{fontSize: "20px", height: "35px", backgroundColor: "#cc9d70"}}
                                            onClick={()=> deleteUser(role, _id)}
                                            ><DeleteIcon /></IconButton>
                                            
                                            
                                        </div>


                                    </div>
  )
}

export default DisplaygetData