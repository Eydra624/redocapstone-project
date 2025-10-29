import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      navigate("/");
    }, 2000);
  };

  return (
      <div className="auth-card">
        <h2>Login to your account </h2>
        <form onSubmit={handleSubmit}>
          <label>Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          /></label>

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

          <label>Login as
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select></label>

          <div className="btn"><button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="spin" size={18} /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button></div>
        </form>
        <p>
        Don’t have an account? <a href="/signup">Signup</a>
        </p>
      </div>
  );
};

export default Login;





