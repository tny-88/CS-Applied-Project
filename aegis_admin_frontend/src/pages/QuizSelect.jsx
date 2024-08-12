import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import QuizCard from '../components/QuizCard';
import Sidebar from '../components/Sidebar';
import AddEditQuizModal from '../components/AddEditQuizModal';

const fetchQuizzes = async (courseID) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/get_quizzes/${courseID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch quizzes');
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export default function QuizSelect() {
  const [quizzes, setQuizzes] = useState([]);
  const [isAddEditModalVisible, setIsAddEditModalVisible] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const courseID = Cookies.get('selectedCourseID');

  useEffect(() => {
    if (courseID) {
      fetchQuizzes(courseID).then((data) => setQuizzes(data));
    } else {
      console.error('No course ID found in cookies.');
    }
  }, [courseID]);

  const handleAddQuiz = () => {
    setCurrentQuiz(null);
    setIsAddEditModalVisible(true);
  };

  const handleEditQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setIsAddEditModalVisible(true);
  };

  const handleDeleteQuiz = async (quizID) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/delete_quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quiz_id: quizID }),
      });

      if (response.ok) {
        alert('Quiz deleted successfully.');
        setQuizzes(quizzes.filter(quiz => quiz.quiz_id !== quizID)); // Update state
      } else {
        const errorResult = await response.json();
        alert(errorResult.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleQuizSubmit = async (quiz) => {
    const url = quiz.quiz_id ? 'http://127.0.0.1:5000/api/edit_quiz' : 'http://127.0.0.1:5000/api/create_quiz';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...quiz, course_id: courseID }),
      });

      if (response.ok) {
        alert(`Quiz ${quiz.quiz_id ? 'edited' : 'added'} successfully.`);
        setIsAddEditModalVisible(false);
        fetchQuizzes(courseID).then((data) => setQuizzes(data)); // Refresh quizzes list
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
    <Sidebar />
    <div className="flex-1 ml-60 p-10 bg-white overflow-auto">
        <div className="text-4xl font-extrabold text-black pb-8">
          Quizzes for Course
        </div>
        <div className="pb-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddQuiz}
          >
            Add Quiz
          </button>
        </div>
        <div className="grid grid-cols-4 gap-10">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.quiz_id}
              quiz={quiz}
              onEdit={() => handleEditQuiz(quiz)}
              onDelete={() => handleDeleteQuiz(quiz.quiz_id)}
            />
          ))}
        </div>
      </div>

      {isAddEditModalVisible && (
        <AddEditQuizModal
          quiz={currentQuiz}
          onClose={() => setIsAddEditModalVisible(false)}
          onSubmit={handleQuizSubmit}
        />
      )}
    </div>
  );
}
