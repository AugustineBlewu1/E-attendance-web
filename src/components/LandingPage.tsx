import { useNavigate } from "react-router-dom";
import Logo from "../assets/ucclogo1.png";
import { setCredentials } from "../services/userReducer";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import HttpService from "../services/HttpService";
import { LoginResponse } from "../services/User";
import Loading from "./UI/Loading";
import { setAdminCredentials } from "../services/adminReducer";
import { setStudentCredentials } from "../services/studentReducer";

function LandingPage() {
  // buttons containing links to either the administrator, student or lecturer's login
 

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

  type Inputs = {
    emailorStudnetId: string;
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
    console.log(data);

    try {
      setLoading(true);

      // Determine userType based on provided data (email vs student ID)
      const isStudent = !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailorStudnetId)); 
      // Check if it's a student ID (you can refine this)
      console.log("isStudent", isStudent)
      const payload = isStudent
        ? {
            student_id: data.emailorStudnetId.trim(),
            password: data.password.trim(),
          }
        : {
            email: data.emailorStudnetId.trim(),
            password: data.password.trim(),
          };

      // Send the request to the unified endpoint
      const result = await HttpService.post<LoginResponse>(
        "/api/v1/auth/login",
        payload
      );

      // Process the result based on user type
      if (isStudent) {
        if (result?.student?.must_change_password) {
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

          let student = {
            name: result.student?.name,
            id: result?.student?.id,
            department: result.student?.department,
            contact: result.student?.phone_number,
            email: result.student?.email,
            accessToken: result?.access_token,
            phone_number: result?.student?.phone_number,
          };
          dispatch(setStudentCredentials({ ...student }));
          navigate("/studentDashboard");
        }
      } else {
        // Lecturer/Admin processing
        toast({
          title: "Success",
          description: result?.message,
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });

        let user = {
          name: result.user?.name,
          id: result?.user?.id,
          department: result.user?.department,
          contact: result.user?.contact,
          email: result.user?.email,
          accessToken: result?.access_token,
        };

        // Admin logic based on role
        if (result.user?.role === "admin") {
          dispatch(setAdminCredentials(user));
          navigate("/adminDashboard");
        } else {
          dispatch(setCredentials(user));
          navigate("/lecturerDashboard");
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);
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
    <div className="h-screen flex justify-center md:items-center">
      <div
        className="mx-auto w-[90%]   h-auto  rounded bg-grey-bg shadow-sm
    md:w-[95%] md:flex md:justify-between md:items-center  md:px-[3%] md:py-[4rem]  lg:shadow-md
    lg:w-[70%]  lg:rounded-xl lg:px-[4%] lg:py-[1rem]"
      >
        <div>
          <figure>
            <a href="#">
              <img
                className="w-[20%]  py-[2rem] mx-auto md:py-[0.5rem] md:w-[50%] lg:max-w-[80%]"
                src={Logo}
                alt="ucc Logo"
              />
            </a>
          </figure>
          <h4 className="text-center mb-5">
            University of Cape Coast <br />
            School of Pharmacy and Pharmaceutical Sciences <br />
            <span className="text-primary "> Electronic Attendance </span>
          </h4>
        </div>

        <div className="bg-white flex flex-col justify-center items-center px-24 rounded-lg py-10">
          <p className="text-center font-bold text-2xl pb-10"> Login </p>
          <form
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4"
          >
            {/* ... (unchanged input fields) */}
            <div className="space-y-2 w-[22rem] ">
              <span>Email / Index Number</span>

              <input
                type="text"
                className="py-2 w-full  focus:border-2 focus:border-[#646cff] focus:outline-none pl-2"
                placeholder="Enter your email / Index Number"
                {...register("emailorStudnetId", {
                  required: "Email or Student ID is required",
                  validate: (value) => {
                    const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                      value
                    );
                    const isStudentId = /^[A-Za-z0-9/]+$/.test(value); // Adjust this regex
                    if (!isEmail && !isStudentId) {
                      return "Please enter a valid email or student ID";
                    }
                    return true;
                  },
                })}
              />
              {errors.emailorStudnetId && (
                <span className="text-left text-rose-500 font-normal text-xs">
                  {errors?.emailorStudnetId?.message}
                </span>
              )}

              <div className="relative pt-4">
                <div className="relative w-full ">
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

            <div className="text-center pt-5 md:pt-5">
              {loading ? (
                <div className="text-center pt-3">
                  <Loading />
                </div>
              ) : (
                <button
                  type="submit"
                  className=" w-[80%]  mx-[10%] bg-primary border-2 rounded-full py-2  text-white    hover:bg-[#0000ffc7] hover:text-white hover:border-none
          lg:mt-[1.3rem]"
                >
                  LOGIN
                </button>
              )}
            </div>

            <p
              className="text-[0.9rem] mt-[2rem]  text-center
        lg:mt-[1.4rem]"
            >
              Forget Password?{" "}
              <span className="text-primary hover:text-active focus:text-active cursor-pointer">
                Click here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
