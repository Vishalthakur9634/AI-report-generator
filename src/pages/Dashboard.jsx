import React, { useContext } from 'react';
import { Activity, Users, FileText, TrendingUp, Clock, FileCheck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const StatCard = ({ title, value, icon, trend, isPositive }) => (
  <div className="glass-card">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
      <div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>{title}</div>
        <div style={{ fontSize: '2rem', fontWeight: 600, color: '#fff' }}>{value}</div>
      </div>
      <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
        {icon}
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
      <span style={{ color: isPositive ? 'var(--success)' : 'var(--danger)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
        {isPositive ? <TrendingUp size={14} /> : <TrendingUp size={14} style={{ transform: 'rotate(180deg)' }} />}
        {trend}
      </span>
      <span style={{ color: 'var(--text-muted)' }}>vs last month</span>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Center Overview</h1>
          <div className="page-subtitle">Welcome back, {user?.full_name}. Here's what's happening today.</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <StatCard 
          title="Reports Generated" 
          value="1,284" 
          icon={<FileText size={24} />} 
          trend="+12.5%" 
          isPositive={true} 
        />
        <StatCard 
          title="Active Templates" 
          value="12" 
          icon={<FileCheck size={24} />} 
          trend="+2" 
          isPositive={true} 
        />
        <StatCard 
          title="Avg. Turnaround Time" 
          value="2.4m" 
          icon={<Clock size={24} />} 
          trend="-18%" 
          isPositive={true} 
        />
        <StatCard 
          title="Active Staff Users" 
          value="8" 
          icon={<Users size={24} />} 
          trend="+0%" 
          isPositive={true} 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem' }}>Recent Generations</h3>
            <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>View All</button>
          </div>
          
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem' }}>Patient Name</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem' }}>Modality</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem' }}>Date</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '16px', fontWeight: 500 }}>Sarah Jenkins</td>
                    <td style={{ padding: '16px' }}><span style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>USG Abdomen</span></td>
                    <td style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Today, 10:42 AM</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--success)', fontSize: '0.85rem', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '100px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)' }}></div>
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>System Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity color="var(--success)" size={24} />
              </div>
              <div>
                <div style={{ fontWeight: 500 }}>AI Inference Engine</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--success)' }}>Operational (OpenAI)</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileCheck color="var(--primary)" size={24} />
              </div>
              <div>
                <div style={{ fontWeight: 500 }}>DOCX Render Engine</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--success)' }}>Operational</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
