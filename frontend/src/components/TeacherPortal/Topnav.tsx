import axios from "axios";
import React from "react";
import { AuthContext } from "../../context/AuthContext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSearchParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import InfoIcon from "@mui/icons-material/Info";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
interface props {
  count: Number;
}
const TopNav = (Prop: props) => {
  /////
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  /////
  let [queryParams] = useSearchParams();
  const { teacher } = React.useContext(AuthContext);
  let [fetchData, setdata] = React.useState<{
    Classes: { name: string; id: string }[];
    Session: [];
  }>();
  let query: string[][] = [];
  queryParams.forEach((e, i) => {
    query.push([e, i]);
  });
  React.useEffect(() => {
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
  function handler(query: string): void {
    document.querySelector("." + query)?.classList.toggle("abs-remover");
  }
  function opener() {
    document.querySelector(".sidenav")?.classList.remove("closer");
  }
  return (
    <header>
      <div onClick={(e) => opener()} className="small-screen">
        <MenuIcon style={{ color: "black" }}></MenuIcon>
      </div>
      {Prop.count != 0 && (
        <>
          <form className="option-container">
            <div className="Dropdowns">
              <h5 onClick={(e) => handler("session")}>
                Select Session
                <ArrowDropDownIcon />
              </h5>
              <div className="drop-options session abs-remover">
                {fetchData?.Session.map((e: string, i) => {
                  return (
                    <div key={i}>
                      <input
                        type="checkbox"
                        id={e}
                        name="Session_id"
                        value={e}
                        key={i}
                      ></input>
                      <label htmlFor={e}>{e}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="Dropdowns">
              <h5 onClick={(e) => handler("class")}>
                Select Class <ArrowDropDownIcon />
              </h5>
              <div className="drop-options class abs-remover">
                {fetchData?.Classes.map((e, i) => {
                  return (
                    <div key={i}>
                      <input
                        type="checkbox"
                        id={e.name}
                        name="Class"
                        value={e.name}
                      ></input>
                      <label htmlFor={e.name}>{e.name}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <input type="submit" id="filter"></input>
          </form>
          <div className="filter-info">
            <div
              className="img"
              onClick={(e) => {
                e.currentTarget.classList.toggle("coloradder");
                console.log(e.currentTarget.classList);
                handler("infobox");
              }}
            ></div>
            <div onClick={handleClick}>
              <InfoIcon></InfoIcon>
            </div>
            <Snackbar open={open} autoHideDuration={7000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                {queryParams.size == 0
                  ? "The Data Shown is Produced By Evaluating All The Votes Present on the Database associated with this Id"
                  : query.map((e, i) => {
                      return (
                        <p key={i} style={{ fontWeight: "bold" }}>
                          {String(e[1])}={String(e[0])}
                          {i == query.length - 1 ? (
                            <p>Votes Evaluated :{String(Prop.count)}</p>
                          ) : (
                            ""
                          )}
                        </p>
                      );
                    })}
              </Alert>
            </Snackbar>
          </div>
        </>
      )}

      <div className="avatar">
        <Link to="/myaccount">
          <Avatar style={{ backgroundColor: "red" }}>
            {teacher?.NAME.slice(0, 1)}
          </Avatar>
        </Link>
      </div>
      {/* {console.log(queryParams)} */}
    </header>
  );
};

export default TopNav;
