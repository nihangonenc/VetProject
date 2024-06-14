import React, { useEffect } from "react";
import AvailableDateTableRow from "./AvailableDateTableRow";
import { getAvailableDates } from "../../services/AvailableDateApiService";
import { useAvailableDate } from "../../contexts/AvailableDateContext";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateAvailableDateForm from "./CreateAvailableDateForm";

function AvailableDateList() {
  const { availableDates, updateAvailableDates } = useAvailableDate();

  useEffect(() => {
    async function fetchData() {
      try {
        const availableDates = await getAvailableDates();
        updateAvailableDates(availableDates);
      } catch (error) {
        console.error("Error fetching availableDates:", error);
      }
    }
    fetchData();
  }, []);

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#8bc34a",
      color: "#5d4037",
      fontSize: 21,
    },
  }));
  return (
    <div style={{ marginBottom: "20px" }}>
      <CreateAvailableDateForm />
      <h2
        style={{ textAlign: "center", color: "#5d4037", marginBottom: "20px" }}
      >
        Work Day List
      </h2>
      <TableContainer component={Paper} className="table">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Work Days</StyledTableCell>
              <StyledTableCell align="center">Doctor Name</StyledTableCell>
              <StyledTableCell align="center">Operations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {availableDates.map((availableDate) => (
              <AvailableDateTableRow
                key={availableDate.id}
                {...availableDate}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AvailableDateList;
