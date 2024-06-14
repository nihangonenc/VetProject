import { useEffect } from "react";
import {
  getVaccineById,
  updateVaccineById,
} from "../../services/VaccineApiService";
import { useNavigate, useParams } from "react-router-dom";
import { useVaccine } from "../../contexts/VaccineContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

function UpdateVaccineForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vaccine, updateVaccine } = useVaccine();

  async function update(target) {
    target.preventDefault();
    try {
      const response = await updateVaccineById(vaccine);

      navigate("/vaccine");
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const vaccine = await getVaccineById(id);
        updateVaccine(vaccine);
      } catch (error) {
        console.error("error", error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "name":
        updateVaccine({ ...vaccine, name: value === "" ? null : value });
        break;
      case "protectionStartDate":
        updateVaccine({
          ...vaccine,
          protectionStartDate: value === "" ? null : value,
        });
        break;
      case "protectionFinishDate":
        updateVaccine({
          ...vaccine,
          protectionFinishDate: value === "" ? null : value,
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
        Update Vaccine Form
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
            value={vaccine.name || ""}
            type="text"
            id="title"
            color="success"
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            onChange={handleChange}
            value={vaccine.protectionStartDate || ""}
            type="date"
            id="price"
            color="success"
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            onChange={handleChange}
            value={vaccine.protectionFinishDate || ""}
            type="date"
            id="price"
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
            value={vaccine?.animal?.name || ""}
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

export default UpdateVaccineForm;
