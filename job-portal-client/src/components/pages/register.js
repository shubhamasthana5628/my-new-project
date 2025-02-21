import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SERVER_ADDRESS } from '../common/constant';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'jobSeeker', // Default role: Job Seeker
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_ADDRESS}/api/register`, formData);
      console.log('Registration Successful:', response.data);

      // Redirect based on role
      if (formData.role === 'jobSeeker') {
        navigate('/login'); // Redirect Job Seeker to Profile Creation
      } else {
        navigate('/login'); // Redirect Recruiter to Dashboard
      }
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        >
          <option value="jobSeeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
        </select>
        <button type="submit" style={{ width: '100%', padding: '10px' }}>Register</button>
      </form>
    </div>
  );
};

export default Register;
