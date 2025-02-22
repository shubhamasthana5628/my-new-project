import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_ADDRESS } from "../common/constant";

const JobSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get(`${SERVER_ADDRESS}/api/jobs`)
            .then(response => setJobs(response.data))
            .catch(error => console.error("Error fetching jobs:", error));
    }, []);

    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.skillType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Job Listings</h2>
            <input 
                type="text" 
                className="form-control mb-3" 
                placeholder="Search jobs by title or skill..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <div className="row">
                {filteredJobs.map((job, index) => (
                    <div key={index} className="col-md-6 mb-4">
                        <div className="card p-3 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{job.title}</h5>
                                <p className="card-text"><strong>Skills:</strong> {job.skillType}</p>
                                <p className="card-text"><strong>Experience:</strong> {job.experience} years</p>
                                <p className="card-text"><strong>Location:</strong> {job.location}</p>
                                <p className="card-text"><strong>Max CTC:</strong> ${job.maxCTC}</p>
                                <p className="card-text"><strong>Notice Period:</strong> {job.noticePeriod}</p>
                                <button className="btn btn-primary">Apply</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobSearch;
