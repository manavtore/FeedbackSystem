import axios from "axios";
import React, { useContext, useState } from "react";
import "../styles/student/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { teacher, setTeacher, setStudent } = useContext(AuthContext);
  const [formData, setformData] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  let [url, setUrl] = React.useState("/api/loginteacher");
  let handler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:5000" + url,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Login Successful", {
          position: toast.POSITION.TOP_RIGHT,
        });

        if (response.data.user.Role == "Teacher" || "Admin") {
          setTeacher(response.data.user);
        } else {
          setStudent(response.data.user);
        }
        localStorage.setItem("User", JSON.stringify(response.data.user));
        localStorage.setItem(
          "Valid",
          JSON.stringify(Date.now() * 4 * 60 * 60 * 1000)
        );
      }
    } catch (error) {
      toast.error("err");
      console.log(error);
    }
  };
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setformData({ ...formData, [event.target.name]: event.target.value });
  };
  const [alignment, setAlignment] = React.useState("web");
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };
  console.log(url);
  return (
    <>
      <div className="Login-body">
        <div className="container">
          <div className="card">
            <h2>WELCOME TO FEEDBACK SYSTEM</h2>
            <ToggleButtonGroup
              value={alignment}
              onChange={handleChange}
              aria-label="Platform"
              color="success"
            >
              <ToggleButton
                style={{ color: "white", fontWeight: "bold" }}
                value="student"
                onClick={() => {
                  setUrl("/api/loginstudent");
                }}
              >
                Student
              </ToggleButton>
              <ToggleButton
                style={{ color: "white", fontWeight: "bold" }}
                value="teacher"
                onClick={() => {
                  setUrl("/api/loginteacher");
                }}
              >
                Teacher
              </ToggleButton>
              <ToggleButton
                style={{ color: "white", fontWeight: "bold" }}
                value="admin"
              >
                ADMIN
              </ToggleButton>
            </ToggleButtonGroup>

            <form onSubmit={handler}>
              <label htmlFor="email">EMAIL</label>

              <input
                className=""
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleFormChange}
              ></input>
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                name="password"
                value={formData?.password}
                onChange={handleFormChange}
              ></input>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default LoginPage;
