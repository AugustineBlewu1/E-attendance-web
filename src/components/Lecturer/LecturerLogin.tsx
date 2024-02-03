import { useNavigate } from "react-router-dom";
import "../../style/Login.css";
import React, { useState } from "react";

import { Props } from "../Login";
import Logo from "../../assets/ucclogo.png";
import HttpService from "../../services/HttpService";
import { LoginResponse } from "../../services/User";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../services/userReducer";
import { useToast } from "@chakra-ui/react";
// ... (imports)



function LecturerLogin() {
 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState<Props>({
    lecturer_id: "",
    passWord: "",
  });
  const dispatch = useDispatch();
  const toast = useToast();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    console.log(inputs);
    setLoading(true);

    try {
      const result = await HttpService.post<LoginResponse>(
        "http://127.0.0.1/api/v1/auth/login",
        { email: inputs.lecturer_id, password: inputs.passWord }
      );

       console.log(result);
      toast({
        title: "Success",
        description:result?.message,
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/LecturerDashboard");
      let user = {
        name: result.user?.name,
        id: result?.user?.id,
        department: result.user?.department,
        contact: result.user?.contact,
        email: result.user?.email,
        accessToken: result?.access_token,
      };
      dispatch(setCredentials(user));
      
      setInputs({
        lecturer_id: "",
        passWord: "",
      });
    } catch (error: any) {
      // console.log(error?.message);
      toast({
        title: "Error",
        description: error?.message,
        status: "error",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }

    // Clear the input values after successful form submission
    
  };

  return (
    <div className="Login">
      <figure className="P-logo">
        <img src={Logo} alt="Pharmacy Logo" className="p-logo" />
      </figure>
      <p className="">Lecturer's Login </p>
      <form
        id="lecturerForm"
        className="Form"
        method="POST"
        onSubmit={handleSubmit}
      >
        {/* ... (unchanged input fields) */}
      <div className="space-y-6">

      
        <input
          type="email"
          className="py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2"
          placeholder="Email"
          name="lecturer_id"
          onChange={(e) => handleChange(e)}
          value={inputs.lecturer_id}
          required
        />

        <input
          type="password"
          className="py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2"
          placeholder="Password"
          name="passWord"
          onChange={handleChange}
          value={inputs.passWord}
          required
        />
</div>
        {loading && <span>Loading ...</span>}
        {loading == false && (
          <button type="submit" className="w-[80%] bg-primary border-2 rounded-full py-2 mt-4 text-white hover:bg-[#0000ffa7] hover:border-none">
            LOGIN
          </button>
        )}

        <p style={{ fontSize: "0.9rem" }}>
          Forget Password? <span style={{ color: "red" }}>Click here</span>
        </p>
      </form>
    </div>
  );
}

export default LecturerLogin;
