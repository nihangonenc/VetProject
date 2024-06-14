import React, { useEffect, useState, useRef } from "react";
import VaccineTableRow from "./VaccineTableRow";
import {
  getVaccines,
  getVaccineSearchByAnimal,
  getVaccineSearchByDateRange,
} from "../../services/VaccineApiService";
import { useVaccine } from "../../contexts/VaccineContext";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

function VaccineList() {
  const { vaccines, updateVaccines } = useVaccine();
  const [searchName, setSearchName] = useState("");
  const startDateRef = useRef();
  const finishDateRef = useRef();
  const [isClear, setIsClear] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    //useEffect i primitive tiplerle kontrol ederiz.
    if (searchName === "") {
      async function fetchData() {
        try {
          const vaccines = await getVaccines();
          updateVaccines(vaccines);
          setIsClear(false);
        } catch (error) {
          console.error("Error fetching vaccines:", error);
        }
      }

      fetchData();
    }
  }, [searchName, isClear]);

  useEffect(() => {
    if (searchName !== "") {
      async function fetchData() {
        try {
          const vaccines = await getVaccineSearchByAnimal(searchName);
          updateVaccines(vaccines);
        } catch (error) {
          console.error("Error fetching customers:", error);
        }
      }
      fetchData();
    }
  }, [searchName]);

  async function handleSearchButton(target) {
    target.preventDefault();
    const startDate = startDateRef.current.value;
    const finishDate = finishDateRef.current.value;

    try {
      const vaccines = await getVaccineSearchByDateRange(startDate, finishDate);
      updateVaccines(vaccines);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  }

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
          marginTop: "40px",
        }}
      >
        Vaccine List
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "25px",
          marginLeft: "100px",
          marginTop: "20px",
          marginBottom: "25px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search Pet"
          placeholder="Search Pet"
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
          label="Protection Start Date"
          placeholder="Protection Start Date"
          variant="outlined"
          color="success"
          inputRef={startDateRef}
          defaultValue={today}
          type="date"
          name="startDate"
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
          label="Protection Finish Date"
          placeholder="Protection Finish Date"
          variant="outlined"
          color="success"
          inputRef={finishDateRef}
          defaultValue={today}
          type="date"
          name="finishDate"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          endIcon={<SearchIcon />}
          onClick={handleSearchButton}
          style={{ backgroundColor: "green", color: "white" }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          endIcon={<ClearOutlinedIcon />}
          onClick={() => {
            setIsClear(true);
            startDateRef.current.value = "";
            finishDateRef.current.value = "";
          }}
          style={{ backgroundColor: "green", color: "white" }}
        >
          Clear
        </Button>
      </div>
      <TableContainer component={Paper} className="table">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Code</StyledTableCell>
              <StyledTableCell align="center">
                Protection Start Date
              </StyledTableCell>
              <StyledTableCell align="center">
                Protection Finish Date
              </StyledTableCell>
              <StyledTableCell align="center">Pet Name</StyledTableCell>
              <StyledTableCell align="center">Operations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vaccines.map((vaccine) => (
              <VaccineTableRow key={vaccine.id} {...vaccine} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default VaccineList;
