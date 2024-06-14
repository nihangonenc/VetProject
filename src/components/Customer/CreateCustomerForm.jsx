import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../../services/CustomerApiService";
import { useCustomer } from "../../contexts/CustomerContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

function CreateCustomerForm() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const mailRef = useRef();
  const cityRef = useRef();
  const { addCustomer } = useCustomer();
  const [errorMessage, setErrorMessage] = useState("");

  async function add(target) {
    target.preventDefault();
    const checkEmptyName = (value) => (value === "" ? null : value);

    try {
      const newCustomer = {
        name: checkEmptyName(nameRef.current.value),
        phone: phoneRef.current.value,
        mail: checkEmptyName(mailRef.current.value),
        address: addressRef.current.value,
        city: cityRef.current.value,
      };

      const response = await createCustomer(newCustomer);
      if (response === undefined) {
        return false;
      } else {
        addCustomer(response);
        navigate("/customer");
      }
    } catch (error) {
      if (nameRef.current.value === "") {
        setErrorMessage(error.response.data.data[0]);
      } else {
        setErrorMessage(error.response.data.message);
      }
      setTimeout(() => setErrorMessage(""), 3000);
    }
  }

  return (
    <div style={{ margin: "30px" }}>
      <h2
        style={{ textAlign: "center", color: "#5d4037", marginBottom: "20px" }}
      >
        New Client Form
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

export default CreateCustomerForm;
