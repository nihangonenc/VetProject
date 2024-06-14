import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const apiUrl = `${baseURL}/v1/doctors`;

export const getDoctors = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.data.items;
  } catch (error) {
    throw error;
  }
};

export const createDoctor = async (doctor) => {
  try {
    const response = await axios.post(apiUrl, doctor);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getDoctorById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateDoctorById = async (doctor) => {
  try {
    const response = await axios.put(apiUrl, doctor);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDoctorById = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getDoctorsByName = async (name) => {
  //doktor ismine göre filtreleme
  try {
    const response = await axios.get(`${apiUrl}/searchByName?name=${name}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
