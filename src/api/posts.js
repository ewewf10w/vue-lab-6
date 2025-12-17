import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const fetchPosts = (search = "") =>
  API.get("/posts", { params: { search } }).then((res) => res.data);

export const fetchPostBySlug = (slug) =>
  API.get(`/posts/${slug}`).then((res) => res.data);

export const createPost = (data) =>
  API.post("/posts", data).then((res) => res.data);

export const updatePost = (slug, data) =>
  API.put(`/posts/${slug}`, data).then((res) => res.data);

export const deletePost = (slug) => API.delete(`/posts/${slug}`);
