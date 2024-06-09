import React, { useEffect } from "react";
import CustomerTableRow from "./CustomerTableRow";
import { getCustomers } from "../../services/CustomerApiService";
import { useCustomer } from "../../contexts/CustomerContext";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateCustomerForm from "./CreateCustomerForm";

function CustomerList() {
  const { customers, updateCustomers } = useCustomer();

  useEffect(() => {
    async function fetchData() {
      try {
        const customers = await getCustomers();
        updateCustomers(customers);
      } catch (error) {
        console.error("Error fetching customers:", error);
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
      <CreateCustomerForm />
      <h2
        style={{ textAlign: "center", color: "#5d4037", marginBottom: "20px" }}
      >
        Client List
      </h2>
      <TableContainer component={Paper} className="table">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Mail</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>Pets</StyledTableCell>
              <StyledTableCell>Operations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <CustomerTableRow key={customer.id} {...customer} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CustomerList;
