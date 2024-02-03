import { useState } from "react";
import { Link } from "react-router-dom";
import "../../style/Dashboard.css";
import Logo from "../../assets/ucclogo.png";
import Profile from "../../assets/profile.png";
import { FaSignOutAlt, FaComment, FaCog } from "react-icons/fa";
import Feedback from "../Lecturer/Feedback";
import { RiTimeFill } from "react-icons/ri";

const StudentDashboard = () => {
  const [selectedItem, setSelectedItem] = useState<null | string>(null);
  const [profile, setProfile] = useState<boolean>(false);

  const handleItemClick = (itemName: string | null) => {
    setSelectedItem(itemName);
  };

  return (
    <div>
      <div className="flex flex-row bg-slate-200">
        <div className="w-[20%] bg-green h-screen overflow-auto flex flex-col justify-between">
          <div>
            <div className="flex justify-center flex-row space-x-2 text-center items-center py-3">
              <figure className="w-[20%] bg-white rounded-full h-fit">
                <img className="logo" src={Logo} alt=" logo" />
              </figure>
              <p className="text-sm text-white">
                School of Pharmacy <br /> E-Attendance
              </p>
            </div>

            <ul className="aside-items" style={{ cursor: "pointer" }}>
              <li
                onClick={() => handleItemClick("StudentDetails")}
                className="li-i"
              >
                Student's Details
              </li>
              <li onClick={() => handleItemClick("scanner")} className="li-i">
                Scan QRcode
              </li>
              <li onClick={() => handleItemClick("classList")} className="li-i">
                Attendance Status
              </li>
            </ul>
          </div>

          {/* Click to view the profile */}
          <div>
          {profile && (
            <ul className="profile-list">
              <li
                className="profile-li"
                onClick={() => handleItemClick("settings")}
              >
                <FaCog /> Setting
              </li>
              <li
                className="profile-li"
                onClick={() => handleItemClick("feedback")}
              >
                <FaComment /> Feedback
              </li>
              <li className="profile-li" onClick={() => setProfile(!profile)}>
                <Link to="/" className="Link">
                  <FaSignOutAlt /> Logout
                </Link>
              </li>
            </ul>
          )}

          <div className="profile">
            <figure className="profilePic" onClick={() => setProfile(!profile)}>
              <img className="pp" src={Profile} alt="profile picture" />
            </figure>
            <figcaption>Profile</figcaption>
          </div>
        </div>
        </div>
        <div className="aside-2">
          <div className="aside-top">
            <span className="aside-flex">
              <h1
                style={{
                  textAlign: "center",
                  color: "white",
                  marginTop: "-0.7rem",
                }}
              >
                Student's Name
              </h1>
              <p
                className="date"
                style={{
                  marginLeft: "8rem",
                  fontSize: "0.7rem",
                }}
              >
                <RiTimeFill />
                {Date()}
              </p>
            </span>
          </div>
          <div className="aside-down">
            {selectedItem === "StudentDetails" && (
              <ul>{/* Data from the database */} love</ul>
            )}

            {selectedItem === "scanner" && <p>scanner</p>}

            {selectedItem === "dailyReport" && <p>Daily Report</p>}

            {selectedItem === "feedback" && <Feedback />}
            {selectedItem === "settings" && <h3>Settings</h3>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
