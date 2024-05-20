import axios from 'axios';
import { API_BASE_URL } from './config';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
    (response) => {
        if(!response.data.success && response.data.message === 'Authentication Failed'){
            localStorage.removeItem('token');
        }
        return response;
    }
    
  );

export default axiosInstance;
