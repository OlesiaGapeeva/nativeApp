import axios from 'axios';

export const axiosInstance = axios.create({ baseURL: 'http://192.168.124.132:8000/' });