import axios from "axios";

const API_URL = "http://127.0.0.1:8000/posts";

export const fetchPosts = async (search = "") => {
  const { data } = await axios.get(API_URL, { params: { search } });
  return data;
};

export const fetchPost = async (slug) => {
  const { data } = await axios.get(`${API_URL}/${slug}`);
  return data;
};

export const createPost = async (post) => {
  const { data } = await axios.post(API_URL, post);
  return data;
};

export const updatePost = async (slug, post) => {
  const { data } = await axios.put(`${API_URL}/${slug}`, post);
  return data;
};

export const deletePost = async (slug) => {
  await axios.delete(`${API_URL}/${slug}`);
};
