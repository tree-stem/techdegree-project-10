import { Route, Routes } from "react-router-dom";

import Header from "./components/Header"
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
