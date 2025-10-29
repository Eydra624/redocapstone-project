import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { Search } from "lucide-react"
import JobCard from "./JobCard";
import jobs from "../data";
import amanda from "../assets/amanda.jpg"
import Designer from "../assets/Designer.jpg"
import walter from "../assets/walter.jpg"
import williams from "../assets/williams.jpg"


const Features = () => {
const navigate = useNavigate();
const [email, setEmail] = useState("");
const isAuthenticated = true;
const [searchTerm, setSearchTerm] = useState("");

// Dynamically extract unique categories
const categories = [...new Set(jobs.map((job) => job.category))];

// icon map for categories
const categoryIcons = {
    IT: "💻",
    Design: "🎨",
    Marketing: "📈",
    Media: "💰",
    Management: "📚",
    Healthcare: "⚕", 
    Data: "🧱",
    Support: "✍",
  };

const handleSubscribe = (e) => {
   e.preventDefault();

if (!email.trim()) {
   alert("Please enter a valid email address");
   return;
}
navigate("/thank-you");
};

const handleCategoryClick = (categoryName) => {
   navigate(`/find-jobs?category=${encodeURIComponent(categoryName)}`);
};

const handleSearch = (e) => {
   e.preventDefault();
//  (searchTerm.trim() !== "") {
   navigate(`/find-jobs?search=${encodeURIComponent(searchTerm)}`);
   };
  
  return (
   <div className="features">

   <div className="search">
      <input type="text" placeholder="Search jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <a onClick={handleSearch}><Search strokeWidth={3} color="#0c0c45"/></a> 
   </div> 

   <div className="two">
      <a onClick={() => {navigate("/employer-dashboard")}}>Post a Job</a>
      <a onClick={() => navigate("/find-jobs")}>Find Jobs</a>
   </div>
   
   {/* recent jobs */}
   <div className="recent-jobs-sec">
   <h1>Recent Jobs listing</h1>
   <div className="recent-jobs">
   {jobs.slice(0, 4).map((job, index) => (
      <JobCard
      job={job} 
      key={index}
      title={job.title}
      company={job.company}
      type={job.type}
      location={job.location}
       />
      ))}
     </div>
   </div>

{/* category */}
      <div className="category-sec">
      <h1>Job Categories</h1>
      <div className="category">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="grids"
            onClick={() => handleCategoryClick(cat)}
          >
            <div className="icon">
              {categoryIcons[cat] || "🧭" /* fallback icon */}
            </div>
            <h3>{cat}</h3>
            <p>Explore top {cat} jobs available right now</p>
          </div>
        ))}
      </div>
      </div>

{/* testimonial */}
   <div className="testimonial-section">
                    <section id="test-sec-header"><h2>Testimonials</h2>
                    <p>What our users testify about our services!</p></section> 
               <div className="test-secs">
                <div>
                    <img src={amanda} alt="" />
                    <h4>Ada, Lagos</h4>
                    <p>“I got a remote job in 3 days!”</p>
                </div>
                <div>
                   <img src={walter} alt="" />
                    <h4>Dennis, Abuja</h4>
                    <p>“Super easy platform, I love it.”</p>
                </div>
                <div>
                    <img src={Designer} alt="" />
                    <h4>Peter, Kenya</h4>
                    <p>“Amazing platform! super cool”</p>
                </div>
                 <div>
                    <img src={williams} alt="" />
                    <h4>Bernice, Enugu</h4>
                    <p>“I got a job I have been dreaming of”</p>
                </div>
                </div>
   </div>

   {/* newsletter  */}
    <div className="newsletter">
         <h1>Want jobs sent to your inbox?</h1>
         <p>Sign up for weekly job alerts by Subscribing to our Newsletter</p>
         <form onSubmit={handleSubscribe} className="news">
         <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
         <button type="submit">Subscribe</button>
      </form>
    </div>
    
    </div>
  )
}

export default Features
