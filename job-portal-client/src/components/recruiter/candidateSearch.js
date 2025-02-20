import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchParams, setSearchParams] = useState({
    skill: '',
    experience: '',
    location: '',
    maxCTC: ''
  });

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/job-seekers', { params: searchParams });
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Search Candidates</h2>
      <div>
        <input
          type="text"
          name="skill"
          placeholder="Skill"
          value={searchParams.skill}
          onChange={handleChange}
          style={{ margin: '5px', padding: '10px' }}
        />
        <input
          type="number"
          name="experience"
          placeholder="Experience (Years)"
          value={searchParams.experience}
          onChange={handleChange}
          style={{ margin: '5px', padding: '10px' }}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={searchParams.location}
          onChange={handleChange}
          style={{ margin: '5px', padding: '10px' }}
        />
        <input
          type="number"
          name="maxCTC"
          placeholder="Max CTC"
          value={searchParams.maxCTC}
          onChange={handleChange}
          style={{ margin: '5px', padding: '10px' }}
        />
        <button onClick={handleSearch} style={{ padding: '10px', margin: '5px' }}>Search</button>
      </div>
      <h3>Candidate Results</h3>
      <ul>
        {candidates.map(candidate => (
          <li key={candidate._id}>
            <strong>{candidate.fullName}</strong> - {candidate.skillType} - {candidate.experience} years
            <br />
            Location: {candidate.location} | Current CTC: {candidate.currentCTC} | Expected CTC: {candidate.expectedCTC}
            <br />
            <button onClick={() => alert(`Contacting ${candidate.fullName}`)}>Contact</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateSearch;