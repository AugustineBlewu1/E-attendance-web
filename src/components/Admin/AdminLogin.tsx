
import { useNavigate} from "react-router-dom";
import '../../style/Login.css';
import React, { useState } from 'react';
import {Props} from '../Login'
import Logo from '../../assets/ucclogo.png'

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
        <figure className="P-logo">
          <img src={Logo} alt="Pharmacy Logo" className="p-logo" />
        </figure>
        <p className="header" >Admin's Login </p>
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
              LOGIN
            </button>
        
          <p style={{ fontSize: '0.9rem' }}>
            Forget Password? <span style={{ color: 'red' }}>Click here</span>
          </p>
        </form>
      </div>
    );
  }
  
  export default AdminLogin;
  