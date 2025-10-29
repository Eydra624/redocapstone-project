import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react";
// import "./auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("userRole", formData.role);
      localStorage.setItem("userName", formData.name);
      navigate("/");
    }, 2000);
  };

  return (
      <div className="auth-card">
        <h1>Welcome to Hyre</h1>
        <h3>Create Account</h3>
        <form onSubmit={handleSubmit}>
          <label>Full Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          </label>

          <label>Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          </label>
          
          <label>Password
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="icon-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          </label>

          <label>Register as 
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
         </label>
          <div className="btn"><button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader className="spin" size={18} /> Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
          </div>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
  );
};

export default Signup;

