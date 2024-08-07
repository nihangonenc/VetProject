import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAnimal } from "../../services/AnimalApiService";
import { useAnimal } from "../../contexts/AnimalContext";
import { getCustomers } from "../../services/CustomerApiService";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function CreateAnimalForm() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const nameRef = useRef();
  const speciesRef = useRef();
  const breedRef = useRef();
  const genderRef = useRef();
  const colourRef = useRef();
  const dateOfBirthRef = useRef();
  const { addAnimal } = useAnimal();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const customerData = await getCustomers();
        setCustomers(customerData);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    loadCustomers();
  }, []);

  const handleCustomerSelectChange = (e) => {
    const id = e.target.value;
    setSelectedCustomerId(id);
  };

  async function add(target) {
    target.preventDefault();
    const checkEmptyName = (value) => (value === "" ? null : value);

    try {
      const selectedCustomer = customers.find(
        (customer) => customer.id === selectedCustomerId
      );

      const newAnimal = {
        name: checkEmptyName(nameRef.current.value),
        species: speciesRef.current.value,
        breed: breedRef.current.value,
        gender: genderRef.current.value,
        colour: colourRef.current.value,
        dateOfBirth: dateOfBirthRef.current.value,
        customer: checkEmptyName(selectedCustomer),
      };

      const response = await createAnimal(newAnimal);
      addAnimal(response);
      navigate("/animal");
    } catch (error) {
      if (nameRef.current.value === "") {
        setErrorMessage(error.response.data.data[0]);
      } else {
        setErrorMessage("This animal is already registered in the system");
      }
      setTimeout(() => setErrorMessage(""), 3000);
    }
  }

  return (
    <div style={{ margin: "30px" }}>
      <h2
        style={{ textAlign: "center", color: "#5d4037", marginBottom: "20px" }}
      >
        New Pet Form
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
            label="Name"
            variant="outlined"
            inputRef={nameRef}
            type="text"
            name="name"
            color="success"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Species"
            variant="outlined"
            inputRef={speciesRef}
            type="text"
            name="species"
            color="success"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Breed"
            variant="outlined"
            inputRef={breedRef}
            type="text"
            name="breed"
            color="success"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Gender"
            variant="outlined"
            inputRef={genderRef}
            type="text"
            name="gender"
            color="success"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Colour"
            variant="outlined"
            inputRef={colourRef}
            type="text"
            name="colour"
            color="success"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            inputRef={dateOfBirthRef}
            type="date"
            name="dateOfBirth"
            color="success"
            defaultValue={today}
          />
        </div>
        <FormControl required>
          <InputLabel id="customer-select-label">Customer</InputLabel>
          <Select
            labelId="customer-select-label"
            id="customerSelect"
            value={selectedCustomerId}
            label="Customer *"
            color="success"
            onChange={handleCustomerSelectChange}
            required={true}
            sx={{ minWidth: 120 }}
          >
            {customers.map((customer) => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.name}
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
      {errorMessage && (
        <div
          style={{
            color: "#a20622",
            marginTop: "5px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default CreateAnimalForm;
