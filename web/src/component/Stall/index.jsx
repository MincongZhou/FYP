import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import History from "../../component/History";
import Stack from "@mui/material/Stack";
import fetch from "../../fetch";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Drawer from "../../component/Drawer";
let parkingRow = ""

// Component styling for table cell and table row
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

// Stack component style
const stackStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "16px",
};

// The component itself
export default function CustomizedTables() {
  // State management with React hooks
  const [open, setOpen] = React.useState(false); // Controls the open/close state of the Drawer
  const [type, setType] = React.useState(1); // Switches between 'My Listing' and 'My Order' views
  const [cancelOpen, setCancelOpen] = React.useState(false); // Controls the open/close state of the cancel dialog
  const [parkings, setParkings] = React.useState([]); // Stores the parking data from the server
  const [msgItem, setMsgItem] = React.useState(""); // Stores the current message item

  // Effect hook that fetches parking data when the 'open' state changes
  React.useEffect(() => {
    if (open) {
      return;
    }
    fetch("/parking", {}, res => {
      if (JSON.parse(sessionStorage.userInfo).nickname === "admin") {
        setParkings(res.data);
        return;
      }
      setParkings(
        res.data.filter(
          item => item.user_id == JSON.parse(sessionStorage.userInfo).id
        )
      );
    });
  }, [open]);

  // Function to handle reservation
  const reserveCallback = () => {
    fetch(
      "/parking/" + parkingRow.id,
      {
        method: "PUT",
        body: JSON.stringify({
          ...parkingRow,
          visible: "0",
        }),
      },
      res => {
        fetch("/parking", {}, res => {
          setParkings(res.data);
        });
      }
    );
  };

  // Function to handle parking deletion
  const deleteFun = row => {
    parkingRow = row
    setCancelOpen(true);
  };

  // Component return statement, containing all the JSX
  return (
    <div style={{ width: "97%", margin: "0 auto" }}>
      <div style={{ height: "15px" }}></div>
      {}
      <Button
        onClick={() => [setType(1)]}
        style={{ marginBottom: "10px", marginRight: "10px" }}
        variant="contained"
      >
        My Listing
      </Button>
      <Button
        onClick={() => [setType(2)]}
        style={{ marginBottom: "10px", marginRight: "10px" }}
        variant="contained"
      >
        My Order
      </Button>

      {type === 2 && <History component={true}></History>}

      {type === 1 && (
        <div>
          <Button
            onClick={() => [setMsgItem(""), setOpen(true)]}
            style={{ marginBottom: "10px", marginRight: "10px" }}
            variant="contained"
          >
            new listing
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Intro</StyledTableCell>
                  <StyledTableCell align="right">Address</StyledTableCell>
                  <StyledTableCell align="right">Price/dat</StyledTableCell>
                  <StyledTableCell align="right">Price/hour</StyledTableCell>
                  <StyledTableCell align="right">Coordinate</StyledTableCell>
                  <StyledTableCell align="right">Option</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parkings
                  .filter(item => item.visible != "0")
                  .map(row => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.description}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.address}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.price_per_day}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.price_per_hour}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.latitude}
                        {row.longitude}
                      </StyledTableCell>
                      <StyledTableCell align="right" component="th" scope="row">
                        <div>
                          <Button
                            onClick={() => [setMsgItem(row), setOpen(true)]}
                          >
                            update
                          </Button>
                          <Button onClick={() => deleteFun(row)}>delete</Button>
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog open={cancelOpen} onClose={() => setCancelOpen(false)}>
            <DialogContent>
              <DialogContentText>
                <div style={{ width: "500px" }}>Whether to perform this operation?</div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setCancelOpen(false)}>cancel</Button>
              <Button onClick={() => [setCancelOpen(false), reserveCallback()]}>
              submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      <Drawer open={open} msg={msgItem} setOpen={setOpen} />
    </div>
  );
}
