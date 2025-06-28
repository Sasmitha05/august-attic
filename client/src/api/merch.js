// Function to fetch all merch
export const fetchMerch = async () => {
  const response = await fetch('http://localhost:5000/api/merch');
  if (!response.ok) {
    throw new Error('Failed to fetch merch data');
  }
  return response.json();
};

// Function to fetch a specific merch item by ID
export const fetchMerchById = async (id) => {
  const response = await fetch(`http://localhost:5000/api/merch/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch merch data');
  }
  return response.json();
};
