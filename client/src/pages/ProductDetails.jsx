import React, { useState, useEffect } from 'react';
import '../styles/ProductDetails.css';
import { useParams } from 'react-router-dom';
import { fetchMerchById } from '../api/merch'; // Import the API function

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // For managing loading state
  const [error, setError] = useState(null); // For managing errors

  useEffect(() => {
    // Fetch the product details using the API function
    fetchMerchById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false); // Stop loading when the data is fetched
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false); // Stop loading even if there's an error
      });
  }, [id]);

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Product added to cart!');
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading while fetching data
  }

  if (error) {
    return <p>{`Error: ${error}`}</p>; // Show error message if there's an error
  }

  return (
    <div className="product-details-container">
      <h1>{product.name}</h1>
      <div className="product-details">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <button onClick={() => addToCart(product)} className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
