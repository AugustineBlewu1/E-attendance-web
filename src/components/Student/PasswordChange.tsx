import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "../../assets/ucclogo1.png";

import "../../style/Login.css";
import { useToast } from "@chakra-ui/react";
import HttpService from "../../services/HttpService";
import { PasswordUpdate } from "../../services/User";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Loading from "../UI/Loading";
import { SubmitHandler, useForm } from "react-hook-form";

function PasswordChange() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let location = useLocation();
  const stateHere = location?.state;

  const toast = useToast();

  type Inputs = {
    current_password?: string;
    new_password: string;
    confirm_password: string;
  };
  console.log(stateHere);
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
      const result = await HttpService.postWithToken<PasswordUpdate>(
        "/api/v1/auth/student/passwordUpdate",
        stateHere?.token,
        {
          current_password: data?.current_password ?? "hello1234",
          new_password: data?.new_password,
          confirm_password: data?.confirm_password,
        }
      );

      console.log(result);
      toast({
        title: "Success",
        description: result?.message + "Login again to proceed",
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });

      navigate("/");
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast({
        title: "Error",
        description: error?.response?.data?.message,
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
        <p className="text-center">Update Password </p>
        <form
          className="py-12"
          action=""
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* ... (unchanged input fields) */}

          <div className="space-y-2">
            <input
              type="text"
              className=" py-2  w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2"
              placeholder="New Password"
              {...register("new_password", {
                required: "New Password is required",
              })}
            />
            {errors.new_password && (
              <span className="text-left text-rose-500 font-normal text-xs">
                {errors?.new_password?.message}
              </span>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2"
                placeholder="Confirm Password"
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (value, form) => value == form.new_password,
                })}
              />
              {errors.confirm_password && (
                <span className="text-left text-rose-500 font-normal text-xs">
                  {errors?.confirm_password?.message}
                </span>
              )}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-2 flex items-center"
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </button>
            </div>
          </div>

          <div className="text-center pt-5">
            {loading ? (
              <div className="text-center pt-3">
                <Loading />
              </div>
            ) : (
              <button
                type="submit"
                className=" w-[80%] mt-[3rem] mx-[10%] bg-primary border-2 rounded-full py-2  text-white    hover:bg-[#0000ffc7] hover:text-white hover:border-none
          lg:mt-[1.3rem]"
              >
                UPDATE
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordChange;
