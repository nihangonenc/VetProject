import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAvailableDate } from "../../services/AvailableDateApiService";
import { useAvailableDate } from "../../contexts/AvailableDateContext";
import { getDoctors } from "../../services/DoctorApiServise";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function CreateAvailableDateForm() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const availableDateRef = useRef();
  const { addAvailableDate } = useAvailableDate();
  const navigate = useNavigate();

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const doctorData = await getDoctors();
        setDoctors(doctorData);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    loadDoctors();
  }, []);

  const handleDoctorSelectChange = (e) => {
    const id = e.target.value;
    setSelectedDoctorId(id);
  };

  async function add(target) {
    target.preventDefault();

    try {
      const selectedDoctor = doctors.find(
        (doctor) => doctor.id === selectedDoctorId
      );

      const newAvailableDate = {
        availableDate: availableDateRef.current.value,
        doctor: selectedDoctor,
      };

      const response = await createAvailableDate(newAvailableDate);
      addAvailableDate(response);
      navigate("/doctor");
    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <div style={{ margin: "30px" }}>
      <h2
        style={{ textAlign: "center", color: "#5d4037", marginBottom: "20px" }}
      >
        New Work Day Form
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
            label=""
            variant="outlined"
            inputRef={availableDateRef}
            type="date"
            name="Work Day"
            color="success"
          />
        </div>

        <FormControl required>
          <InputLabel id="doctor-select-label">Vet</InputLabel>
          <Select
            labelId="doctor-select-label"
            id="DoctorSelect"
            value={selectedDoctorId}
            label="Vet*"
            color="success"
            onChange={handleDoctorSelectChange}
          >
            {doctors?.map((doctor) => (
              <MenuItem key={doctor.id} value={doctor.id}>
                {doctor.name}
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

export default CreateAvailableDateForm;