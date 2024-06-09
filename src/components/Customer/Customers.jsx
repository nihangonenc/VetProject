import React from "react";
import { Outlet } from "react-router-dom";
import CreateCustomerForm from "./CreateCustomerForm";

function Customers() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Customers;
