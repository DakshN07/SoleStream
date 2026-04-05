import axios from 'axios';

const getBaseURL = () => {
  const envURL = import.meta.env.VITE_API_URL;
  if (!envURL) return 'http://localhost:5000/api/v1';
  return envURL.endsWith('/api/v1') ? envURL : `${envURL.replace(/\/$/, '')}/api/v1`;
};

const api = axios.create({
  baseURL: getBaseURL(),
});

api.interceptors.request.use(
  (config) => {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      if (userInfo.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
