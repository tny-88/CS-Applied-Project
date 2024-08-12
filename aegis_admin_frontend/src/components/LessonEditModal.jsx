import React, { useEffect, useState } from "react";

export default function LessonEditModal({ lessonID, courseID, onClose, onSave, onDelete }) {
  const [lessonData, setLessonData] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchLessonDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/get_lesson/${lessonID}`);
        if (response.ok) {
          const data = await response.json();
          setLessonData(data);
          setTitle(data.title);
          setContent(data.content);
          setType(data.type);
        } else {
          console.error("Failed to fetch lesson details");
        }
      } catch (error) {
        console.error("Error fetching lesson details:", error);
      }
    };

    fetchLessonDetails();
  }, [lessonID]);

  const handleSave = () => {
    if (!title || !content || !type) {
      alert("All fields are required.");
      return;
    }

    const updatedLesson = { lesson_id: lessonID, course_id: courseID, title, content, type };
    onSave(updatedLesson);
  };

  return (
    lessonData && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Edit Lesson</h2>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
              Lesson Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
              Lesson Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-56"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 font-semibold mb-2">
              Lesson Type
            </label>
            <p className="block text-purple-400 font-semibold mb-2">
            {type}
            </p>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
              onClick={handleSave}
            >
              Save Changes
            </button>
            <button
              className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
              onClick={() => onDelete(lessonID)}
            >
              Delete Lesson
            </button>
            <button
              className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
}
