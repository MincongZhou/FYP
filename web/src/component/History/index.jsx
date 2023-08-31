import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import fetch, { promiseXhr } from "../../fetch";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Drawer from "../../component/Drawer";
import ReviewForm from "./ReviewForm";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

let message = {};
let reserveData = {};
export default function CustomizedTables(props) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [cancelOpen, setCancelOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [list, setList] = React.useState([]);
  const history = useNavigate();
  const [msgItem, setMsgItem] = React.useState("");
  const userInfo = sessionStorage.userInfo
    ? JSON.parse(sessionStorage.userInfo)
    : {};

  const isAdmin = JSON.parse(sessionStorage.userInfo).nickname === "admin";
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    fetch("/reserve", {}, (res) => {
      res.data.map((item) => {
        if (!item.parking) {
          item.parking = {};
        }
        // booking
        item.isCancel = isAdmin || item.user_id == userInfo.id;
        item.isRefuse = isAdmin || item.parking.user_id == userInfo.id;
      });

      // check booking
      if (isAdmin) {
      } else if (props.component) {
        res.data = res.data.filter(
          (item) => item.parking.user_id == userInfo.id
        );
      } else {
        res.data = res.data.filter((item) => item.user_id == userInfo.id);
      }

      setList(res.data);
      bookingClick("current", res.data);
    });
  }, [index]);

  const stateFun = (state) => {
    switch (state) {
      case "1":
        return "";
      case "2":
        return "";
      case "3":
        return "Cancelled";
      case "4":
        return "Success";
      case "5":
        return "Completed";

      default:
        break;
    }
  };

  const updateCommon = (res) => {
    message = res;
    setOpenDialog(true);
  };

  const commonClick = async (res) => {
    const data = {
      ...message,
      comment: res.comment,
      state: 5,
      star: res.rating,
    };
    // admin
    let getUser1 = await promiseXhr("/user/1", {
      method: "get",
    });
    var cw =
      Number(getUser1.data.point_minute) + Number(message.integral) * 10 * 0.15;
    await promiseXhr("/user/1", {
      method: "put",
      body: JSON.stringify({
        ...getUser1.data,
        point_minute: cw,
      }),
    });
    // get provider money
    let parkingUserId = await await promiseXhr(
      "/user/" + message.parking.user_id,
      {
        method: "get",
      }
    );
    let parkingCw = Number(message.integral) * 10;
    await promiseXhr("/user/" + message.parking.user_id, {
      method: "PUT",
      body: JSON.stringify({
        ...parkingUserId.data,
        point_minute:
          Number(parkingUserId.data.point_minute) + parkingCw * 0.85,
      }),
    });

    // get point
    let userId = await promiseXhr("/user/" + userInfo.id, {
      method: "get",
    });
    const integral =
      Number(userId.data.integral || 0) + parseInt(Number(message.integral));
    await promiseXhr("/user/" + userInfo.id, {
      method: "PUT",
      body: JSON.stringify({
        ...userInfo,
        integral,
      }),
    });
    await fetch(
      "/reserve/" + message.id,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      (res) => {
        setIndex((res) => res + 1);
      }
    );
  };

  const isWithin12Hours = (targetTime) => {
    const currentTime = new Date();
    const targetDateTime = new Date(targetTime);

    // compute time difference
    const timeDiff = targetDateTime.getTime() - currentTime.getTime();
    console.log(targetTime, timeDiff);

    // transfer time to hour
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    // check whether time difference beyond 12 hours
    return hoursDiff > 0 && Math.abs(hoursDiff) >= 12;
  };

  const onLocPay = (res) => {
    sessionStorage.payItem = JSON.stringify(res);
    history("/pay?type=3");
  };

  const updateService = (res, state) => {
    setCancelOpen(true);

    reserveData = {
      ...res,
      state,
    };
  };
  const reserveCallback = () => {
    fetch(
      "/reserve/" + reserveData.id,
      {
        method: "PUT",
        body: JSON.stringify(reserveData),
      },
      (res) => {
        setIndex((res) => res + 1);
      }
    );
  };
  const bookingClick = (v, data = []) => {
    if (props.component) {
      return setData(data);
    }
    if (v === "current") {
      setData((data.length ? data : list).filter((itme) => itme.state < 5));
    } else {
      setData((data.length ? data : list).filter((itme) => itme.state >= 5));
    }
  };
  return (
    <div style={!props.component ? { width: "97%", margin: "0 auto" } : {}}>
      <div style={{ height: "15px" }}></div>
      <div style={{ marginBottom: "10px" }}>
        {!props.component && (
          <div>
            <Button
              onClick={() => bookingClick("current")}
              style={{ marginRight: "10px" }}
              variant="contained"
            >
              current booking
            </Button>
            <Button
              onClick={() => bookingClick("post")}
              style={{ marginRight: "10px" }}
              variant="contained"
            >
              past booking
            </Button>

            <Button onClick={() => history("/map")} variant="contained">
              new booking
            </Button>
          </div>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell align="right">Start Time</StyledTableCell>
              <StyledTableCell align="right">End Time</StyledTableCell>
              <StyledTableCell align="right">Day/Hour</StyledTableCell>
              <StyledTableCell align="right">Total Fee</StyledTableCell>
              <StyledTableCell align="right">point</StyledTableCell>
              {isAdmin && (
                <StyledTableCell align="right">Earning</StyledTableCell>
              )}
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Option</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.parking.name}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.parking.address}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.start_time}
                </StyledTableCell>
                <StyledTableCell align="right">{row.end_time}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.type === "1" ? "Day" : "Hour"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.total_prices}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.integral || 0}
                </StyledTableCell>
                {isAdmin && (
                  <StyledTableCell align="right">
                    {Number(row.total_prices * 0.15).toFixed(2)}
                  </StyledTableCell>
                )}

                <StyledTableCell align="right">
                  {stateFun(row.state)}
                </StyledTableCell>
                <StyledTableCell align="right" component="th" scope="row">
                  <div>
                    {row.isCancel &&
                      (row.state == 1 || row.state == 4) &&
                      isWithin12Hours(row.start_time) && (
                        <Button onClick={() => updateService(row, 3)}>
                          Cancel
                        </Button>
                      )}
                    {!isAdmin && row.isCancel && row.state === "4" && (
                      <Button onClick={() => updateCommon(row)}>Comment</Button>
                    )}
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ReviewForm
        open={openDialog}
        onClick={commonClick}
        onClose={setOpenDialog}
      ></ReviewForm>
      <Dialog open={cancelOpen} onClose={() => setCancelOpen(false)}>
        <DialogContent>
          <DialogContentText>
            <div style={{ width: "500px" }}>
              Whether to perform this operation?
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelOpen(false)}>cancel</Button>
          <Button onClick={() => [setCancelOpen(false), reserveCallback()]}>
            submit
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer open={open} msg={msgItem} disabled={true} setOpen={setOpen} />
    </div>
  );
}
