import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Props } from "../Login";

import Logo from "../../assets/ucclogo.png";

import "../../style/Login.css";
import { useToast } from "@chakra-ui/react";
import HttpService from "../../services/HttpService";
import { LoginResponse, LoginStudentResponse } from "../../services/User";
import { useDispatch } from "react-redux";
import { setStudentCredentials } from "../../services/studentReducer";

function StudentLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState<Props>({
    email: "",
    passWord: "",
  });

  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(inputs);
    try {
      const result = await HttpService.post<LoginStudentResponse>(
        "http://127.0.0.1/api/v1/auth/student/login",
        { student_id: inputs.studentID, password: inputs.passWord }
      );

      console.log(result);
      toast({
        title: "Success",
        description: result?.message,
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });
      let user = {
        name: result.student?.name,
        id: result?.student?.id,
        department: result.student?.department,
        contact: result.student?.phone_number,
        email: result.student?.email,
        accessToken: result?.access_token,
      };
      dispatch(setStudentCredentials(user));
      navigate("/StudentDashboard");

      setInputs({
        studentID: "", // Change from lecturerID to lecturer_id
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

    // Check if the authentication was successful
  };

  return (
    <div className="Login">
      <figure className="P-logo">
        <img src={Logo} alt="Pharmacy Logo" className="p-logo" />
      </figure>
      <p className="header">Student's Login </p>
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
          className="py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2"
          placeholder="Student ID"
          name="studentID"
          onChange={handleChange}
          value={inputs.studentID}
        />

        <input
          type="Password"
          className="py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2 mt-4"
          placeholder="Password"
          name="passWord"
          onChange={handleChange}
          value={inputs.passWord}
          required
        />

        {loading == false && (
          <button
            type="submit"
            className="w-[80%] bg-primary border-2 rounded-full py-2 mt-6 text-white hover:bg-[#0000ffa7] hover:border-none"
          >
            LOGIN
          </button>
        )}
        <br />
        <Link to="/SignUp">Sign Up</Link>

        <p style={{ fontSize: "0.9rem" }}>
          Forget Password?{" "}
          <span style={{ color: "red", marginRight: "0.8rem" }}>
            Click here
          </span>{" "}
        </p>
      </form>
    </div>
  );
}

export default StudentLogin;
