import React, { useEffect, useState } from "react";
import CustomerTableRow from "./CustomerTableRow";
import {
  getCustomers,
  getCustomersSearchByName,
} from "../../services/CustomerApiService";
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
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";

function CustomerList() {
  const { customers, updateCustomers } = useCustomer();
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    if (searchName === "") {
      async function fetchData() {
        try {
          const customers = await getCustomers();
          updateCustomers(customers);
        } catch (error) {
          console.error("Error fetching customers:", error);
        }
      }
      fetchData();
    }
  }, [searchName]);

  useEffect(() => {
    if (searchName !== "") {
      async function fetchData() {
        try {
          const customers = await getCustomersSearchByName(searchName);
          updateCustomers(customers);
        } catch (error) {
          console.error("Error fetching customers:", error);
        }
      }
      fetchData();
    }
  }, [searchName]);

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#8bc34a",
      color: "#5d4037",
      fontSize: 21,
    },
  }));
  return (
    <div style={{ marginBottom: "20px" }}>
      <CreateCustomerForm />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: "200px",
          marginRight: "250px",
          marginBottom: "25px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#5d4037",
            marginBottom: "20px",
          }}
        >
          Client List
        </h2>
        <TextField
          id="outlined-basic"
          label="Search By Name"
          placeholder="Search By Name"
          variant="outlined"
          color="success"
          value={searchName}
          type="text"
          name="name"
          onChange={(e) => setSearchName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <TableContainer component={Paper} className="table">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Phone</StyledTableCell>
              <StyledTableCell align="center">Mail</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">City</StyledTableCell>
              <StyledTableCell align="center">Pets</StyledTableCell>
              <StyledTableCell align="center">Operations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <CustomerTableRow key={customer.id} {...customer} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CustomerList;
