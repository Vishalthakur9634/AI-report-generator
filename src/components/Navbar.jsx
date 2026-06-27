import React, { useContext } from 'react';
import { Bell, Search } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 0 40px 0',
      animation: 'fadeIn 0.6s ease-out'
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ 
          position: 'relative', 
          width: '300px'
        }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Search reports or patients..." 
            style={{
              width: '100%',
              padding: '12px 16px 12px 44px',
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              color: '#fff',
              outline: 'none',
              transition: 'var(--transition)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={20} color="var(--text-muted)" />
          <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--danger)' }}></div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '8px 16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Center ID:</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-hover)' }}>
            {user?.center_id ? user.center_id.substring(0, 8).toUpperCase() : 'N/A'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
