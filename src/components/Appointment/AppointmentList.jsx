import React, { useEffect, useRef, useState } from "react";
import AppointmentTableRow from "./AppointmentTableRow";
import {
  getAppointments,
  getAppointmentSearchByAnimalAndDate,
  getAppointmentSearchByDoctorAndDate,
} from "../../services/AppointmentApiService";
import { useAppointment } from "../../contexts/AppointmentContext";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import CreateAppointmentForm from "./CreateAppointmentForm";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

function AppointmentList() {
  const { appointments, updateAppointments } = useAppointment();
  const animalRef = useRef();
  const doctorRef = useRef();
  const startDateRef = useRef();
  const finishDateRef = useRef();

  const [isClear, setIsClear] = useState(false);
  const today = new Date().toISOString().slice(0, 16);
  useEffect(() => {
    async function fetchData() {
      try {
        const appointments = await getAppointments();
        updateAppointments(appointments);
        setIsClear(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }
    fetchData();
  }, [isClear]);

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#8bc34a",
      color: "#5d4037",
      fontSize: 21,
    },
  }));
  async function handleSearchButton(target) {
    target.preventDefault();

    const doctor = doctorRef.current.value;
    const animal = animalRef.current.value;
    const startDate = startDateRef.current.value;
    const finishDate = finishDateRef.current.value;
    if (doctor !== "") {
      try {
        const appointments = await getAppointmentSearchByDoctorAndDate(
          doctor,
          startDate,
          finishDate
        );
        updateAppointments(appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    } else {
      try {
        const appointments = await getAppointmentSearchByAnimalAndDate(
          animal,
          startDate,
          finishDate
        );
        updateAppointments(appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }
  }
  return (
    <div style={{ marginBottom: "20px" }}>
      <CreateAppointmentForm />
      <h2
        style={{
          textAlign: "center",
          color: "#5d4037",
          marginTop: "40px",
        }}
      >
        Appointment List
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "25px",
          marginLeft: "100px",
          marginTop: "20px",
          marginBottom: "25px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search Pet"
          placeholder="Search Pet"
          variant="outlined"
          color="success"
          inputRef={animalRef}
          type="text"
          name="name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="outlined-basic"
          label="Search Vet"
          placeholder="Search Vet"
          variant="outlined"
          color="success"
          inputRef={doctorRef}
          type="text"
          name="name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          id="outlined-basic"
          label="Start Date"
          placeholder="Start Date"
          variant="outlined"
          color="success"
          inputRef={startDateRef}
          type="datetime-local"
          name="startDate"
          defaultValue={today}
          step={3600}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="outlined-basic"
          label="Finish Date"
          placeholder="Finish Date"
          variant="outlined"
          color="success"
          inputRef={finishDateRef}
          type="datetime-local"
          name="finishDate"
          step={3600}
          defaultValue={today}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          endIcon={<SearchIcon />}
          onClick={handleSearchButton}
          style={{ backgroundColor: "green", color: "white" }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          endIcon={<ClearOutlinedIcon />}
          onClick={() => {
            setIsClear(true);
            startDateRef.current.value = "";
            finishDateRef.current.value = "";
            doctorRef.current.value = "";
            animalRef.current.value = "";
          }}
          style={{ backgroundColor: "green", color: "white" }}
        >
          Clear
        </Button>
      </div>
      <TableContainer component={Paper} className="table">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Appointment Time</StyledTableCell>
              <StyledTableCell align="center">Pet</StyledTableCell>
              <StyledTableCell align="center">Vet</StyledTableCell>
              <StyledTableCell align="center">Operations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <AppointmentTableRow key={appointment.id} {...appointment} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AppointmentList;
