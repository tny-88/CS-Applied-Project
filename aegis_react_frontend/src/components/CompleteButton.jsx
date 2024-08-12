import React from 'react'
import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';


export default function CompleteButton() {
  const handleComplete = async (event) => {
    let lessonDataCookie = Cookies.get("lessonData");
    const lessonData = JSON.parse(lessonDataCookie);
    const lessonID = lessonData.lesson_id;

    let userDataCookie = Cookies.get("userData");
    const userData = JSON.parse(userDataCookie);
    const studentID = userData.student_id;

    const data = {
      student_id: studentID,
      lesson_id: lessonID,
    };

    try {
      //Replace with IP address of your machine
      const response = await fetch("http://127.0.0.1:5000/api/complete_lesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if(response.ok){
        const result = await response.json();
        toast.success('Lesson Successfully Completed', {
          style: {
            border: '1px solid blue',
            padding: '16px',
            color: 'blue',
          },
          iconTheme: {
            primary: 'blue',
            secondary: 'white',
          },
        });
        // Redirect to course page
        setTimeout(() => {
          window.location.href = "/testcourse";
        }, 1000);
      }
      else{
        const errorResult = await response.json();
        alert("Error completing lesson");
      }


    }
    catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }

  }
  
  



  return (
    <div>
      <Toaster/>
      <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => handleComplete()}>
        Complete Lesson
      </button>
    </div>
  );
}
