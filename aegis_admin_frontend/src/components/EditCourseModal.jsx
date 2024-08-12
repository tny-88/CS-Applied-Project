// src/components/EditCourseModal.js
import React from "react";

export default function EditCourseModal({ currentCourse, onClose, onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedCourse = {
      title: formData.get("title"),
      description: formData.get("description"),
    };

    if (!updatedCourse.title || !updatedCourse.description) {
      alert("All fields are required.");
      return;
    }

    onSubmit(updatedCourse);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Course</h2>
        <form onSubmit={handleSubmit}>
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
              defaultValue={currentCourse.title}
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
              defaultValue={currentCourse.description}
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
