import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Props } from "../Login";

import Logo from "../../assets/ucclogo.png";

import "../../style/Login.css";
import { CircularProgress, useToast } from "@chakra-ui/react";
import HttpService from "../../services/HttpService";
import { LoginStudentResponse } from "../../services/User";
import { useDispatch } from "react-redux";
import { setStudentCredentials } from "../../services/studentReducer";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function StudentLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(inputs);
    try {
      const result = await HttpService.post<LoginStudentResponse>(
        "/api/v1/auth/student/login",
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
        phone_number: result?.student?.phone_number,
      };
      dispatch(setStudentCredentials({ ...user }));
      navigate("/studentDashboard");

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
    <div className="h-screen flex justify-center items-center overflow-y-auto">
      <div
        className="max-w-[80%] h-auto mx-auto  shadow-shadow-1 border-solid  border-2 rounded 
      md:max-w-[85%] md:px-9
        lg:max-w-[30%] lg:rounded-xl px-4"
      >
        <figure
          className="max-w-[30%] bg-white flex justify-center items-center my-5 mx-auto
      lg:my-0"
        >
          <img
            src={Logo}
            alt="Pharmacy Logo"
            className=" max-w-[80%] bg-white flex justify-center items-center my-2 mx-auto
        lg:max-w-[65%]"
          />
        </figure>
        <p className="text-center">Student's Login </p>
        <form
          id="studentForm"
          className="Form"
          action=""
          method="POST"
          onSubmit={handleSubmit}
        >
          {/* ... (unchanged input fields) */}

          <div className="space-y-2">
            <input
              type="text"
              className=" py-2 my-[1rem] w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2"
              placeholder="Student ID"
              name="studentID"
              onChange={handleChange}
              value={inputs.studentID}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2"
                placeholder="Password"
                name="passWord"
                onChange={handleChange}
                value={inputs.passWord}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-2 flex items-center"
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </button>
            </div>
          </div>

          <div className="">
            {loading && (
              <div className="items-center flex flex-row">
                {" "}
                <CircularProgress
                  isIndeterminate
                  color="#04A551"
                  size="20px"
                  thickness={"10px"}
                />
                <span className="ml-4"> Loading</span>
              </div>
            )}
            {loading == false && (
              <button
                type="submit"
                className=" w-[80%] mt-[3rem] mx-[10%] bg-primary border-2 rounded-full py-2  text-white    hover:bg-[#0000ffc7] hover:text-white hover:border-none
          lg:mt-[1.3rem]"
              >
                LOGIN
              </button>
            )}
          </div>

          {/* <Link
            to="/SignUp"
            className="lg:border-2 border-gradient-to-r from-blue-500 via-green-500 to-red  lg:w-[6rem] text-center lg:rounded-xl h-auto absolute top-8 right-8 hover:text-primary hover:border-primary"
          >
            Sign Up
          </Link> */}

          <p
            className="text-[0.9rem] mt-[2rem]  text-center
        lg:mt-[1.4rem]"
            onClick={() =>
              toast({
                title: "Info",
                description: "Coming Soon",
                status: "info",
                duration: 5000,
                isClosable: true,
                position: "top-right",
              })
            }
          >
            Forget Password?{" "}
            <span className="text-primary hover:text-active focus:text-active cursor-pointer">
              Click here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
