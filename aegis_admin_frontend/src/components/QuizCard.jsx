import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizCard({ quiz, onEdit, onDelete }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/quiz_details?quizID=${quiz.quiz_id}`);
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    onEdit(quiz);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation(); 
    onDelete(quiz.quiz_id);
  };

  return (
    <div
      className="bg-black text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-110 hover:bg-gray-500 cursor-pointer"
      onClick={handleCardClick}
    >
      <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
      <p className="text-gray-200">{quiz.description}</p>
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handleEditClick}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
