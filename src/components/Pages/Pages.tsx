import LandingPage from "../LandingPage";
import LecturerLogin from "../Lecturer/LecturerLogin";
import StudentLogin from "../Student/StudentLogin";
import AdminLogin from "../Admin/AdminLogin";
import StudentSignUp from "../Student/StudentSignUp";
import LecturerDashboard from "../Lecturer/LecturerDashboard";
import StudentDashboard from "../Student/StudentDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Copyright from "../Copyright";
import RequireAuth from "../RequireAuth";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../../services/store";
import CoursePage from "../Lecturer/CoursePage";
import MainStudentLayout from "./_MainStudentLayout";
import QrCodePage from "../Student/QrCodePage";
import QrScanPage from "../Student/QrScanPage";
import RequireAuthStudent from "../RequireStudentAuth";
import MainLecturerLayout from "./_MainLecturerLayout";
import LecturerQrCodePage from "../Lecturer/LecturerQrCodePage";
import MyQrCodes from "../Student/MyQrCodes";
import RequireAdmin from "../RequireAdmin";
import AdminDashboard from "../Admin/AdminDashboard";
import MainAdminLayout from "./_MainAdminLayout";
import LecturerPage from "../Admin/LecturerPage";
import StudentsPage from "../Admin/StudentsPage";
import ScannedQrStudents from "../Lecturer/ScannedQrStudents";
import PasswordChange from "../Student/PasswordChange";
import VenuePage from "../Admin/VenuePage";
import VenueList from "../Admin/VenueList";
import ReportsPage from "../Admin/ReportsPage";
import LecturerReportsPage from "../Lecturer/LecturerReportsPage";
import CoursePageAdmin from "../Admin/CoursePageAdmin";
import SemesterPage from "../Admin/SemestersPage";
function Pages() {
  return (
    <>
      <Router>
        <PersistGate loading={<h1> Loading </h1>} persistor={persistor}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <LandingPage /> <Copyright />
                </>
              }
            />
            <Route
              path="/lecturerLogin"
              element={
                <>
                  <LecturerLogin />
                  <Copyright />
                </>
              }
            />
            <Route
              path="/studentLogin"
              element={
                <>
                  <StudentLogin />
                  <Copyright />
                </>
              }
            />
            <Route
              path="/adminLogin"
              element={
                <>
                  <AdminLogin />
                  <Copyright />
                </>
              }
            />
            <Route
              path="/updatePassword"
              element={
                <>
                  <PasswordChange />
                  <Copyright />
                </>
              }
            />
            <Route path="/signUp" element={<StudentSignUp />} />

            <Route element={<RequireAuth />}>
              <Route
                path="/lecturerDashboard"
                element={<MainLecturerLayout  content={<LecturerDashboard />} path="/lecturerDashboard" /> }
              />
              <Route
                path="/course/:id"
                element={<MainLecturerLayout  content={<CoursePage />} path="/course" /> }
              />
              <Route
                path="/scannedStudents/:id"
                element={<MainLecturerLayout  content={<ScannedQrStudents />} path="/scannedStudents" /> }
              />
             
              <Route
                path="/qrCode"
                element={<MainLecturerLayout  content={<LecturerQrCodePage />} path="/qrCode" /> }
              />
              <Route
                path="/reports"
                element={<MainLecturerLayout  content={<LecturerReportsPage />} path="/reports" /> }
              />
              {/* <Route path="/LecturerDashboard/:id" element={<CoursePage />} /> */}
            </Route>

            <Route element={<RequireAdmin />}>
              <Route
                path="/adminDashboard"
                element={<MainAdminLayout  content={<AdminDashboard />} path="/adminDashboard" /> }
              />
              <Route
                path="/lecturers"
                element={<MainAdminLayout  content={<LecturerPage />} path="/lecturers" /> }
              />
              <Route
                path="/venues"
                element={<MainAdminLayout  content={<VenueList />} path="/venues" /> }
              />
              <Route
                path="/add_venue"
                element={<MainAdminLayout  content={<VenuePage />} path="/add_venue" /> }
              />
              <Route
                path="/courses"
                element={<MainAdminLayout  content={<CoursePageAdmin />} path="/courses" /> }
              />
              <Route
                path="/students"
                element={<MainAdminLayout  content={<StudentsPage />} path="/students" /> }
              />
              <Route
                path="/semesters"
                element={<MainAdminLayout  content={<SemesterPage />} path="/semesters" /> }
              />
              <Route
                path="/course/:id"
                element={<MainAdminLayout  content={<CoursePage />} path="/course" /> }
              />
             <Route
                path="/adminReports"
                element={<MainAdminLayout  content={<ReportsPage />} path="/adminReports" /> }
              />
              {/* <Route
                path="/qrCode"
                element={<MainLecturerLayout  content={<LecturerQrCodePage />} path="/qrCode" /> }
              /> */}
              {/* <Route path="/LecturerDashboard/:id" element={<CoursePage />} /> */}
            </Route>

            <Route element={<RequireAuthStudent />}>
              <Route
                path="/studentDashboard"
                element={
                  <MainStudentLayout
                    content={<StudentDashboard />}
                    path="/studentDashboard"
                  />
                }
              />
              <Route
                path="/studentScan"
                element={
                  <MainStudentLayout
                    content={<QrCodePage />}
                    path="/studentScan"
                  />
                }
              />
              <Route
                path="/studentScan/:id"
                element={
                  <MainStudentLayout
                    content={<QrScanPage />}
                    path="/studentScan/:id"
                  />
                }
              />
              <Route
                path="/myQrCodes"
                element={
                  <MainStudentLayout
                    content={<MyQrCodes />}
                    path="/myQrCodes"
                  />
                }
              />
            </Route>
          </Routes>
        </PersistGate>
      </Router>
    </>
  );
}

export default Pages;
