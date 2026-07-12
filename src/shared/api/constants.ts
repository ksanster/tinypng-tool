export const API_URL = import.meta.env.VITE_TINYPNG_API_URL || '';
export const API_KEY = import.meta.env.VITE_TINYPNG_API_KEY || '';
export const AUTH_HEADER = btoa(`api:${API_KEY}`);
