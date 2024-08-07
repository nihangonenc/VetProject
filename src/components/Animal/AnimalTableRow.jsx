import { deleteAnimalById } from "../../services/AnimalApiService";
import { useAnimal } from "../../contexts/AnimalContext";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { format } from "date-fns";

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
      <StyledTableCell align="center">{name}</StyledTableCell>
      <StyledTableCell align="center">{species}</StyledTableCell>
      <StyledTableCell align="center">{breed}</StyledTableCell>
      <StyledTableCell align="center">{gender}</StyledTableCell>
      <StyledTableCell align="center">{colour}</StyledTableCell>
      <StyledTableCell align="center">
        {format(new Date(dateOfBirth), "dd/MM/yyyy")}
      </StyledTableCell>
      <StyledTableCell align="center">{customer?.name}</StyledTableCell>
      <StyledTableCell align="center">
        <IconButton aria-label="fingerprint" color="success">
          <NavLink to={`/animal/${id}/edit`}>
            <EditOutlinedIcon color="success" />
          </NavLink>
        </IconButton>
        <IconButton aria-label="delete" onClick={deleteAnimal}>
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default AnimalTableRow;
