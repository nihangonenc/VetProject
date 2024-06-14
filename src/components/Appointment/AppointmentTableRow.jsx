import { deleteAppointmentById } from "../../services/AppointmentApiService";
import { useAppointment } from "../../contexts/AppointmentContext";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { format } from "date-fns"; // tarih-saat formatı için yükledim

function AppointmentTableRow({ id, appointmentDate, animal, doctor, report }) {
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
      <StyledTableCell align="center">
        {format(new Date(appointmentDate), "dd/MM/yyyy HH:mm")}
      </StyledTableCell>
      <StyledTableCell align="center">{animal?.name}</StyledTableCell>
      <StyledTableCell align="center">{doctor?.name}</StyledTableCell>

      <StyledTableCell
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {report === null && (
          <NavLink
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              textDecoration: "none",
              color: "#5d4037",
            }}
            to={`${id}/add/report`}
          >
            report
            <AddOutlinedIcon color="success" />
          </NavLink>
        )}

        <IconButton aria-label="fingerprint" color="success">
          <NavLink to={`/appointment/${id}/edit`}>
            <EditOutlinedIcon color="success" />
          </NavLink>
        </IconButton>
        <IconButton aria-label="delete" onClick={deleteAppointment}>
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default AppointmentTableRow;
