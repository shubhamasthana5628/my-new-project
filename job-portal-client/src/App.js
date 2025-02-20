import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Home from './components/pages/home';
import Login from './components/pages/login';
import Register from './components/pages/register';
import JobSearch from './components/jobseeker/jobSearch';
import JobPosting from './components/recruiter/jobPosting';
import CandidateSearch from './components/recruiter/candidateSearch';
import Profile from './components/jobseeker/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/job-seeker/profile" element={<Profile />} />
        <Route path="/job-seeker/search" element={<JobSearch />} />
        <Route path="/recruiter/post-job" element={<JobPosting />} />
        <Route path="/recruiter/search-candidates" element={<CandidateSearch />} />
      </Routes>
    </Router>
  );
}

export default App;