import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SERVER_ADDRESS } from '../common/constant';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('jobSeeker')
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_ADDRESS}/api/login`, { email, password, role });
      // Handle successful login (e.g., store token, redirect)
      console.log(response.data);
      navigate('/job-seeker/profile'); // Redirect to home or dashboard
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <select
          name="role"
          value={role}
          onChange={(e)=>{setRole(e.target.value)}}
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        >
          <option value="jobSeeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
        </select>
        <button type="submit" style={{ width: '100%', padding: '10px' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;