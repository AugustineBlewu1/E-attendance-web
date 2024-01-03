
import { useState } from 'react';

    import Feedback from './Feedback';
    import '../../style/Dashboard.css';
    import { Link } from "react-router-dom";
    import Logo from '../../assets/ucclogo.png';
    
    import {TbListDetails ,TbReport}  from 'react-icons/tb'
    import {CiBoxList} from "react-icons/ci"
    import {HiOutlineQrcode} from "react-icons/hi"
    import {RiTimeFill} from "react-icons/ri"
    
    
    import Profile from '../../assets/profile.png'
   
    import { FaSignOutAlt, FaComment, FaCog } from "react-icons/fa";

    

export default function LecturerDashboard() {
    
      //const [lecturerData, setLecturerData] = useState({});
      const [selectedItem, setSelectedItem] = useState<null|string>(null);
      const [profile, setProfile] = useState<boolean>(false);
    
    
      const handleItemClick = (itemName:null|string):void => {
        setSelectedItem(itemName);
      };
    
      return (
        <div>
          <div className="dashboard">
            <div className="aside-1">
              <div className="header-c">
                <figure className="f-logo">
                  <img className="logo" src={Logo} alt=" logo" />
                </figure>
                <p className='university-n'>
                  School of Pharmacy <br /> E-Attendance
                </p>
              </div>
    
              <ul className="aside-items" style={{ cursor: "pointer" }}>
                <li onClick={() => handleItemClick('lecturerDetails')} className="li-i">
                  <span className="images"><TbListDetails/></span> Lecturer's Details
                </li>
                <li onClick={() => handleItemClick('qrcode')} className="li-i">
                  <span className="images"><HiOutlineQrcode/></span>Generate QRcode
                </li>
                <li onClick={() => handleItemClick('classList')} className="li-i">
                  <span className="images"><CiBoxList/></span> Class List
                </li>
                <li onClick={() => handleItemClick('dailyReport')} className="li-i">
                  <span className="images"><TbReport/></span> Daily Report
                </li>
              </ul>
    
              <div className="profile">
                <figure className="profilePic" onClick={() => setProfile(!profile)}>
                 <img className="pp" src={Profile} alt='profile'/>
                </figure>
                <figcaption>Profile</figcaption>
              </div>
    
              {/* Click to view the profile */}
              <div>
                {profile && (
                  <ul className='profile-list'>
                    <li className='profile-li' onClick={() => { handleItemClick('settings'); setProfile(!profile); }}>
                      <FaCog />Setting
                    </li>
                    <li className='profile-li' onClick={() => { handleItemClick('feedback'); setProfile(!profile); }}>
                      <FaComment />Feedback
                    </li>
                    <li className='profile-li' onClick={() => setProfile(!profile)}>
                      <Link to='/' className='Link'><FaSignOutAlt />Logout</Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
    
            <div className="aside-2">
              <div className="aside-top">
              <span className="aside-flex">
            <h1 style={{ textAlign: 'center', color: 'white',
          marginTop:'-0.7rem' }}>Lecturer's Name</h1>
            <p className="date" style={{
              marginLeft:'8rem',
              fontSize:"0.7rem"
            }}><RiTimeFill/>{Date()}</p>
            </span>
              </div>
              <div className="aside-down">
                {selectedItem === 'lecturerDetails' && (<p>come from database</p>)}
                {selectedItem === 'qrcode' &&  <p>qrcode</p>}
                {selectedItem === 'classList' && <p>claslist</p>}
                {selectedItem === 'dailyReport' && <p>daily report</p>}
                {selectedItem === 'feedback' && (<Feedback/>)}
                {selectedItem === 'settings' && (<h3>settings</h3>)}
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    
    

