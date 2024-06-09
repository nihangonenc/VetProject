import { useEffect } from "react";
import {
  getAppointmentById,
  updateAppointmentById,
} from "../../services/AppointmentApiService";
import { useNavigate, useParams } from "react-router-dom";
import { useAppointment } from "../../contexts/AppointmentContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

function UpdateAppointmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appointment, updateAppointment } = useAppointment();

  async function update(target) {
    target.preventDefault();
    try {
      const response = await updateAppointmentById(appointment);

      navigate("/appointment");
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const appointment = await getAppointmentById(id);
        updateAppointment(appointment);
      } catch (error) {
        console.error("error", error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "appointmentDate":
        updateAppointment({
          ...appointment,
          appointmentDate: value === "" ? null : value,
        });
        break;

      default:
        break;
    }
  };
  return (
    <div style={{ margin: "30px" }}>
      <h2
        style={{ textAlign: "center", color: "#5d4037", marginBottom: "20px" }}
      >
        Update Appointment Form
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
            variant="outlined"
            onChange={handleChange}
            value={appointment.appointmentDate || ""}
            type="datetime-local"
            id="appointmentDate"
            name="appointmentDate"
            color="success"
            label="Choose a time for your appointment"
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            id="animal"
            color="grey"
            disabled={true}
            value={appointment?.animal?.name || ""}
          />
        </div>

        <div>
          <TextField
            variant="outlined"
            type="text"
            id="doctor"
            color="grey"
            disabled={true}
            value={appointment?.doctor?.name || ""}
          />
        </div>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={update}
          style={{ backgroundColor: "green", color: "white" }}
        >
          Update
        </Button>
      </form>
    </div>
  );
}

export default UpdateAppointmentForm;
