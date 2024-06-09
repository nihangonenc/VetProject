import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const apiUrl = `${baseURL}/v1/availableDates`;

export const getAvailableDates = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.data.items;
  } catch (error) {
    throw error;
  }
};

export const createAvailableDate = async (availableDate) => {
  try {
    const response = await axios.post(apiUrl, availableDate);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getAvailableDateById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateAvailableDateById = async (availableDate) => {
  try {
    const response = await axios.put(apiUrl, availableDate);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAvailableDateById = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
