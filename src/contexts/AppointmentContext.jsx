import { createContext, useContext, useState } from "react";

const AppointmentContext = createContext();

export const AppointmentContextProvider = ({ children }) => {
  const [appointment, setAppointment] = useState({});
  const [appointments, setAppointments] = useState([]);

  const updateAppointments = (appointments) => {
    setAppointments(appointments);
  };

  const addAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const updateAppointment = (appointment) => {
    setAppointment(appointment);
  };

  const removeAppointmentById = (id) => {
    const newAppointments = appointments.filter(
      (appointment) => appointment.id !== id
    );
    setAppointments(newAppointments);
  };

  const values = {
    appointment,
    appointments,
    updateAppointments,
    addAppointment,
    updateAppointment,
    removeAppointmentById,
  };

  return (
    <AppointmentContext.Provider value={values}>
      {children}
    </AppointmentContext.Provider>
  );
};
export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default AppointmentContext;
