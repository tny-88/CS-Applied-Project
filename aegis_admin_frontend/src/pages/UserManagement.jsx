import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/get_users")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setUsers(data);
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleUserClick = (user) => {
    navigate(`/user_details?student_id=${user.student_id}`);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-60 p-10 bg-white overflow-auto">
        <h1 className="text-4xl font-bold mb-8">User Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.student_id}
              className="bg-gray-200 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-400"
              onClick={() => handleUserClick(user)}
            >
              <h2 className="text-xl font-bold">{user.fname} {user.lname}</h2>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
