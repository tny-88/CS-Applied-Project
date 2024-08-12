// src/AddCourseForm.js
import React from "react";
import Sidebar from "../components/Sidebar";

export default function AddCourseForm() {
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
        //navitage to the manage courses page
        window.location.href = "/dashboard";
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
        <form
          onSubmit={handleAddCourse}
          className="w-full  bg-white p-8 mx-auto "
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Add a New Course
          </h2>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-2"
            >
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
            <label
              htmlFor="description"
              className="block text-gray-700 font-semibold mb-2"
            >
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
          <button
            type="submit"
            className="w-40 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
}
