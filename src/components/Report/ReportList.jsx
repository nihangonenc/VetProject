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
import CreateReportForm from "./CreateReportForm";

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
    <>
      <CreateReportForm />
      <h2
        style={{ textAlign: "center", color: "#5d4037", marginBottom: "20px" }}
      >
        Report List
      </h2>
      <TableContainer component={Paper} className="table">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Doctor Name</StyledTableCell>
              <StyledTableCell>Pet Name</StyledTableCell>
              <StyledTableCell>Vaccines</StyledTableCell>
              <StyledTableCell>Operations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <ReportTableRow key={report.id} {...report} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ReportList;
