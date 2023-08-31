import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import fetch from "../../fetch";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import { TextField, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useState } from "react";

// Custom table cell style
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Custom table row style
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // Hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Custom table function
export default function CustomizedTables() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [issue, setIssue] = useState("");
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState("");
  const [msg, setMsg] = useState("");
  useEffect(() => {
    fetch("/explain", {}, (res) => {
      setData(res.data);
    });
  }, []);
  useEffect(() => {
    if (msg) {
      setIssue(msg.issue);
      setAnswer(msg.answer);
      setState(msg.state);
    } else {
    }
  }, [msg]);
  useEffect(() => {
    if (open) {
      return;
    }
    setIssue("");
    setAnswer("");
    setState("");
  }, [open]);
  const addOrUpdate = () => {
    const data = {
      issue,
      answer,
      state,
    };
    if (msg) {
      fetch(
        "/explain/" + msg.id,
        {
          method: "PUT",
          body: JSON.stringify(data),
        },
        (res) => {
          setOpen(false);
          fetch("/explain", {}, (res) => {
            setData(res.data);
          });
        }
      );
      return;
    }
    fetch(
      "/explain",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      (res) => {
        setOpen(false);
        fetch("/explain", {}, (res) => {
          setData(res.data);
        });
      }
    );
  };

  const deleteFun = () => {
    if (window.confirm("Are you sure?")) {
      fetch(
        "/parking/" + msg.id,
        {
          method: "delete",
        },
        (res) => {
          fetch("/explain", {}, (res) => {
            setData(res.data);
          });
        }
      );
    }
  };
  return (
    <div style={{ width: "97%", margin: "0 auto" }}>
      <div style={{ height: "15px" }}></div>
      <Button
        style={{ marginBottom: "10px" }}
        onClick={() => [setMsg(""), setOpen(true)]}
        variant="contained"
      >
        add
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>question</StyledTableCell>
              <StyledTableCell align="right">answer</StyledTableCell>
              <StyledTableCell align="right">status</StyledTableCell>
              <StyledTableCell align="right">operation</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.issue}
                </StyledTableCell>
                <StyledTableCell align="right">{row.answer}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.state == 1 ? "start" : "stop"}
                </StyledTableCell>
                <StyledTableCell align="right" component="th" scope="row">
                  <div>
                    <Button onClick={() => [setMsg(row), setOpen(true)]}>
                      edit
                    </Button>
                    <Button onClick={() => deleteFun()}>delete</Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Drawer width="400px" anchor={"right"} open={open}>
        <div className="drawer">
          <div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-controlled"
                label="question"
                value={issue}
                variant="standard"
                onChange={(event) => {
                  setIssue(event.target.value);
                }}
              />
              <TextField
                id="outlined-uncontrolled"
                variant="standard"
                label="answer"
                value={answer}
                onChange={(event) => {
                  setAnswer(event.target.value);
                }}
              />
              <p>status</p>
              <RadioGroup
                aria-label="answer"
                onChange={(event) => {
                  setState(event.target.value);
                }}
                value={state}
                name="answer"
              >
                <FormControlLabel value="1" control={<Radio />} label="start" />
                <FormControlLabel value="2" control={<Radio />} label="stop" />
              </RadioGroup>
            </Box>
          </div>
          <div>
            <Button variant="contained" onClick={() => setOpen(false)}>
              cancle
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              onClick={addOrUpdate}
              variant="contained"
            >
              {msg ? "edit" : "new"}
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
