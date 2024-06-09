import { createContext, useContext, useState } from "react";

const ReportContext = createContext();

export const ReportContextProvider = ({ children }) => {
  const [report, setReport] = useState({});
  const [reports, setReports] = useState([]);

  const updateReports = (reports) => {
    setReports(reports);
  };

  const addReport = (report) => {
    setReports([...reports, report]);
  };

  const updateReport = (report) => {
    setReport(report);
  };

  const removeReportById = (id) => {
    const newReports = reports.filter((report) => report.id !== id);
    setReports(newReports);
  };

  const values = {
    report,
    reports,
    updateReports,
    addReport,
    updateReport,
    removeReportById,
  };

  return (
    <ReportContext.Provider value={values}>{children}</ReportContext.Provider>
  );
};
export const useReport = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ReportContext;
