import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { Class } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import TopNav from "./Topnav";

type state = {
  class: Class[] | [];
  count: number;
};

type action = {
  type: "GET CLASS";
  payload: any;
};

const ClassManage = () => {
  const navigate = useNavigate();
  //
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "SR",
      headerClassName: "custom-header",

      flex: 0.3,
      //  width: 70
    },
    {
      field: "_id",
      headerName: "ObjectId",
      flex: 1,

      headerClassName: "custom-header",
    },
    {
      field: "CLASS",
      headerName: "NAME",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "DEPARTMENT",
      headerName: "DEPARTMENT",
      // type: 'number',

      headerClassName: "custom-header",
      flex: 0.8,
    },
    {
      field: "TEACHERS",
      headerName: "TEACHERS",
      headerClassName: "custom-header",
      flex: 0.7,
      type: "number",

      // width: 160,
    },
    {
      field: "action",
      headerName: "ACTIONS",

      flex: 2,
      headerClassName: "custom-header",
      renderCell: (params) => {
        const handler = (
          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
          navigate(`/classaction/`, {
            state: {
              classinfo: Current.class?.filter((e) => {
                return e.CLASS == params.row.CLASS;
              })[0],
            },
          });
        };

        return (
          <span style={{ display: "flex", gap: "10px" }}>
            <Button
              size="small"
              color="success"
              variant="contained"
              onClick={handler}
            >
              Take Action
            </Button>
            <Button size="small" variant="contained" color="error">
              <DeleteIcon></DeleteIcon>
            </Button>
          </span>
        );
      },
    },
  ];

  //
  ///fetching
  let initial: state = {
    class: [],
    count: 0,
  };
  let reducer = (State: state, Action: action): state => {
    switch (Action.type) {
      case "GET CLASS":
        return {
          ...State,
          class: Action.payload.data,
        };
    }
  };
  let [Current, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/showclass", {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: "GET CLASS", payload: { data: res.data.classes } });
      });
  }, []);

  ///

  return (
    <div>
      <TopNav count={0}></TopNav>
      <div
        style={{
          fontSize: "24px",
          fontWeight: "900",
          color: "#rgb(0 2 182)",
          textAlign: "center",
        }}
      >
        CLASS DATA
      </div>
      <div className="tables">
        {/* {console.log(Current.class[0].TEACHERS.length)} */}
        <DataGrid
          sx={{
            "& .MuiDataGrid-cell": {
              fontWeight: 600,
              backgroundColor: "white",
              // add more css for customization
            },
            "& .MuiDataGrid-row": {
              border: "1px solid rgb(0,0,0,.16)",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "rgb(0,0,0,.08)",
              // color: "red"
            },
            "& .MuiDataGrid-column": {
              border: "1px solid rgb(0,0,0,.16)",

              fontSize: "14px ",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#1b9ef5",
            },
            "& .MuiToolbar-root": {
              color: "#eaeaea",
              fontWeight: "bolder",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              // backgroundColor: "blue",
              fontWeight: "bolder",
            },
          }}
          style={{ minHeight: "80vh", backgroundColor: "white" }}
          rows={Current.class?.map((e, i) => {
            return {
              id: i + 1,
              ...e,
              TEACHERS: e.TEACHERS?.length,
            };
          })}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          autoHeight
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
};

export default ClassManage;
