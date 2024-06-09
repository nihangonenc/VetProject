import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const apiUrl = `${baseURL}/v1/reports`;

export const getReports = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.data.items;
  } catch (error) {
    throw error;
  }
};

export const createReport = async (report) => {
  try {
    const response = await axios.post(apiUrl, report);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getReportById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateReportById = async (report) => {
  try {
    const response = await axios.put(apiUrl, report);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteReportById = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
