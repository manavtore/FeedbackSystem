import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";

const MyAcc = () => {
  React.useEffect(() => {
    document.documentElement.style.background = "#fffff";
  });
  let { teacher, setTeacher } = useContext(AuthContext);
  let [save, setsave] = useState(false);
  let [formData, SetFormdata] = useState<{
    NAME: String | undefined;
    EMAIL: string | undefined;
  }>({ NAME: teacher?.NAME, EMAIL: teacher?.EMAIL });
  function submitform(): void {
    let wait = async () => {
      try {
        let change = await axios.post(
          "http://localhost:5000/api/updateteacher",
          {
            ...formData,
          },
          {
            withCredentials: true,
          }
        );
        toast.success("Profile Modified");
        setTimeout(() => {
          setTeacher();
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
              <Avatar style={{ backgroundColor: "red" }}>
                {teacher?.NAME.slice(0, 1)}
              </Avatar>
            </div>
            <h2>{teacher?.NAME}</h2>
            <h3>{teacher?.DEPARTMENT}</h3>
            <h4>{teacher?.EMAIL}</h4>
            <h6>{String(teacher?._id)}</h6>
          </div>
          <div className="account-section">
            {!save ? (
              <>
                <TextField
                  disabled
                  label="Name"
                  value={teacher?.NAME}
                  variant="outlined"
                />
                <TextField
                  disabled
                  label="Email"
                  value={teacher?.EMAIL}
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
              value={teacher?._id}
              variant="outlined"
            />
            <TextField
              disabled
              label="Department"
              value={teacher?.DEPARTMENT}
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
