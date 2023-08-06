import { useLocation, useNavigate } from "react-router-dom";
import TopNav from "./Topnav";
import { useEffect, useState } from "react";
import axios from "axios";
import { Vote, Class } from "../../types/types";
import { Button, TextField } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import SchoolIcon from "@mui/icons-material/School";
import SensorDoorIcon from "@mui/icons-material/SensorDoor";
import PeopleIcon from "@mui/icons-material/People";
import { toast, ToastContainer } from "react-toastify";

import DialogBox from "./Dialogbox";

const ClassAction = () => {
  const navigate = useNavigate();
  let [save, setsave] = useState(false);
  // let [votes, setVotes] = useState<Vote[]>([]);
  const location = useLocation();
  const [data, setData] = useState<Class>(location.state.classinfo);
  let [formData, SetFormdata] = useState<Class>(data);
  // useEffect(() => {
  //   axios
  //     .post(
  //       `http://localhost:5000/api/getclassvotes`,
  //       {
  //         TEACHERS: data.TEACHERS,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((res) => {
  //       // console.log(res.data);
  //       setVotes(res.data.votes);
  //       // console.log(data.TEACHERS);
  //     });
  // }, []);
  // var apex =
  //   votes?.length > 0
  //     ? votes?.reduce((x, y) => {
  //         return {
  //           info: {
  //             ...x.info,
  //             count: x.info.count + y.info.count,
  //           },
  //           voteValue: {
  //             q0: Number(x.voteValue.q0) + Number(y.voteValue.q0),
  //             q1: Number(x.voteValue.q1) + Number(y.voteValue.q1),
  //             q2: Number(x.voteValue.q2) + Number(y.voteValue.q2),
  //             q3: Number(x.voteValue.q3) + Number(y.voteValue.q3),
  //             q4: Number(x.voteValue.q4) + Number(y.voteValue.q4),
  //             q5: Number(x.voteValue.q5) + Number(y.voteValue.q5),
  //             q6: Number(x.voteValue.q6) + Number(y.voteValue.q6),
  //             q7: Number(x.voteValue.q7) + Number(y.voteValue.q7),
  //           },
  //         };
  //       })
  //     : {};
  function submitform() {
    axios
      .post(
        `http://localhost:5000/api/updateclass`,
        {
          ...data,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Update Successfully");
      });
    setTimeout(() => {
      navigate("/class");
    }, 1500);
  }
  return (
    <>
      <ToastContainer></ToastContainer>
      <TopNav count={0}></TopNav>
      <div className="myacc-wrap">
        <div
          className="cardinfo"
          style={{ position: "relative", height: "17rem" }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "20px",
              color: "white",
              padding: "10px",
              backgroundColor: "orange",
            }}
          >
            CLASS INFORMATION
          </h2>

          <h3
            style={{
              fontSize: "18px",
              // fontStyle:"italic",
              fontWeight: "Bold",
              color: "#666666",
              display: "flex",
              padding: " 0px 8px",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <SensorDoorIcon color="success"></SensorDoorIcon>
            {data.CLASS}
          </h3>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "Bold",
              color: "#666666",
              display: "flex",
              padding: " 0px 8px",

              alignItems: "center",
              gap: "8px",
            }}
          >
            <SchoolIcon color="success"></SchoolIcon>
            {data.DEPARTMENT}
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "Bold",
              color: "#666666",
              gap: "8px",
              padding: " 0px 8px",

              display: "flex",
              alignItems: "center",
            }}
          >
            <PeopleIcon color="success"></PeopleIcon>
            TEACHERS : {data.TEACHERS?.length}
          </div>

          {!save ? (
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => setsave(true)}
              style={{
                margin: "10px",
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            >
              Change
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                disabled
                color="primary"
                onClick={(e) => setsave(true)}
                style={{
                  margin: "10px",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
              >
                Change
              </Button>
            </>
          )}
        </div>
        <div className="account-section">
          {!save ? (
            <>
              <TextField
                disabled
                label="CLASS"
                value={data?.CLASS}
                variant="outlined"
              />
              <TextField
                disabled
                label="DEPARTMENT"
                value={data?.DEPARTMENT}
                variant="outlined"
              />
            </>
          ) : (
            <>
              <TextField
                label="CLASS"
                value={formData?.CLASS}
                variant="outlined"
                onChange={(e) => {
                  SetFormdata((old: any) => ({
                    ...old,
                    CLASS: e.target.value,
                  }));
                }}
              />
              <TextField
                onChange={(e) => {
                  SetFormdata((old: any) => ({
                    ...old,
                    DEPARTMENT: e.target.value,
                  }));
                }}
                label="DEPARTMENT"
                value={formData?.DEPARTMENT}
                variant="outlined"
              />
            </>
          )}

          <TextField disabled label="Id" value={data?._id} variant="outlined" />
          <TextField
            disabled
            label="Department"
            value={data?.TEACHERS.length}
            variant="outlined"
          />
          {!save ? (
            <>
              <Button disabled variant="contained">
                ADD TEACHERS
              </Button>
              <Button disabled variant="contained">
                Save
              </Button>
            </>
          ) : (
            <>
              <div className="addTeachers">
                <DialogBox
                  TEACHERS={data?.TEACHERS}
                  send={(arg) => {
                    setData((old) => ({
                      ...old,
                      TEACHERS: arg,
                    }));
                  }}
                ></DialogBox>
              </div>
              <Button
                type="submit"
                onClick={(e) => {
                  setsave(false);
                  submitform();
                }}
                variant="contained"
                color="success"
              >
                Save
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ClassAction;
