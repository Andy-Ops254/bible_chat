// src/api.js
const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5555";

export const fetchData = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    return response.json();
};