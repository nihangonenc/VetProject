import { useEffect } from "react";
import {
  getCustomerById,
  updateCustomerById,
} from "../../services/CustomerApiService";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomer } from "../../contexts/CustomerContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

function UpdateCustomerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customer, updateCustomer } = useCustomer();

  async function update(target) {
    target.preventDefault();
    try {
      const response = await updateCustomerById(customer);
      navigate("/customer");
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const customer = await getCustomerById(id);
        updateCustomer(customer);
      } catch (error) {
        console.error("error", error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    console.log(event.target);

    const { id, value } = event.target;
    switch (id) {
      case "name":
        updateCustomer({ ...customer, name: value === "" ? null : value });
        break;
      case "mail":
        updateCustomer({ ...customer, mail: value === "" ? null : value });
        break;
      case "phone":
        updateCustomer({ ...customer, phone: value === "" ? null : value });
        break;
      case "address":
        updateCustomer({ ...customer, address: value === "" ? null : value });
        break;
      case "city":
        updateCustomer({ ...customer, city: value === "" ? null : value });
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
        Update Client Form
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
            value={customer.name || ""}
            type="text"
            id="name"
            color="success"
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            id="phone"
            color="success"
            onChange={handleChange}
            value={customer.phone || ""}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="mail"
            id="mail"
            color="success"
            onChange={handleChange}
            value={customer.mail || ""}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            id="address"
            color="success"
            onChange={handleChange}
            value={customer.address || ""}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            id="city"
            color="success"
            onChange={handleChange}
            value={customer.city || ""}
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

export default UpdateCustomerForm;
