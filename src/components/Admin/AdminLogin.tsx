
import { useNavigate} from "react-router-dom";
import '../../style/Login.css';
import React, { useState } from 'react';
import {Props} from '../Login'

// ... (imports)


  
  function AdminLogin() {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState<Props>({
      AdminCode: '',
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
        AdminCode: '',
        passWord: ''
      });

      
      window.alert("login successful")
      navigate("/AdminDashboard");
    };
  
    return (
      <div className="Login">
        <h1>Administrator's Login Section</h1>
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
            placeholder="Admin Code *********"
            name="AdminCode"
            onChange={(e) => handleChange(e)}
            value={inputs.AdminCode}
            required
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
        
          <p style={{ fontSize: '0.9rem' }}>
            Forget Password? <span style={{ color: 'red' }}>Click here</span>
          </p>
        </form>
      </div>
    );
  }
  
  export default AdminLogin;
  