import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { fetchMerch } from '../api/merch';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Home.css';

import FolkloreImage from '../assets/folklore-carousel.jpeg';
import EvermoreImage from '../assets/folklore.jpeg';
import folk from '../assets/ff.jpg';
import tay from '../assets/willow.jpeg';
import album1 from '../assets/folklore_album.jpg';
import album2 from '../assets/evermore_album.jpg';

const Home = () => {
  const [merch, setMerch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
    const getMerch = async () => {
      try {
        console.log('Fetching merch...');
        const merchData = await fetchMerch();
        console.log('Merch data received:', merchData);
        setMerch(merchData);
      } catch (err) {
        console.error('Error fetching merch:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getMerch();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Add debug logging to see what's in the merch array
  console.log('Current merch state:', merch);
  console.log('Merch length:', merch.length);

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Product added to cart!');
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const handleShopNow = (itemId) => {
    navigate(`/product/${itemId}`);
  };

  // Handle image errors with fallback
  const handleImageError = (e, itemName) => {
    console.log(`Image failed to load for ${itemName}, using fallback`);
    // Try different fallback services in order
    const fallbackImages = [
      `https://picsum.photos/240/200?random=${Math.floor(Math.random() * 1000)}`,
      `https://dummyimage.com/240x200/cccccc/000000&text=${encodeURIComponent(itemName)}`,
      `https://via.placeholder.com/240x200/cccccc/000000?text=${encodeURIComponent(itemName)}`,
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjY2NjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjMDAwMDAwIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+'
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

  return (
    <div className="home">
      {/* Image Carousel */}
      <div className="carousel">
        <div className="carousel-images">
          <img src={tay} alt="ts" />
          <img src={folk} alt="ff" />
          <img src={FolkloreImage} alt="Folklore" />
          <img src={EvermoreImage} alt="Evermore" />
        </div>
      </div>

      {/* Eras Sections */}
      <div className="eras">
        <div className="era-box folklore">
          <img src={album1} alt="Folklore" className="era-image" />
          <h3>Folklore</h3>
          <p>Explore the magical world of Folklore.</p>
          <Link to="/songs/folklore">See Songs</Link>
        </div>
        <div className="era-box evermore">
          <img src={album2} alt="Evermore" className="era-image" />
          <h3>Evermore</h3>
          <p>Discover the enchanting world of Evermore.</p>
          <Link to="/songs/evermore">See Songs</Link>
        </div>
      </div>

      {/* Merch Section */}
      <div className="merch-carousel">
        <h2>Merch</h2>
        {merch.length === 0 ? (
          <p>No merchandise available at the moment.</p>
        ) : (
          <Slider {...sliderSettings}>
            {merch.map((item) => (
              <div key={item._id} className="merch-item">
                <img 
                  src={item.image} 
                  alt={item.name}
                  onError={(e) => handleImageError(e, item.name)}
                />
                <h3>{item.name}</h3>
                <p className="price">{item.price ? `$${item.price}` : 'Price not available'}</p>

                {/* Add to Cart and Shop Now Buttons */}
                <div className="buttons">
                  <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                  <button onClick={() => handleShopNow(item._id)}>Shop Now</button>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Home;