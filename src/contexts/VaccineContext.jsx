import { createContext, useContext, useState } from "react";

const VaccineContext = createContext();

export const VaccineContextProvider = ({ children }) => {
  const [vaccine, setVaccine] = useState({});
  const [vaccines, setVaccines] = useState([]);

  const updateVaccines = (vaccines) => {
    setVaccines(vaccines);
  };

  const addVaccine = (vaccine) => {
    setVaccines([...vaccines, vaccine]);
  };

  const updateVaccine = (vaccine) => {
    setVaccine(vaccine);
  };

  const removeVaccineById = (id) => {
    const newVaccines = vaccines.filter((vaccine) => vaccine.id !== id);
    setVaccines(newVaccines);
  };

  const values = {
    vaccine,
    vaccines,
    updateVaccines,
    addVaccine,
    updateVaccine,
    removeVaccineById,
  };

  return (
    <VaccineContext.Provider value={values}>{children}</VaccineContext.Provider>
  );
};
export const useVaccine = () => {
  const context = useContext(VaccineContext);
  if (context === undefined) {
    throw new Error("useVaccine must be used within a VaccineContextProvider");
  }
  return context;
};

export default VaccineContext;
