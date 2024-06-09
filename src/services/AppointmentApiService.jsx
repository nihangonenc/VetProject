import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const apiUrl = `${baseURL}/v1/appointments`;

export const getAppointments = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.data.items;
  } catch (error) {
    throw error;
  }
};

export const createAppointment = async (appointment) => {
  try {
    const response = await axios.post(apiUrl, appointment);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getAppointmentById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateAppointmentById = async (appointment) => {
  try {
    const response = await axios.put(apiUrl, appointment);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAppointmentById = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
