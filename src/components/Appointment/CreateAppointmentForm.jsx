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
import GeneralModal from "../General/GeneralModal";

function CreateAppointmentForm() {
  const [animals, setAnimals] = useState([]);
  const [selectedAnimalId, setSelectedAnimalId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const appointmentDateRef = useRef();

  const { addAppointment } = useAppointment();
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 16);

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
  const handleCloseModal = () => {
    setOpenModal(false);
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
      setErrorMessage(error.response?.data?.message);
      setOpenModal(true);
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
          defaultValue={today}
        />

        <FormControl required>
          <InputLabel id="animal-select-label">Pet</InputLabel>
          <Select
            labelId="pet-select-label"
            id="PetSelect"
            value={selectedAnimalId}
            label="Pet *"
            color="success"
            onChange={handleAnimalSelectChange}
            sx={{ minWidth: 150 }}
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
            sx={{ minWidth: 150 }}
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
      <GeneralModal
        errorMessage={errorMessage}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
}

export default CreateAppointmentForm;
