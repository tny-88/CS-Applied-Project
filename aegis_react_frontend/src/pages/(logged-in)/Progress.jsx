import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import Sidebar from '../../components/Sidebar';

export default function Progress() {
  const [progress, setProgress] = useState([]);
  const [error, setError] = useState(null);
  const userDataCookie = Cookies.get("userData");
  const userData = JSON.parse(userDataCookie);
  const student_id = userData.student_id;

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/user_progress/${student_id}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProgress(data);
        } else {
          setError('Unexpected response format');
        }
      })
      .catch(error => setError('Error fetching user progress'));
  }, [student_id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 bg-gray-700 p-10">
        <div className="text-4xl font-extrabold text-white pb-9">
          This is {userData.fname}'s Current Progress:
        </div>
        {progress.length === 0 ? (
          <div className="text-white text-2xl">There is no user progress currently.</div>
        ) : (
          <div className="grid grid-cols-4 gap-10">
            {progress.map((course) => (
              <div key={course.course_id} className="bg-gray-800 p-5 rounded-lg shadow-lg">
                <h2 className="text-xl text-white font-bold">{course.title}</h2>
                <div className="items-center justify-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        className="text-gray-300"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="50"
                        cx="64"
                        cy="64"
                      />
                      <circle
                        className="text-green-500"
                        strokeWidth="8"
                        strokeDasharray={`${course.percentage * 3.14 * 2 * 50 / 100}, ${3.14 * 2 * 50}`}
                        stroke="currentColor"
                        fill="transparent"
                        r="50"
                        cx="64"
                        cy="64"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl text-white font-bold">{Math.round(course.percentage)}%</span>
                    </div>
                  </div>
                  <div className="ml-4 text-white">
                    <p>{course.completed_lessons} of {course.total_lessons} lessons completed</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
