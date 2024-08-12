// src/components/Sidebar.js
import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { IconHome, IconBookUpload, IconUsers } from "@tabler/icons-react";

export default function Sidebar() {
  const handleLogout = () => {
    Cookies.remove("userData");
    Cookies.remove("courseData");
    Cookies.remove("lessonData");
    window.location.href = "/login";
  };

  return (
    <div className="fixed h-full w-60 bg-gray-100 text-black flex flex-col justify-between">
      <div className="flex flex-col p-4 space-y-4">
        <Link
          to="/dashboard"
          className="hover:bg-gray-400 p-2 rounded flex items-center space-x-2"
        >
          <IconHome size={20} />
          <span>Home</span>
        </Link>
        <Link
          to="/manage_users"
          className="hover:bg-gray-400 p-2 rounded flex items-center space-x-2"
        >
          <IconUsers size={20} />
          <span>Manage Users</span>
        </Link>
        <Link
          to="/add_course"
          className="hover:bg-gray-400 p-2 rounded flex items-center space-x-2"
        >
          <IconBookUpload size={20} />
          <span>Add Courses</span>
        </Link>
      </div>
      <div className="p-4">
        <button
          className="w-full bg-red-500 hover:bg-red-700 p-2 rounded text-white"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
