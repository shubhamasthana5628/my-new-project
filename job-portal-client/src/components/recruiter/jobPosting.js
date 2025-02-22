import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_ADDRESS } from '../common/constant';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const JobPosting = () => {
  const [jobData, setJobData] = useState({
    title: '',
    skillType: '',
    experience: '',
    location: '',
    maxCTC: '',
    noticePeriod: '',
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault();
    const payload = {...jobData}
    if(localStorage.getItem('login') !== 'null') {
        payload['recruiterId'] = localStorage.getItem('login');
    }
    await axios.post(`${SERVER_ADDRESS}/api/jobs`, payload);
    setShowAlert(true)
    setJobData(
        { title: '',
        skillType: '',
        experience: '',
        location: '',
        maxCTC: '',
        noticePeriod: '',
      });
  };

  return (
    <Container>
      <h2 className="mb-4">Post a Job</h2>
      {showAlert && <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>Job posted successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Job Title</Form.Label>
          <Form.Control type="text" name="title" value={jobData.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Skill Type</Form.Label>
          <Form.Control type="text" name="skillType" value={jobData.skillType} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Experience Required (years)</Form.Label>
          <Form.Control type="number" name="experience" value={jobData.experience} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" name="location" onChange={handleChange} value={jobData.location} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Max CTC (in LPA)</Form.Label>
          <Form.Control type="number" name="maxCTC" onChange={handleChange} value={jobData.maxCTC} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Notice Period (days)</Form.Label>
          <Form.Control type="number" name="noticePeriod" onChange={handleChange} value={jobData.noticePeriod} required />
        </Form.Group>
        <Button variant="primary" type="submit">Post Job</Button>
      </Form>
    </Container>
  );
};

export default JobPosting;
