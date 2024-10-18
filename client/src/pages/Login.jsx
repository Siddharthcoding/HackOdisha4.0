import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const decodeJWT = (token) => {
    if (!token) return null;

    // Split the token into parts
    const payload = token.split('.')[1]; // Get the second part of the JWT (the payload)

    // Decode the base64 URL-encoded string
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

    return decoded;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, credentials);
      const { token } = response.data;

      // Decode the token to get userId and role
      const decodedToken = decodeJWT(token); // Decode using the manual method
      const userId = decodedToken.userId; // Extract userId from the token
      const locationbuy = decodedToken.address;
      const userRole = decodedToken.role;   // Extract userRole from the token

      // Store the token and userId in localStorage
      localStorage.setItem('location-buyer',locationbuy);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', userRole);

      // Navigate to the user's homepage
      navigate('/Userhomepage');
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email" 
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            name="password" 
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
};
