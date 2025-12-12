import React, { useState } from 'react';
import '../styles/SignIn.css';
import Navbar from '../components/Navbar';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'admin') {
        window.location.href = '/admin/dashboard';
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in');
  };

  const handleFacebookSignIn = () => {
    console.log('Facebook sign in');
  };

  const handleGithubSignIn = () => {
    console.log('GitHub sign in');
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
      <div className="auth-left">
        <div className="welcome-content">
          <h1>Welcome Back!</h1>
          <p>Enter your personal details to access all features</p>
          <button className="auth-switch-btn" onClick={() => window.location.href = '/signup'}>
            SIGN UP
          </button>
        </div>
      </div>
      
      <div className="auth-right">
        <div className="auth-form-container">
          <h2>Sign In</h2>
          
          <div className="social-login">
            <button className="social-btn facebook" onClick={handleFacebookSignIn}>
              <span>f</span>
            </button>
            <button className="social-btn google" onClick={handleGoogleSignIn}>
              <span>G</span>
            </button>
            <button className="social-btn github" onClick={handleGithubSignIn}>
              <span>⚙</span>
            </button>
          </div>

          <p className="login-divider">or use your email for login</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}

export default SignIn;
