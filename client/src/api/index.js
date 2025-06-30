import axios from 'axios';

// Match the same pattern as merch.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://august-attic.onrender.com'
  : process.env.REACT_APP_API_URL || 'http://localhost:5001';

export const fetchData = async (endpoint) => {
  try {
    console.log('Fetching from:', `${API_BASE_URL}${endpoint}`); // Debug log
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};