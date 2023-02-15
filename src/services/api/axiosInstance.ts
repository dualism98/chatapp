import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://45.138.25.10:3000/',
});

export default axiosInstance;
