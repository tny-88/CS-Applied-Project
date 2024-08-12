import React, { useState } from "react";
import LessonEditModal from "../components/LessonEditModal";

export default function LessonCard({ title, lessonID, type, courseID }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveLesson = (updatedLesson) => {
    // Send the updated lesson data to the backend
    fetch("http://127.0.0.1:5000/api/edit_lesson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedLesson),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Lesson updated successfully.");
          setIsModalOpen(false);
          // Optionally, refresh the lessons list or update the state
        }
      })
      .catch(error => console.error("Error updating lesson:", error));
  };

  const handleDeleteLesson = (lessonID) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      fetch("http://127.0.0.1:5000/api/delete_lesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lesson_id: lessonID }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            alert(data.error);
          } else {
            alert("Lesson deleted successfully.");
            setIsModalOpen(false);
            // Optionally, refresh the lessons list or update the state
          }
        })
        .catch(error => console.error("Error deleting lesson:", error));
    }
  };

  return (
    <>
      <div
        className="bg-black text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-110 hover:bg-gray-500 cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="text-center text-sm mb-3">
          <p>[{type}]</p>
        </div>
        <h3 className="text-xl font-bold text-center">{title}</h3>
      </div>
      {isModalOpen && (
        <LessonEditModal
          lessonID={lessonID}
          courseID={courseID}  // Ensure courseID is passed to LessonEditModal
          onClose={handleCloseModal}
          onSave={handleSaveLesson}
          onDelete={handleDeleteLesson}
        />
      )}
    </>
  );
}
