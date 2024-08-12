import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [score, setScore] = useState(0);
  const quizData = JSON.parse(Cookies.get("quizData"));
  const userData = JSON.parse(Cookies.get("userData"));
  const { quiz_id, title } = quizData;
  const { student_id } = userData;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/get_questions/${quiz_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
        } else {
          console.error('Failed to fetch questions');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchQuestions();
  }, [quiz_id]);

  const handleAnswerChange = (questionId, optionIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionIndex });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/submit_answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quiz_id: quiz_id,
          student_id: student_id,
          answers: selectedAnswers,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setScore(result.score);
        setShowPopup(true);
      } else {
        console.error('Failed to submit answers');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBackToCourse = () => {
    window.location.href = '/testcourse';
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-700 p-10">
      <h1 className="text-4xl font-extrabold text-white mb-10">{title}</h1>
      {questions.map((question) => (
        <div key={question.question_id} className="bg-gray-800 text-white p-6 rounded-lg mb-6 w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-4">{question.question_text}</h2>
          {question.options.map((option, index) => (
            <div key={index} className="mb-2">
              <input
                type="radio"
                id={`question_${question.question_id}_option_${index}`}
                name={`question_${question.question_id}`}
                value={index}
                onChange={() => handleAnswerChange(question.question_id, index)}
                checked={selectedAnswers[question.question_id] === index}
              />
              <label htmlFor={`question_${question.question_id}_option_${index}`} className="ml-2">{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white py-2 px-6 rounded-lg mt-10 hover:bg-blue-500"
      >
        Submit Answers
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Your Score</h2>
            <p className="text-xl">You scored {score} out of {questions.length}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"
              onClick={handleBackToCourse}
            >
              Back to Course
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
