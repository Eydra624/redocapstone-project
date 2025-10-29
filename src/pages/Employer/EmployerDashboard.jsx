import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const EmployerDashboard = () => {
  //  const employerId = "employer_123"

   const { currentUser } = useAuth();
   const employerId = currentUser?.id || "guest";  //Replace later with logged-in employer's ID
   const username = currentUser?.email?.split("@")[0];
  // ✅ load jobs specific to this employer
  const [jobs, setJobs] = useState(() =>
    {
    const savedJobs = localStorage.getItem(`jobs_${employerId}`);
    return savedJobs ? JSON.parse(savedJobs)
    : [];
   });

    useEffect(() => {
    localStorage.setItem(`jobs_${employerId}`, JSON.stringify(jobs));
  }, [jobs, employerId]);

  const [selectedJob, setSelectedJob] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newJob, setNewJob] = 
  useState({
    title: "",
    type: "Full-time",
    status: "Active"
  });

  // save jobs to local storage


  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value })
  };

  // add or update job
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newJob.title || !newJob.category) {
      alert("Please fill all required fields");
      return;
    }

    if (editMode) {
      // update existing job
      setJobs((prev) => 
      prev.map((job) =>
         job.id === newJob.id ? { ...job, ...newJob}
        : job
      )
      );
      setEditMode(false);
    } else {
      // Add new job
      const newJobEntry = {
        id: Date.now(),
        ...newJob,
        applicants: [],
      };
      setJobs([newJobEntry, ...jobs]);
    }

    setNewJob({
    title: "",
    type: "Full-time",
    category: "",
    status: "Active",
    });
  };

  // Delete job
  const handleDelete = (id) => {
    if (window.confirm("Are yo sure you want to delete this job?")) {
      setJobs((prev) => 
      prev.filter((job) => job.id !== id));
      if (selectedJob?.id === id)
      setSelectedJob(null);
    }
  };

  // Edit job
  const handleEdit = (job) => {
    setNewJob(job);
    setEditMode(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Accept / Reject handler
  const handleDecision = (jobId, applicantId, newStatus) => {
    setJobs((prevJobs) => {
    const updatedJobs = 
        prevJobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              applicants: job.applicants.map((app) =>
                app.id === applicantId ? { ...app, status: newStatus } : app
              ),
            }
          : job
      );

      // Also update selected job in sync
      const updateSelectedJob = 
      updatedJobs.find((j) => j.id === jobId
    );
    setSelectedJob(updateSelectedJob);
    return updatedJobs;
    });
  };

   return (
    <div className="emp-dashboard">
    <h2>Employer Dashboard</h2>
    {currentUser && (
      <div className="top">
      <h3>Welcome, {username}</h3>
      <Link to="/" className='back-to-home'>Back to home</Link>
      </div>
      
    )}
      
      {/* Summary section */}
      <div className="summary-cards">
        <div className="card">
          <h3>Total Jobs</h3>
          <p>{jobs.length}</p>
        </div>
        <div className="card">
          <h3>Active Jobs</h3>
          <p>{jobs.filter((job) => job.status === "Active").length}</p>
        </div>
        <div className="card">
          <h3>Total Applicants</h3>
          <p>{jobs.reduce((a, b) => a + b.applicants.length, 0)}</p>
        </div>
      </div> 

{/* ✅ Post / Edit Job Form */}
      <div className="new-job-form">
      <div className="rule"></div>
        <h3>{editMode ? "Edit Job" : "Post a New Job"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              name="title"
              value={newJob.title}
              onChange={handleChange}
              placeholder="e.g., Backend Developer"
              required
            />
          </div>

          <div className="form-group">
            <label>Job Type</label>
            <select
              name="type"
              value={newJob.type}
              onChange={handleChange}
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={newJob.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="IT">IT</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={newJob.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <button type="submit" className="post-btn">
            {editMode ? "Update Job" : "Post Job"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setNewJob({
                  title: "",
                  type: "Full-time",
                  category: "",
                  status: "Active",
                });
              }}
              className="cancel-btn"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* ✅ Jobs Table */}
      <div className="table">
      <h3>Posted Jobs</h3>
      <table className="jobs-table" border={1} >
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Category</th>
            <th>Status</th>
            <th>Applicants</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.type}</td>
              <td>{job.category}</td>
              <td>{job.status}</td>
              <td>{job.applicants.length}</td>
              <td>
  <button onClick={() => setSelectedJob(job)}>View</button>
  <button onClick={() => handleEdit(job)}>Edit</button>
  <button onClick={() => handleDelete(job.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* ✅ Applicants Section */}
      {selectedJob && (
        <div className="applicants-section">
          <h3 className="h3">
            Applicants for <span>{selectedJob.title}</span>
          </h3>
          <button className="close-btn" onClick={() => setSelectedJob(null)}>
            Close
          </button>

          {selectedJob.applicants.length > 0 ? (
            <table className="applicants-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Experience</th>
                  <th>Resume</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedJob.applicants.map((app) => (
                  <tr key={app.id}>
                    <td>{app.name}</td>
                    <td>{app.email}</td>
                    <td>{app.experience}</td>
                    <td>
                      <a href={app.resume} target="_blank" rel="noreferrer">
                        View
                      </a>
                    </td>
                    <td>{app.status}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleDecision(selectedJob.id, app.id, "Accepted")
                        }
                        disabled={app.status === "Accepted"}
                        className="accept-btn"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleDecision(selectedJob.id, app.id, "Rejected")
                        }
                        disabled={app.status === "Rejected"}
                        className="reject-btn"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No applicants yet for this job.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
