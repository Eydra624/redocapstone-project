import React from 'react'
import "../css/JobCard.css"
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/jobs/${job.id}`);
  };
   
  const handleApplyClick = (e) => {
  e.stopPropagation(); // prevent the cardclick from firing too 
   navigate(`/jobs/${job.id}`);
  };

  return (
    <div className='job-card' onClick={handleCardClick}>
      <div className='job-header'>
        <h3>{job.title}</h3>
        <h4>{job.company}</h4>
        <span>📍 {job.location}</span>
        <p>💼 {job.type}</p>
      </div>
        {/* apply button */}
       <a onClick={handleApplyClick} className='apply'>Apply!</a>
      </div>
    
  )
}

export default JobCard
