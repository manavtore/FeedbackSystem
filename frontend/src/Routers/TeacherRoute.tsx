import { Routes, Route } from "react-router-dom";

import Personal from "../components/TeacherPortal/Personal";
import MyAcc from "../components/TeacherPortal/MyAcc";
import SessionExpire from "../components/SessionExpire";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Teacher from "../components/TeacherPortal/Teacher";
import ClassManage from "../components/TeacherPortal/Class";
import Session from "../components/TeacherPortal/Session";
import Student from "../components/TeacherPortal/Student";
import ClassAction from "../components/TeacherPortal/ClassAction";
import UserAction from "../components/TeacherPortal/UserAction";

const TeacherRoute = () => {
  let { teacher } = useContext(AuthContext);
  return (
    <>
      {teacher?.Role == "Teacher" && (
        <Routes>
          <Route path="/" element={<Personal></Personal>}></Route>
          <Route path="/myaccount" Component={MyAcc}></Route>
          <Route path="*" Component={SessionExpire}></Route>
        </Routes>
      )}
      {teacher?.Role == "Admin" && (
        <Routes>
          <Route path="/" element={<Personal></Personal>}></Route>
          <Route path="/myaccount" Component={MyAcc}></Route>
          <Route path="/students" Component={Student}></Route>
          <Route path="/teachers" Component={Teacher}></Route>
          <Route path="/class" Component={ClassManage}></Route>
          <Route
            path="/classaction"
            element={<ClassAction></ClassAction>}
          ></Route>
          <Route path="/user" Component={UserAction}></Route>
          <Route path="/session" Component={Session}></Route>
          <Route path="*" Component={SessionExpire}></Route>
        </Routes>
      )}
    </>
  );
};

export default TeacherRoute;
