import { useNavigate } from "react-router-dom";

import { useState } from "react";

import Logo from "../../assets/ucclogo1.png";
import HttpService from "../../services/HttpService";
import { LoginResponse } from "../../services/User";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../services/userReducer";
import { useToast } from "@chakra-ui/react";
import Loading from "../UI/Loading";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { SubmitHandler, useForm } from "react-hook-form";
// ... (imports)

function LecturerLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

  type Inputs = {
    email: string;
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
    setLoading(true);

    try {
      const result = await HttpService.post<LoginResponse>(
        "/api/v1/auth/login",
        { email: data?.email?.trim(), password: data?.password?.trim() }
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
        name: result.user?.name,
        id: result?.user?.id,
        department: result.user?.department,
        contact: result.user?.contact,
        email: result.user?.email,
        accessToken: result?.access_token,
      };
      dispatch(setCredentials(user));
      navigate("/lecturerDashboard");
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
    <div className=" h-screen flex justify-center items-center overflow-y-auto">
      <div
        className="max-w-[80%] h-auto mx-auto  shadow-shadow-1 border-solid  border-2 rounded-xl 
      md:max-w-[85%]   md:px-9
        lg:max-w-[30%] lg:rounded-xl px-4 py-5"
      >
        <figure
          className="max-w-[30%] bg-white flex justify-center items-center my-0 md:my-5 pt-0 md:pt-5 mx-auto
      lg:my-0 "
        >
          <img
            src={Logo}
            alt="Pharmacy Logo"
            className="max-w-[80%] bg-white flex justify-center items-center my-2  mx-auto
        lg:max-w-[65%]"
          />
        </figure>
        <p className="text-center font-bold text-lg">Lecturer's Login </p>
        <form method="POST" onSubmit={handleSubmit(onSubmit)} className="mt-4">
          {/* ... (unchanged input fields) */}
          <div className="space-y-2 ">
            <span>Email</span>

            <input
              type="email"
              className="py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <span className="text-left text-rose-500 font-normal text-xs">
                {errors?.email?.message}
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
  );
}

export default LecturerLogin;
