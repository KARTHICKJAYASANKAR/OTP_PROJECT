import React , {useState} from 'react'
import {useNavigate} from 'react-router-dom';
const Login = () => {

    const navigate = useNavigate();
    const [login , setLogin] = useState(true)
    const [userid , setUserId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        profilePic: null,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleFileChange = (e) => {
        setFormData({
          ...formData,
          profilePic: e.target.files[0],
        });
      };

      const storeDB = async(imgurl)=>{

        try{
            console.log("image url : " + imgurl);
             
            const response = await fetch(`http://localhost:5000/signup`,{
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({name : formData.name, email:formData.email, password:formData.password, profilePic:imgurl})
            })
          console.log("response : " + response);
          const data = await response.json();
          console.log("data :" +  data);
          if(data)
          {
            // console.log(data[1])
            // console.log(data[0])
            localStorage.setItem("token" , data[1]);
            localStorage.setItem("userid" , data[0]);
            navigate('/home')
            //console.log(data);
          }
          else
          console.log("Some err in storing in DB");
        
           }
           catch(err)
           {
            console.log(err);
           }
    
    }

      function uploadFile(type){
        var imgurl;
        const data = new FormData();
        data.append("file" , formData.profilePic);
        data.append("upload_preset" , "image_preset");
        try {
            const cloudName = 'dgtonwmdv';
            const resourceType = 'image';
            const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
          
            fetch(api, {
              method: 'POST',
              body: data
            })
              .then(response => response.json())
              .then(result => {
                imgurl = result.secure_url;
                console.log("res.data from cloud:", result.secure_url);
                storeDB(imgurl);
              })
              .catch(error => {
                console.error("Error uploading to Cloudinary:", error);
              });
          } catch (error) {
            console.error("Error:", error);
          }
    }
    
      const handleSubmit = async(e) => {
        
        e.preventDefault();
        uploadFile('image');
    
      };

      const handleLogin = async(e)=>{
        e.preventDefault();
        try{
            console.log("login api")
            const response = await fetch(`http://localhost:5000/login`,{
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({email:formData.email, password:formData.password})
            })
            const data = await response.json();
            if(response.ok)
                {
                    localStorage.setItem("token" , data[1]);
                    localStorage.setItem("userid" , data[0]);
                    setUserId(data[0]);
                    navigate(`/otpverify/${data[0]}`);
                }
        }
        catch(e){
            console.log(e);
        }
      }

      const toggleStatus = ()=>{
        setLogin(!login);
      }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={!login?handleSubmit:handleLogin}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">{login?"Login":"Signup"}</h2>


      { !login && <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>}


        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.password}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
       
      { !login &&  <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="profilePic">
            Upload Profile Picture:
          </label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={handleFileChange}
            autoComplete='off'
            accept="image/*"
            required
          />
        </div>}


        <button
          type="submit"
          className="w-full bg-[#729762] text-white py-3 rounded-lg hover:bg-[#658147] transition duration-200"
        >
          {login ? "Login" : "Signup"}
        </button>
        <p onClick={toggleStatus}className='cursor-pointer text-blue-800'>{login?"New user? Create an account":"Existing user? Login"}</p>
      </form>
    </div>
  )
}

export default Login