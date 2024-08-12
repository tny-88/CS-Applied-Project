import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Sidebar from '../../components/Sidebar';

export default function QuizScores() {
  const [quizScores, setQuizScores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userDataCookie = Cookies.get("userData");
    if (!userDataCookie) {
      setError('No user data found. Please log in.');
      return;
    }

    let userData;
    try {
      userData = JSON.parse(userDataCookie);
    } catch (e) {
      setError('Error parsing user data. Please try logging in again.');
      return;
    }

    const student_id = userData.student_id;

    // Fetch latest quiz scores
    fetch(`http://127.0.0.1:5000/api/get_quiz_scores/${student_id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Quiz scores data:', data); // Debugging log
        if (Array.isArray(data)) {
          setQuizScores(data);
        } else {
          console.error('Unexpected response format for quiz scores:', data);
          setError('Unexpected response format for quiz scores');
        }
      })
      .catch(error => {
        console.error('Error fetching quiz scores:', error);
        setError('Error fetching quiz scores');
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 bg-gray-700 p-10">
        <div className="text-4xl font-extrabold text-white pb-8">
          Latest Quiz Scores
        </div>
        <div className="grid grid-cols-4 gap-10 mt-5">
          {quizScores.length > 0 ? (
            quizScores.map((score) => (
              <div key={score.quiz_id} className="bg-gray-800 p-5 rounded-lg shadow-lg">
                <h2 className="text-xl text-white font-bold">{score.quiz_title}</h2>
                <div className="text-white">Score: {score.score}</div>
              </div>
            ))
          ) : (
            <div className="text-white">No quiz scores available</div>
          )}
        </div>
      </div>
    </div>
  );
}
