import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { fetchMerch } from '../api/merch';
import '../styles/Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchMerch();
        setProducts(productsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Product added to cart!');
  };

  const handleShopNow = (itemId) => {
    navigate(`/product/${itemId}`); // Navigate to product detail page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="shop">
      <h1>Shop</h1>
      <div className="merch-list">
        {products.map((item) => (
          <div key={item._id} className="merch-item">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.price ? `$${item.price}` : ''}</p>
            
            {/* Add Buttons */}
            <div className="buttons">
              <button onClick={() => addToCart(item)}>Add to Cart</button>
              <button onClick={() => handleShopNow(item._id)}>Shop Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
