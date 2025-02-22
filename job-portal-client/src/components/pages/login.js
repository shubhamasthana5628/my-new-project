import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SERVER_ADDRESS } from '../common/constant';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('jobSeeker');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_ADDRESS}/api/login`, { email, password, role });

      console.log(response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Store token

        // Redirect based on role
        if (role === 'jobSeeker') {
          navigate('/job-seeker/profile');
        } else if (role === 'recruiter') {
          navigate('/recruiter/candidateSearch'); // Corrected path
        }
      } else {
        console.error("No token received:", response.data);
      }

    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error.message);
    }
  };

  // Inline Styles with Unique IDs
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
    <div id="login-container" style={styles.container}>
      <div id="login-card" style={styles.card}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            id="login-email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            id="login-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <select
            id="login-role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            style={styles.select}
          >
            <option value="jobSeeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </select>
          <button
            id="login-button"
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
