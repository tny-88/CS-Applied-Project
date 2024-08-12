import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CompleteButton from "../../components/CompleteButton";

const getLesson = async () => {
  let lessonDataCookie = Cookies.get("lessonData");
  const lessonData = JSON.parse(lessonDataCookie);
  const lessonID = lessonData.lesson_id;

  try {
    const response = await fetch(`http://127.0.0.1:5000/api/get_lesson/${lessonID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error("Failed to fetch lessons");
      return {};
    }
  } catch (error) {
    console.error("Error:", error);
    return {};
  }
}

export default function LessonText() {
  const [lessons, setLessons] = useState({});

  useEffect(() => {
    getLesson().then((data) => setLessons(data));
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center py-10">
      <div className="bg-gray-600 shadow-md rounded-lg max-w-7xl w-full p-24">
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>
        <h1 className="text-4xl font-bold mb-6 text-white">{lessons.title}</h1>
        <div className="text-white text-lg whitespace-pre-line">
          <p className="pb-11">
            {lessons.content}
          </p>
        </div>
        <CompleteButton />
      </div>
    </div>
  );
}
