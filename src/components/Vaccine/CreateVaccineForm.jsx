import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createVaccine } from "../../services/VaccineApiService";
import { useVaccine } from "../../contexts/VaccineContext";
import { getReportById } from "../../services/ReportApiService";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import GeneralModal from "../General/GeneralModal";

function CreateVaccineForm() {
  const nameRef = useRef();
  const codeRef = useRef();
  const protectionStartDateRef = useRef();
  const protectionFinishDateRef = useRef();
  const today = new Date().toISOString().split("T")[0];

  const { id } = useParams();
  const [report, setReport] = useState({});
  const { addVaccine } = useVaccine();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const loadReport = async () => {
      try {
        const reportData = await getReportById(id);
        setReport(reportData);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };

    loadReport();
  }, []);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  async function add(target) {
    target.preventDefault();
    const checkEmptyName = (value) => (value === "" ? null : value);

    try {
      const newVaccine = {
        name: checkEmptyName(nameRef.current.value),
        code: codeRef.current.value,
        protectionStartDate: protectionStartDateRef.current.value,
        protectionFinishDate: protectionFinishDateRef.current.value,
        animal: report?.appointment?.animal,
      };

      const response = await createVaccine(newVaccine);
      addVaccine(response);
      navigate("/vaccine");
    } catch (error) {
      if (nameRef.current.value === "") {
        setErrorMessage(error.response.data.data[0]);
      } else {
        setErrorMessage("The protection of this vaccine has not yet expired.");
      }

      setOpenModal(true);
    }
  }

  return (
    <div style={{ margin: "30px" }}>
      <h2
        style={{ textAlign: "center", color: "#5d4037", marginBottom: "20px" }}
      >
        New Vaccine Form
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
            id="outlined"
            label="Code"
            variant="outlined"
            inputRef={codeRef}
            type="text"
            name="code"
            color="success"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            // label="Protection Start Date"
            variant="outlined"
            defaultValue={today}
            inputRef={protectionStartDateRef}
            type="date"
            name="protectionStartDate"
            color="success"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            // label="Protection Finish Date"
            variant="outlined"
            defaultValue={today}
            inputRef={protectionFinishDateRef}
            type="date"
            name="protectionFinishDate"
            color="success"
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            id="animal"
            color="grey"
            disabled={true}
            value={report?.appointment?.animal?.name || ""}
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
      <GeneralModal
        errorMessage={errorMessage}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
}

export default CreateVaccineForm;
