
import { useNavigate} from "react-router-dom";
import '../../style/Login.css';
import React, { useState } from 'react';

import {Props} from '../Login'

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
        <h1>Lecturer's Login Section</h1>
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
              Sign In
            </button>
        
          <p style={{ fontSize: '0.9rem' }} >
            Forget Password? <span style={{ color: 'red' }}>Click here</span>
          </p>
        </form>
      </div>
    );
  }
  
  export default LecturerLogin;
  