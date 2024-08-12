import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles.css";
import Login from "./pages/Login.jsx";
import Dashboard from './pages/Dashboard.jsx';
import Course from './pages/Course.jsx';
import AddCourse from './pages/AddCourse.jsx';
import UserManagement from './pages/UserManagement.jsx';
import QuizSelect from './pages/QuizSelect.jsx';
import QuizDetails from './pages/QuizDetails.jsx';
import UserDetails from './pages/UserDetails.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <div>404 Not Found</div>,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,

  },
  {
    path: "/manage_users",
    element: <UserManagement />,
  },
  {
    path: "/course_page",
    element: <Course />,
  },
  {
    path: "/add_course",
    element: <AddCourse />,
  },
  {
    path: "/quiz_select",
    element: <QuizSelect />,
  },
  {
    path: "/quiz_details",
    element: <QuizDetails />,
  },
  {
    path: "/user_details",
    element: <UserDetails />,
  }

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
