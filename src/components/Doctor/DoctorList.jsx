import React, { useEffect, useState } from "react";
import DoctorTableRow from "./DoctorTableRow";
import { getDoctors, getDoctorsByName } from "../../services/DoctorApiServise";
import { useDoctor } from "../../contexts/DoctorContext";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateDoctorForm from "./CreateDoctorForm";
import AvailableDateList from "../AvailableDate/AvailableDateList";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";

function DoctorList() {
  const { doctors, updateDoctors } = useDoctor();
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    if (searchName === "") {
      async function fetchData() {
        try {
          const doctors = await getDoctors();
          updateDoctors(doctors);
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      }
      fetchData();
    }
  }, [searchName]);

  useEffect(() => {
    if (searchName !== "") {
      async function fetchData() {
        try {
          const doctors = await getDoctorsByName(searchName);
          updateDoctors(doctors);
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      }
      fetchData();
    }
  }, [searchName]);

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#8bc34a",
      color: "#5d4037",
      fontSize: 21,
    },
  }));
  return (
    <div style={{ marginBottom: "20px" }}>
      <CreateDoctorForm />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: "200px",
          marginRight: "250px",
          marginBottom: "25px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#5d4037",
            marginBottom: "20px",
          }}
        >
          Vet Team
        </h2>
        <TextField
          id="outlined-basic"
          label="Search By Name"
          placeholder="Search By Name"
          variant="outlined"
          color="success"
          value={searchName}
          type="text"
          name="name"
          onChange={(e) => setSearchName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <TableContainer component={Paper} className="table">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Phone</StyledTableCell>
              <StyledTableCell align="center">Mail</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">City</StyledTableCell>
              <StyledTableCell align="center">Work Days</StyledTableCell>
              <StyledTableCell align="center">Operations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <DoctorTableRow key={doctor.id} {...doctor} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AvailableDateList />
    </div>
  );
}

export default DoctorList;
