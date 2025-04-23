import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const auth = {
  loginWithGoogle: () => window.location.href = `${api.defaults.baseURL}/api/auth/google`,
  loginWithMicrosoft: () => window.location.href = `${api.defaults.baseURL}/api/auth/microsoft`,
  loginWithDropbox: () => window.location.href = `${api.defaults.baseURL}/api/auth/dropbox`,
  getConnectedServices: () => api.get('/api/auth/services'),
};

// Document endpoints
export const documents = {
  list: () => api.get('/api/files/list'),
  get: (id: string) => api.get(`/api/files/${id}`),
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  delete: (id: string) => api.delete(`/api/files/${id}`),
};

// AI endpoints
export const ai = {
  process: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/process', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  query: (query: string) => api.post('/api/query', { query }),
};

export default api; 