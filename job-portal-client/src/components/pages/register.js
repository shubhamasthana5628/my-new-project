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

  // Inline Styles
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f7fa',
    },
    card: {
      background: 'white',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      width: '350px',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      outline: 'none',
    },
    select: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      outline: 'none',
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '12px',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: '0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <select name="role" value={formData.role} onChange={handleChange} required style={styles.select}>
            <option value="jobSeeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </select>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
