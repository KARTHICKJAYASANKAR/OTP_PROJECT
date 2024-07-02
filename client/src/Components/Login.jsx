import React , {useState} from 'react'

const Login = () => {

    const [login , setLogin] = useState(true)

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
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
      };

      const toggleStatus = ()=>{
        setLogin(!login);
      }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
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
            required
          />
        </div>}


        <button
          type="submit"
          className="w-full bg-[#729762] text-white py-3 rounded-lg hover:bg-[#658147] transition duration-200"
        >
          {login ? "Login" : "Signup"}
        </button>
        <p onClick={toggleStatus}className='cursor-pointer text-blue-800'>{login?"New use? Create an account":"Existing user? Login"}</p>
      </form>
    </div>
  )
}

export default Login