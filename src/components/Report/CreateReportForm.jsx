import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createReport } from "../../services/ReportApiService";
import { useReport } from "../../contexts/ReportContext";
import { getAppointments } from "../../services/AppointmentApiService";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useLocation } from "react-router-dom";
function CreateReportForm() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const titleRef = useRef();
  const priceRef = useRef();
  const location = useLocation();
  const { appointment } = location.state || {};

  const { addReport } = useReport();
  const navigate = useNavigate();

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const appointmentData = await getAppointments();
        setAppointments(appointmentData);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };
    loadAppointments();
  }, []);

  const handleCustomerSelectChange = (e) => {
    const id = e.target.value;
    setSelectedAppointmentId(id);
  };

  async function add(target) {
    target.preventDefault();

    try {
      const selectedAppointment = appointments.find(
        (appointment) => appointment.id === selectedAppointmentId
      );

      const newReport = {
        title: nameRef.current.value,
        price: speciesRef.current.value,
        appointment: selectedAppointment,
      };

      const response = await createReport(newReport);
      addReport(response);
      navigate("/report");
    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <div style={{ margin: "30px" }}>
      <h2
        style={{ textAlign: "center", color: "#5d4037", marginBottom: "20px" }}
      >
        New Report Form
      </h2>
      <form
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div>
          <TextField
            id="outlined"
            label="Title"
            variant="outlined"
            inputRef={titleRef}
            type="text"
            name="name"
            color="success"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            inputRef={priceRef}
            type="text"
            name="species"
            color="success"
          />
        </div>
        <FormControl required>
          <InputLabel id="customer-select-label">Appointment</InputLabel>
          <Select
            labelId="customer-select-label"
            id="customerSelect"
            value={appointment?.appointmentDate}
            label="Appointment *"
            color="success"
            onChange={handleCustomerSelectChange}
          >
            {appointments.map((appointment) => (
              <MenuItem key={appointment?.id} value={appointment?.id}>
                {appointment?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={add}
          style={{ backgroundColor: "green", color: "white" }}
        >
          Add
        </Button>
      </form>
    </div>
  );
}

export default CreateReportForm;
