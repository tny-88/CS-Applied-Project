import React from "react";
import Cookies from "js-cookie";

const extractQuizID = (id, title) => {
  const quizData = JSON.stringify({ "quiz_id": id, "title": title });
  Cookies.set("quizData", quizData);
  window.location.href = "/quiz";
}

export default function QuizCard({ title, description, quizID }) {
  const truncate = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div
      className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-110 hover:bg-gray-500"
      onClick={() => extractQuizID(quizID, title)}
    >
      <h3 className="text-xl font-bold mb-2 border-b-2 border-gray-600 pb-2">
        {title}
      </h3>
      <p className="text-gray-300">{truncate(description, 100)}</p>
    </div>
  );
}
