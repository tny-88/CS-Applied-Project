// src/components/Sidebar.js
import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import {
  IconUserCircle,
  IconHome,
  IconDeviceFloppy,
  IconPencilCheck
} from "@tabler/icons-react";

export default function Sidebar() {
  const handleLogout = () => {
    // Clear all cookies
    Cookies.remove("userData");
    Cookies.remove("courseData");
    Cookies.remove("lessonData");

    // Redirect to login page or another appropriate page
    window.location.href = "/login";

  };

  return (
    <div className="h-screen w-55 bg-gray-800 text-white flex flex-col justify-between">
      <div className="flex flex-col p-4 space-y-4">
        <Link
          to="/dashboard"
          className="hover:bg-gray-700 p-2 rounded flex items-center space-x-2"
        >
          <IconHome size={20} />
          <span>Home</span>
        </Link>
        <Link
          to="/profile"
          className="hover:bg-gray-700 p-2 rounded flex items-center space-x-2"
        >
          <IconUserCircle size={20} />
          <span>Profile</span>
        </Link>
        <Link
          to="/progress"
          className="hover:bg-gray-700 p-2 rounded flex items-center space-x-2"
        >
          <IconDeviceFloppy size={20} />
          <span>Progress</span>
        </Link>
        <Link
          to="/quiz_scores"
          className="hover:bg-gray-700 p-2 rounded flex items-center space-x-2"
        >
          <IconPencilCheck size={20} />
          <span>Quiz Scores</span>
        </Link>
      </div>
      <div className="p-4">
        <button className="w-full bg-red-500 hover:bg-red-700 p-2 rounded" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
