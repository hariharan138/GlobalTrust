import React from 'react'

const Trust = () => {

  let s = "http://localhost:4000/api/trust/searchuser?search="

  let searchUser = async  ()=>{
    // use placeholdrs when you wnat to give value to the field ${} and use `` instead of '' or ""
    // http://localhost:4000/api/trust/getusers/:page/:limit // this api is to get all the users in DB first params is for page second is for limit
    // in blow api to get all the user just remove page and limit query parameter and make the searh as empty 
    // eg: http://localhost:4000/api/trust/searchuser?search=
    // the above one give all the result
    let {data} = await axios.get(`http://localhost:4000/api/trust/searchuser?search=Ram&page=1&limit=2`, {
      withCredentials: true
    })
  }
  return (
    <div>
        <h1>      welcome to trust Page</h1>
    </div>
  )
}

export default Trust
