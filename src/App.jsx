import "./css/App.css"
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import JobFinderDashboard from "./pages/JobFinder/JobFinderDashboard";
import JobDetails from "./pages/JobFinder/JobDetails";
import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ThankYou from "./components/ThankYou";
import AboutUs from "./components/AboutUs";


const App = () => {
const { currentUser } = useAuth();

  return (
    <div>
    <Router>
      <Routes>
        {/* Redirect root to /login*/}
        <Route path="/" element={<LandingPage />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Protected routes */}
        <Route path="/employer-dashboard" element={<ProtectedRoute allowedRole="employer"><EmployerDashboard /></ProtectedRoute>} />
        <Route path="/find-jobs" element={<ProtectedRoute allowedRole="jobseeker"><JobFinderDashboard /></ProtectedRoute>} />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>

    </div>
  )
}

export default App
