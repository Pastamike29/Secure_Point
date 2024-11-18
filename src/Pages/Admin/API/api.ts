// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Change this to your API base URL

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const createUser = async (userData: any) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

export const updateUser = async (userId: string, userData: any) => {
  const response = await axios.put(`${API_URL}/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  await axios.delete(`${API_URL}/users/${userId}`);
};
