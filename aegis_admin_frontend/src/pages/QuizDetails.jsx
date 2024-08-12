import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AddEditQuestionModal from '../components/AddEditQuestionModal';



const fetchQuestions = async (quizID) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/get_questions/${quizID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch questions');
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export default function QuizDetails() {
  const [quizDetails, setQuizDetails] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isAddEditModalVisible, setIsAddEditModalVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const quizID = searchParams.get('quizID');

  useEffect(() => {
    if (quizID) {
      fetchQuestions(quizID).then((data) => setQuestions(data));
    } else {
      console.error('No quiz ID found in query params.');
      navigate('/quiz_select'); // Redirect if no quiz ID
    }
  }, [quizID, navigate]);

  const handleAddQuestion = () => {
    setCurrentQuestion(null);
    setIsAddEditModalVisible(true);
  };

  const handleEditQuestion = (question) => {
    setCurrentQuestion(question);
    setIsAddEditModalVisible(true);
  };

  const handleDeleteQuestion = async (questionID) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/delete_question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question_id: questionID }),
      });

      if (response.ok) {
        alert('Question deleted successfully.');
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.question_id !== questionID));
      } else {
        const errorResult = await response.json();
        alert(errorResult.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleQuestionSubmit = async (question) => {
    const url = question.question_id ? 'http://127.0.0.1:5000/api/edit_question' : 'http://127.0.0.1:5000/api/add_question';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...question, quiz_id: quizID }),
      });

      if (response.ok) {
        alert(`Question ${question.question_id ? 'edited' : 'added'} successfully.`);
        setIsAddEditModalVisible(false);
        fetchQuestions(quizID).then((data) => setQuestions(data)); // Refresh questions list
      } else {
        const errorResult = await response.json();
        alert(errorResult.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar className="fixed h-full" />
      <div className="flex-1 ml-60 p-10 bg-white overflow-auto">
        <div className="text-4xl font-extrabold text-black pb-8">
          Editing Quiz
        </div>
        <div className="pb-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
        </div>
        <div className="grid grid-cols-1 gap-10">
          {questions.map((question) => (
            <div key={question.question_id} className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">{question.question_text}</h3>
              <ul className="list-disc list-inside mb-4">
                {question.options.map((option, index) => (
                  <li key={index} className={index === question.correct_answer ? 'font-bold text-green-600' : ''}>
                    {option}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEditQuestion(question)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteQuestion(question.question_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isAddEditModalVisible && (
        <AddEditQuestionModal
          question={currentQuestion}
          onClose={() => setIsAddEditModalVisible(false)}
          onSubmit={handleQuestionSubmit}
        />
      )}
    </div>
  );
}
