import React, { useContext, useState } from 'react'
import { UserContext } from '../Context/userContext'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [userDetails , setUserDetails] = useState({})
    const {setUserInfo} = useContext(UserContext)
    const navigate = useNavigate()

    const handleChange = async(e) =>{
        
         setUserDetails({...userDetails , [e.target.name] : e.target.value})

    }

    const handleSubmit = (e) =>{
          
          e.preventDefault()
         if (userDetails.email && userDetails.password) {
            setUserInfo(userDetails)
            localStorage.setItem("userInfo" , JSON.stringify(userDetails))
            navigate("/")
         }
         else {
             return ;
         }

    }
  return (
    <div class="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div
        class="flex flex-col overflow-hidden items-center justify-center rounded-md  max md:flex-row md:flex-1 "
      >
     
        <div class="p-5 w-[26%] bg-white ">
          <h3 class="my-4 text-2xl font-semibold text-gray-700" >Account Login</h3>
          <form onSubmit={handleSubmit} class="flex flex-col space-y-5">
            <div class="flex flex-col space-y-1">
              <label for="email" class="text-sm font-semibold text-gray-500">Email address</label>
              <input
                type="email"
                id="email"
                name = "email"
                autofocus
                onChange={handleChange}
                value={userDetails.email}
                class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div class="flex flex-col space-y-1">
              <div class="flex items-center justify-between">
                <label for="password" class="text-sm font-semibold text-gray-500">Password</label>
                <a href="#" class="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</a>
              </div>
              <input
                type="password"
                id="password"
                name = "password"
                onChange={handleChange}
                value={userDetails.password}
                class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>

            <div>
              <button
                type="submit"
                class="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
            </div>
          
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
