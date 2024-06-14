import { createContext, useContext, useState } from "react";

const DoctorContext = createContext();

export const DoctorContextProvider = ({ children }) => {
  const [doctor, setDoctor] = useState({});
  const [doctors, setDoctors] = useState([]);

  const updateDoctors = (doctors) => {
    setDoctors(doctors);
  };

  const addDoctor = (doctor) => {
    setDoctors([...doctors, doctor]);
  };

  const updateDoctor = (doctor) => {
    setDoctor(doctor);
  };

  const removeDoctorById = (id) => {
    const newDoctors = doctors.filter((doctor) => doctor.id !== id);
    setDoctors(newDoctors);
  };

  const values = {
    doctor,
    doctors,
    updateDoctors,
    addDoctor,
    updateDoctor,
    removeDoctorById,
  };

  return (
    <DoctorContext.Provider value={values}>{children}</DoctorContext.Provider>
  );
};
export const useDoctor = () => {
  const context = useContext(DoctorContext);
  if (context === undefined) {
    throw new Error("useDoctor must be used within a DoctorContextProvider");
  }
  return context;
};

export default DoctorContext;
