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
            <Route path="/signUp" element={<StudentSignUp />} />

            <Route element={<RequireAuth />}>
              <Route
                path="/lecturerDashboard"
                element={<MainLecturerLayout  content={<LecturerDashboard />} path="/lecturerDashboard" /> }
              />
              <Route
                path="/course"
                element={<MainLecturerLayout  content={<CoursePage />} path="/course" /> }
              />
              <Route
                path="/qrCode"
                element={<MainLecturerLayout  content={<LecturerQrCodePage />} path="/qrCode" /> }
              />
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
