import axios from 'axios';

const api = axios.create({
  baseURL: `http://economia.awesomeapi.com.br/USD`,
});

export default api;