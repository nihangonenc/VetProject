import React, { useEffect } from "react";
import AppointmentTableRow from "./AppointmentTableRow";
import { getAppointments } from "../../services/AppointmentApiService";
import { useAppointment } from "../../contexts/AppointmentContext";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateAppointmentForm from "./CreateAppointmentForm";

function AppointmentList() {
  const { appointments, updateAppointments } = useAppointment();

  useEffect(() => {
    async function fetchData() {
      try {
        const appointments = await getAppointments();
        updateAppointments(appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
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
      <CreateAppointmentForm />
      <h2
        style={{ textAlign: "center", color: "#5d4037", marginBottom: "20px" }}
      >
        Appointment List
      </h2>
      <TableContainer component={Paper} className="table">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Appointment Time</StyledTableCell>
              <StyledTableCell>Pet</StyledTableCell>
              <StyledTableCell>Vet</StyledTableCell>
              <StyledTableCell>Operations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <AppointmentTableRow key={appointment.id} {...appointment} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AppointmentList;
