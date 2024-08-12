import React from "react";
import Cookies from "js-cookie";

const extractCourseID = (id, title) => {
  var courseData = JSON.stringify({ "course_id": id, "title": title });

  Cookies.set("courseData", courseData);
  window.location.href = "/testcourse";
}

export default function DashboardCard({ title, description, courseID }) {
  // Function to truncate text
  const truncate = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-110 hover:bg-gray-500" onClick={() => extractCourseID(courseID, title)}>
      <h3 className="text-xl font-bold mb-2 border-b-2 border-gray-600 pb-2">
        {title}
      </h3>
      <p className="text-gray-300">{truncate(description, 100)}</p> {/* Adjust the maxLength as needed */}
    </div>
  );
}
