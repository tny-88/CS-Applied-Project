import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const extractCourseID = (id) => {
  Cookies.set("selectedCourseID", id);
}

export default function DashboardCard({ title, description, courseID }) {
  const navigate = useNavigate();

  // Function to truncate description and add ellipsis
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  // Truncate description to 100 characters or any desired length
  const truncatedDescription = truncateText(description, 100);

  return (
    <div
      className="bg-black text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-110 hover:bg-gray-500"
      onClick={() => {
        extractCourseID(courseID);
        navigate("/course_page");
      }}
    >
      <h3 className="text-xl font-bold mb-2 border-b-2 border-gray-600 pb-2">
        {title}
      </h3>
      <p className="text-gray-200">{truncatedDescription}</p>
    </div>
  );
}
