// Backend - Node.js + Express + MongoDB
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

app.use(express.json());
app.use(cors());

// Connect to MongoDB

mongoose.connect('mongodb://localhost:27017/jobportal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String, // 'jobseeker' or 'recruiter'
  profile: Object,
});

const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  postedBy: mongoose.Schema.Types.ObjectId,
  applicants: [{ userId: mongoose.Schema.Types.ObjectId, status: String }],
});

const User = mongoose.model('User', UserSchema);
const Job = mongoose.model('Job', JobSchema);

// Authentication & User Routes
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role, profile: {} });
  await user.save();
  res.send(user);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send('Invalid credentials');
  }
  const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY);
  res.send({ user, token });
});

// Job Routes
app.post('/post-job', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.send(job);
});

app.get('/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.send(jobs);
});

app.post('/apply-job', async (req, res) => {
  const { jobId, userId } = req.body;
  await Job.updateOne({ _id: jobId }, { $push: { applicants: { userId, status: 'applied' } } });
  res.send('Application submitted');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));