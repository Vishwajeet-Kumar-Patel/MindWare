import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mindware-1.onrender.com',
});

export default API;
