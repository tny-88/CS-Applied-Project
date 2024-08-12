import React from "react";
import Cookies from "js-cookie";


const extractLessonData = (id, type) => {
  var lessonData = JSON.stringify({"lesson_id": id, "type": type});

  Cookies.set("lessonData", lessonData);

  if (type === "Video") {
    window.location.href = "/lessonvideo";
   
  }

  if (type === "Text") {
    window.location.href = "/lessontext";
  }

  

}

export default function LessonCard({ title, lessonID, type }) {
  return (
    <div
      className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-110 hover:bg-gray-500"
      onClick={() => extractLessonData(lessonID, type)}
    >
      <div className="text-center text-purple-300 text-sm mb-3">
        <p>{type} Lesson</p>
      </div>
      <h3 className="text-xl font-bold text-center">{title}</h3>
    </div>
  );
}
