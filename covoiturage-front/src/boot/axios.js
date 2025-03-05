import { boot } from 'quasar/wrappers';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // URL de ton backend Laravel
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = api;

});

export { api };
