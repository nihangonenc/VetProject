import React, { useEffect } from "react";
import AnimalTableRow from "./AnimalTableRow";
import {
  getAnimals,
  getAnimalsByName,
  getAnimalsByCustomerName,
} from "../../services/AnimalApiService";
import { useAnimal } from "../../contexts/AnimalContext";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateAnimalForm from "./CreateAnimalForm";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";

function AnimalList() {
  const { animals, updateAnimals } = useAnimal();
  const [searchName, setSearchName] = useState("");
  const [searchCustomerName, setSearchCustomerName] = useState("");

  useEffect(() => {
    if (searchName === "" && searchCustomerName === "") {
      async function fetchData() {
        try {
          const animals = await getAnimals();
          updateAnimals(animals);
        } catch (error) {
          console.error("Error fetching animals:", error);
        }
      }
      fetchData();
    }
  }, [searchName, searchCustomerName]);
  useEffect(() => {
    if (searchName !== "") {
      async function fetchData() {
        try {
          const animals = await getAnimalsByName(searchName);
          updateAnimals(animals);
        } catch (error) {
          console.error("Error fetching customers:", error);
        }
      }
      fetchData();
    }
  }, [searchName]);

  useEffect(() => {
    if (searchCustomerName !== "") {
      async function fetchData() {
        try {
          const animals = await getAnimalsByCustomerName(searchCustomerName);
          updateAnimals(animals);
        } catch (error) {
          console.error("Error fetching customers:", error);
        }
      }
      fetchData();
    }
  }, [searchCustomerName]);

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#8bc34a",
      color: "#5d4037",
      fontSize: 21,
    },
  }));
  return (
    <div style={{ marginBottom: "20px" }}>
      <CreateAnimalForm />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: "50px",
          marginRight: "120px",
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
          Pet List
        </h2>
        <TextField
          id="outlined-basic"
          label="Search By Pet Name"
          placeholder="Search By Pet Name"
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
        <TextField
          id="outlined-basic"
          label="Search By Client Name"
          placeholder="Search By Client Name"
          variant="outlined"
          color="success"
          value={searchCustomerName}
          type="text"
          name="name"
          onChange={(e) => setSearchCustomerName(e.target.value)}
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
              <StyledTableCell align="center">Species</StyledTableCell>
              <StyledTableCell align="center">Breed</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Colour</StyledTableCell>
              <StyledTableCell align="center">Date Of Birth</StyledTableCell>
              <StyledTableCell align="center">Customer</StyledTableCell>
              <StyledTableCell align="center">Operations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {animals.map((animal) => (
              <AnimalTableRow key={animal.id} {...animal} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AnimalList;
