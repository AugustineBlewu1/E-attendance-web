import LandingPage from "../LandingPage";
import LecturerLogin from "../Lecturer/LecturerLogin";
import StudentLogin from "../Student/StudentLogin";
import AdminLogin from "../Admin/AdminLogin";
import StudentSignUp from "../Student/StudentSignUp";
import LecturerDashboard from '../Lecturer/LecturerDashboard';
import StudentDashboard from "../Student/StudentDashboard";
import {BrowserRouter as Router, Routes , Route} from "react-router-dom"

function Pages() {
  return (
    <>
    
     <Router>
     
       <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/LecturerLogin" element={<LecturerLogin/>} />
        <Route path="/StudentLogin" element={<StudentLogin/>} />
        <Route path="/AdminLogin" element={<AdminLogin/>} />
        <Route path="/SignUp" element={<StudentSignUp/>} />
        <Route path="/LecturerDashboard" element={<LecturerDashboard/>} />
        <Route path="/StudentDashboard" element={<StudentDashboard/>} />
        </Routes>

     </Router>
   
    </>
  );
}

export default Pages;
