// src/Dashboard.js
import React, { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import DashboardCard from "../components/DashboardCard";

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
  const [isAddCourseVisible, setIsAddCourseVisible] = useState(false);

  useEffect(() => {
    getCourses().then((data) => setCourses(data));
  }, []);

  const handleAddCourse = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/add_course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        setIsAddCourseVisible(false); // Hide the form after successful submission
        // Refresh course list
        getCourses().then((data) => setCourses(data));
      } else {
        const errorResult = await response.json();
        alert(errorResult.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 ml-60 p-10 bg-white overflow-auto">
        <div className="text-4xl font-extrabold text-black pb-3">
          Manage Courses
        </div>
        <div className='pt-2 pb-10'>
          <button
            className="bg-green-800 rounded-3xl text-white w-40 h-16"
            onClick={() => setIsAddCourseVisible(true)}
          >
            Add a course
          </button>
        </div>
        <div className="grid grid-cols-4 gap-10">
          {courses.map((course) => (
            <DashboardCard
              key={course.course_id}
              title={course.title}
              description={course.description}
              courseID={course.course_id}
              des = {course.description}
            />
          ))}
        </div>
      </div>

      {/* Pop-up form for adding a course */}
      {isAddCourseVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">Add a New Course</h2>
            <form onSubmit={handleAddCourse}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter course title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                  Course Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter course description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
                >
                  Add Course
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
                  onClick={() => setIsAddCourseVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
