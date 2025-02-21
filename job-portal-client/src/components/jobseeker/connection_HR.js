import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_ADDRESS } from '../common/constant';

const JobSeekerDashboard = () => {
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await axios.get(`${SERVER_ADDRESS}/api/job-providers`);
        setRecruiters(response.data);
      } catch (error) {
        console.error('Error fetching recruiters:', error);
      }
    };

    fetchRecruiters();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Available Recruiters</h2>
      {recruiters.length > 0 ? (
        recruiters.map((recruiter) => (
          <div key={recruiter._id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
            <h3>{recruiter.company}</h3>
            <p><strong>HR Name:</strong> {recruiter.name}</p>
            <p><strong>WhatsApp:</strong> {recruiter.mobile}</p>
            <a 
              href={`https://wa.me/${recruiter.mobile}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'inline-block', padding: '8px 12px', background: 'green', color: 'white', textDecoration: 'none', borderRadius: '5px' }}
            >
              Connect on WhatsApp
            </a>
          </div>
        ))
      ) : (
        <p>No recruiters available</p>
      )}
    </div>
  );
};

export default JobSeekerDashboard;
