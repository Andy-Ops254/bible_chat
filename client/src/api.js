// src/api.js

// 1. Try to get the URL from the environment (Vercel)
// 2. If that's missing, use your live Render URL as a fallback
const BASE_URL = process.env.REACT_APP_API_URL || "https://your-app-name.onrender.com";

export const fetchData = async (endpoint) => {
    // This ensures you don't accidentally get //user
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    const response = await fetch(`${BASE_URL}${cleanEndpoint}`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
};