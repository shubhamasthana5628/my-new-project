import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, ListGroup, Card } from 'react-bootstrap';
import { SERVER_ADDRESS } from '../common/constant';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchParams, setSearchParams] = useState({
    skillType: '',
    experience: '',
    location: '',
    expectedCTC: ''
  });

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      let payload = {};
      for(let key in searchParams) {
        if(searchParams[key]?.length) {
          payload[key] = searchParams[key];
        }
      }
      const response = await axios.get(`${SERVER_ADDRESS}/api/job-seekers/search`, { params: payload });
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Search Candidates</h2>
      <Card className="p-4 mb-4">
        <Form>
          <Form.Group className="mb-3">
            <Form.Control 
              type="text" 
              name="skillType" 
              placeholder="skillType" 
              value={searchParams.skillType} 
              onChange={handleChange} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control 
              type="number" 
              name="experience" 
              placeholder="Experience (Years)" 
              value={searchParams.experience} 
              onChange={handleChange} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control 
              type="text" 
              name="location" 
              placeholder="Location" 
              value={searchParams.location} 
              onChange={handleChange} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control 
              type="number" 
              name="expectedCTC" 
              placeholder="Expected CTC" 
              value={searchParams.expectedCTC} 
              onChange={handleChange} 
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSearch}>Search</Button>
        </Form>
      </Card>
      
      <h3>Candidate Results</h3>
      <ListGroup>
        {candidates.map(candidate => (
          <ListGroup.Item key={candidate._id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{candidate.fullName}</strong> - {candidate.skillType} - {candidate.experience} years
              <br />
              Location: {candidate.location} | Current CTC: {candidate.currentCTC} | Expected CTC: {candidate.expectedCTC}
            </div>
            <Button variant="success" onClick={() => alert(`Contacting ${candidate.fullName}`)}>Contact</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default CandidateSearch;