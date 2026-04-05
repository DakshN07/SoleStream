import { create } from 'zustand';
import api from '../services/api';

const useAuthStore = create((set) => ({
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    set({ userInfo: data });
  },
  register: async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    set({ userInfo: data });
  },
  logout: () => {
    localStorage.removeItem('userInfo');
    set({ userInfo: null });
  }
}));

export default useAuthStore;
