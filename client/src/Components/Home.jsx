import React from 'react'
import ProfileCard from './ProfileCard';


const Home = () => {
    return (
        <ProfileCard
          profilePic="https://res.cloudinary.com/dgtonwmdv/image/upload/v1704604718/images/z0a5wcw2r27umibmjfm0.jpg"
          name="John Doe"
          email="john.doe@example.com"
        />
      );
}

export default Home