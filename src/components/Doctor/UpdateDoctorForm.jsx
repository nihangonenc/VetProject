import { useEffect } from "react";
import {
  getDoctorById,
  updateDoctorById,
} from "../../services/DoctorApiServise";
import { useNavigate, useParams } from "react-router-dom";
import { useDoctor } from "../../contexts/DoctorContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

function UpdateDoctorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctor, updateDoctor } = useDoctor();

  async function update(target) {
    target.preventDefault();
    try {
      const response = await updateDoctorById(doctor);
      navigate("/doctor");
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const doctor = await getDoctorById(id);
        updateDoctor(doctor);
      } catch (error) {
        console.error("error", error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    console.log(event.target);

    const { id, value } = event.target;
    switch (id) {
      case "name":
        updateDoctor({ ...doctor, name: value === "" ? null : value });
        break;
      case "mail":
        updateDoctor({ ...doctor, mail: value === "" ? null : value });
        break;
      case "phone":
        updateDoctor({ ...doctor, phone: value === "" ? null : value });
        break;
      case "address":
        updateDoctor({ ...doctor, address: value === "" ? null : value });
        break;
      case "city":
        updateDoctor({ ...doctor, city: value === "" ? null : value });
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
        Update Vet Form
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
            value={doctor.name || ""}
            type="text"
            id="name"
            color="success"
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            id="phone"
            color="success"
            onChange={handleChange}
            value={doctor.phone || ""}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="mail"
            id="mail"
            color="success"
            onChange={handleChange}
            value={doctor.mail || ""}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            id="address"
            color="success"
            onChange={handleChange}
            value={doctor.address || ""}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            id="city"
            color="success"
            onChange={handleChange}
            value={doctor.city || ""}
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

export default UpdateDoctorForm;
