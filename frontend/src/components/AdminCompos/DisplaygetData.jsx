import React from 'react'

const DisplaygetData = ({_id, Name, email, address, phone, image}) => {
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
                                        </div>


                                    </div>
  )
}

export default DisplaygetData