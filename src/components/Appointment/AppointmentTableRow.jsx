import { deleteAppointmentById } from "../../services/AppointmentApiService";
import { useAppointment } from "../../contexts/AppointmentContext";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
import DeleteIcon from "@mui/icons-material/Delete";

function AppointmentTableRow({ id, appointmentDate, animal, doctor }) {
  const { removeAppointmentById } = useAppointment();

  async function deleteAppointment() {
    try {
      await deleteAppointmentById(id);
      removeAppointmentById(id);
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
      <StyledTableCell>{appointmentDate}</StyledTableCell>
      <StyledTableCell>{animal?.name}</StyledTableCell>
      <StyledTableCell>{doctor?.name}</StyledTableCell>

      <StyledTableCell>
        <NavLink
          style={{ textDecoration: "none", color: "#5d4037" }}
          to={{
            pathname: "/report",
            state: { appointment: { id, appointmentDate, animal, doctor } },
          }}
        >
          add report
        </NavLink>
        <IconButton aria-label="fingerprint" color="success">
          <NavLink
            style={{ textDecoration: "none", color: "#5d4037" }}
            to={`/appointment/${id}/edit`}
          >
            edit
          </NavLink>
          <Fingerprint />
        </IconButton>
        <IconButton aria-label="delete" onClick={deleteAppointment}>
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default AppointmentTableRow;
