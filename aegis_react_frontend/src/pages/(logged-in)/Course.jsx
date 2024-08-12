import React, { useState, useEffect } from "react";
import LessonCard from "../../components/LessonCard";
import Cookies from "js-cookie";
import Sidebar from "../../components/Sidebar";

const getLessons = async (courseID) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/get_lessons/${courseID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch lessons");
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export default function Course() {
  const [lessons, setLessons] = useState([]);
  const courseData = JSON.parse(Cookies.get("courseData"));
  const { course_id, title, des_temp } = courseData;

  useEffect(() => {
    getLessons(course_id).then((data) => setLessons(data));
  }, [course_id]);

  const navigateToQuizzes = () => {
    window.location.href = "/quiz_select";
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 bg-gray-700 p-10">
        <div className="flex justify-between items-center mb-8">
          <div className="text-4xl font-extrabold text-white">
            {title}
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={navigateToQuizzes}
          >
            Take Quiz
          </button>
          <div>
            <p className="text-white">{des_temp}</p>

          </div>
        </div>
        <div className="grid grid-cols-4 gap-10">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.lesson_id}
              title={lesson.title}
              lessonID={lesson.lesson_id}
              type={lesson.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
