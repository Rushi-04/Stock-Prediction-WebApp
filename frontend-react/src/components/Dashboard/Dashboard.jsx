import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import axiosInstance from '../../axiosInstance'

const Dashboard = () => {
    
    useEffect(() => {

      const fetchProtectedData = async () => {
        try{
            const response = await axiosInstance.get('/protected-view');
            console.log("Success", response.data)
        }catch(error){
            console.error("Error Ocuured", error)
        }
      }
      fetchProtectedData();

    }, [])
    

  return (
    <div className='text-center m-3 p-2'>Dashboard</div>
  )
}

export default Dashboard