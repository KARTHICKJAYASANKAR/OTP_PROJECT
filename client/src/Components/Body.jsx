import React from 'react'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import Login from './Login';
import Home from './Home';
import OtpForm from './OtpForm';

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },

        {
            path: '/home/:id',
            element: <Home/>
        },
        
        {
            path: '/otpverify/:id',
            element: <OtpForm/>
        },
    ]);


  return (
    <div>
    <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body