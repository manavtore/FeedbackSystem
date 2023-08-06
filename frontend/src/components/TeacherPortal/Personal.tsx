import { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import { Questionarrie } from "../../types/types";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { AuthContext } from "../../context/AuthContext";
import PieChart from "./Piechart";
import Apex from "./Apex";
import LineChart from "./LineChart";
import { useSearchParams } from "react-router-dom";
import TopNav from "./Topnav";

type vote = {
  info: any;
  voteValue: {
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

export type state = {
  votes: vote;
  questions: Questionarrie;
  DepartmentVotes: [vote];
  SessionWise: [vote];
};

type action = {
  type: "GET VOTES" | "GET QUESTIONS" | "GET DEPARTMENT VOTES" | "SESSION WISE";
  payload: any;
};

const Personal = () => {
  ////////////
  ///////////////
  let { teacher } = useContext(AuthContext);
  const [queryParams] = useSearchParams();
  var query = "";
  let classQuery = "";
  queryParams.forEach((value, key) => {
    query = query + `${key}=${value}&`;
    if (key == "Class") {
      classQuery = classQuery + `${key}=${value}&`;
    }
  });
  // console.log(query);
  let initialState: state = {
    votes: {
      info: {},
      voteValue: { q0: 0, q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0 },
    },

    questions: {
      q0: "",
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
      q6: "",
      q7: "",
    },
    DepartmentVotes: [
      {
        info: {},
        voteValue: { q0: 0, q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0 },
      },
    ],
    SessionWise: [
      {
        info: {},
        voteValue: { q0: 0, q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0 },
      },
    ],
  };
  let reducer = (State: state, Action: action): state => {
    switch (Action.type) {
      case "GET VOTES":
        // console.log(Action.payload.data);
        return {
          ...State,
          votes: Action.payload.data,
        };
      case "GET QUESTIONS":
        return {
          ...State,
          questions: Action.payload.questions,
        };
      case "GET DEPARTMENT VOTES":
        return {
          ...State,
          DepartmentVotes: Action.payload.Department,
        };
      case "SESSION WISE":
        return {
          ...State,
          SessionWise:
            Action.payload.Session.length == undefined
              ? [Action.payload.Session]
              : Action.payload.Session,
        };
      default:
        return State;
    }
  };
  let [currentState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let fetchVotes = async () => {
      let response = await axios
        .get(`http://localhost:5000/api/getcomputedvotes/:/?${query}`, {
          withCredentials: true,
        })
        .catch((e) => {
          console.log(e.response.data);
          // toast.error(e.response.data.message);
        });
      if (!response || !response?.data) {
        return;
      }
      dispatch({
        type: "GET VOTES",
        payload: {
          data: response.data.votes,
        },
      });
    };
    let fetchQuestions = async () => {
      let response = await axios
        .get("http://localhost:5000/api/getquestions", {
          withCredentials: true,
        })
        .catch((e) => {
          console.log(e);
        });
      if (!response || !response?.data) {
        return;
      }
      // console.log(response.data);
      dispatch({
        type: "GET QUESTIONS",
        payload: {
          questions: response.data.questions[0],
        },
      });
    };
    let fetcDeptVotes = async () => {
      let response = await axios
        .get(
          `http://localhost:5000/api/getdepartmentvotes/${teacher?.DEPARTMENT}?${query}`,
          {
            withCredentials: true,
          }
        )
        .catch((e) => {
          console.log(e);
        });
      if (!response || !response?.data) {
        return;
      }
      console.log(response.data);
      dispatch({
        type: "GET DEPARTMENT VOTES",
        payload: {
          Department: response.data.DepartmentVotes,
        },
      });
    };
    let fetchSession = async () => {
      try {
        let res = await axios.get(
          `http://localhost:5000/api/getcomputedvotes/Session_id?${classQuery}`,
          {
            withCredentials: true,
          }
        );
        // console.log(res.data);
        dispatch({
          type: "SESSION WISE",
          payload: {
            Session: res.data.votes,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchSession();
    fetchVotes();
    fetcDeptVotes();
    fetchQuestions();
  }, []);
  let t = Object.entries(currentState.votes.voteValue).reduce((x, y) => {
    if (x[1] >= y[1]) {
      return x;
    } else return y;
  });
  console.log(currentState);
  return (
    <>
      {!currentState.DepartmentVotes.length ? (
        <h1>Loading</h1>
      ) : (
        <>
          <TopNav count={currentState.votes.info.count} />

          <div className="card-container">
            {currentState.votes.info.count == undefined ? (
              <h2>No Votes Found</h2>
            ) : (
              <div className="cards">
                <div className="info-card">
                  <h2>Average Marks</h2>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "Bold",
                      color:
                        Number(currentState.votes.info.Avg) > 2.5
                          ? "green"
                          : "yellow",
                    }}
                  >
                    <div className="icon">
                      <AssignmentRoundedIcon></AssignmentRoundedIcon>
                    </div>
                    {((Number(currentState.votes.info.Avg) * 10) / 4).toFixed(
                      2
                    )}
                    %
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#6d6565",
                        paddingTop: "5px",
                        fontWeight: "900",
                      }}
                    >
                      Out of 100%
                    </div>
                  </div>
                  <div>
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    >
                      <Rating
                        name="read-only"
                        value={Number(currentState.votes.info.Avg) / 8}
                        precision={0.5}
                        readOnly
                      />
                    </Box>
                  </div>
                </div>
                <div className="info-card">
                  <h2>Best Rated Question</h2>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: "Bold",
                      color: "green",
                    }}
                  >
                    <div className="icon">
                      <StarRoundedIcon></StarRoundedIcon>
                    </div>
                    {
                      Object.entries(currentState.questions).filter((e) => {
                        return e[0] == t[0];
                      })[0][1]
                    }
                    <div
                      style={{
                        color: "#6d6565",
                        fontSize: "13px",
                        paddingTop: "5px",
                        fontWeight: "900",
                      }}
                    >
                      {((t[1] * 20) / currentState.votes.info.count).toFixed(2)}
                      % MARKS
                    </div>
                  </div>
                  <div>
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    >
                      <Rating
                        name="read-only"
                        value={Number(t[1]) / currentState.votes.info.count}
                        precision={0.5}
                        readOnly
                      />
                    </Box>
                  </div>
                </div>
                <div className="info-card">
                  <h2>Department Ranking</h2>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "Bold",
                      color: "green",
                    }}
                  >
                    <div className="icon">
                      <AnalyticsIcon></AnalyticsIcon>
                    </div>
                    {currentState.DepartmentVotes.findIndex((e) => {
                      return e.info.T_Id == teacher?._id;
                    }) + 1}
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#6d6565",
                        paddingTop: "5px",
                        fontWeight: "900",
                      }}
                    >
                      In The {teacher?.DEPARTMENT} DEPARTMENT
                    </div>
                  </div>
                  <div>
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    >
                      <Rating
                        name="read-only"
                        value={Number(currentState.votes.info.Avg) / 8}
                        precision={0.5}
                        readOnly
                      />
                    </Box>
                  </div>
                </div>
              </div>
            )}
            {currentState.votes.info.count != undefined && (
              <div
                style={{
                  gridArea: "bar",
                }}
                className="graph-card"
              >
                <h2>QUESTION WISE ANALYSIS</h2>
                <Apex
                  State={currentState.votes.voteValue}
                  count={currentState.votes.info.count}
                  vertical={false}
                ></Apex>
              </div>
            )}
            {currentState.SessionWise.length > 0 &&
              currentState.votes.info.count != undefined && (
                <div className="graph-card" style={{ gridArea: "pie" }}>
                  <h2>SESSION WISE ANALYSIS</h2>
                  <PieChart State={currentState.SessionWise} />
                </div>
              )}

            {currentState.votes.info.count != undefined &&
              currentState.SessionWise.length > 0 && (
                <div
                  className="graph-card"
                  style={{
                    gridArea: "line",
                  }}
                >
                  <h2>SESSION PROGRESSION</h2>
                  <LineChart
                    State={currentState.SessionWise}
                    count={2}
                  ></LineChart>
                </div>
              )}
          </div>
        </>
        // <h1>hiis</h1>
      )}
    </>
    // <></>
  );
};

export default Personal;
