import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AboutUs.css";

const AboutUs = () => {
  const navigate = useNavigate();
  // Simple counter animation logic
  const [stats, setStats] = useState({
    jobsPosted: 0,
    employers: 0,
    jobSeekers: 0,
    hires: 0,
  });

  useEffect(() => {
    const targets = { jobsPosted: 1200, employers: 450, jobSeekers: 3000, hires: 970 };
    const duration = 2000;
    const start = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setStats({
        jobsPosted: Math.floor(progress * targets.jobsPosted),
        employers: Math.floor(progress * targets.employers),
        jobSeekers: Math.floor(progress * targets.jobSeekers),
        hires: Math.floor(progress * targets.hires),
      });
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <section className="about">
      <div className="about-container">
        <h1>About Us</h1>
        <p className="intro">
          Welcome to <span style={{ color: "#0c0c45", fontWeight:"700" }}>Hyre</span>— a trusted platform that bridges
          the gap between skilled job seekers and forward-thinking employers.
          Whether you’re seeking your dream role or looking to hire top talent,
          we make the connection easy, fast, and reliable.
        </p>

        <div className="mission-section">
          <h2>🎯 Our Mission</h2>
          <p>
            Our mission is simple — to empower professionals and businesses by
            creating opportunities for growth and success. We believe every job
            seeker deserves the right opportunity, and every employer deserves
            the best candidate.
          </p>
        </div>

        {/* ✅ Our Impact Section */}
        <div className="impact-section">
          <h2>📊 Our Impact</h2>
          <p>We’ve been connecting people and opportunities across industries.</p>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>{stats.jobsPosted}+</h3>
              <p>Jobs Posted</p>
            </div>
            <div className="stat-item">
              <h3>{stats.employers}+</h3>
              <p>Employers Registered</p>
            </div>
            <div className="stat-item">
              <h3>{stats.jobSeekers}+</h3>
              <p>Active Job Seekers</p>
            </div>
            <div className="stat-item">
              <h3>{stats.hires}+</h3>
              <p>Successful Hires</p>
            </div>
          </div>
        </div>

        <div className="how-it-works">
          <h2>⚙ How It Works</h2>
          <ul>
            <li>
              <strong>For Job Seekers:</strong> Explore thousands of verified job
              listings, apply directly, and track your applications all in one
              place.
            </li>
            <li>
              <strong>For Employers:</strong> Post new job openings, review
              applications, and manage candidates effortlessly through your
              dashboard.
            </li>
            <li>
              <strong>Smart Matching:</strong> Our system filters roles and
              applicants based on skills, experience, and preferences — ensuring
              perfect matches.
            </li>
          </ul>
        </div>

        <div className="values">
          <h2>💡 Our Core Values</h2>
          <div className="value-grid">
            <div className="value-item">
              <h3>Trust</h3>
              <p>
                We ensure verified listings and transparent communication
                between job seekers and employers.
              </p>
            </div>
            <div className="value-item">
              <h3>Innovation</h3>
              <p>
                We constantly improve our platform with modern features that
                make hiring and job searching smoother.
              </p>
            </div>
            <div className="value-item">
              <h3>Inclusivity</h3>
              <p>
                We connect diverse talents from different backgrounds with equal
                access to opportunities.
              </p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>🚀 Join Us Today</h2>
          <p>
            Whether you’re an employer looking for top talent or a job seeker
            ready to take the next step — <strong>Hyre</strong> is here to
            make it happen.
          </p>
          {/* <button onClick={() => (window.location.href = "/signup")}> */}
          <button onClick={() => navigate("/signup")}>
            Get Started
          </button>
        </div>
        
      </div>
    </section>
  );
};

export default AboutUs;
