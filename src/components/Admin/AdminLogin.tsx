
import { useNavigate} from "react-router-dom";
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
     <div className="h-screen flex justify-center items-center">
       <div className="max-w-[80%] h-auto mx-auto  shadow-shadow-1 border-solid  border-2 rounded 
      md:max-w-[85%]   md:px-9
       lg:px-2 lg:max-w-[30%] lg:rounded-xl">
        <figure className="max-w-[30%] bg-white flex justify-center items-center my-5 mx-auto
      lg:my-0">
          <img src={Logo} alt="Pharmacy Logo" className=" max-w-[80%] bg-white flex justify-center items-center my-2 mx-auto
        lg:max-w-[65%]" />
        </figure>
        <p className="text-center" >Admin's Login </p>
        <form
          id="lecturerForm"
          className="Form"
        
          method="POST"
          onSubmit={handleSubmit}
        >
          {/* ... (unchanged input fields) */}
  
         <div className="space-y-2">
         <input
            type="text"
            className=" py-2 my-[1.5rem] w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2"
            placeholder="Admin Code *********"
            name="AdminCode"
            onChange={(e) => handleChange(e)}
            value={inputs.AdminCode}
            required
          />
  
          <input
            type="password"
            className=" py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2"
            placeholder="password"
            name="passWord"
            onChange={handleChange}
            value={inputs.passWord}
            required
          />
         </div>
  
          
            <button type="submit" className=" w-[80%] mt-[3rem] mx-[10%] bg-primary border-2 rounded-full py-2  text-white    hover:bg-[#0000ffc7] hover:text-white hover:border-none
          lg:mt-[1.3rem]">
              LOGIN
            </button>
        
          <p className='text-[0.9rem] mt-[2rem]  text-center
        lg:mt-[1.4rem]'>
            Forget Password? <span className='text-primary hover:text-active focus:text-active cursor-pointer'>Click here</span>
          </p>
        </form>
      </div>
     </div>
    );
  }
  
  export default AdminLogin;
  