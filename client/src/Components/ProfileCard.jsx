import React from 'react';

const ProfileCard = ({ profilePic, name, email }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-300 p-6 rounded-lg shadow-lg w-full max-w-xs text-center">
        <img
          src={profilePic}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-600">{email}</p>
      </div>
    </div>
  );
};


export default ProfileCard;
