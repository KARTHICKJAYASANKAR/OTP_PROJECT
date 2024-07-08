import { useState , useEffect} from "react"
import React from 'react'
import { useNavigate, useParams } from "react-router-dom"

const OtpForm = () => {

    const [otp , setOtp] = useState("")
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(600);
    const {id} = useParams();
    const[msg , setMsg] = useState("");

    useEffect(()=>{
        resendOTP();
    },[])

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
    
    
      const handleSubmit =async (e) => {
        e.preventDefault();
        // Handle form submission
        const res = await fetch("http://localhost:5000/validateotp",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({otp, id , timeLeft})
        })

        const data = await res.json();
        console.log(res);
        if(res.ok){
            navigate(`/home/${id}`);
        }
        else{
            setMsg("OTP failed or Expired")
        }
      };


      const resendOTP = async () => {
        try {
            // Reset the timer
            setTimeLeft(600);
            setMsg("");
            setOtp("")
    
            // Make the fetch request
            const res = await fetch(`http://localhost:5000/sendotp/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            // Parse the JSON response
            const data = await res.json();
    
            // Handle the response
            if (res.ok) {
                console.log(data);
            } else {
                console.error('Failed to resend OTP:', data);
            }
        } catch (error) {
            // Catch and log any errors
            console.error('Error resending OTP:', error);
        }
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
      <p className="text-red-700">{msg}</p>
    </form>
  </div>
  )
}

export default OtpForm