const API_BASE_URL = process.env.REACT_APP_API_URL;

// Fetch all merch
export const fetchMerch = async () => {
  const response = await fetch(`${API_BASE_URL}/api/merch`);
  if (!response.ok) {
    throw new Error('Failed to fetch merch data');
  }
  return response.json();
};

// Fetch merch by ID
export const fetchMerchById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/merch/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch merch data');
  }
  return response.json();
};
