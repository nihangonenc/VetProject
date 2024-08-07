import "./App.css";
import Navbar from "./components/Navbar";
import { CustomerContextProvider } from "./contexts/CustomerContext";
import { Routes, Route } from "react-router-dom";
import Customers from "./components/Customer/Customers";
import CustomerList from "./components/Customer/CustomerList";
import UpdateCustomerForm from "./components/Customer/UpdateCustomerForm";
import Home from "./components/Home";
import { AnimalContextProvider } from "./contexts/AnimalContext";
import Animals from "./components/Animal/Animals";
import AnimalList from "./components/Animal/AnimalList";
import UpdateAnimalForm from "./components/Animal/UpdateAnimalForm";
import { DoctorContextProvider } from "./contexts/DoctorContext";
import Doctors from "./components/Doctor/Doctors";
import DoctorList from "./components/Doctor/DoctorList";
import UpdateDoctorForm from "./components/Doctor/UpdateDoctorForm";
import { AvailableDateContextProvider } from "./contexts/AvailableDateContext";
import UpdateAvailableDateForm from "./components/AvailableDate/UpdateAvailableDateForm";
import Appointments from "./components/Appointment/Appointments";
import AppointmentList from "./components/Appointment/AppointmentList";
import UpdateAppointmentForm from "./components/Appointment/UpdateAppointmentForm";
import { AppointmentContextProvider } from "./contexts/AppointmentContext";
import UpdateReportForm from "./components/Report/UpdateReportForm";
import Reports from "./components/Report/Reports";
import ReportList from "./components/Report/ReportList";
import { ReportContextProvider } from "./contexts/ReportContext";
import CreateReportForm from "./components/Report/CreateReportForm";
import { VaccineContextProvider } from "./contexts/VaccineContext";
import Vaccines from "./components/Vaccine/Vaccines";
import VaccineList from "./components/Vaccine/VaccineList";
import UpdateVaccineForm from "./components/Vaccine/UpdateVaccineForm";
import CreateVaccineForm from "./components/Vaccine/CreateVaccineForm";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
      <CustomerContextProvider>
        <Routes>
          <Route path="customer" element={<Customers />}>
            <Route index element={<CustomerList />} />
            <Route path=":id/edit" element={<UpdateCustomerForm />} />
          </Route>
        </Routes>
      </CustomerContextProvider>
      <AnimalContextProvider>
        <Routes>
          <Route path="animal" element={<Animals />}>
            <Route index element={<AnimalList />} />
            <Route path=":id/edit" element={<UpdateAnimalForm />} />
          </Route>
        </Routes>
      </AnimalContextProvider>
      <DoctorContextProvider>
        <AvailableDateContextProvider>
          <Routes>
            <Route path="doctor" element={<Doctors />}>
              <Route index element={<DoctorList />} />
              <Route path=":id/edit" element={<UpdateDoctorForm />} />
              <Route
                path="date/:id/edit"
                element={<UpdateAvailableDateForm />}
              />
            </Route>
          </Routes>
        </AvailableDateContextProvider>
      </DoctorContextProvider>
      <ReportContextProvider>
        <AppointmentContextProvider>
          <Routes>
            <Route path="appointment" element={<Appointments />}>
              <Route index element={<AppointmentList />} />
              <Route path=":id/edit" element={<UpdateAppointmentForm />} />
              <Route path=":id/add/report" element={<CreateReportForm />} />
            </Route>
          </Routes>
        </AppointmentContextProvider>
      </ReportContextProvider>
      <VaccineContextProvider>
        <ReportContextProvider>
          <Routes>
            <Route path="report" element={<Reports />}>
              <Route index element={<ReportList />} />
              <Route path=":id/edit" element={<UpdateReportForm />} />
              <Route path=":id/add/vaccine" element={<CreateVaccineForm />} />
            </Route>
          </Routes>
        </ReportContextProvider>
      </VaccineContextProvider>
      <VaccineContextProvider>
        <Routes>
          <Route path="vaccine" element={<Vaccines />}>
            <Route index element={<VaccineList />} />
            <Route path=":id/edit" element={<UpdateVaccineForm />} />
          </Route>
        </Routes>
      </VaccineContextProvider>
    </>
  );
}

export default App;
