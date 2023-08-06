import React, { createContext, useState } from "react";
import { Student, Teacher } from "../types/types";
import axios from "axios";

type AuthContextType = {
  teacher: Teacher | undefined;
  setTeacher: any;
  student: Student | undefined;
  setStudent: any;
  setUser: () => boolean;
};
type AuthContextProviderType = {
  children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthContextProviderType) => {
  const [teacher, setTeacher] = useState<Teacher | undefined>();
  const [student, setStudent] = useState<Student | undefined>();
  const setUser = () => {
    console.log("auth hit");
    if (
      localStorage.getItem("Valid") != null &&
      JSON.parse(localStorage.getItem("Valid") || "") > Date.now()
    ) {
      let data = JSON.parse(localStorage.getItem("User") || "");
      data?.Role == "Teacher" || "Admin" ? setTeacher(data) : setStudent(data);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{ teacher, setTeacher, student, setStudent, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
