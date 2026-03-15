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
    { title: 'Total Reports generated', value: '142', icon: FileText, color: 'var(--primary)' },
    { title: 'Templates Uploaded', value: '4', icon: Settings, color: 'var(--success)' },
    { title: 'Accuracy Rate', value: '99.2%', icon: TrendingUp, color: '#a371f7' },
  ];

  const recentReports = [
    { id: 'REP-0012', patient: 'Rahul Sharma', type: 'Ultrasound Whole Abdomen', date: 'Just now', status: 'Completed' },
    { id: 'REP-0011', patient: 'Anjali Desai', type: 'MRI Brain', date: '2 hours ago', status: 'Completed' },
    { id: 'REP-0010', patient: 'Vikram Singh', type: 'X-Ray Chest PA View', date: '5 hours ago', status: 'Completed' },
  ];

  return (
    <div className="fade-in">
      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px',
        marginBottom: '40px'
      }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: `${stat.color}15`,
                color: stat.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '2rem', margin: '0 0 4px 0', color: '#fff' }}>{stat.value}</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem', fontWeight: 500 }}>{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Quick Actions</h2>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
        <Link to="/create-report" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.05rem' }}>
          <Stethoscope size={20} />
          Create New Report
        </Link>
        <Link to="/templates" className="btn btn-outline" style={{ padding: '16px 32px', fontSize: '1.05rem' }}>
          <Settings size={20} />
          Manage Templates
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
