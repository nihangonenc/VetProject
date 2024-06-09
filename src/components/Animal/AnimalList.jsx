import React, { useEffect } from "react";
import AnimalTableRow from "./AnimalTableRow";
import { getAnimals } from "../../services/AnimalApiService";
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

function AnimalList() {
  const { animals, updateAnimals } = useAnimal();

  useEffect(() => {
    async function fetchData() {
      try {
        const animals = await getAnimals();
        updateAnimals(animals);
      } catch (error) {
        console.error("Error fetching animals:", error);
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
      <CreateAnimalForm />
      <h2
        style={{ textAlign: "center", color: "#5d4037", marginBottom: "20px" }}
      >
        Pet List
      </h2>
      <TableContainer component={Paper} className="table">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Species</StyledTableCell>
              <StyledTableCell>Breed</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Colour</StyledTableCell>
              <StyledTableCell>Date Of Birth</StyledTableCell>
              <StyledTableCell>Customer</StyledTableCell>
              <StyledTableCell>Operations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {animals.map((animal) => (
              <AnimalTableRow key={animal.id} {...animal} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AnimalList;
