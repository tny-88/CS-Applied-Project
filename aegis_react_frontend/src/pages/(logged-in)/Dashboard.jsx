// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import DashboardCard from "../../components/DashboardCard";
import Sidebar from "../../components/Sidebar";
import Cookies from "js-cookie";


const getCourses = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/get_courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch courses");
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};




export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  
  var userDataCookie = Cookies.get("userData");
  var userData = JSON.parse(userDataCookie);


  console.log(userData);

  useEffect(() => {
    getCourses().then((data) => setCourses(data));
  }, []);

  console.log(courses);

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 bg-gray-700 p-10">
        <div className="text-4xl font-extrabold text-white pb-3">
          Welcome {userData.fname}
        </div>
        <div className="text-2xl font-extrabold text-gray-400 pb-8">
          Select a course to do:
        </div>
        <div className="grid grid-cols-4 gap-10">
          {courses.map((course) => (
            <DashboardCard
              key={course.course_id}
              title={course.title}
              description={course.description}
              courseID={course.course_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
