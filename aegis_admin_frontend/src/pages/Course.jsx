import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LessonCard from "../components/LessonCard";
import Sidebar from "../components/Sidebar";
import EditCourseModal from "../components/EditCourseModal";
import AddLessonModal from "../components/AddLessonModal";
import LessonEditModal from "../components/LessonEditModal";

const fetchCourseDetails = async (courseID) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/get_course/${courseID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch course details");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const fetchLessons = async (courseID) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/get_lessons/${courseID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return await response.json();
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
  const [courseDetails, setCourseDetails] = useState({ title: "", description: "" });
  const [lessons, setLessons] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddLessonModalVisible, setIsAddLessonModalVisible] = useState(false);
  const [isEditLessonModalVisible, setIsEditLessonModalVisible] = useState(false);
  const [selectedLessonID, setSelectedLessonID] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const courseID = Cookies.get("selectedCourseID");
    if (courseID) {
      fetchCourseDetails(courseID).then((data) => {
        if (data) {
          setCourseDetails(data);
        }
      });
      fetchLessons(courseID).then((lessons) => setLessons(lessons));
    } else {
      console.error("No course ID found in cookies.");
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleEditCourse = () => {
    setIsEditModalVisible(true);
  };

  const handleAddLesson = () => {
    setIsAddLessonModalVisible(true);
  };

  const handleEditCourseSubmit = async (updatedCourse) => {
    const courseID = Cookies.get("selectedCourseID");
    const data = {
      course_id: courseID,
      title: updatedCourse.title,
      description: updatedCourse.description,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/edit_course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Course edited successfully.");
        setIsEditModalVisible(false);
        setCourseDetails(updatedCourse);
      } else {
        const errorResult = await response.json();
        alert(errorResult.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleAddLessonSubmit = async (newLesson) => {
    const courseID = Cookies.get("selectedCourseID");
    const data = {
      course_id: courseID,
      title: newLesson.title,
      content: newLesson.content,
      type: newLesson.type,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/add_lesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Lesson added successfully.");
        setIsAddLessonModalVisible(false);
        fetchLessons(courseID).then((lessons) => setLessons(lessons));
      } else {
        const errorResult = await response.json();
        alert(errorResult.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleDeleteCourse = async () => {
    const courseID = Cookies.get("selectedCourseID");
    try {
      const response = await fetch("http://127.0.0.1:5000/api/delete_course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course_id: courseID }),
      });

      if (response.ok) {
        alert("Course deleted successfully.");
        navigate("/dashboard");
      } else {
        const errorResult = await response.json();
        alert(errorResult.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleViewQuizzes = () => {
    navigate("/quiz_select");
  };

  const handleEditLesson = (lessonID) => {
    setSelectedLessonID(lessonID);
    setIsEditLessonModalVisible(true);
  };

  const courseID = Cookies.get("selectedCourseID");
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-60 p-10 bg-white overflow-auto">
        <div className="text-4xl font-extrabold text-black pb-8">
          {courseDetails.title}
        </div>
        <div className="row-auto pb-10">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleEditCourse}
          >
            Edit Course
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
            onClick={handleAddLesson}
          >
            Add Lesson
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
            onClick={handleDeleteCourse}
          >
            Delete Course
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-4"
            onClick={handleViewQuizzes}
          >
            View Quizzes
          </button>
        </div>
        <div className="grid grid-cols-4 gap-10">
          {lessons.map((lesson) => (
            <LessonCard
            key={lesson.lesson_id}
            title={lesson.title}
            lessonID={lesson.lesson_id}
            type={lesson.type}
            courseID={courseID} // Pass the courseID here
            onEdit={() => handleEditLesson(lesson.lesson_id)}
          />
          ))}
        </div>
      </div>

      {isEditModalVisible && (
        <EditCourseModal
          currentCourse={courseDetails}
          onClose={() => setIsEditModalVisible(false)}
          onSubmit={handleEditCourseSubmit}
        />
      )}

      {isAddLessonModalVisible && (
        <AddLessonModal
          onClose={() => setIsAddLessonModalVisible(false)}
          onSubmit={handleAddLessonSubmit}
        />
      )}

      {isEditLessonModalVisible && selectedLessonID && (
        <LessonEditModal
          lessonID={selectedLessonID}
          courseID={Cookies.get("selectedCourseID")}
          onClose={() => setIsEditLessonModalVisible(false)}
          onSave={(updatedLesson) => {
            setIsEditLessonModalVisible(false);
            fetchLessons(Cookies.get("selectedCourseID")).then((lessons) => setLessons(lessons));
          }}
        />
      )}
    </div>
  );
}
