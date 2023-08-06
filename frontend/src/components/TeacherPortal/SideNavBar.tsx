import axios from "axios";
import React, { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Button from "@mui/material/Button";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Man4Icon from "@mui/icons-material/Man4";
import ClassIcon from "@mui/icons-material/Class";
import BallotIcon from "@mui/icons-material/Ballot";

const SideNavBar = () => {
  const [activeLink, setActiveLink] = React.useState("");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  const { teacher, setTeacher } = React.useContext(AuthContext);
  let [fetchData, setdata] = React.useState<{
    Classes: { name: string; id: string }[];
    Session: [];
  }>();

  useEffect(() => {
    let fetch = async () => {
      let res = await axios.get(
        `http://localhost:5000/api/showclass?T_Id=${teacher?._id}`,
        {
          withCredentials: true,
        }
      );
      let res2 = await axios.get(`http://localhost:5000/api/getsessions`, {
        withCredentials: true,
      });
      setdata((prev) => ({
        ...prev,
        Classes: res.data.classes?.map((e: any) => {
          return { name: String(e.CLASS), id: e._id };
        }),
        Session: res2.data.session?.map((e: any) => {
          return String(e.Name);
        }),
      }));
    };
    fetch();
  }, []);
  function MenuToggler(): void {
    document.querySelector(".sidenav")?.classList.toggle("closer");
  }

  // console.log(fetchData);
  return (
    <div className="sidenav">
      <p
        id="cross"
        className="small-screen"
        style={{
          padding: "10px 0px 0px 10px",
          cursor: "pointer",
          position: "absolute",
        }}
        onClick={(e) => MenuToggler()}
      >
        &#10060;
      </p>
      <div className="logo">
        <img src="/src/images/FEEDBACK_SYMBOL.jpg" width={40}></img>
        <span>FEEDBACK SYSTEM</span>
      </div>
      <div className="route-logout">
        <ul>
          <Link
            to="/"
            onClick={(e) => handleLinkClick("/")}
            className={location.pathname === "/" ? "active" : ""}
          >
            <EqualizerIcon></EqualizerIcon>
            <span>Analytics</span>
          </Link>

          <Link
            to="/myaccount"
            onClick={(e) => handleLinkClick("/myaccount")}
            className={location.pathname === "/myaccount" ? "active" : ""}
          >
            <AccountBoxIcon></AccountBoxIcon>
            <span>My Account</span>
          </Link>
          {teacher?.Role == "Admin" && (
            <>
              <Link
                to="/students"
                onClick={(e) => handleLinkClick("/students")}
                className={location.pathname === "/students" ? "active" : ""}
              >
                <ManageAccountsIcon></ManageAccountsIcon>
                <span>Students</span>
              </Link>

              <Link
                to="/teachers"
                onClick={(e) => handleLinkClick("/teachers")}
                className={
                  window.location.pathname === "/teachers" ? "active" : ""
                }
              >
                <Man4Icon></Man4Icon>
                <span>Teachers</span>
              </Link>

              <Link
                to="/class"
                onClick={(e) => handleLinkClick("/class")}
                className={location.pathname === "/class" ? "active" : ""}
              >
                <ClassIcon></ClassIcon>
                <span>Classes</span>
              </Link>

              <Link
                to="/session"
                className={location.pathname === "/session" ? "active" : ""}
                onClick={(e) => handleLinkClick("/session")}
              >
                <BallotIcon></BallotIcon>
                <span>Sessions</span>
              </Link>
            </>
          )}
        </ul>

        <Button
          variant="contained"
          onClick={() => {
            localStorage.clear();
            setTeacher();
          }}
        >
          LogOut
        </Button>
      </div>
    </div>
  );
};

export default SideNavBar;
