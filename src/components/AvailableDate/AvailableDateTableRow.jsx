import { deleteAvailableDateById } from "../../services/AvailableDateApiService";
import { useAvailableDate } from "../../contexts/AvailableDateContext";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateAvailableDateForm from "./UpdateAvailableDateForm";

function AvailableDateTableRow({ id, availableDate, doctor }) {
  const { removeAvailableDateById } = useAvailableDate();

  async function deleteAvailableDate() {
    try {
      await deleteAvailableDateById(id);
      removeAvailableDateById(id);
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
      <StyledTableCell>{availableDate}</StyledTableCell>
      <StyledTableCell>{doctor?.name}</StyledTableCell>
      <StyledTableCell>
        <IconButton aria-label="fingerprint" color="success">
          <NavLink
            style={{ textDecoration: "none", color: "#5d4037" }}
            to={`date/${id}/edit`}
          >
            edit
          </NavLink>
          <Fingerprint />
        </IconButton>
        <IconButton aria-label="delete" onClick={deleteAvailableDate}>
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default AvailableDateTableRow;
