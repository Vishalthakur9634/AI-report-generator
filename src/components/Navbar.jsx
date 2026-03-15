import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  // Hide navbar on auth pages
  if (['/login', '/register'].includes(location.pathname)) {
    return null;
  }

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard Overview';
      case '/create-report': return 'AI Voice Dictation';
      case '/templates': return 'Template Manager';
      default: return 'MedVoice Portal';
    }
  };

  return (
    <header className="page-header" style={{
      position: 'sticky',
      top: 0,
      padding: '24px 32px',
      margin: '-32px -32px 32px -32px', // Counteract main-content padding
      backgroundColor: 'rgba(13, 17, 23, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      zIndex: 90,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h1 className="page-title" style={{ fontSize: '1.75rem', margin: 0 }}>
          {getPageTitle()}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Diagnostic Centre Portal
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button style={{
          background: 'transparent',
          border: '1px solid var(--border-color)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          transition: 'var(--transition)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.color = 'var(--primary)';
          e.currentTarget.style.borderColor = 'var(--primary)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.color = 'var(--text-muted)';
          e.currentTarget.style.borderColor = 'var(--border-color)';
        }}
        >
          <Bell size={18} />
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '6px 16px 6px 6px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '100px',
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--secondary) 0%, #4b5563 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <User size={16} />
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#fff' }}>
            JP Diagnostics
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
