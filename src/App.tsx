import LandingPage from "./components/LandingPage";
import LecturerLogin from "./components/Lecturer/LecturerLogin";
import StudentLogin from "./components/Student/StudentLogin";
import AdminLogin from "./components/Admin/AdminLogin";
import StudentSignUp from "./components/Student/StudentSignUp";
import {BrowserRouter as Router, Routes , Route} from "react-router-dom"

function App() {
  return (
    <>
    
     <Router>
     
       <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/LecturerLogin" element={<LecturerLogin/>} />
        <Route path="/StudentLogin" element={<StudentLogin/>} />
        <Route path="/AdminLogin" element={<AdminLogin/>} />
        <Route path="/SignUp" element={<StudentSignUp/>} />
        </Routes>

     </Router>
   
    </>
  );
}

export default App;
