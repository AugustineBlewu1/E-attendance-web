import { useState } from "react";

import Feedback from "./Feedback";
import { Link } from "react-router-dom";
import Logo from "../../assets/ucclogo.png";

import { TbReport } from "react-icons/tb";
import { CiBoxList } from "react-icons/ci";
import { HiOutlineQrcode } from "react-icons/hi";

import Profile from "../../assets/profile.png";

import { FaSignOutAlt, FaComment, FaCog } from "react-icons/fa";
import { useSelector } from "react-redux";
import {  selectCurrentUser } from "../../services/userReducer";
import QrCodePage from "./QrCodePage";

export default function LecturerDashboard() {
  //const [lecturerData, setLecturerData] = useState({});
  const [selectedItem, setSelectedItem] = useState<null | string>(null);
  const [profile, setProfile] = useState<boolean>(false);
  const user  = useSelector(selectCurrentUser);


  console.log('User',user)

  const handleItemClick = (itemName: null | string): void => {
    setSelectedItem(itemName);
  };

  return (
    <div className="flex flex-row">
      <div className="w-[20%] bg-green h-screen overflow-auto flex flex-col justify-between">
        <div >
        <div className="flex justify-center flex-row space-x-2 text-center items-center py-3">
          <figure className="w-[20%] bg-white rounded-full h-fit">
            <img className="logo" src={Logo} alt=" logo" />
          </figure>
          <p className="text-sm text-white">
            School of Pharmacy <br /> E-Attendance
          </p>
        </div>

        <ul className="ml-8 space-y-6 mt-10" style={{ cursor: "pointer" }}>
          {/* <li
            onClick={() => handleItemClick("lecturerDetails")}
            className="li-i"
          >
            <span className="images">
              <TbListDetails />
            </span>{" "}
            Lecturer's Details
          </li> */}
          
          <li onClick={() => handleItemClick("classList")} className="flex flex-row items-center text-white">
            <span className="images">
              <CiBoxList />
            </span>{" "}
            Class List
          </li>
          <li onClick={() => handleItemClick("qrcode")} className="flex flex-row items-center text-white">
            <span className="images">
              <HiOutlineQrcode />
            </span>
            Generate QRcode
          </li>
          <li onClick={() => handleItemClick("dailyReport")} className="flex flex-row items-center text-white">
            <span className="images">
              <TbReport />
            </span>{" "}
            Daily Report
          </li>
        </ul>


        {/* Click to view the profile */}
        
        </div>
        <div className="">
          { profile && (
            <ul className="profile-list">
              <li
                className="profile-li"
                onClick={() => {
                  handleItemClick("settings");
                  setProfile(!profile);
                }}
              >
                <FaCog />
                Setting
              </li>
              <li
                className="profile-li"
                onClick={() => {
                  handleItemClick("feedback");
                  setProfile(!profile);
                }}
              >
                <FaComment />
                Feedback
              </li>
              <li className="" onClick={() => setProfile(!profile)}>
                <Link to="/" className="Link">
                  <FaSignOutAlt />
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
          <figure className="figClass" onClick={() => setProfile(!profile)}>
            <img className="pp" src={Profile} alt="profile" />
            <span>Profile</span>
          </figure>
      </div>

      <div className="w-[80%]">
        <div className="aside-top">
          <span className="aside-flex">
            <h1
              style={{
                color: "white",
                marginTop: "-0.7rem",
                marginRight: "10px",
                fontSize: "14px"
              }}
            >
              {
                user?.name
              }
              {
                user?.email
              }
            </h1>
              
          </span>
        </div>
        <div className="aside-down">
          {/* {selectedItem === "lecturerDetails" && <p>come from database</p>} */}
          {selectedItem === "qrcode" && <QrCodePage />}
          {selectedItem === "classList" && <p>claslist</p>}
          {selectedItem === "dailyReport" && <p>daily report</p>}
          {selectedItem === "feedback" && <Feedback />}
          {selectedItem === "settings" && <h3>settings</h3>}
        </div>
      </div>
    </div>
  );
}
