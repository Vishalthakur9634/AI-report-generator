const defaultApi = import.meta.env.DEV ? 'http://localhost:5000' : 'https://ai-report-generator-backend.onrender.com';
const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : defaultApi;
export const API_URL = `${baseUrl}/api`;
