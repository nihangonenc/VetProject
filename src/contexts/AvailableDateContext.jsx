import { createContext, useContext, useState } from "react";

const AvailableDateContext = createContext();

export const AvailableDateContextProvider = ({ children }) => {
  const [availableDate, setAvailableDate] = useState({});
  const [availableDates, setAvailableDates] = useState([]);

  const updateAvailableDates = (availableDates) => {
    setAvailableDates(availableDates);
  };

  const addAvailableDate = (availableDate) => {
    setAvailableDates([...availableDates, availableDate]);
  };

  const updateAvailableDate = (availableDate) => {
    setAvailableDate(availableDate);
  };

  const removeAvailableDateById = (id) => {
    const newAvailableDates = availableDates.filter(
      (availableDate) => availableDate.id !== id
    );
    setAvailableDates(newAvailableDates);
  };

  const values = {
    availableDate,
    availableDates,
    updateAvailableDates,
    addAvailableDate,
    updateAvailableDate,
    removeAvailableDateById,
  };

  return (
    <AvailableDateContext.Provider value={values}>
      {children}
    </AvailableDateContext.Provider>
  );
};
export const useAvailableDate = () => {
  const context = useContext(AvailableDateContext);
  if (context === undefined) {
    throw new Error(
      "useAvailableDate must be used within a AvailableDateContextProvider"
    );
  }
  return context;
};

export default AvailableDateContext;
