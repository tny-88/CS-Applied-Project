import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CompleteButton from "../../components/CompleteButton";


export default function LessonVideo() {

  const getLesson = async () => {
    let lessonDataCookie = Cookies.get("lessonData");
    const lessonData = JSON.parse(lessonDataCookie);
    const lessonID = lessonData.lesson_id;
    const courseTitle = lessonData.type;
    
  
  
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
        return [];
      }
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  const [lessons, setLessons] = useState([]);
  

  useEffect(() => {
    getLesson().then((data) => setLessons(data));
  }, []);


   return (
     <div className="bg-gray-800 min-h-screen flex items-center justify-center py-10">
       <div className="bg-gray-600 shadow-md rounded-lg max-w-7xl w-full overflow-hidden p-6 lg:p-12 xl:p-24">
       <button
        //got back to the previous page
          onClick={() => window.history.back()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>
         <h1 className="text-4xl font-bold mb-6 text-white">{lessons.title}</h1>
         <div
           className="relative"
           style={{
             paddingBottom: "56.25%",
             height: 0,
             overflow: "hidden",
             maxWidth: "100%",
             background: "#000",
             position: "relative",
           }}
         >
           <iframe
             className="absolute top-0 left-0 w-full h-full rounded-lg"
             src={lessons.content}
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             referrerPolicy="strict-origin-when-cross-origin"
             allowFullScreen
           ></iframe>
         </div>
         <div className="text-white text-lg mt-6"></div>
         <CompleteButton />
      
         
       </div>
       
       
     </div>
   );
}
