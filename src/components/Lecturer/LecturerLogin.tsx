import { useNavigate } from "react-router-dom";
import "../../style/Login.css";
import React, { useState } from "react";

import { Props } from "../Login";
import Logo from "../../assets/ucclogo.png";
import HttpService from "../../services/HttpService";
import { LoginResponse } from "../../services/User";
import { setUser } from "../../services/userActions";
// ... (imports)

function LecturerLogin() {
 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState<Props>({
    lecturer_id: "",
    passWord: "",
  });

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
      // console.log(result);
      window.alert(result?.message);
      navigate("/LecturerDashboard");
      let user = {
        name: result.user?.name,
        id: result?.user?.id,
        department: result.user?.department,
        contact: result.user?.contact,
        email: result.user?.email,
        accessToken: result?.access_token,
      };
      setUser(user);
    } catch (error: any) {
      // console.log(error?.message);
      window.alert(error?.message);
    } finally {
      setLoading(false);
    }

    // Clear the input values after successful form submission
    setInputs({
      lecturer_id: "",
      passWord: "",
    });
  };

  return (
    <div className="Login">
      <figure className="P-logo">
        <img src={Logo} alt="Pharmacy Logo" className="p-logo" />
      </figure>
      <p className="header">Lecturer's Login </p>
      <form
        id="lecturerForm"
        className="Form"
        method="POST"
        onSubmit={handleSubmit}
      >
        {/* ... (unchanged input fields) */}

        <input
          type="email"
          className="indexNumber"
          placeholder="Email"
          name="lecturer_id"
          onChange={(e) => handleChange(e)}
          value={inputs.lecturer_id}
          required
        />

        <input
          type="password"
          className="password"
          placeholder="Password"
          name="passWord"
          onChange={handleChange}
          value={inputs.passWord}
          required
        />

        {loading && <span>Loading ...</span>}
        {loading == false && (
          <button type="submit" className="signIn">
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
