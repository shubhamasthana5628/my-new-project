import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [searchParams, setSearchParams] = useState({ skill: '', location: '', experience: '' });

  const handleSearch = async () => {
    const response = await axios.get('/api/jobs', { params: searchParams });
    setJobs(response.data);
  };

  return (
    <div>
      {/* Search Inputs */}
      <button onClick={handleSearch}>Search</button>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>{job.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default JobSearch;