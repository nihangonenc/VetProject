import { useEffect } from "react";
import {
  getReportById,
  updateReportById,
} from "../../services/ReportApiService";
import { useNavigate, useParams } from "react-router-dom";
import { useReport } from "../../contexts/ReportContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

function UpdateReportForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { report, updateReport } = useReport();

  async function update(target) {
    target.preventDefault();
    try {
      const response = await updateReportById(report);

      navigate("/report");
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const report = await getReportById(id);
        updateReport(report);
      } catch (error) {
        console.error("error", error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "title":
        updateReport({ ...report, title: value === "" ? null : value });
        break;
      case "price":
        updateReport({ ...report, price: value === "" ? null : value });
        break;

      default:
        break;
    }
  };
  return (
    <div style={{ margin: "30px" }}>
      <h2
        style={{ textAlign: "center", color: "#5d4037", marginBottom: "20px" }}
      >
        Update Report Form
      </h2>
      <form
        style={{
          display: "flex",
          flexDirection: "row",
          aligItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div>
          <TextField
            variant="outlined"
            onChange={handleChange}
            value={report.title || ""}
            type="text"
            id="name"
            color="success"
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            id="customer"
            color="grey"
            disabled={true}
            value={report?.appointment?.customer?.name || ""}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            id="customer"
            color="grey"
            disabled={true}
            value={report?.appointment?.doctor?.name || ""}
          />
        </div>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={update}
          style={{ backgroundColor: "green", color: "white" }}
        >
          Update
        </Button>
      </form>
    </div>
  );
}

export default UpdateReportForm;
