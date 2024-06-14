import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createReport } from "../../services/ReportApiService";
import { useReport } from "../../contexts/ReportContext";
import { getAppointmentById } from "../../services/AppointmentApiService";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

function CreateReportForm() {
  const titleRef = useRef();
  const priceRef = useRef();
  const { id } = useParams();
  const [appointment, setAppointment] = useState({});
  const { addReport } = useReport();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadAppointment = async () => {
      try {
        const appointmentData = await getAppointmentById(id);
        setAppointment(appointmentData);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    loadAppointment();
  }, []);

  async function add(target) {
    target.preventDefault();
    const checkEmptyName = (value) => (value === "" ? null : value);

    try {
      const newReport = {
        title: checkEmptyName(titleRef.current.value),
        price: priceRef.current.value,
        appointment: appointment,
      };

      const response = await createReport(newReport);
      addReport(response);
      navigate("/report");
    } catch (error) {
      console.error("error", error);
      setErrorMessage(error.response.data.data[0]);
      setTimeout(() => setErrorMessage(""), 3000);
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
            name="title"
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
            name="price"
            color="success"
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            id="appointment"
            color="grey"
            disabled={true}
            value={appointment?.appointmentDate || ""}
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

export default CreateReportForm;
