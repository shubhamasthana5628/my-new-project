import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    skillType: '',
    experience: '',
    location: '',
    currentCTC: '',
    expectedCTC: '',
    noticePeriod: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/job-seekers', formData);
    // Handle success or error
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form Fields */}
      <input name="fullName" onChange={handleChange} placeholder="Full Name" />
      {/* Add other fields similarly */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Profile;