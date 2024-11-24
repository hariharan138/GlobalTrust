import React from 'react'

const DisplaygetData = ({_id, Name, email, address, phone, image}) => {
  return (
    <div className="card">
                                        <div className="card-header">
                                            <h3>{Name}</h3>
                                        </div>

                                        <div className="card-content">
                                            <div className="card-value"></div>
                                            <p className="card-subtext">{phone}</p>
                                        </div>


                                    </div>
  )
}

export default DisplaygetData