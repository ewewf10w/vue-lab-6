import axios from "axios";

const API_URL = "http://127.0.0.1:8000/categories";

export const fetchCategories = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const createCategory = async (category) => {
  const { data } = await axios.post(API_URL, category);
  return data;
};

export const updateCategory = async (id, category) => {
  const { data } = await axios.put(`${API_URL}/${id}`, category);
  return data;
};

export const deleteCategory = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
