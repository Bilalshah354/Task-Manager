import React from "react";

const Profile = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">
        <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full"></div>

        <h2 className="text-xl font-semibold mt-4 text-gray-800">Bilal Shah</h2>

        <p className="text-gray-600 mt-1">bilalnadeemshah@gmail.com</p>
        <p className="text-gray-600 mt-1">Lahore.</p>
      </div>
    </div>
  );
};

export default Profile;
