import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SERVER_ADDRESS } from '../common/constant';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    skillType: '',
    experience: '',
    location: '',
    currentCTC: '',
    expectedCTC: '',
    noticePeriod: '',
    lookingForJob: '',
    jobCategory: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${SERVER_ADDRESS}/api/job-seekers`, formData);
      setShowAlert(true);
      setTimeout(() => {
        navigate('/job-seeker/search');
      }, 2000);
    } catch (error) {
      console.error('Error submitting profile:', error);
      alert('Profile creation failed');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Create Your Profile</h2>
      {showAlert && <Alert variant="success">Profile Created Successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Skill Type</Form.Label>
              <Form.Control type="text" name="skillType" value={formData.skillType} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Experience (years)</Form.Label>
              <Form.Control type="number" name="experience" value={formData.experience} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Current CTC (LPA)</Form.Label>
              <Form.Control type="number" name="currentCTC" value={formData.currentCTC} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expected CTC (LPA)</Form.Label>
              <Form.Control type="number" name="expectedCTC" value={formData.expectedCTC} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notice Period (days)</Form.Label>
              <Form.Control type="number" name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Looking for Job</Form.Label>
              <Form.Control type="text" name="lookingForJob" value={formData.lookingForJob} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Category</Form.Label>
              <Form.Select name="jobCategory" value={formData.jobCategory} onChange={handleChange} required>
                <option value="">Select Job Category</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default Profile;