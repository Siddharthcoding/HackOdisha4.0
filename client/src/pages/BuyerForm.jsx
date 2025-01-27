import React, { useState } from 'react';
import { useDarkMode } from '../components/DarkModeContext';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import '../css/BuyerForm.css';

export default function BuyerForm() {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    shopnm: '',     
    email: '',
    password: '',    // Field for password (as per your schema)
    address: '',    // Field for location (as per your schema)
    phone: '',       // Field for phone number (as per your schema)
    adharNo: '',     // Field for Adhar number (as per your schema)
  });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/regBuyer`, formData);
      console.log('Response:', response.data);
      alert("success");
      if(response.status === 200){
        navigate('/User-Home-Page');  
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.response ? error.response.data : 'An error occurred'); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className={`form-container ${darkMode ? 'dark' : 'light'}`}>
      <form onSubmit={handleSubmit} className="responsive-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shopnm">Shop Name:</label>
          <input
            type="text"
            id="shopnm"
            name="shopnm"
            placeholder="Enter your shop name"
            value={formData.shopnm}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            className="location-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="^\d{10}$" // Optional: regex pattern for validation
          />
        </div>

        <div className="form-group">
          <label htmlFor="adharNo">Adhar Number:</label>
          <input
            type="text"
            id="adharNo"
            name="adharNo"
            placeholder="Enter your Adhar number"
            value={formData.adharNo}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {error && <p className="error-message">{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
}
