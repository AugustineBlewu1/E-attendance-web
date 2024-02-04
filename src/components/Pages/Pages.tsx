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
import RequireAuth from "../RequireAuth";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../../services/store";
import CoursePage from "../Lecturer/CoursePage";
function Pages() {
  return (
    <>
    
     <Router>
     <PersistGate loading={<h1> Loading </h1>} persistor={persistor}>

       <Routes>
        <Route path="/" element={<><LandingPage/> <Copyright/></>} />
        <Route path="/LecturerLogin" element={<><LecturerLogin/><Copyright/></>} />
        <Route path="/StudentLogin" element={<><StudentLogin/><Copyright/></>} />
        <Route path="/AdminLogin" element={<><AdminLogin/><Copyright/></>} />
        <Route path="/SignUp" element={<StudentSignUp/>} />
<<<<<<< HEAD
        <Route path="/LecturerDashboard" element={<LecturerDashboard/>} />
        <Route path="/StudentDashboard" element={<StudentDashboard/>} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        </Routes>
=======
>>>>>>> 663c547a6b33916aa0b37fd889fc9fac254739b8

        <Route element={<RequireAuth />}>
        <Route path="/LecturerDashboard" element={<LecturerDashboard/>} />
        <Route path="/LecturerDashboard/:id" element={<CoursePage/>} />
        <Route path="/StudentDashboard" element={<StudentDashboard/>} />

        </Route>
        </Routes>
</PersistGate>
     </Router>
   
    </>
  );
}

export default Pages;
