import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SERVER_ADDRESS } from '../common/constant';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('jobSeeker');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_ADDRESS}/api/login`, { email, password, role });
      debugger
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        if(response?.data?.user?._id) {
            localStorage.setItem('login', response.data.user._id);
        }
        if (role === 'jobSeeker') {
        if(response.data.applicationComplete) {
            navigate('/job-seeker/search')
        } else {
            navigate('/job-seeker/profile');
        }
          
        } else if (role === 'recruiter') {
          navigate('/recruiter/post-job');
        }
      } else {
        setError("Invalid login credentials.");
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Login failed');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 border rounded shadow" style={{ width: '350px', background: 'white' }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="jobSeeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">Login</Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
