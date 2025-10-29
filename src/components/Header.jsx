import { useNavigate } from 'react-router-dom'

const Header = () => {
const navigate = useNavigate()
const role = localStorage.getItem("userRole");

const handleDashboardClick = () => {
  if (role === "employer") {
    navigate("/employer-dashboard");
  } else {
    navigate("/find-jobs")
  }
};

const handleLogout = () => {
    // clear stored auth data
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    sessionStorage.clear();

    // Redirect to login page
    navigate("/login")
    }

  return (
    <nav>
     <h2 className='logo'>Hyre</h2>
      <div className='navbar'>
      <a onClick={() => navigate("/")}>Home</a>
      <a onClick={handleDashboardClick}>Dashboard</a>
      <a onClick={() => navigate("/find-jobs")}>Jobs</a>
      <a onClick={() => navigate("/about")}>About</a>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </nav>   
)
}

export default Header
