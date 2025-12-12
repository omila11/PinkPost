import React, { useState } from 'react';
import '../styles/SignUp.css';
import Navbar from '../components/Navbar';

function SignUp() {
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
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: formData.email.split('@')[0],
          email: formData.email, 
          password: formData.password,
          role: 'user'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      window.location.href = '/';
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign up');
  };

  const handleFacebookSignUp = () => {
    console.log('Facebook sign up');
  };

  const handleGithubSignUp = () => {
    console.log('GitHub sign up');
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
      <div className="auth-right">
        <div className="auth-form-container">
          <h2>Create Account</h2>
          
          <div className="social-login">
            <button className="social-btn facebook" onClick={handleFacebookSignUp}>
              <span>f</span>
            </button>
            <button className="social-btn google" onClick={handleGoogleSignUp}>
              <span>G</span>
            </button>
            <button className="social-btn github" onClick={handleGithubSignUp}>
              <span>⚙</span>
            </button>
          </div>

          <p className="login-divider">or use your email for registration</p>

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
              {loading ? 'SIGNING UP...' : 'SIGN UP'}
            </button>
          </form>
        </div>
      </div>

      <div className="auth-left">
        <div className="welcome-content">
          <h1>Welcome Back!</h1>
          <p>Enter your personal details to access all features</p>
          <button className="auth-switch-btn" onClick={() => window.location.href = '/signin'}>
            SIGN IN
          </button>
        </div>
      </div>
      </div>
    </>
  );
}

export default SignUp;
