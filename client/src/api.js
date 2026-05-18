const RAW_BASE = import.meta.env.VITE_API_URL;
// If VITE_API_URL is not set (e.g. frontend hosted separately without proxy),
// default to relative paths so the app can still call the same origin.
const BASE_URL = RAW_BASE ? RAW_BASE.replace(/\/$/, '') : '';

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};