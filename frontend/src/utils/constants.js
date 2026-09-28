export const BACKEND_API = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_BACKEND_URL || "http://44.200.13.119:3000";
