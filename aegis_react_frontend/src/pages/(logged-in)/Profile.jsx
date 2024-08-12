// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Cookies from "js-cookie";




const getUserProfile = async () => {
  var userDataCookie = Cookies.get("userData");
  var userData = JSON.parse(userDataCookie);
  const userID = userData.student_id;

  
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/api/get_user/${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch user profile');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export default function Profile() {

  const [user, setUser] = useState([]);

  

  useEffect(() => {
    getUserProfile().then((data) => setUser(data));
  }, []);


  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 bg-gray-700 p-10 ">
        <div className="max-w-4xl mx-auto rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-6 text-white">Profile</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 font-bold">Student ID</label>
              <div className="text-xl text-white pb-3">{user.student_id}</div>
            </div>
            <div>
              <label className="block text-gray-300 font-bold">Email</label>
              <div className="text-xl text-white pb-3">{user.email}</div>
            </div>
            <div>
              <label className="block text-gray-300 font-bold">First Name</label>
              <div className="text-xl text-white pb-3">{user.fname}</div>
            </div>
            <div>
              <label className="block text-gray-300 font-bold">Last Name</label>
              <div className="text-xl text-white pb-3">{user.lname}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}