import React, { ChangeEvent } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { toast, ToastContainer } from "react-toastify";

import { Button, Chip, TextField, Theme, useTheme } from "@mui/material";
import { Teacher } from "../../types/types";
import axios from "axios";
interface props {
  TEACHERS: string[];
  send: (arg: string[]) => void;
}

const DialogBox = (Props: props) => {
  var text = "";
  Props.TEACHERS?.map((e) => {
    text += `id=${e}&`;
  });
  const [open, setOpen] = React.useState(false);
  const [fetch, setFetch] = React.useState<Teacher[]>([]);
  const [search, setsearch] = React.useState("");
  const [chip, setchip] = React.useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/teachers?${text}`, {
        withCredentials: true,
      })
      .then((res) =>
        // console.log(res.data)
        res.data?.teachers?.map((e: any) => {
          setchip((old) => ({ ...old, [e.NAME]: e._id }));
        })
      );
    console.log(chip);
  }, []);

  React.useEffect(() => {
    const debounce = setTimeout(() => {
      search == ""
        ? setFetch([])
        : axios
            .get(`http://localhost:5000/api/teachers?keyword=${search}`, {
              withCredentials: true,
            })
            .then((res) => setFetch(res.data.teachers));
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [search]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  function handleDelete(e: any): void {
    let t = { ...chip };
    delete t[e];
    setchip(t);
  }
  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <Button
        variant="contained"
        color="info"
        style={{ fontWeight: "bold" }}
        onClick={handleClickOpen}
      >
        ADD TEACHERS
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>TEACHERS</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="filled"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
          <div>
            {fetch &&
              fetch?.map((e, i) => {
                return (
                  <div
                    className="search-drops"
                    key={i}
                    onClick={(event) =>
                      setchip((old) => ({
                        ...old,
                        [e.NAME]: String(e._id),
                      }))
                    }
                  >
                    {e.NAME}
                  </div>
                );
              })}
          </div>
          <div className="text-chips">
            {
              <div className="chips">
                {Object.entries(chip).map((e) => {
                  return (
                    <span>
                      <Chip
                        label={e[0]}
                        color="success"
                        onDelete={(event) => handleDelete(e[0])}
                      />
                    </span>
                  );
                })}
              </div>
            }
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={(e) => {
              Props.send(Object.values(chip));
              handleClose(e);
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogBox;
