import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
};

export const taskAPI = {
  getTasks: (params) => API.get('/tasks', { params }),
  createTask: (data) => API.post('/tasks', data),
  getTask: (id) => API.get(`/tasks/${id}`),
  updateTask: (id, data) => API.put(`/tasks/${id}`, data),
  deleteTask: (id) => API.delete(`/tasks/${id}`),
  getStats: () => API.get('/tasks/stats'),
};

export default API;
