import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const apiUrl = `${baseURL}/v1/animals`;

export const getAnimals = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.data.items;
  } catch (error) {
    throw error;
  }
};

export const createAnimal = async (animal) => {
  try {
    const response = await axios.post(apiUrl, animal);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getAnimalById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateAnimalById = async (animal) => {
  try {
    const response = await axios.put(apiUrl, animal);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAnimalById = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
