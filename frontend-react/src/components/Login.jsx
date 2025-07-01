import React, { use, useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { Sparkles, UserPlus, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const Navigate = useNavigate()
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)


  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const userData = { username, password }
    // console.log('UserData==>', userData)

    try{
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData)
      // console.log(response.data)
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      setSuccess(true)
      setError('')
      Navigate('/dashboard')
      setIsLoggedIn(true)
      console.log("Login Successfull !")
    }catch(error){
      setError("Invalid Credentials")
      console.error("Invalid Credentials")
    }finally{
      setLoading(false)
    }

  }


  return (
    <section className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Left Visual Panel */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-600 to-green-500 text-white relative overflow-hidden">
        <motion.div
          className="absolute text-2xl font-semibold flex items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="h-6 w-6" />
          Build Your Financial Future
        </motion.div>
      </div>


      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 px-8 py-12 flex flex-col justify-center items-center">
        <div className="max-w-md w-full">
          <motion.h2
            className="text-3xl font-bold mb-4 text-gray-900 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Login to your account
          </motion.h2>

          <p className="text-center text-gray-600 mb-8">
            start getting smart stock predictions.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 bg-white">
                <UserPlus className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={username}
                  placeholder="Username"
                  className="flex-1 outline-none bg-transparent text-sm"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 bg-white">
                <Lock className="w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  placeholder="Enter a strong password"
                  className="flex-1 outline-none bg-transparent text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <div className='bg-red-600 text-white text-md p-2 rounded-2xl text-center '>{error}</div>}
            {success && <div className='bg-green-300 text-green-950 p-2 rounded-xl text-center' >Login Successfull ! </div>}

            {loading ?
              (<button
                type="button"
                disabled
                className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-gray-200 text-gray-600 rounded-full font-semibold cursor-not-allowed transition-all"
              >
                <svg
                  className="w-5 h-5 animate-spin text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                  />
                </svg>
                Logging In...
              </button>)
              :
              (<button
                type="submit"
                className="w-full text-center px-6 py-3 text-white bg-black hover:bg-gray-800 rounded-full transition-colors"
              >
                Login
              </button>)
            }

          </form>


          <p className="text-md text-gray-600 mt-6 text-center">
            don't have an account?{' '}
            <Link to='/register' className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
