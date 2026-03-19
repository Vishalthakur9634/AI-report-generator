import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Settings, 
  Stethoscope, 
  TrendingUp,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Reports', value: '1,248', icon: FileText, color: 'var(--primary)', trend: '+12% this month' },
    { title: 'Active Templates', value: '4', icon: Settings, color: 'var(--success)', trend: 'All optimized' },
    { title: 'AI Accuracy', value: '99.4%', icon: TrendingUp, color: '#a371f7', trend: 'Radiology specialized' },
    { title: 'Average Time', value: '1.2m', icon: Clock, color: '#f59e0b', trend: 'Per report' },
  ];

  const recentReports = [
    { id: 'REP-7701', patient: 'ROHIT SONI', type: 'USG Whole Abdomen', date: 'Just now', status: 'Completed' },
    { id: 'REP-7700', patient: 'ANJALI DESAI', type: 'MRI Brain 3T', date: '2 hours ago', status: 'Completed' },
    { id: 'REP-7698', patient: 'VIKRAM SINGH', type: 'Digital X-Ray Chest', date: 'Yesterday', status: 'Completed' },
    { id: 'REP-7695', patient: 'SNEHA GUPTA', type: 'CT Brain Plain', date: 'Yesterday', status: 'Completed' },
  ];

  return (
    <div className="fade-in">
      <div className="page-header" style={{ marginBottom: '40px' }}>
        <div>
          <h1 className="page-title" style={{ margin: 0 }}>Enterprise Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>Welcome back, Dr. Vishal. Your AI diagnostic assistant is ready.</p>
        </div>
        <div className="glass-panel" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(46, 160, 67, 0.3)', backgroundColor: 'rgba(46, 160, 67, 0.05)' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)', boxShadow: '0 0 10px var(--success)' }}></div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--success)' }}>AI SYSTEM ONLINE</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '24px',
        marginBottom: '48px'
      }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: `${stat.color}15`,
                  color: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={24} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: stat.color === 'var(--success)' ? 'var(--success)' : 'var(--text-muted)', backgroundColor: 'rgba(255,255,255,0.03)', padding: '4px 8px', borderRadius: '4px' }}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <h3 style={{ fontSize: '2.2rem', margin: '0 0 2px 0', letterSpacing: '-1px' }}>{stat.value}</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Quick Operations</h2>
        <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--border-color)', margin: '0 24px', opacity: 0.5 }}></div>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '48px' }}>
        <Link to="/create-report" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1rem', flex: 1, maxWidth: '300px' }}>
          <Stethoscope size={20} />
          Create New Report
        </Link>
        <Link to="/templates" className="btn btn-outline" style={{ padding: '16px 32px', fontSize: '1rem', flex: 1, maxWidth: '300px' }}>
          <Settings size={20} />
          Report Templates
        </Link>
      </div>

      {/* Recent Reports */}
      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Recent Reports</h3>
          <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>View All</button>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(22, 27, 34, 0.4)' }}>
              <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: 500, borderBottom: '1px solid var(--border-color)' }}>ID</th>
              <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: 500, borderBottom: '1px solid var(--border-color)' }}>Patient</th>
              <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: 500, borderBottom: '1px solid var(--border-color)' }}>Study Type</th>
              <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: 500, borderBottom: '1px solid var(--border-color)' }}>Date</th>
              <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: 500, borderBottom: '1px solid var(--border-color)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentReports.map((report, i) => (
              <tr key={i} style={{ borderBottom: i !== recentReports.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <td style={{ padding: '16px 24px', color: '#fff' }}>{report.id}</td>
                <td style={{ padding: '16px 24px', fontWeight: 500 }}>{report.patient}</td>
                <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{report.type}</td>
                <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} />
                    {report.date}
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ 
                    padding: '4px 12px', 
                    backgroundColor: 'rgba(46, 160, 67, 0.1)', 
                    color: 'var(--success)', 
                    borderRadius: '100px',
                    fontSize: '0.85rem',
                    fontWeight: 500
                  }}>
                    {report.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
