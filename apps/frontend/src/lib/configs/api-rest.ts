import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? import.meta.env.VITE_API_URL
    : 'https://production-api.com'; // TODO: To be changed once deployed to firebase

const apiRest = axios.create({
  baseURL,
  // withCredentials: true, // For cookies/auth sessions (TODO: remove this)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (add auth token if exists)
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token'); // Or from auth state
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiRest;
