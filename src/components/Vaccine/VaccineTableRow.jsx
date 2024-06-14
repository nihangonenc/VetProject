import { deleteVaccineById } from "../../services/VaccineApiService";
import { useVaccine } from "../../contexts/VaccineContext";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";

function VaccineTableRow({
  id,
  name,
  code,
  protectionStartDate,
  protectionFinishDate,
  animal,
}) {
  const { removeVaccineById } = useVaccine();

  async function deleteVaccine() {
    try {
      await deleteVaccineById(id);
      removeVaccineById(id);
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
      <StyledTableCell align="center">{code}</StyledTableCell>
      <StyledTableCell align="center">
        {format(new Date(protectionStartDate), "dd/MM/yyyy")}
      </StyledTableCell>
      <StyledTableCell align="center">
        {format(new Date(protectionFinishDate), "dd/MM/yyyy")}
      </StyledTableCell>
      <StyledTableCell align="center">{animal?.name}</StyledTableCell>

      <StyledTableCell align="center">
        <IconButton aria-label="fingerprint" color="success">
          <NavLink to={`${id}/edit`}>
            <EditOutlinedIcon color="success" />
          </NavLink>
        </IconButton>
        <IconButton aria-label="delete" onClick={deleteVaccine}>
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default VaccineTableRow;
