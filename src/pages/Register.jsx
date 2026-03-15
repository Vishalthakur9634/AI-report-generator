import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    centreName: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate register
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, #1c2636 0%, var(--bg-color) 100%)',
      padding: '24px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '480px',
        padding: '40px',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px', color: '#fff' }}>Register Centre</h2>
          <p style={{ color: 'var(--text-muted)' }}>Create a new diagnostic centre account</p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="input-label">Centre Name</label>
            <input 
              type="text" 
              name="centreName"
              className="input-field" 
              placeholder="e.g. JP Diagnostics"
              required
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label className="input-label">Email</label>
              <input 
                type="email" 
                name="email"
                className="input-field" 
                placeholder="contact@centre.com"
                required
                onChange={handleChange}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label className="input-label">Phone</label>
              <input 
                type="tel" 
                name="phone"
                className="input-field" 
                placeholder="+91 9876543210"
                required
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div>
            <label className="input-label">Password</label>
            <input 
              type="password" 
              name="password"
              className="input-field" 
              placeholder="••••••••"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="input-label">Address</label>
            <textarea 
              name="address"
              className="input-field" 
              placeholder="Full address of the centre..."
              rows={3}
              style={{ resize: 'vertical' }}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '12px', padding: '14px' }}>
            Create Account
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
