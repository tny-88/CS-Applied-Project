import React, { useState, useEffect } from "react";
import QuizCard from "../../components/QuizCard";
import Sidebar from "../../components/Sidebar";
import Cookies from "js-cookie";

const getQuizzes = async (courseID) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/get_quizzes/${courseID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch quizzes");
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export default function QuizSelect() {
  const [quizzes, setQuizzes] = useState([]);
  const courseData = JSON.parse(Cookies.get("courseData"));
  const { course_id, title } = courseData;

  useEffect(() => {
    getQuizzes(course_id).then((data) => setQuizzes(data));
  }, [course_id]);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 bg-gray-700 p-10">
        <div className="text-4xl font-extrabold text-white pb-3">
          Quizzes for {title}
        </div>
        <div className="text-2xl font-extrabold text-gray-400 pb-8">
          Select a quiz to start:
        </div>
        <div className="grid grid-cols-4 gap-10">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.quiz_id}
              title={quiz.title}
              description={quiz.description}
              quizID={quiz.quiz_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
