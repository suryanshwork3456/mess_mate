import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import "./index.css";

export default function App() {
  const { register, login } = useContext(AuthContext);
  const [registerData, setRegisterData] = useState({ username: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const result = await register(registerData.username, registerData.email, registerData.password);
    if (!result.success) {
      setError(result.message);
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const result = await login('student', loginData.username, loginData.password);
    if (!result.success) {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="bg-glow" />
      <div className="grain" />
      <Particles />

      <div className="page">
        {/* Brand */}
        <div className="brand">
          <h1 className="brand-title">MessMate</h1>
          <span className="brand-sub">Student Mess Management</span>
        </div>

        {/* Auth Container */}
        <div className="auth-container">
          {/* Register */}
          <div className="panel panel-register">
            <div className="panel-head">
              <span className="badge badge-gold">New Student</span>
              <h2 className="panel-title">Create Account</h2>
              <p className="panel-sub">Join thousands of students managing their mess experience.</p>
            </div>
            <form onSubmit={handleRegister} className="form">
              <Field label="Username" icon="👤" type="text" placeholder="Choose a username"
                value={registerData.username} onChange={e => setRegisterData({ ...registerData, username: e.target.value })} />
              <Field label="Email Address" icon="✉️" type="email" placeholder="your.email@college.edu"
                value={registerData.email} onChange={e => setRegisterData({ ...registerData, email: e.target.value })} />
              <Field label="Password" icon="🔒" type="password" placeholder="Create a strong password"
                value={registerData.password} onChange={e => setRegisterData({ ...registerData, password: e.target.value })} />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account →'}
              </button>
            </form>
            <p className="panel-footer">Already registered? <a href="#">Sign in here</a></p>
          </div>

          {/* Divider */}
          <div className="divider" />

          {/* Login */}
          <div className="panel panel-login">
            <div className="panel-head">
              <span className="badge badge-red">Returning Student</span>
              <h2 className="panel-title">Welcome Back</h2>
              <p className="panel-sub">Sign in to manage your mess experience.</p>
            </div>
            <form onSubmit={handleLogin} className="form">
              <Field label="Username" icon="👤" type="text" placeholder="Enter your username"
                value={loginData.username} onChange={e => setLoginData({ ...loginData, username: e.target.value })} />
              <Field label="Password" icon="🔒" type="password" placeholder="Enter your password"
                value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} />
              <div className="forgot-wrap"><a href="#" className="forgot">Forgot password?</a></div>
              <button type="submit" className="btn btn-secondary" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In →'}
              </button>
            </form>
            <p className="panel-footer">New here? <a href="#">Create an account</a></p>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <p className="secure-note">SECURED WITH 256-BIT ENCRYPTION · MESS DATA PROTECTED</p>
      </div>
    </div>
  );
}

function Field({ label, icon, type, placeholder, value, onChange }) {
  return (
    <div className="field">
      <label>{label}</label>
      <div className="field-wrap">
        <span className="field-icon">{icon}</span>
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
      </div>
    </div>
  );
}

function Particles() {
  const colors = ["rgba(245,166,35,", "rgba(255,184,0,", "rgba(255,77,28,"];
  const particles = Array.from({ length: 18 }, (_, i) => {
    const size = Math.random() * 4 + 1.5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    return {
      id: i,
      size,
      left: `${Math.random() * 100}%`,
      background: `${color}${(Math.random() * 0.5 + 0.15).toFixed(2)})`,
      boxShadow: `0 0 ${size * 2}px ${color}0.4)`,
      animationDuration: `${Math.random() * 12 + 8}s`,
      animationDelay: `${Math.random() * 10}s`,
    };
  });
  return (
    <div className="particles">
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          width: p.size,
          height: p.size,
          left: p.left,
          background: p.background,
          boxShadow: p.boxShadow,
          animationDuration: p.animationDuration,
          animationDelay: p.animationDelay,
        }} />
      ))}
    </div>
  );
}

