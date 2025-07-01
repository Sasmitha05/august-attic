//client/Shopping.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMerch } from '../api/merch';
import '../styles/Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        console.log('Fetching products for shop...');
        const productsData = await fetchMerch();
        console.log('Shop products received:', productsData);
        setProducts(productsData);
      } catch (err) {
        console.error('Error fetching shop products:', err);
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
    navigate(`/product/${itemId}`);
  };

  // Handle image errors with fallback - same as Home page
  const handleImageError = (e, itemName) => {
    console.log(`Shop image failed to load for ${itemName}, using fallback`);
    // Try different fallback services in order
    const fallbackImages = [
      `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`,
      `https://dummyimage.com/400x400/cccccc/000000&text=${encodeURIComponent(itemName)}`,
      `https://via.placeholder.com/400x400/cccccc/000000?text=${encodeURIComponent(itemName)}`,
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjY2NjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjMDAwMDAwIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+'
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = fallbackImages.indexOf(currentSrc);
    
    if (currentIndex < fallbackImages.length - 1) {
      e.target.src = fallbackImages[currentIndex + 1];
    } else {
      // Last fallback - inline SVG
      e.target.src = fallbackImages[fallbackImages.length - 1];
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Add debug logging
  console.log('Shop products state:', products);
  console.log('Shop products length:', products.length);

  return (
    <div className="shop">
      <h1>Shop</h1>
      <div className="merch-list">
        {products.length === 0 ? (
          <p>No products available at the moment.</p>
        ) : (
          products.map((item) => (
            <div key={item._id} className="merch-item">
              <img 
                src={item.image} 
                alt={item.name}
                onError={(e) => handleImageError(e, item.name)}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <p>{item.name}</p>
              <p>{item.price ? `$${item.price}` : 'Price not available'}</p>
              
              {/* Add Buttons */}
              <div className="buttons">
                <button onClick={() => addToCart(item)}>Add to Cart</button>
                <button onClick={() => handleShopNow(item._id)}>Shop Now</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;