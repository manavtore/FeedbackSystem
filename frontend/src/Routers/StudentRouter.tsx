import { Routes, Route } from "react-router-dom";
import Home from "../studentPortal/HomePage";
import Portal from "../studentPortal/Portal";
import MyAcc from "../studentPortal/MyAcc";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const StudentRouter = () => {
  return (
    <Routes>
      <Route path="/" Component={Home}></Route>
      <Route path="/portal" Component={Portal}></Route>
      <Route path="/myaccount" Component={MyAcc}></Route>
    </Routes>
  );
};

export default StudentRouter;
