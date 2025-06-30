import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await fetch('http://localhost:5001/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.headers.get('Content-Type')?.includes('application/json')) {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to log in');
        }

        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/'); // Redirect to home
      } else {
        throw new Error('Unexpected server response');
      }
    } catch (err) {
      console.error(err.message);
      setError(err.message); // Display error in the container
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Updated here */}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p>New user? <a href="/signup">Sign up here</a></p>
    </div>
  );
};

export default Login;
