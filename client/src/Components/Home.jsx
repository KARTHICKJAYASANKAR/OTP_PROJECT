import React, { useEffect, useState } from 'react'
import ProfileCard from './ProfileCard';
import { useNavigate, useParams } from 'react-router-dom';


const Home = () => {
    const {id} = useParams();
    const [user , setUser] = useState({});
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchUser= async()=>{
            try{
                const token = localStorage.getItem("token");
                if(token===null){
                    navigate(`/`)   
                    return;
                }
                const res = await fetch(`http://localhost:5000/getuser/${id}`,{
                    method: "GET",
                    headers: {
                        "authorization" : `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })

                const data = await res.json();
                if(res.ok){
                    console.log(data);
                    setUser(data);
                }
            }
            catch(e){
                console.log(e);
            }
        }
        fetchUser();
    },[])
    return (
        <ProfileCard
          profilePic={user.profilePic}
          name={user.name}
          email={user.email}
        />
      );
}

export default Home