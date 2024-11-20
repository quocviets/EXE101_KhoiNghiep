// Recruitment.js
import React from 'react';
import './Recruitment.css';

const Recruitment = () => {
  const jobListings = [
    {
      title: "General Practitioner",
      location: "Ho Chi Minh City",
      type: "Full-Time",
      salary: "40,000,000 VND - 60,000,000 VND",
      description: "Seeking experienced General Practitioners to join our healthcare team to provide comprehensive patient care.",
    },
    {
      title: "Nurse",
      location: "Ha Noi",
      type: "Part-Time",
      salary: "20,000,000 VND - 30,000,000 VND",
      description: "Join our nursing team to assist with patient care, medication administration, and health assessments.",
    },
    {
      title: "Pediatric Specialist",
      location: "Remote Consultation",
      type: "Contract",
      salary: "Flexible based on hours",
      description: "Experienced Pediatric Specialist needed for remote consultations to provide expert care for young patients.",
    },
    // Add more job listings as needed
  ];

  return (
    <div className="recruitment-container">
      <h1 className="recruitment-title">Cơ Hội Nghề Nghiệp Y Tế</h1>
      <div className="job-listings">
        {jobListings.map((job, index) => (
          <div key={index} className="job-card">
            <h2 className="job-title">{job.title}</h2>
            <p className="job-location"><strong>Địa điểm:</strong> {job.location}</p>
            <p className="job-type"><strong>Loại công việc:</strong> {job.type}</p>
            <p className="job-salary"><strong>Mức lương:</strong> {job.salary}</p>
            <p className="job-description">{job.description}</p>
            <button className="apply-button">Ứng tuyển ngay</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recruitment;
