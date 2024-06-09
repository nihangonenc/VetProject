import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createDoctor } from "../../services/DoctorApiServise";
import { useDoctor } from "../../contexts/DoctorContext";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import SendIcon from "@mui/icons-material/Send";

function CreateDoctorForm() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const mailRef = useRef();
  const cityRef = useRef();
  const { addDoctor } = useDoctor();

  async function add(target) {
    target.preventDefault();

    try {
      const newDoctor = {
        name: nameRef.current.value,
        phone: phoneRef.current.value,
        mail: mailRef.current.value,
        address: addressRef.current.value,
        city: cityRef.current.value,
      };

      const response = await createDoctor(newDoctor);
      if (response === undefined) {
        return false;
      } else {
        addDoctor(response);
        navigate("/doctor");
      }
    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <div style={{ margin: "30px" }}>
      <h2
        style={{ textAlign: "center", color: "#5d4037", marginBottom: "20px" }}
      >
        New Vet Form
      </h2>
      <form
        style={{
          display: "flex",
          flexDirection: "row",
          aligItems: "center",
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
            label="Phone"
            variant="outlined"
            inputRef={phoneRef}
            type="text"
            name="phone"
            color="success"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Mail"
            variant="outlined"
            inputRef={mailRef}
            type="mail"
            name="mail"
            color="success"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            inputRef={addressRef}
            type="text"
            name="address"
            color="success"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            inputRef={cityRef}
            type="text"
            name="city"
            color="success"
          />
        </div>
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

export default CreateDoctorForm;
