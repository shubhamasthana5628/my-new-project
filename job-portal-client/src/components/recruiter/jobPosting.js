import React, { useState } from 'react';
import axios from 'axios';

const JobPosting = () => {
  const [jobData, setJobData] = useState({
    title: '',
    skillType: '',
    experienceRequired: '',
    location: '',
    maxCTC: '',
    noticePeriod: ''
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/jobs', jobData);
    // Handle success or error
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form Fields */}
      <input name="title" onChange={handleChange} placeholder="Job Title" />
      {/* Add other fields similarly */}
      <button type="submit">Post Job</button>
    </form>
  );
};

export default JobPosting;