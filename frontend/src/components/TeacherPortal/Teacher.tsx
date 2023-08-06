import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { Teacher } from "../../types/types";
import TopNav from "./Topnav";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TeacherManage = () => {
  const navigate = useNavigate();
  let [teachers, setTeachers] = React.useState<Teacher[]>([]);
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/api/teachers", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        setTeachers(res.data.teachers);
      });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "SR",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "_id",
      headerName: "ObjectId",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "NAME",
      headerName: "Name",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "EMAIL",
      headerName: "Email",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "Role",
      headerName: "Role",
      headerClassName: "custom-header",
      flex: 1,
    },
    {
      field: "DEPARTMENT",
      headerName: "Department",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "action",
      headerName: "Actions",
      headerClassName: "custom-header",
      flex: 1.2,
      renderCell: (params) => {
        const handler = (
          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
          navigate(`/user/`, {
            state: {
              userinfo: params.row,
            },
          });
        };
        return (
          <Button
            size="small"
            color="success"
            variant="contained"
            onClick={handler}
          >
            Take Action
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <TopNav count={0}></TopNav>
      <div className="tables">
        <DataGrid
          sx={{
            "& .MuiDataGrid-cell": {
              fontWeight: 600,
              // backgroundColor: "white",
              // add more css for customization
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
              fontWeight: "bolder",
            },
          }}
          style={{ minHeight: "80vh", backgroundColor: "white" }}
          rows={teachers.map((e, i) => {
            return {
              ...e,
              id: i + 1,
            };
          })}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
};

export default TeacherManage;
