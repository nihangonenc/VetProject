import { deleteAnimalById } from "../../services/AnimalApiService";
import { useAnimal } from "../../contexts/AnimalContext";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
import DeleteIcon from "@mui/icons-material/Delete";

function AnimalTableRow({
  id,
  name,
  species,
  breed,
  gender,
  colour,
  dateOfBirth,
  customer,
}) {
  const { removeAnimalById } = useAnimal();

  async function deleteAnimal() {
    try {
      await deleteAnimalById(id);
      removeAnimalById(id);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
      color: "#5d4037",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },

    "&:last-child td, &:last-child th": {
      border: 0,
    },
    "&": {
      height: "20px",
    },
  }));

  return (
    <StyledTableRow>
      <StyledTableCell>{id}</StyledTableCell>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{species}</StyledTableCell>
      <StyledTableCell>{breed}</StyledTableCell>
      <StyledTableCell>{gender}</StyledTableCell>
      <StyledTableCell>{colour}</StyledTableCell>
      <StyledTableCell>{dateOfBirth}</StyledTableCell>
      <StyledTableCell>{customer?.name}</StyledTableCell>
      <StyledTableCell>
        <IconButton aria-label="fingerprint" color="success">
          <NavLink
            style={{ textDecoration: "none", color: "#5d4037" }}
            to={`/animal/${id}/edit`}
          >
            edit
          </NavLink>
          <Fingerprint />
        </IconButton>
        <IconButton aria-label="delete" onClick={deleteAnimal}>
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default AnimalTableRow;
