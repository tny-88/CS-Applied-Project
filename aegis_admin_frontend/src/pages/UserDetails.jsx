import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import UserModal from '../components/UserModal';

const fetchUserDetails = async (student_id) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/user_details/${student_id}`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch user details');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};

export default function UserDetails() {
  const [userDetails, setUserDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const student_id = searchParams.get('student_id');

  useEffect(() => {
    if (student_id) {
      fetchUserDetails(student_id).then((data) => {
        if (data) {
          setUserDetails(data);
        }
      });
    } else {
      console.error('No student ID found in query params.');
      navigate('/user_management'); // Redirect if no student ID
    }
  }, [student_id, navigate]);

  const handleOpenEditModal = () => setIsModalOpen(true);
  const handleCloseEditModal = () => setIsModalOpen(false);

  const handleSaveUser = (updatedUser) => {
    fetch("http://127.0.0.1:5000/api/edit_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("User updated successfully.");
          setUserDetails((prevDetails) => ({
            ...prevDetails,
            user: updatedUser
          }));
          handleCloseEditModal();
        }
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  const handleDeleteUser = (student_id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch("http://127.0.0.1:5000/api/delete_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ student_id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert("User deleted successfully.");
            navigate('/user_management'); // Redirect to user management
          }
        })
        .catch((error) => console.error("Error deleting user:", error));
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-60 p-10 bg-white overflow-auto">
        <h1 className="text-4xl font-bold mb-8">User Details</h1>
        {userDetails && userDetails.user && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              {userDetails.user.fname} {userDetails.user.lname}
            </h2>
            <p className='text-xl font-bold'>Email: </p>
            <p>{userDetails.user.email}</p>
          </div>
        )}
        {userDetails && (
          <>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Course Progress</h2>
              {userDetails.progress.map((course) => (
                <div key={course.course_id} className="mb-4">
                  <h3 className="text-xl">{course.title}</h3>
                  <p>Completed: {course.completed_lessons}/{course.total_lessons}</p>
                  <p>Progress: {course.percentage.toFixed(2)}%</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Quiz Scores</h2>
              {userDetails.scores.map((quiz) => (
                <div key={quiz.quiz_id} className="mb-4">
                  <h3 className="text-xl">{quiz.quiz_title}</h3>
                  <p>Highest Score: {quiz.score}</p>
                </div>
              ))}
            </div>
          </>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
          onClick={handleOpenEditModal}
        >
          Edit User
        </button>
      </div>

      {isModalOpen && userDetails && userDetails.user && (
        <UserModal
          user={userDetails.user}
          onClose={handleCloseEditModal}
          onSave={handleSaveUser}
          onDelete={() => handleDeleteUser(userDetails.user.student_id)}
        />
      )}
    </div>
  );
}
