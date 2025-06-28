import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null); // State to store user details
  const [isProfileVisible, setProfileVisible] = useState(false); // Toggle profile visibility

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Update state with user data if available
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    setUser(null); // Clear user state
    setProfileVisible(false); // Hide profile after logout
  };

  const toggleProfile = () => {
    setProfileVisible((prev) => !prev); // Toggle visibility of the profile section
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={require('../assets/logo.png')} alt="Logo" className="logo" />
        <h1>Augustine Reverie</h1>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/shopping">Merch</Link></li>
        <li><Link to="/songs">Songs</Link></li>
        {user ? (
          <li>
            <div className="profile">
              <span>Hi, {user.name}</span>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          </li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
