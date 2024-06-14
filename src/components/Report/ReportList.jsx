import React, { useEffect } from "react";
import ReportTableRow from "./ReportTableRow";
import { getReports } from "../../services/ReportApiService";
import { useReport } from "../../contexts/ReportContext";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function ReportList() {
  const { reports, updateReports } = useReport();

  useEffect(() => {
    async function fetchData() {
      try {
        const reports = await getReports();
        updateReports(reports);
      } catch (error) {
        console.error("Error fetching reports:", error);
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
      <h2
        style={{
          textAlign: "center",
          color: "#5d4037",
          marginTop: "30px",
          marginBottom: "20px",
        }}
      >
        Report List
      </h2>
      <TableContainer component={Paper} className="table">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Doctor Name</StyledTableCell>
              <StyledTableCell align="center">Pet Name</StyledTableCell>
              <StyledTableCell align="center">Operations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <ReportTableRow key={report.id} {...report} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ReportList;
