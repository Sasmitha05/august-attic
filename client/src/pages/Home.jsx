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
        const merchData = await fetchMerch();
        setMerch(merchData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getMerch();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Product added to cart!');
  };

  const handleAddToCart = (item) => {
    addToCart(item); // Add item to cart when clicked
  };

  const handleShopNow = (itemId) => {
    // Navigate to the product detail page
    navigate(`/product/${itemId}`);
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
        <Slider {...sliderSettings}>
          {merch.map((item) => (
            <div key={item._id} className="merch-item">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.price ? `$${item.price}` : ''}</p>

              {/* Add to Cart and Shop Now Buttons */}
              <div className="buttons">
                <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                <button onClick={() => handleShopNow(item._id)}>Shop Now</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
