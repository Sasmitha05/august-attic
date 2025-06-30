// This will automatically use the right URL for each environment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://august-attic.onrender.com'
  : process.env.REACT_APP_API_URL || 'http://localhost:5001';

// Fetch all merch
export const fetchMerch = async () => {
  console.log('Fetching from:', `${API_BASE_URL}/api/merch`); // Debug log
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