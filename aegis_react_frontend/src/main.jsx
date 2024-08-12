import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles.css";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/(logged-in)/Dashboard.jsx";
import Profile from "./pages/(logged-in)/Profile.jsx";
import Course from "./pages/(logged-in)/Course.jsx";
import LessonText from "./pages/(logged-in)/LessonText.jsx";
import LessonVideo from "./pages/(logged-in)/LessonVideo.jsx";
import Progress from "./pages/(logged-in)/Progress.jsx";
import QuizSelect from "./pages/(logged-in)/QuizSelect.jsx";
import Quiz from "./pages/(logged-in)/Quiz.jsx";
import QuizScores from "./pages/(logged-in)/QuizScores.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/Progress",
    element: <Progress />,
  },
  {
    path: "/testcourse",
    element: <Course />,
  },
  {
    path: "/lessontext",
    element: <LessonText />,
  },
  {
    path: "/lessonvideo",
    element: <LessonVideo />,
  },
  {
    path: "/quiz_select",
    element: <QuizSelect />,
  },
  {
    path: "/quiz", // Route with quizId parameter
    element: <Quiz />,
  },
  {
    path: "/quiz_scores", // Route with quizId parameter
    element: <QuizScores />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
