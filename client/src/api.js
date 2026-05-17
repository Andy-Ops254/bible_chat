export const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};