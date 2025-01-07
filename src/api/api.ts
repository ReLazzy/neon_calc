import axios from 'axios';

export const API_URL = 'http://45.12.238.61:8885/calc';

const $api = axios.create({
  withCredentials: false,
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
});

export default $api;