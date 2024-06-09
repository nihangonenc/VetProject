import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../../services/AppointmentApiService";
import { useAppointment } from "../../contexts/AppointmentContext";
import { getAnimals } from "../../services/AnimalApiService";
import { getDoctors } from "../../services/DoctorApiServise";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function CreateAppointmentForm() {
  const [animals, setAnimals] = useState([]);
  const [selectedAnimalId, setSelectedAnimalId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");

  const appointmentDateRef = useRef();

  const { addAppointment } = useAppointment();
  const navigate = useNavigate();

  useEffect(() => {
    const loadAnimals = async () => {
      try {
        const animalData = await getAnimals();
        setAnimals(animalData);
      } catch (error) {
        console.error("Failed to fetch animals:", error);
      }
    };
    const loadDoctors = async () => {
      try {
        const doctorData = await getDoctors();
        setDoctors(doctorData);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    loadAnimals();
    loadDoctors();
  }, []);

  const handleAnimalSelectChange = (e) => {
    const id = e.target.value;
    setSelectedAnimalId(id);
  };
  const handleDoctorSelectChange = (e) => {
    const id = e.target.value;
    setSelectedDoctorId(id);
  };

  async function add(target) {
    target.preventDefault();

    try {
      const selectedAnimal = animals.find(
        (animal) => animal.id === selectedAnimalId
      );
      const selectedDoctor = doctors.find(
        (doctor) => doctor.id === selectedDoctorId
      );

      const newAppointment = {
        appointmentDate: appointmentDateRef.current.value,
        animal: selectedAnimal,
        doctor: selectedDoctor,
      };

      const response = await createAppointment(newAppointment);
      addAppointment(response);

      navigate("/appointment");
    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <div style={{ margin: "30px" }}>
      <h2
        style={{ textAlign: "center", color: "#5d4037", marginBottom: "20px" }}
      >
        New Appointment Form
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
        <TextField
          id="datetime-local"
          type="datetime-local"
          inputRef={appointmentDateRef}
        />

        <FormControl required>
          <InputLabel id="animal-select-label">Animal</InputLabel>
          <Select
            labelId="animal-select-label"
            id="animalSelect"
            value={selectedAnimalId}
            label="Animal *"
            color="success"
            onChange={handleAnimalSelectChange}
          >
            {animals.map((animal) => (
              <MenuItem key={animal.id} value={animal.id}>
                {animal?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required>
          <InputLabel id="doctor-select-label">Vet</InputLabel>
          <Select
            labelId="doctor-select-label"
            id="doctorSelect"
            value={selectedDoctorId}
            label="Vet *"
            color="success"
            onChange={handleDoctorSelectChange}
          >
            {doctors.map((doctor) => (
              <MenuItem key={doctor.id} value={doctor.id}>
                {doctor?.name}
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

export default CreateAppointmentForm;
