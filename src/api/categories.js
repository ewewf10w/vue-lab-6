import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const fetchCategories = () =>
  API.get("/categories").then((res) => res.data);

export const createCategory = (data) =>
  API.post("/categories", data).then((res) => res.data);

export const updateCategory = (id, data) =>
  API.put(`/categories/${id}`, data).then((res) => res.data);

export const deleteCategory = (id) => API.delete(`/categories/${id}`);
