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
import QrCodePage from "./LecturerQrCodePage";

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
   
    </div>
  );
}
