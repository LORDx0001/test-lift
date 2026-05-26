import axios from 'axios';

// Use production URL explicitly to avoid localhost fallback issues
const API_BASE = 'https://lift.lordx.uz';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export const endpoints = {
  settings:   () => api.get('/api/settings/'),
  services:   () => api.get('/api/services/'),
  service:    (slug) => api.get(`/api/services/${slug}/`),
  projects:   (params) => api.get('/api/projects/', { params }),
  project:    (slug) => api.get(`/api/projects/${slug}/`),
  contact:    (data) => api.post('/api/contact/', data),
  pageData:   () => api.get(`/api/page-data/?t=${new Date().getTime()}`),
};
