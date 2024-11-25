import axios from 'axios'
import React, { createContext, useState } from 'react'

export const TrustContext = createContext()

const TrustProvider = (props) => {

    // const [getNoOfTrust, setGetNoOfTrust] = useState(0)
    // const [getNoOfTransactions, setGetNoOfTransactions] = useState(0)

    let getTotalTrust = async ()=>{
       try{
        let {data} = await axios.get('http://localhost:4000/api/admin/getnooftrusts', {
            withCredentials: true
        })
        console.log(data)

        let totalNoOfTrust = data?.data
        if(totalNoOfTrust){
            console.log(totalNoOfTrust)
            // setGetNoOfTransactions(totalNoOfTrust + 1)
        }
        return totalNoOfTrust
       }
       catch(err){
        console.log(err.response?.message)
        console.log(err.response?.data)
       }
    }

    let getTotalTransactions = async ()=>{
        try{
            let {data} = await axios.get('http://localhost:4000/api/admin/getnooftransactions', {
                withCredentials: true
            })
            console.log(data)
            let totalTransactions = data?.data
            return totalTransactions
        }
        catch(err){
            console.log(err.response?.data.msg)
            console.log(err.response?.data)
        }
    }

    let getTotalUser = async ()=>{
        try{
            let {data} = await axios.get('http://localhost:4000/api/admin/getnoofusers', {
                withCredentials: true
            })
            console.log(data)
            let totalTransactions = data?.data
            return totalTransactions
        }
        catch(err){
            console.log(err.response?.data.msg)
            console.log(err.response?.data)
        }
    }
    

    let value={getTotalTrust, getTotalUser, getTotalTransactions}
  return (
   <TrustContext.Provider value={value} >
        {props.children}
   </TrustContext.Provider>
  )
}

export default TrustProvider