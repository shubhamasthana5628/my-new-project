import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to the Job Portal</h1>
      <p>Find your dream job or post job openings!</p>
      <Link to="/login">
        <button style={{ margin: '10px', padding: '10px 20px' }}>Login</button>
      </Link>
      <Link to="/register">
        <button style={{ margin: '10px', padding: '10px 20px' }}>Register</button>
      </Link>
    </div>
  );
};

export default Home;