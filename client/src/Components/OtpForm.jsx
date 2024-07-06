import { useState , useEffect} from "react"
import React from 'react'
import { useNavigate, useParams } from "react-router-dom"

const OtpForm = () => {

    const [otp , setOtp] = useState(null)
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(10);
    const {id} = useParams();

    useEffect(() => {
        if (timeLeft <= 0) {
          return;
        }
    
        const intervalId = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, [timeLeft]);
    
      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      };
  
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(otp);
        navigate('/home')
      };

    const resendOTP = async()=>{
        setTimeLeft(10);
        const res = await fetch(`http://localhost:5000/sendotp/${id}`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }  
        })

        const data = await res.json();
        if(res.ok){
            console.log(data);
        }
    }


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
        <p>Time left: {formatTime(timeLeft)}</p>
        {timeLeft <= 0 && 
        <div>
        <p>OTP has expired. Please request a new one.</p>
        <button className="bg-gray-400 hover:bg-gray-500 transition duration-200 p-2 rounded-lg font-bold" onClick={resendOTP}>Resend</button>
        </div>
        }
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