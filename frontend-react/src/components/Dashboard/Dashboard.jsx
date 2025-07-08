import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'

const Dashboard = () => {
  const [ticker, setTicker] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

  }
    
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
    <div className="h-[40rem] w-full bg-gray-950 relative flex flex-col items-center justify-center antialiased overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-black opacity-40 animate-pulse"></div>

      <div className="max-w-2xl mx-auto p-4 z-10">
        <h1 className="text-4xl md:text-6xl text-white text-center font-bold">
          Predict Your Next Stock Here
        </h1>
        <p className="text-gray-300 max-w-lg mx-auto my-4 text-sm text-center">
          Enter a valid stock ticker (e.g., <code className="text-white font-mono">AAPL</code>, <code className="text-white font-mono">TSLA</code>, <code className="text-white font-mono">MSFT</code>) to generate AI-based predictions and insights.
        </p>
        <form onSubmit={handleSubmit} className=''>
            <input
            type="text"
            placeholder="Enter Stock Ticker (e.g., AAPL)"
            className="w-full px-4 py-3 mt-4 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase tracking-wide font-medium"
            onChange={(e)=> setTicker(e.target.value)}
          />
          <button type="submit" className='bg-white  text-black text-md font-medium p-2 m-3 rounded-xl cursor-pointer text-center flex justify-center items-center hover:ring-2 hover: ring-red-500 '>See Prediction</button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard