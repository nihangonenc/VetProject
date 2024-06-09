import { useEffect } from "react";
import {
  getAnimalById,
  updateAnimalById,
} from "../../services/AnimalApiService";
import { useNavigate, useParams } from "react-router-dom";
import { useAnimal } from "../../contexts/AnimalContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

function UpdateAnimalForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { animal, updateAnimal } = useAnimal();

  async function update(target) {
    target.preventDefault();
    try {
      const response = await updateAnimalById(animal);

      navigate("/animal");
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const animal = await getAnimalById(id);
        updateAnimal(animal);
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
        updateAnimal({ ...animal, name: value === "" ? null : value });
        break;
      case "species":
        updateAnimal({ ...animal, species: value === "" ? null : value });
        break;
      case "breed":
        updateAnimal({ ...animal, breed: value === "" ? null : value });
        break;
      case "gender":
        updateAnimal({ ...animal, gender: value === "" ? null : value });
        break;
      case "colour":
        updateAnimal({ ...animal, colour: value === "" ? null : value });
        break;
      case "dateOfBirth":
        updateAnimal({ ...animal, dateOfBirth: value === "" ? null : value });
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
        Update Pet Form
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
            value={animal.name || ""}
            type="text"
            id="name"
            color="success"
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            id="species"
            color="success"
            onChange={handleChange}
            value={animal.species || ""}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            id="breed"
            color="success"
            onChange={handleChange}
            value={animal.breed || ""}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            id="gender"
            color="success"
            onChange={handleChange}
            value={animal.gender || ""}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            id="colour"
            color="success"
            onChange={handleChange}
            value={animal.colour || ""}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="date"
            id="dateOfBirth"
            color="success"
            onChange={handleChange}
            value={animal.dateOfBirth || ""}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            id="customer"
            color="grey"
            disabled={true}
            value={animal?.customer?.name || ""}
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

export default UpdateAnimalForm;
