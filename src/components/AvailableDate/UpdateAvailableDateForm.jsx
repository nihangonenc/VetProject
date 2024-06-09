import { useEffect } from "react";
import {
  getAvailableDateById,
  updateAvailableDateById,
} from "../../services/AvailableDateApiService";
import { useNavigate, useParams } from "react-router-dom";
import { useAvailableDate } from "../../contexts/AvailableDateContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

function UpdateAvailableDateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { availableDate, updateAvailableDate } = useAvailableDate();

  async function update(target) {
    target.preventDefault();
    try {
      const response = await updateAvailableDateById(availableDate);
      console.log(response?.doctor?.name);

      navigate("/availableDate");
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const availableDate = await getAvailableDateById(id);
        updateAvailableDate(availableDate);
      } catch (error) {
        console.error("error", error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "availableDate":
        updateAvailableDate({
          ...availableDate,
          availableDate: value === "" ? null : value,
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
        Update Work Day Form
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
            value={availableDate.name || ""}
            type="date"
            id="name"
            color="success"
          />
        </div>

        <div>
          <TextField
            variant="outlined"
            type="text"
            id="vet"
            color="grey"
            disabled={true}
            value={availableDate?.doctor?.name || ""}
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

export default UpdateAvailableDateForm;
