import { createContext, useContext, useState } from "react";

const CustomerContext = createContext();

export const CustomerContextProvider = ({ children }) => {
  {
    /* children diyerek içinde yazılan her şeyi almış olduk */
  }
  const [customer, setCustomer] = useState({});
  const [customers, setCustomers] = useState([]);

  const updateCustomers = (customers) => {
    setCustomers(customers);
  };

  const addCustomer = (customer) => {
    setCustomers([...customers, customer]);
  };

  const updateCustomer = (customer) => {
    setCustomer(customer);
  };

  const removeCustomerById = (id) => {
    const newCustomers = customers.filter((customer) => customer.id !== id);
    setCustomers(newCustomers);
  };

  const values = {
    customer,
    customers,
    updateCustomers,
    addCustomer,
    updateCustomer,
    removeCustomerById,
  };

  return (
    <CustomerContext.Provider value={values}>
      {children}
    </CustomerContext.Provider>
  );
};
export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    //provider ile sarmalanmalı. Yoksa hata fırlattık.
    throw new Error(
      "useCustomer must be used within a CustomerContextProvider"
    );
  }
  return context;
};

export default CustomerContext;
