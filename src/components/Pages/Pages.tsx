import LandingPage from "../LandingPage";
import LecturerLogin from "../Lecturer/LecturerLogin";
import StudentLogin from "../Student/StudentLogin";
import AdminLogin from "../Admin/AdminLogin";
import StudentSignUp from "../Student/StudentSignUp";
import LecturerDashboard from '../Lecturer/LecturerDashboard';
import StudentDashboard from "../Student/StudentDashboard";
import AdminDashboard from "../Admin/AdminDashboard";
import {BrowserRouter as Router, Routes , Route} from "react-router-dom"
import Copyright from "../Copyright";
function Pages() {
  return (
    <>
    
     <Router>
     
       <Routes>
        <Route path="/" element={<><LandingPage/> <Copyright/></>} />
        <Route path="/LecturerLogin" element={<><LecturerLogin/><Copyright/></>} />
        <Route path="/StudentLogin" element={<><StudentLogin/><Copyright/></>} />
        <Route path="/AdminLogin" element={<><AdminLogin/><Copyright/></>} />
        <Route path="/SignUp" element={<StudentSignUp/>} />
        <Route path="/LecturerDashboard" element={<LecturerDashboard/>} />
        <Route path="/StudentDashboard" element={<StudentDashboard/>} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        </Routes>

     </Router>
   
    </>
  );
}

export default Pages;
