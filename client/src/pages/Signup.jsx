import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Use the same API_BASE_URL pattern as your other API files
  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://august-attic.onrender.com'
    : process.env.REACT_APP_API_URL || 'http://localhost:5001';

  // Function to validate email format
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Reset error state
    setError('');

    // Check if email is valid
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    const user = { email, name, password };

    try {
      console.log('Signing up at:', `${API_BASE_URL}/api/user/signup`); // Debug log
      const response = await fetch(`${API_BASE_URL}/api/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign up');
      }

      // Handle successful signup
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/'); // Redirect to Home
    } catch (error) {
      console.error('Signup error:', error.message);
      setError(error.message); // Set error in state to show in the container
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default Signup;