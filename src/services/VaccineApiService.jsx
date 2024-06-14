import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const apiUrl = `${baseURL}/v1/vaccines`;

export const getVaccines = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.data.items;
  } catch (error) {
    throw error;
  }
};

export const createVaccine = async (vaccine) => {
  try {
    const response = await axios.post(apiUrl, vaccine);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getVaccineById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateVaccineById = async (vaccine) => {
  try {
    const response = await axios.put(apiUrl, vaccine);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteVaccineById = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getVaccineSearchByAnimal = async (name) => {
  //hayvan ismine göre filtreleme
  try {
    const response = await axios.get(
      `${apiUrl}/searchByAnimalName?name=${name}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const getVaccineSearchByDateRange = async (startDate, finishDate) => {
  // koruyuculuk aralığına göre filtreleme
  try {
    const response = await axios.get(
      `${apiUrl}/searchByDateRange?startDate=${startDate}&finishDate=${finishDate}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
