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
      navigate('/jobseeker/connection_HR'); // Corrected path for navigation
    } catch (error) {
      console.error('Error submitting profile:', error);
      alert('Profile creation failed');
    }
  };

  // Inline Styles with Unique IDs
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f7fa',
    },
    formCard: {
      background: 'white',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      width: '400px',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      outline: 'none',
    },
    select: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      outline: 'none',
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '12px',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: '0.3s',
      width: '100%',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div id="profile-container" style={styles.container}>
      <div id="profile-form-card" style={styles.formCard}>
        <h2>Create Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            id="profile-fullname"
            name="fullName"
            onChange={handleChange}
            placeholder="Full Name"
            required
            style={styles.input}
          />
          <input
            id="profile-phone"
            name="phoneNumber"
            onChange={handleChange}
            placeholder="Phone Number"
            required
            style={styles.input}
          />
          <input
            id="profile-skill"
            name="skillType"
            onChange={handleChange}
            placeholder="Skill Type"
            required
            style={styles.input}
          />
          <input
            id="profile-experience"
            name="experience"
            onChange={handleChange}
            placeholder="Experience"
            required
            style={styles.input}
          />
          <input
            id="profile-location"
            name="location"
            onChange={handleChange}
            placeholder="Location"
            required
            style={styles.input}
          />
          <input
            id="profile-currentCTC"
            name="currentCTC"
            onChange={handleChange}
            placeholder="Current CTC"
            required
            style={styles.input}
          />
          <input
            id="profile-expectedCTC"
            name="expectedCTC"
            onChange={handleChange}
            placeholder="Expected CTC"
            required
            style={styles.input}
          />
          <input
            id="profile-noticePeriod"
            name="noticePeriod"
            onChange={handleChange}
            placeholder="Notice Period"
            required
            style={styles.input}
          />
          <input
            id="profile-lookingForJob"
            name="lookingForJob"
            onChange={handleChange}
            placeholder="Looking for Job"
            required
            style={styles.input}
          />
          <select
            id="profile-jobCategory"
            name="jobCategory"
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="">Select Job Category</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>

          <button
            id="profile-submit"
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
