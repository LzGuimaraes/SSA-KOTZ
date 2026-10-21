import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL?.replace(/\/+$/, '');
if (!baseURL) {
  throw new Error('Defina VITE_API_URL em frontend/.env. Consulte .env.example.');
}

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: { Accept: 'application/json' },
});
