import { deleteCustomerById } from "../../services/CustomerApiService";
import { useCustomer } from "../../contexts/CustomerContext";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
import DeleteIcon from "@mui/icons-material/Delete";

function CustomerTableRow({
  id,
  name,
  phone,
  mail,
  address,
  city,
  animalList,
}) {
  const { removeCustomerById } = useCustomer();

  async function deleteCustomer() {
    try {
      await deleteCustomerById(id);
      removeCustomerById(id);
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
      <StyledTableCell>{phone}</StyledTableCell>
      <StyledTableCell>{mail}</StyledTableCell>
      <StyledTableCell>{address}</StyledTableCell>
      <StyledTableCell>{city}</StyledTableCell>
      <StyledTableCell>
        <select>
          {animalList?.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </StyledTableCell>
      <StyledTableCell>
        <IconButton aria-label="fingerprint" color="success">
          <NavLink
            style={{ textDecoration: "none", color: "#5d4037" }}
            to={`${id}/edit`}
          >
            edit
          </NavLink>
          <Fingerprint />
        </IconButton>
        <IconButton aria-label="delete" onClick={deleteCustomer}>
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default CustomerTableRow;
