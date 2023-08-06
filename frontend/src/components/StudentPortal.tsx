import StudentNavbar from "../studentPortal/S_Navbar";
import StudentRouter from "../Routers/StudentRouter";

import SessionExpire from "./SessionExpire";
import React from "react";

const StudentPortal = () => {
  

  return (
    <div className="student-body">
      <StudentNavbar></StudentNavbar>
      <div>
        <StudentRouter />
      </div>
    </div>
  );
};

export default StudentPortal;
