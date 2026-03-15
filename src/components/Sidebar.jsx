import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut,
  Stethoscope
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Hide sidebar on auth pages
  if (['/login', '/register'].includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    // Basic logout handling for now
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/create-report', label: 'Create Report', icon: Stethoscope },
    { path: '/templates', label: 'Manage Templates', icon: Settings },
  ];

  return (
    <aside style={{
      width: '260px',
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      backgroundColor: 'rgba(22, 27, 34, 0.8)',
      backdropFilter: 'blur(16px)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 0',
      zIndex: 100
    }}>
      <div style={{ padding: '0 24px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, var(--primary) 0%, #3182ce 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <FileText size={20} />
        </div>
        <h2 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>MedVoice UI</h2>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 16px' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                color: isActive ? '#fff' : 'var(--text-muted)',
                backgroundColor: isActive ? 'rgba(88, 166, 255, 0.1)' : 'transparent',
                border: isActive ? '1px solid rgba(88, 166, 255, 0.2)' : '1px solid transparent',
                textDecoration: 'none',
                fontWeight: isActive ? 500 : 400,
                transition: 'var(--transition)'
              }}
            >
              <Icon size={18} color={isActive ? 'var(--primary)' : 'currentColor'} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div style={{ padding: '0 16px', marginTop: 'auto' }}>
        <button 
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            width: '100%',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--danger)',
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'var(--transition)',
            textAlign: 'left',
            fontFamily: 'inherit',
            fontSize: '0.95rem'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(218, 54, 51, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
