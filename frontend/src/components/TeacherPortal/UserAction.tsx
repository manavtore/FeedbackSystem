import { Avatar, Button, TextField } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopNav from "./Topnav";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const UserAction = () => {
  const location = useLocation();
  const [user, setUser] = React.useState(location.state.userinfo);
  let [save, setSave] = React.useState(false);
  let nav = useNavigate();
  let handlesave = () => {
    console.log(user);
    axios
      .post(
        "http://localhost:5000/api/updateteacher",
        {
          ...user,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res.data.success);
        res.data.success == true && toast.success("Updated Succesfully");
        setTimeout(() => {
          nav("/teachers");
        }, 2000);
      });
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <TopNav count={0}></TopNav>
      <div className="myacc-wrap">
        <div className="user-info">
          <div className="avatar">
            <Avatar style={{ backgroundColor: "red" }}>
              {user?.NAME.slice(0, 1)}
            </Avatar>
          </div>
          <h2>{user?.NAME}</h2>
          <h3>{user?.Role}</h3>
          <h3>{user?.DEPARTMENT}</h3>
          <h4>{user?.EMAIL}</h4>
          <h6>{String(user?._id)}</h6>
        </div>
        <div className="account-section">
          {!save ? (
            <>
              <TextField
                disabled
                label="Name"
                value={user?.NAME}
                variant="outlined"
              />
              <TextField
                disabled
                label="Email"
                value={user?.EMAIL}
                variant="outlined"
              />
              <TextField
                disabled
                label="Role"
                value={user?.Role}
                variant="outlined"
              />
              <TextField
                disabled
                label="Department"
                value={user?.DEPARTMENT}
                variant="outlined"
              />
            </>
          ) : (
            <>
              <TextField
                label="Name"
                onChange={(e) => {
                  setUser((old: any) => ({ ...old, NAME: e.target.value }));
                }}
                value={user?.NAME}
                variant="outlined"
              />
              <TextField
                onChange={(e) => {
                  setUser((old: any) => ({ ...old, EMAIL: e.target.value }));
                }}
                type="email"
                label="Email"
                value={user?.EMAIL}
                variant="outlined"
              />
              <TextField
                label="Role"
                value={user?.Role}
                variant="outlined"
                onChange={(e) => {
                  setUser((old: any) => ({ ...old, Role: e.target.value }));
                }}
              />
              <TextField
                label="Department"
                value={user?.DEPARTMENT}
                variant="outlined"
                onChange={(e) =>
                  setUser((old: any) => ({
                    ...old,
                    DEPARTMENT: e.target.value,
                  }))
                }
              />
            </>
          )}

          {!save ? (
            <>
              <Button
                variant="contained"
                onClick={(e) => setSave(true)}
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
                  setSave(false);
                  handlesave();
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
  );
};

export default UserAction;
