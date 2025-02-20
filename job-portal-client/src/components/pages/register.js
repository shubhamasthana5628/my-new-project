import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SERVER_ADDRESS } from '../common/constant';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'jobSeeker' // Default to job seeker
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${SERVER_ADDRESS}/api/register`, formData);
      // Handle successful registration (e.g., redirect to login)
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error (e.g., show error message)
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