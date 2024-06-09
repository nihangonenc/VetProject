import React, { useEffect } from "react";
import DoctorTableRow from "./DoctorTableRow";
import { getDoctors } from "../../services/DoctorApiServise";
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

function DoctorList() {
  const { doctors, updateDoctors } = useDoctor();

  useEffect(() => {
    async function fetchData() {
      try {
        const doctors = await getDoctors();
        updateDoctors(doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    }
    fetchData();
  }, []);

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#8bc34a",
      color: "#5d4037",
      fontSize: 21,
    },
  }));
  return (
    <>
      <CreateDoctorForm />
      <h2
        style={{ textAlign: "center", color: "#5d4037", marginBottom: "20px" }}
      >
        Vet Team
      </h2>
      <TableContainer component={Paper} className="table">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Mail</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>Work Days</StyledTableCell>
              <StyledTableCell>Operations</StyledTableCell>
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
    </>
  );
}

export default DoctorList;
