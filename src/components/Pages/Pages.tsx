import LandingPage from "../LandingPage";
import LecturerLogin from "../Lecturer/LecturerLogin";
import StudentLogin from "../Student/StudentLogin";
import AdminLogin from "../Admin/AdminLogin";
import StudentSignUp from "../Student/StudentSignUp";
import LecturerDashboard from '../Lecturer/LecturerDashboard';
import StudentDashboard from "../Student/StudentDashboard";
import {BrowserRouter as Router, Routes , Route} from "react-router-dom"
import Copyright from "../Copyright";
import RequireAuth from "../RequireAuth";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../../services/store";
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

        <Route element={<RequireAuth />}>
        <Route path="/LecturerDashboard" element={<LecturerDashboard/>} />
        <Route path="/StudentDashboard" element={<StudentDashboard/>} />

        </Route>
        </Routes>
</PersistGate>
     </Router>
   
    </>
  );
}

export default Pages;
