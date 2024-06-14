import { deleteReportById } from "../../services/ReportApiService";
import { useReport } from "../../contexts/ReportContext";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function ReportTableRow({ id, title, price, appointment }) {
  const { removeReportById } = useReport();

  async function deleteReport() {
    try {
      await deleteReportById(id);
      removeReportById(id);
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
      <StyledTableCell align="center">{title}</StyledTableCell>
      <StyledTableCell align="center">{price}</StyledTableCell>
      <StyledTableCell align="center">
        {appointment?.doctor?.name}
      </StyledTableCell>
      <StyledTableCell align="center">
        {appointment?.animal?.name}
      </StyledTableCell>

      <StyledTableCell
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NavLink
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            textDecoration: "none",
            color: "#5d4037",
          }}
          to={`${id}/add/vaccine`}
        >
          vaccine
          <AddOutlinedIcon color="success" />
        </NavLink>

        <IconButton aria-label="fingerprint" color="success">
          <NavLink to={`${id}/edit`}>
            <EditOutlinedIcon color="success" />
          </NavLink>
        </IconButton>
        <IconButton aria-label="delete" onClick={deleteReport}>
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default ReportTableRow;
