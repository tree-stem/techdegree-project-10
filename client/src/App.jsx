import { Route, Routes, Navigate } from "react-router-dom";

// import components
import Header from "./components/Header"
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import NotFound from "./components/NotFound";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/courses" element={<Navigate to="/" />} />
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route element={<PrivateRoute />}>
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id/update" element={<UpdateCourse />} />
        </Route>
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
