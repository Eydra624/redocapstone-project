import { useParams, Link } from "react-router-dom";
import { useRef, useState } from "react";
import jobs from "../../data";

const JobDetails = () => {
  const { id } = useParams();
  const job = jobs.find((j) => j.id === parseInt(id));
  const formRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = 
  useState({
    name: "",
    email: "",
    message: "",
  });

  const handleApplyClick = () => {
    setShowForm(true);
    setTimeout(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // simulate successful submission
    setSubmitted(true);

    // clear form fields
    setFormData({
      name: "",
      email: "",
      message: "",
    });

    // hide success msg after 3secs
    setTimeout(() => 
    setSubmitted(false), 3000);
  };

  if (!job) {
    return <p>Job not found.</p>;
  }

  return (
    <div className="job-details">
    <Link to="/" className='back-to-home'>Back to home</Link>
     <div className="details">
      <h2>Job Details</h2>
      <h3>{job.title}</h3>
      <p><strong>Category:</strong> {job.category}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Type:</strong> {job.type}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Description</strong></p>
      <p>{job.description}</p>
      <div className="rule"></div>
      <p><strong>Requirements</strong></p>
      <ul>
        {job.requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
      </div>
    <div className='apply-now'><Link to="" onClick={handleApplyClick}>Apply Now!</Link></div>

    {/* short application form */}
    {showForm && (
    <div ref={formRef} className="app-form">
     <h2>Apply for this job</h2>
     <form onSubmit={handleSubmit}>
    <label>Full name:
      <input type="text" 
             name="name"
             value={formData.name}
             onChange={handleChange}
             required
        />
      </label> 
   <label>Email Address:
      <input type="email" 
             name="email"
             value={formData.email}
             onChange={handleChange}
             required
        />
      </label>
      <label>Why are you a good fit?
      <textarea name="message"             
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
        />
      </label>
       <div className="btn"><button type="submit" className="submit">Submit Application</button></div>
     </form>

     {submitted && (
      <div className="success"> ✅ Your application has been submitted successfully!</div>
     )}
    </div>
  )}
    </div>
  );
}

export default JobDetails;
