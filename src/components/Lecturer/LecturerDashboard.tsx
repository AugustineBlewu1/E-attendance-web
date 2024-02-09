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
    <div className="  flex flex-row bg-slate-200">
      <div className="humburger max-w-[45%] bg-green h-screen overflow-auto flex  flex-col justify-between 
      md:w-[30%] lg:w-[20%]"> 
        <div >
        <div className="flex justify-center flex-row space-x-2 text-center items-center py-3">
          <figure className="w-[40%] bg-white rounded-full h-fit 
          md:w-[30%]
          lg:w-[20%]">
            <img className="w-[100%] h-auto" src={Logo} alt=" logo" />
          </figure>
          <p className="text-xs  text-white md:text-sm">
            School of Pharmacy <br /> E-Attendance
          </p>
        </div>

        <ul className="ml-3 space-y-6 mt-10 md:ml-8 cursor-pointer " >
         
          
          <li onClick={() => handleItemClick("classList")} className="flex flex-row items-center text-white hover:text-primary active:text-active">
            <span className="images">
              <CiBoxList />
            </span>{" "}
            Class List
          </li>
          <li onClick={() => handleItemClick("qrcode")} className="flex flex-row items-center text-white   hover:text-primary active:text-active  ">
            <span className="images">
              <HiOutlineQrcode />
            </span>
            Generate QRcode
          </li>
          <li onClick={() => handleItemClick("dailyReport")} className="flex flex-row items-center text-white hover:text-primary active:text-active   ">
            <span className="images">
              <TbReport />
            </span>{" "}
            Daily Report
          </li>
        </ul>


        {/* Click to view the profile */}
        
        </div>
        <div className="  ">
          { profile && (
            <ul className=" flex  w-[90%]  justify-evenly cursor-pointer mx-auto bg-grey-bg z-10 h-auto px-2 py-3 rounded-md border-r-2 border-black mt-[55%] ">
              <li
                className=" border-r-2 hover:text-primary active:text-active"
                onClick={() => {
                  handleItemClick("settings");
                  setProfile(!profile);
                }}
              >
                <FaCog />
                Setting
              </li>
              <li
                className=" border-r-2  hover:text-primary active:text-active"
                onClick={() => {
                  handleItemClick("feedback");
                  setProfile(!profile);
                }}
              >
                <FaComment />
                Feedback
              </li>
              <li className="hover:text-primary active:text-active" onClick={() => setProfile(!profile)}>
                <Link to="/" className=" ">
                  <FaSignOutAlt />
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
          <figure className="w-[100%] flex flex-col justify-center items-end pr-6 mb-[15%]   " onClick={() => setProfile(!profile)}>
            <img className="pp  " src={Profile} alt="profile" />
            <span className="text-white hover:text-primary active:text-active ">Profile</span>
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
