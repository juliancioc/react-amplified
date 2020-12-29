import axios from 'axios';

const api = axios.create({
  baseURL: `https://economia.awesomeapi.com.br/USD`,
});

export default api;