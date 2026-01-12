import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here in the future
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (!error.response) {
      console.error('Network Error:', error.message);
      return Promise.reject(error);
    }
    switch (error.response.status) {
      case 401:
        console.error('Unauthorized Error:', error.response.data);
        break;
      case 403:
        console.error('Forbidden Error:', error.response.data);
        break;
      case 404:
        console.error('Not Found Error:', error.response.data);
        break;
      case 409:
        console.error('Conflict Error:', error.response.data);
        break;
      case 422:
        console.error('Unprocessable Entity Error:', error.response.data);
        break;
      case 429:
        console.error('Too Many Requests Error:', error.response.data);
        break;
      case 500:
        console.error('Internal Server Error:', error.response.data);
        break;
      case 502:
        console.error('Bad Gateway Error:', error.response.data);
        break;
      case 503:
        console.error('Service Unavailable Error:', error.response.data);
        break;
      case 504:
        console.error('Gateway Timeout Error:', error.response.data);
        break;
      default:
        console.error('Unknown Error:', error.response.data);
        break;
    }

    return Promise.reject(error);
  }
);

export default api;
