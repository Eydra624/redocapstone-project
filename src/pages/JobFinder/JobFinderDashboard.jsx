import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import jobs from "../../data";
import JobCard from "../../components/JobCard";
import "../../css/jobFinderDashboard.css";
  const JobFinderDashboard = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  // ✅ Extract category from URL query string
  useEffect(() => { 
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("category");
    const searchFromUrl = params.get("search");

    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory("All");
    }

    if (searchFromUrl) {
      setSearchTerm(searchFromUrl)
    } else {
      setSearchTerm("")
    }
  }, [location.search]);

  // ✅ Filter jobs whenever search or category changes
  useEffect(() => {
    let results = jobs;
    // Filter by category
    if (selectedCategory !== "All") {
      results = results.filter(
        (job) =>
          job.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    // Filter by search term
    if (searchTerm.trim() !== "") {
      results = results.filter(
        (job) => job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 job.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredJobs(results);
  }, [selectedCategory, searchTerm, jobs]);

  return (
    <div className="dashboard-container">
      <h2>Find Your Next Job</h2>
      <p>Search or filter by category to find what suits you best</p>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title, location, or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          {[...new Set(jobs.map((job) => job.category))].map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="jobs-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="no-result">No jobs match your search criteria.</p>
        )}
      </div>
    </div>
  );
};


// const JobFinderDashboard = () => {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const initialSearch = params.get("search")?.toLowerCase() || "";

//   const [searchTerm, setSearchTerm] = useState(initialSearch);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [filteredJobs, setFilteredJobs] = useState([]);

//   // Filter jobs whenever searchTerm or category changes
//   useEffect(() => {
//     let filtered = jobs.filter((job) => {
//       const search = searchTerm.toLowerCase();

//       const matchesSearch =
//         job.title.toLowerCase().includes(search) ||
//         (job.description && job.description.toLowerCase().includes(search)) ||
//         job.location.toLowerCase().includes(search) ||
//         job.category.toLowerCase().includes(search) ||
//         job.company.toLowerCase().includes(search);

//       const matchesCategory =
//         selectedCategory === "All" || job.category === selectedCategory;

//       return matchesSearch && matchesCategory;
//     });

//     setFilteredJobs(filtered);
//   }, [searchTerm, selectedCategory]);

//   // Get unique categories dynamically
//   const categories = ["All", ...new Set(jobs.map((job) => job.category))];

//   return (
//     <div className="dashboard-container">
//       <h2>Find Your Next Job</h2>
//       <p>Search or filter by category to find what suits you best.</p>

//       {/* Filters */}
//       <div className="filters">
//         <input
//           type="text"
//           placeholder="Search by title, location or keyword..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Job List */}
//       <div className="jobs-grid">
//         {filteredJobs.length > 0 ? (
//           filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
//         ) : (
//           <p className="no-result">No jobs match your search criteria.</p>
//         )}
//       </div>
//     </div>
//   );
// };

export default JobFinderDashboard;
