import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Props} from '../Login'

import Logo from '../../assets/ucclogo.png'

import '../../style/Login.css';

function StudentLogin() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<Props>({
    studentID: '',
    passWord: ''
  });
 


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
    const name:string = e.target.name;
    const value:string = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };



  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

      console.log(inputs);

      // Clear the input values after successful form submission
      setInputs({
        studentID: '', // Change from lecturerID to lecturer_id
        passWord: '',
      });

      // Check if the authentication was successful
      
        window.alert("login successful")
        navigate("/StudentDashboard");
      
      }
    

  return (
    <div className="Login">
      <figure className="P-logo">
          <img src={Logo} alt="Pharmacy Logo" className="p-logo" />
        </figure>
        <p className="header" >Student's Login </p>
      <form
        id="studentForm"
        className="Form"
        action=""
        method="POST"
        onSubmit={handleSubmit}
      >
        {/* ... (unchanged input fields) */}

        <input
          type="text"
          className="indexNumber"
          placeholder="Student ID"
          name="studentID" 
          onChange={handleChange}
          value={inputs.studentID}
        />

        <input
          type="Password"
          className="password"
          placeholder="Password" 
          name="passWord" 
          onChange={handleChange}
          value={inputs.passWord}
          required
        />

        <button type="submit" className="signIn">
          LOGIN
        </button> 
        <br />
        <Link to="/SignUp">Sign Up</Link>

        <p style={{ fontSize: "0.9rem" }}>
          Forget Password?{" "}
          <span style={{ color: "red", marginRight:'0.8rem'}}>Click here</span>{" "}
        </p>
      </form>
    </div>
  );
}

export default StudentLogin;
