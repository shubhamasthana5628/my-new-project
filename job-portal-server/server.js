const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


// Connect to MongoDB
mongoose.connect("mongodb+srv://test:test-job123@cluster0.nbvfg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// Job Seeker Schema
const jobSeekerSchema = new mongoose.Schema({
    name: String,
    phone: String,
    skillType: String,
    experience: Number,
    location: String,
    currentCTC: Number,
    expectedCTC: Number,
    noticePeriod: String
});
// Job Seeker registration schema
const jobSeekeProfileSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
});
const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);
const JobSeekerProfile = mongoose.model('JobSeekerProfile', jobSeekeProfileSchema);


// Job Provider Schema
const recruiterSchema = new mongoose.Schema({
    name: String,
    company: String,
    email: String,
    mobile: String
});
const Recruiter = mongoose.model('Recruiter', recruiterSchema);

// Job Schema
const jobSchema = new mongoose.Schema({
    title: String,
    skillType: String,
    experience: Number,
    location: String,
    maxCTC: Number,
    noticePeriod: String,
    recruiterId: mongoose.Schema.Types.ObjectId
});
const Job = mongoose.model('Job', jobSchema);

// Application Schema
const applicationSchema = new mongoose.Schema({
    candidateId: mongoose.Schema.Types.ObjectId,
    jobId: mongoose.Schema.Types.ObjectId
});
const Application = mongoose.model('Application', applicationSchema);

// User Registration
app.post('/api/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === 'jobSeeker') {
        const user = new JobSeekerProfile({ name, email, password: hashedPassword });
        await user.save();
        res.json({ message: 'Job Seeker Registered' });
    } else {
        const user = new Recruiter({ name, email, password: hashedPassword });
        await user.save();
        res.json({ message: 'Recruiter Registered' });
    }
});

// User Login
app.post('/api/login', async (req, res) => {
    const { email, password, role } = req.body;
    let user;
    if (role === 'jobSeeker') {
        user = await JobSeekerProfile.findOne({ email });
    } else {
        user = await Recruiter.findOne({ email });
    }

    if (!user) return res.status(400).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
});

// Routes for Job Seekers
app.post('/api/job-seekers', async (req, res) => {
    const seeker = new JobSeeker(req.body);
    await seeker.save();
    res.json(seeker);
});

app.get('/api/job-seekers', async (req, res) => {
    const seekers = await JobSeeker.find();
    res.json(seekers);
});

app.put('/api/job-seekers/:id', async (req, res) => {
    const seeker = await JobSeeker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(seeker);
});

app.delete('/api/job-seekers/:id', async (req, res) => {
    await JobSeeker.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job seeker deleted' });
});


// Routes for Recruiters
app.post('/api/job-providers', async (req, res) => {
    const recruiter = new Recruiter(req.body);
    await recruiter.save();
    res.json(recruiter);
});

app.get('/api/job-providers', async (req, res) => {
    const recruiters = await Recruiter.find();
    res.json(recruiters);
});

app.put('/api/job-providers/:id', async (req, res) => {
    const recruiter = await Recruiter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(recruiter);
});

app.delete('/api/job-providers/:id', async (req, res) => {
    await Recruiter.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recruiter deleted' });
});

// Routes for Jobs
app.post('/api/jobs', async (req, res) => {
    const job = new Job(req.body);
    await job.save();
    res.json(job);
});

app.get('/api/jobs', async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
});

app.put('/api/jobs/:id', async (req, res) => {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
});

app.delete('/api/jobs/:id', async (req, res) => {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted' });
});

// Routes for Applications
app.post('/api/applications', async (req, res) => {
    const application = new Application(req.body);
    await application.save();
    res.json(application);
});

app.get('/api/applications', async (req, res) => {
    const applications = await Application.find().populate('candidateId').populate('jobId');
    res.json(applications);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
