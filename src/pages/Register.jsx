import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Building, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { API_URL } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    center_name: '',
    full_name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      // Automatically redirect to login on success
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, overflowY: 'auto', padding: '20px' }}>
      <div className="glass-panel slide-up" style={{ width: '100%', maxWidth: '500px', padding: '40px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Create SaaS Account</h1>
          <p style={{ color: 'var(--text-muted)' }}>Register your medical center</p>
        </div>

        {error && (
          <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: 'var(--danger)', marginBottom: '24px', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px', position: 'relative' }}>
            <label className="input-label">Hospital / Center Name</label>
            <div style={{ position: 'relative' }}>
              <Building size={18} color="var(--text-muted)" style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                name="center_name"
                className="input-field" 
                style={{ paddingLeft: '44px' }} 
                placeholder="Apollo Diagnostics"
                value={formData.center_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px', position: 'relative' }}>
            <label className="input-label">Admin Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="var(--text-muted)" style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                name="full_name"
                className="input-field" 
                style={{ paddingLeft: '44px' }} 
                placeholder="Dr. John Smith"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px', position: 'relative' }}>
            <label className="input-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                name="email"
                className="input-field" 
                style={{ paddingLeft: '44px' }} 
                placeholder="admin@hospital.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '32px', position: 'relative' }}>
            <label className="input-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                name="password"
                className="input-field" 
                style={{ paddingLeft: '44px' }} 
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
            {isLoading ? 'Registering...' : (
              <>
                Create Account <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
