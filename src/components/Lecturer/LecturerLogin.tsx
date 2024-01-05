
import { useNavigate} from "react-router-dom";
import '../../style/Login.css';
import React, { useState } from 'react';

import {Props} from '../Login'
import Logo from "../../assets/ucclogo.png"

// ... (imports)


  
  function LecturerLogin() {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState<Props>({
      lecturer_id: '',
      passWord: ''
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const name: string = e.target.name;
      const value: string = e.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
    };
  
    const handleSubmit = (e: React.FormEvent): void => {
      e.preventDefault();
      
      console.log(inputs);
  
      // Clear the input values after successful form submission
      setInputs({
        lecturer_id: '',
        passWord: ''
      });

      
      window.alert("login successful")
      navigate("/LecturerDashboard");
    };
  
    return (
      <div className="Login">
        <figure className="P-logo">
          <img src={Logo} alt="Pharmacy Logo" className="p-logo" />
        </figure>
        <p className="header" >Lecturer's Login </p>
        <form
          id="lecturerForm"
          className="Form"
        
          method="POST"
          onSubmit={handleSubmit}
        >
          {/* ... (unchanged input fields) */}
  
          <input
            type="text"
            className="indexNumber"
            placeholder="Lecturer ID"
            name="lecturer_id"
            onChange={(e) => handleChange(e)}
            value={inputs.lecturer_id}
          />
  
          <input
            type="password"
            className="password"
            placeholder="password"
            name="passWord"
            onChange={handleChange}
            value={inputs.passWord}
            required
          />
  
          
            <button type="submit" className="signIn">
              LOGIN
            </button>
        
          <p style={{ fontSize: '0.9rem' }} >
            Forget Password? <span style={{ color: 'red' }}>Click here</span>
          </p>
        </form>
      </div>
    );
  }
  
  export default LecturerLogin;
  