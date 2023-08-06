import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../context/AuthContext";

const MyAcc = () => {
  let { student, setStudent } = useContext(AuthContext);
  let [save, setsave] = useState(false);
  let [formData, SetFormdata] = useState<{
    NAME: String | undefined;
    EMAIL: string | undefined;
  }>({ NAME: student?.name, EMAIL: student?.email });
  function submitform(): void {
    let wait = async () => {
      try {
        let change = await axios.post(
          "http://localhost:5000/api/updatestudent",
          {
            ...formData,
          },
          {
            withCredentials: true,
          }
        );
        toast.success("Profile Modified");
        setTimeout(() => {
          setStudent();
          localStorage.clear();
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };
    wait();
  }
  function opener() {
    document.querySelector(".sidenav")?.classList.remove("closer");
  }
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <div
        style={{ margin: "10px 50px" }}
        className="small-screen"
        onClick={(e) => opener()}
      >
        <MenuIcon style={{ color: "black" }}></MenuIcon>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: "50rem",
          // height: "100vh",
        }}
      >
        <ToastContainer></ToastContainer>
        <div className="myacc-wrap">
          <div className="user-info">
            <div className="avatar">
              <Avatar style={{ backgroundColor: "red" }}>S</Avatar>
            </div>
            <h2>{student?.name}</h2>
            <h3>{student?.class}</h3>
            <h4>{student?.rollno}</h4>
            <h6>{String(student?.email)}</h6>
          </div>
          <div className="account-section" style={{ border: "1px solid blue" }}>
            {!save ? (
              <>
                <TextField
                  disabled
                  label="Name"
                  value={student?.name}
                  variant="outlined"
                />
                <TextField
                  disabled
                  label="Email"
                  value={student?.email}
                  variant="outlined"
                />
              </>
            ) : (
              <>
                <TextField
                  label="Name"
                  onChange={(e) => {
                    SetFormdata((old) => ({
                      ...old,
                      NAME: e.target.value,
                      EMAIL: old?.EMAIL,
                    }));
                  }}
                  value={formData?.NAME}
                  variant="outlined"
                />
                <TextField
                  onChange={(e) => {
                    SetFormdata((old) => ({
                      ...old,
                      EMAIL: e.target.value,
                      NAME: old?.NAME,
                    }));
                  }}
                  type="email"
                  label="Email"
                  value={formData?.EMAIL}
                  variant="outlined"
                />
              </>
            )}

            <TextField
              disabled
              label="Id"
              value={student?.rollno}
              variant="outlined"
            />
            <TextField
              disabled
              label="Department"
              value={student?.class}
              variant="outlined"
            />
            {!save ? (
              <>
                <Button
                  variant="contained"
                  onClick={(e) => setsave(true)}
                  style={{ alignSelf: "start" }}
                >
                  Change
                </Button>
                <Button
                  disabled
                  variant="contained"
                  style={{
                    alignSelf: "start",
                  }}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  disabled
                  variant="contained"
                  style={{ alignSelf: "start" }}
                >
                  Change
                </Button>
                <Button
                  type="submit"
                  onClick={(e) => {
                    setsave(false);
                    submitform();
                  }}
                  variant="contained"
                  style={{
                    alignSelf: "start",
                  }}
                >
                  Save
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyAcc;
