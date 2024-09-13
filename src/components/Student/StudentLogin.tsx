import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/ucclogo1.png";

import "../../style/Login.css";
import { useToast } from "@chakra-ui/react";
import HttpService from "../../services/HttpService";
import { LoginStudentResponse } from "../../services/User";
import { useDispatch } from "react-redux";
import { setStudentCredentials } from "../../services/studentReducer";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Loading from "../UI/Loading";
import { SubmitHandler, useForm } from "react-hook-form";

function StudentLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();

  type Inputs = {
    indexNumber: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const result = await HttpService.post<LoginStudentResponse>(
        "/api/v1/auth/student/login",
        {
          student_id: data.indexNumber?.trim(),
          password: data.password?.trim(),
        }
      );

      console.log(result);

      if (result?.student?.must_change_password === true) {
        navigate("/updatePassword", {
          state: { token: result?.access_token },
        });
        toast({
          title: "Update Password",
          description: result?.message,
          status: "info",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
      } else {
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
        setLoading(false);
      }
    } catch (error: any) {
      // console.log(error?.message);
      setLoading(false);
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
        className="max-w-[80%] h-auto mx-auto  shadow-shadow-1 border-solid  border-2 rounded-xl 
      md:max-w-[85%] md:px-9
        lg:max-w-[30%] lg:rounded-xl px-4 py-5"
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
        <p className="text-center font-bold text-lg">Student's Login </p>
        <form
          className="mt-4"
          action=""
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
        
          <div className="space-y-2">
            <span>Student ID</span>
            <input
              type="text"
              className=" py-2  w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2"
              placeholder="Student ID"
              {...register("indexNumber", {
                required: "Student Index is required",
              })}
            />
            {errors.indexNumber && (
              <span className="text-left text-rose-500 font-normal text-xs">
                {errors?.indexNumber?.message}
              </span>
            )}

            <div className="relative">
              <div className="relative w-full">
                <span>Password</span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="py-2 w-full  focus:border-2 focus:border-[#646cff] focus:outline-none pl-2"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <span className="text-left text-rose-500 font-normal text-xs">
                    {errors?.password?.message}
                  </span>
                )}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-8 right-2 pr-2 flex items-center hover:border-none"
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </button>
              </div>
            </div>
          </div>

          <div className="text-center ">
            {loading ? (
              <div className="text-center pt-3">
                <Loading />
              </div>
            ) : (
              <button
                type="submit"
                className=" w-[80%] mt-[1.5rem] mx-[10%] bg-primary border-2 rounded-full py-2  text-white    hover:bg-[#0000ffc7] hover:text-white hover:border-none
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
            className="text-[0.9rem] mt-[20px]  text-center
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
