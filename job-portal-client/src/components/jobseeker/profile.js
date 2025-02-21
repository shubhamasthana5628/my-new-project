import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SERVER_ADDRESS } from '../common/constant';

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    skillType: '',
    experience: '',
    location: '',
    currentCTC: '',
    expectedCTC: '',
    noticePeriod: '',
    lookingForJob: '',
    jobCategory: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${SERVER_ADDRESS}/api/job-seekers`, formData);
      alert('Profile Created Successfully');
      navigate('jobseeker/connection_HR'); // Redirect to Dashboard
    } catch (error) {
      console.error('Error submitting profile:', error);
      alert('Profile creation failed');
    }
  };

  return (
    <div>
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="fullName" onChange={handleChange} placeholder="Full Name" required />
        <input name="phoneNumber" onChange={handleChange} placeholder="Phone Number" required />
        <input name="skillType" onChange={handleChange} placeholder="Skill Type" required />
        <input name="experience" onChange={handleChange} placeholder="Experience" required />
        <input name="location" onChange={handleChange} placeholder="Location" required />
        <input name="currentCTC" onChange={handleChange} placeholder="Current CTC" required />
        <input name="expectedCTC" onChange={handleChange} placeholder="Expected CTC" required />
        <input name="noticePeriod" onChange={handleChange} placeholder="Notice Period" required />
        
        <input name="lookingForJob" onChange={handleChange} placeholder="Looking for Job" required />
        <select name="jobCategory" onChange={handleChange} required>
          <option value="">Select Job Category</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Profile;
