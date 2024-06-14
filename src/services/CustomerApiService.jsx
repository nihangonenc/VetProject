import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const apiUrl = `${baseURL}/v1/customers`;

export const getCustomers = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.data.items;
  } catch (error) {
    throw error;
  }
};

export const createCustomer = async (customer) => {
  try {
    const response = await axios.post(apiUrl, customer);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getCustomerById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateCustomerById = async (customer) => {
  try {
    const response = await axios.put(apiUrl, customer);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCustomerById = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCustomersSearchByName = async (name) => {
  //müşteri ismine göre filtreleme
  try {
    const response = await axios.get(`${apiUrl}/searchByName?name=${name}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
