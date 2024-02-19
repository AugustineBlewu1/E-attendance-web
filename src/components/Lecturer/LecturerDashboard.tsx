// import { useState } from "react";




import { useSelector } from "react-redux";
import {  selectCurrentUser } from "../../services/userReducer";

export default function LecturerDashboard() {
  //const [lecturerData, setLecturerData] = useState({});
  // const [selectedItem, setSelectedItem] = useState<null | string>(null);
  // const [profile, setProfile] = useState<boolean>(false);
  const user  = useSelector(selectCurrentUser);


  console.log('User',user)

  // const handleItemClick = (itemName: null | string): void => {
  //   setSelectedItem(itemName);
  // };

  return (
    <div className="  flex flex-row bg-slate-200">
   
    </div>
  );
}
