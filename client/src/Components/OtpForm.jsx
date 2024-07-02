import { useState } from "react"
import React from 'react'
import { useNavigate } from "react-router-dom"

const OtpForm = () => {

    const [otp , setOtp] = useState(null)
    const navigate = useNavigate();
  
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(otp);
        navigate('/home')
      };

    


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Verify OTP
      </h2>


  

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="password">
          Enter OTP:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={otp}
          onChange={(e)=> setOtp(e.target.value)}
          required
        />
      </div>
     
  


      <button
        type="submit"
        className="w-full bg-[#729762] text-white py-3 rounded-lg hover:bg-[#658147] transition duration-200"
      >
        Verify
      </button>
    </form>
  </div>
  )
}

export default OtpForm