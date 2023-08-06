import React, { useContext, useEffect, useReducer, useState } from "react";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Questionarrie, Session, Teacher } from "../types/types";
import axios from "axios";
import "../styles/student/Portal.css";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import mongoose from "mongoose";

const Portal = () => {
  let { student } = useContext(AuthContext);

  type state = {
    session: { _id: string; isValid: true | false };
    teacher: { _id: string; NAME: string };
    vote: {
      q0: number;
      q1: number;
      q2: number;
      q3: number;
      q4: number;
      q5: number;
      q6: number;
      q7: number;
    };
  };
  type action = {
    type: "SELECT TEACHER" | "SELECT SESSION" | "SAVE VOTE";
    payload: any;
  };
  let initial: state = {
    session: { _id: "", isValid: false },
    teacher: { _id: "", NAME: "" },
    vote: {
      q0: 0,
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      q5: 0,
      q6: 0,
      q7: 0,
    },
  };
  function reducer(state: state, action: action): state {
    switch (action.type) {
      case "SELECT TEACHER":
        return {
          ...state,
          teacher: { _id: action.payload._id, NAME: action.payload.NAME },
        };
      case "SELECT SESSION":
        return {
          ...state,
          session: {
            _id: action.payload._id,
            isValid: action.payload.isValid,
          },
        };
      case "SAVE VOTE":
        return {
          ...state,
          vote: {
            ...state.vote,
            [action.payload.question]: Number(action.payload.value),
          },
        };
    }
  }
  let [Currstate, dispatch] = useReducer(reducer, initial);

  const [Teacher, setTeacher] = useState<[Teacher]>();
  const [Sessionfetch, setSession] = useState<{
    success: boolean;
    session: [Session];
  }>();
  const [question, setQuestions] = useState<Questionarrie>();
  let fetchfn = async () => {
    let temp = await axios.get(" http://localhost:5000/api/getsessions", {
      withCredentials: true, //most and most important thing
    });
    let temp2 = await axios.get(`http://localhost:5000/api/teachers`, {
      withCredentials: true,
    });
    console.log(temp2);
    let questionResponse = await axios.get(
      "http://localhost:5000/api/getquestions",
      {
        withCredentials: true,
      }
    );
    setQuestions(questionResponse.data.questions[0]);
    setTeacher(temp2.data.teachers);
    setSession(temp.data);
  };
  // console.log(Teacher);
  useEffect(() => {
    fetchfn();
  }, []);
  let Formhandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(Currstate.vote).includes(0)) {
      toast.error("Please Vote in All the Fields", {
        style: { color: "black" },
      });
      return;
    }
    let votefn = async () => {
      try {
        let transfer = await axios.post(
          "http://localhost:5000/api/vote",
          {
            T_Id: Currstate.teacher._id,
            Session_id: Currstate.session._id,
            ...Currstate.vote,
          },
          {
            withCredentials: true,
          }
        );
        toast.info(transfer.data.message, {
          draggable: true,
          style: { color: "black" },
        });
        console.log(transfer.data);
      } catch (error) {
        toast.error("error");
        console.log(error);
      }
    };
    votefn();
  };
  return (
    <>
      {console.table(Currstate)}
      <ToastContainer />
      <div className="form-n-instruction">
        <form className="portal">
          <span>
            <label htmlFor="session">Select the Session</label>
            <select
              name="session"
              id="session"
              onChange={(event) => {
                let data = JSON.parse(event.target.value);

                !data.isActive &&
                  toast.error(
                    "The Selected Session is Invalid or Either Expired",
                    {
                      style: { color: "black" },
                    }
                  );

                dispatch({
                  type: "SELECT SESSION",
                  payload: {
                    _id: data.Name,
                    isValid: data.isActive ? true : false,
                  },
                });
              }}
            >
              <option value={undefined}>Select an option</option>
              {Sessionfetch?.session.map((e, i) => {
                return (
                  <option
                    value={JSON.stringify(e)}
                    key={i}
                    style={{ color: e.isActive ? "green" : "red" }}
                  >
                    {e.Name}
                  </option>
                );
              })}
            </select>
          </span>
          <span>
            <label htmlFor="Teacher">Select the Teacher</label>
            <select
              name="Teacher"
              id="Teacher"
              onChange={(event) => {
                let data = JSON.parse(event.target.value);
                dispatch({
                  type: "SELECT TEACHER",
                  payload: {
                    _id: data._id,
                    NAME: data.NAME,
                  },
                });
              }}
            >
              <option value={"selectTeacher"}>Select an option</option>
              {Teacher?.map((e, i) => {
                return (
                  <option value={JSON.stringify(e)} key={i}>
                    {e.NAME}
                  </option>
                );
              })}
            </select>
          </span>
        </form>
        <div className="instructions">
          <h2>Instructions</h2>
          <ul>
            <li>
              Select the green Sessions only for the voting as they Are Active
              Sessions
            </li>
            <li>For One Session You can vote a teacher only Once</li>
            <li>
              After selecting the Teacher and Valid Session,The voting Portal
              will Appear
            </li>
            <li>
              LeftMost Circle indicates Least marks and RightMost Indicates Most
              Marks
            </li>
          </ul>
        </div>
      </div>
      {Currstate.session.isValid && Currstate.teacher._id != "" && (
        <form className="feedback" onSubmit={(e) => Formhandler(e)}>
          <h3>{"Prof. " + Currstate.teacher?.NAME}</h3>
          <div className="feedback-form">
            <div>
              {Object.values(question || {})
                .slice(1, Object.values(question || {}).length - 1)
                .map((e, i) => {
                  return (
                    <div className="qna">
                      <div className="question">{e.toString()}</div>
                      <div className="Radios">
                        <Box
                          sx={{
                            "& > legend": { mt: 2 },
                          }}
                        >
                          <Rating
                            name="votes"
                            value={Object.values(Currstate.vote)[i]}
                            onChange={(event, newValue) => {
                              dispatch({
                                type: "SAVE VOTE",
                                payload: { question: `q${i}`, value: newValue },
                              });
                            }}
                          />
                        </Box>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <input type="submit" className="portal-submit"></input>
        </form>
      )}
    </>
  );
};

export default Portal;
