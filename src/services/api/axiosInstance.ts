import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

export default axiosInstance;
