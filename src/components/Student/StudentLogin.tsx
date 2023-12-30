import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Props} from '../Login'

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
      <h1>Student's Login Section</h1>
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
          name="studentID" // This should match the key in your PHP script
          onChange={handleChange}
          value={inputs.studentID}
        />

        <input
          type="password"
          className="password"
          placeholder="password" // Corrected the spelling to match your PHP script
          name="passWord" // This should match the key in your PHP script
          onChange={handleChange}
          value={inputs.passWord}
          required
        />

        <button type="submit" className="signIn ">
          Sign In
        </button>
        <p style={{ fontSize: "0.9rem" }}>
          Forget Password?{" "}
          <span style={{ color: "red" }}>Click here</span>{" "}
          <Link to="/SignUp">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default StudentLogin;
