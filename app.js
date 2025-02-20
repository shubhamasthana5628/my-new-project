import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setAuth(true);
    } catch (error) {
      alert('Login Failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/jobs').then((res) => setJobs(res.data));
  }, []);

  return (
    <div>
      <h2>Job Listings</h2>
      {jobs.map((job) => (
        <div key={job._id}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <button>Apply</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [auth, setAuth] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/dashboard'>Dashboard</Link>
      </nav>
      <Routes>
        <Route path='/' element={auth ? <Navigate to='/dashboard' /> : <Login setAuth={setAuth} />} />
        <Route path='/dashboard' element={auth ? <Dashboard /> : <Navigate to='/' />} />
      </Routes>
    </Router>
  );
};

export default App;
