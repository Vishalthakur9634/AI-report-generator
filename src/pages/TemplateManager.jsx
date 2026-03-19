import React, { useState, useEffect } from 'react';
import { Save, FileCheck, Code, Plus, Trash2, Edit3, Check, RefreshCw } from 'lucide-react';
import { defaultTemplates } from '../data/defaultTemplates';

const TemplateManager = () => {
  const [templates, setTemplates] = useState([]);
  const [activeTemplateId, setActiveTemplateId] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState({ name: '', html: '' });
  const [saved, setSaved] = useState(false);
  const [isAdding, setIsAdding] = useState(false);


  useEffect(() => {
    const savedTemplates = localStorage.getItem('medvoice_templates');
    if (savedTemplates) {
      const parsed = JSON.parse(savedTemplates);
      setTemplates(parsed);
      if (parsed.length > 0) {
        setActiveTemplateId(parsed[0].id);
        setEditingTemplate({ name: parsed[0].name, html: parsed[0].html });
      }
    } else {
      localStorage.setItem('medvoice_templates', JSON.stringify(defaultTemplates));
      setTemplates(defaultTemplates);
      setActiveTemplateId(defaultTemplates[0].id);
      setEditingTemplate({ name: defaultTemplates[0].name, html: defaultTemplates[0].html });
    }
  }, []);

  const handleSave = () => {
    const updated = templates.map(t => 
      t.id === activeTemplateId ? { ...t, name: editingTemplate.name, html: editingTemplate.html } : t
    );
    setTemplates(updated);
    localStorage.setItem('medvoice_templates', JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddTemplate = () => {
    const newId = 'temp-' + Date.now();
    const newTemplate = {
      id: newId,
      name: 'New Custom Template',
      html: defaultTemplates[0].html
    };
    const updated = [...templates, newTemplate];
    setTemplates(updated);
    localStorage.setItem('medvoice_templates', JSON.stringify(updated));
    setActiveTemplateId(newId);
    setEditingTemplate({ name: newTemplate.name, html: newTemplate.html });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    if (templates.length <= 1) {
      alert("At least one template must remain.");
      return;
    }
    if (window.confirm("Delete this template?")) {
      const updated = templates.filter(t => t.id !== id);
      setTemplates(updated);
      localStorage.setItem('medvoice_templates', JSON.stringify(updated));
      if (activeTemplateId === id) {
        setActiveTemplateId(updated[0].id);
        setEditingTemplate({ name: updated[0].name, html: updated[0].html });
      }
    }
  };

  const handleReset = () => {
    if (window.confirm("This will replace all your current templates with the professional defaults. Continue?")) {
      localStorage.setItem('medvoice_templates', JSON.stringify(defaultTemplates));
      setTemplates(defaultTemplates);
      setActiveTemplateId(defaultTemplates[0].id);
      setEditingTemplate({ name: defaultTemplates[0].name, html: defaultTemplates[0].html });
    }
  };

  const selectTemplate = (t) => {
    setActiveTemplateId(t.id);
    setEditingTemplate({ name: t.name, html: t.html });
  };

  return (
    <div className="fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '32px' }}>
        {/* Left Sidebar - Template List */}
        <div style={{ width: '300px' }}>
          <div className="glass-panel" style={{ padding: '24px', height: 'fit-content' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>My Templates</h3>
              <button onClick={handleAddTemplate} className="btn btn-primary" style={{ padding: '8px', borderRadius: '50%' }} title="Add Template">
                <Plus size={18} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {templates.map(t => (
                <div 
                  key={t.id}
                  onClick={() => selectTemplate(t)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: activeTemplateId === t.id ? 'rgba(88, 166, 255, 0.1)' : 'transparent',
                    border: activeTemplateId === t.id ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'var(--transition)'
                  }}
                >
                  <span style={{ fontSize: '0.95rem', fontWeight: activeTemplateId === t.id ? 600 : 400 }}>{t.name}</span>
                  {activeTemplateId === t.id && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Trash2 size={16} color="var(--danger)" onClick={(e) => { e.stopPropagation(); handleDelete(t.id); }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Area - Editor */}
        <div style={{ flex: 1 }}>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ flex: 1 }}>
                <input 
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate(prev => ({ ...prev, name: e.target.value }))}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--border-color)',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#fff',
                    width: '100%',
                    padding: '8px 0',
                    outline: 'none',
                    marginBottom: '8px'
                  }}
                />
                <p style={{ color: 'var(--text-muted)' }}>Customize your center's header, layout, and styling.</p>
              </div>
              <button 
                onClick={handleSave} 
                className={saved ? "btn btn-success" : "btn btn-primary"}
                style={{ padding: '12px 24px', marginLeft: '24px' }}
              >
                {saved ? <><Check size={18} /> Saved!</> : <><Save size={18} /> Update Template</>}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ flex: 2 }}>
                <div style={{ 
                  backgroundColor: 'rgba(1, 4, 9, 0.5)', 
                  border: '1px solid var(--border-color)', 
                  borderTopLeftRadius: 'var(--radius-md)',
                  borderTopRightRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderBottom: 'none'
                }}>
                  <Code size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>HTML Template Editor</span>
                </div>
                <textarea
                  value={editingTemplate.html}
                  onChange={(e) => setEditingTemplate(prev => ({ ...prev, html: e.target.value }))}
                  style={{
                    width: '100%',
                    height: '500px',
                    backgroundColor: 'rgba(1, 4, 9, 0.5)',
                    color: '#e6edf3',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    padding: '16px',
                    border: '1px solid var(--border-color)',
                    borderBottomLeftRadius: 'var(--radius-md)',
                    borderBottomRightRadius: 'var(--radius-md)',
                    resize: 'vertical',
                    outline: 'none',
                    lineHeight: '1.5'
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <div className="glass-card" style={{ padding: '20px', backgroundColor: 'transparent', border: '1px solid var(--border-color)' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Template Help</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Supported placeholders:
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['patient_name', 'age', 'sex', 'ref_doctor', 'date', 'study', 'reportText', 'impression'].map(v => (
                      <code key={v} style={{ 
                        padding: '4px 8px', 
                        backgroundColor: 'rgba(56, 139, 253, 0.1)', 
                        color: 'var(--primary)',
                        borderRadius: '4px',
                        fontSize: '0.8rem'
                      }}>{`{{${v}}}`}</code>
                    ))}
                  </div>
                  <div style={{ marginTop: '24px', padding: '12px', backgroundColor: 'rgba(255, 165, 0, 0.1)', borderRadius: '8px', border: '1px solid rgba(255, 165, 0, 0.2)' }}>
                    <p style={{ fontSize: '0.85rem', color: '#f0883e', margin: 0 }}>
                      <strong>Tip:</strong> Use inline CSS styles for best PDF rendering results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateManager;
