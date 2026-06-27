import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, FilePlus } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Create Report', path: '/create-report', icon: <FilePlus size={20} /> },
    { name: 'Templates', path: '/templates', icon: <FileText size={20} /> },
  ];

  return (
    <aside style={{
      width: '280px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      background: 'var(--bg-surface)',
      backdropFilter: 'blur(16px)',
      borderRight: '1px solid var(--glass-border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 0'
    }}>
      <div style={{ padding: '0 24px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', background: 'linear-gradient(90deg, #FFFFFF, var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AI Radiology
        </h2>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Enterprise SaaS</div>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 16px' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              color: isActive ? '#fff' : 'var(--text-muted)',
              background: isActive ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.15), transparent)' : 'transparent',
              borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
              textDecoration: 'none',
              fontWeight: isActive ? 500 : 400,
              transition: 'var(--transition)',
            })}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '24px', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
            L
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 500, fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>Local User</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
