import React, { useState, useEffect, useContext } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';
import { API_URL } from '../services/api';


const TemplateManager = () => {
  const [templates, setTemplates] = useState([]);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [modality, setModality] = useState('USG');
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(`${API_URL}/templates/`);
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('modality', modality);

    try {
      const response = await fetch(`${API_URL}/templates/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMsg = 'Upload failed';
        try {
          const errData = JSON.parse(errorText);
          errorMsg = errData.detail || errorText;
        } catch (e) {
          errorMsg = errorText;
        }
        throw new Error(errorMsg);
      }
      
      setMessage({ type: 'success', text: 'Template uploaded successfully!' });
      setFile(null);
      setName('');
      fetchTemplates();
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error.message}` });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this template?')) return;
    try {
      const response = await fetch(`${API_URL}/templates/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || 'Failed to delete template');
      }

      setMessage({ type: 'success', text: 'Template deleted successfully!' });
      fetchTemplates();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Template Manager</h1>
          <div className="page-subtitle">Upload and manage your center's exact `.docx` letterheads</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        
        {/* Upload Form */}
        <div className="glass-card">
          <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Upload size={20} color="var(--primary)" /> Upload New Template
          </h3>

          {message && (
            <div style={{ 
              padding: '12px', 
              borderRadius: '8px', 
              background: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
              color: message.type === 'success' ? 'var(--success)' : 'var(--danger)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {message.text}
            </div>
          )}

          <form onSubmit={handleUpload}>
            <div style={{ marginBottom: '20px' }}>
              <label className="input-label">Template Name</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. Standard USG Abdomen" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="input-label">Modality</label>
              <select 
                className="input-field" 
                value={modality}
                onChange={(e) => setModality(e.target.value)}
              >
                <option value="USG">USG</option>
                <option value="X-RAY">X-RAY</option>
                <option value="CT/MRI">CT / MRI</option>
                <option value="DOPPLER">Doppler</option>
              </select>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label className="input-label">Select .DOCX File</label>
              <div style={{ 
                border: '2px dashed var(--border-color)', 
                padding: '32px', 
                textAlign: 'center', 
                borderRadius: 'var(--radius-md)',
                background: 'rgba(0,0,0,0.2)',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              onClick={() => document.getElementById('file-upload').click()}
              >
                <FileText size={32} color={file ? 'var(--success)' : 'var(--text-muted)'} style={{ marginBottom: '12px' }} />
                <div style={{ color: file ? '#fff' : 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {file ? file.name : 'Click to select or drag and drop'}
                </div>
                <input 
                  id="file-upload"
                  type="file" 
                  accept=".docx" 
                  style={{ display: 'none' }}
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isUploading || !file}>
              {isUploading ? 'Uploading...' : 'Upload to SaaS Cloud'}
            </button>
          </form>
        </div>

        {/* Template List */}
        <div>
          <div className="glass-panel" style={{ padding: '24px', minHeight: '400px' }}>
            <h3 style={{ marginBottom: '24px' }}>Active Templates</h3>
            
            {templates.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                <FileText size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
                <p>No templates uploaded yet. Upload your first .docx letterhead.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {templates.map(t => (
                  <div key={t._id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '16px', 
                    background: 'rgba(255,255,255,0.02)', 
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-md)',
                    transition: 'var(--transition)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ padding: '10px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                        <FileText size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{t.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '12px', marginTop: '4px' }}>
                          <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>{t.modality}</span>
                          <span>{t.detected_tags?.length || 0} Auto-Tags Detected</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                        Preview Layout
                      </button>
                      <button 
                        className="btn" 
                        onClick={() => handleDelete(t._id)}
                        style={{ 
                          padding: '8px', 
                          background: 'rgba(239, 68, 68, 0.1)', 
                          border: '1px solid rgba(239, 68, 68, 0.2)', 
                          color: 'var(--danger)',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'var(--transition)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TemplateManager;
