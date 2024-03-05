import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Props } from "../Login";
import Logo from "../../assets/ucclogo.png";
import { LoginResponse } from "../../services/User";
import HttpService from "../../services/HttpService";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import Loading from "../UI/Loading";
import { setAdminCredentials } from "../../services/adminReducer";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

// ... (imports)

function AdminLogin() {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const [loading, SetLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [inputs, setInputs] = useState<Props>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    SetLoading(true);

    // Clear the input values after successful form submission
    setInputs({
      email: "",
      password: "",
    });

    console.log(inputs);
    try {
      const result = await HttpService.post<LoginResponse>(
        "/api/v1/auth/loginAdmin",
        { email: inputs.email, password: inputs.password }
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
      dispatch(setAdminCredentials({ ...user }));
      navigate("/adminDashboard");

      setInputs({
        email: "", // Change from lecturerID to lecturer_id
        password: "",
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
      SetLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div
        className="max-w-[80%] h-auto mx-auto  shadow-shadow-1 border-solid  border-2 rounded 
      md:max-w-[85%]   md:px-9
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
        <p className="text-center">Admin's Login </p>
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
                className="py-2  w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2"
                placeholder="Email"
                name="email"
                onChange={(e) => handleChange(e)}
                value={inputs.AdminCode}
                required
              />
            
            <div className="relative">
            
              <input
                type={showPassword ? "text" : "password"}
                className=" py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2"
                placeholder="password"
                name="password"
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

          {loading ? (
            <div className="text-center pt-5">
              <Loading />
            </div>
          ) : (
            <button
              type="submit"
              className=" w-[80%] mt-[3rem] mx-[10%] bg-primary border-2 rounded-full py-2  text-white    hover:bg-[#0000ffc7] hover:text-white hover:border-none
          lg:mt-[1.3rem]"
            >
              LOGIN
            </button>
          )}

          <p
            className="text-[0.9rem] mt-[2rem]  text-center
        lg:mt-[1.4rem]"
          >
            Forget Password?{" "}
            <span
              className="text-primary hover:text-active focus:text-active cursor-pointer"
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
              Click here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
