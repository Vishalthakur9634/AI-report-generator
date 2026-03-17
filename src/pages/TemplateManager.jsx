import React, { useState, useEffect } from 'react';
import { Save, FileCheck, Code, Plus, Trash2, Edit3, Check } from 'lucide-react';

const TemplateManager = () => {
  const [templates, setTemplates] = useState([]);
  const [activeTemplateId, setActiveTemplateId] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState({ name: '', html: '' });
  const [saved, setSaved] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const defaultTemplates = [
    {
      id: 'usg-template',
      name: 'Ultrasound (USG)',
      html: `<div style="font-family: 'Inter', 'Segoe UI', Arial, sans-serif; color: #1a202c; max-width: 800px; margin: 0 auto; padding: 0; background: #fff; line-height: 1.5;">
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; border-bottom: 5px solid #fbd38d;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <div>
        <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 1px;">JP DIAGNOSTICS</h1>
        <p style="margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Radiology | Pathology</p>
        <p style="margin: 2px 0 0 0; font-size: 12px; opacity: 0.9;">WE DIAGNOSE RIGHT</p>
      </div>
      <div style="text-align: right; font-size: 11px;">
        <p style="margin: 0;">+91-7579470000 | +91-7579430000</p>
        <p style="margin: 2px 0;">info@jpdiagnostics.in</p>
        <p style="margin: 2px 0;">JSR Tower, Goverdhan Crossing, NH-19, Mathura</p>
      </div>
    </div>
  </div>

  <!-- Patient Info Grid -->
  <div style="padding: 25px; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      <tr>
        <td style="padding: 4px 0; width: 50%;"><strong>Patient ID:</strong> {{uhid}}</td>
        <td style="padding: 4px 0; text-align: right;"><strong>Reg. Date:</strong> {{date}}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0;"><strong>Name:</strong> <span style="text-transform: uppercase;">{{patient_name}}</span></td>
        <td style="padding: 4px 0; text-align: right;"><strong>Report Date:</strong> {{date}}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0;"><strong>Age / Sex:</strong> {{age}} / {{sex}}</td>
        <td style="padding: 4px 0; text-align: right;"></td>
      </tr>
      <tr>
        <td style="padding: 4px 0;"><strong>Ref. By:</strong> {{ref_doctor}}</td>
        <td style="padding: 4px 0; text-align: right;"></td>
      </tr>
    </table>
  </div>

  <!-- Content -->
  <div style="padding: 40px; min-height: 500px;">
    <h2 style="text-align: center; text-decoration: underline; font-size: 18px; margin-bottom: 30px; text-transform: uppercase;">{{study}}</h2>
    
    <div style="font-size: 15px; color: #2d3748;">
      {{reportText}}
    </div>

    <!-- Impression Section -->
    <div style="margin-top: 40px; border-top: 2px solid #2d3748; padding-top: 20px;">
      <h3 style="margin: 0 0 15px 0; font-size: 16px; text-decoration: underline;">IMPRESSION:</h3>
      <div style="font-weight: 700; font-size: 15px;">
        {{impression}}
      </div>
    </div>
  </div>

  <!-- Footnote -->
  <div style="padding: 20px 40px; font-size: 10px; color: #718096; border-top: 1px solid #e2e8f0; text-align: center;">
    <p style="margin: 0;">N.B. This is only a professional opinion and not the final diagnosis. Please correlate clinical findings with scan findings.</p>
    <p style="margin: 5px 0 0 0; font-weight: bold; color: #e53e3e;">THIS REPORT IS NOT VALID FOR MEDICO LEGAL PURPOSES</p>
  </div>

  <!-- Signatories -->
  <div style="padding: 30px 40px; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; background: #fff;">
    <div style="text-align: center;">
      <p style="margin: 0; font-weight: bold; font-size: 12px;">DR. NIKHIL VIKRAM</p>
      <p style="margin: 0; font-size: 10px; color: #718096;">D.N.B. Radiodiagnosis</p>
    </div>
    <div style="text-align: center;">
      <p style="margin: 0; font-weight: bold; font-size: 12px;">DR. NIDHI AGRAWAL</p>
      <p style="margin: 0; font-size: 10px; color: #718096;">M.D. (Radiology)</p>
    </div>
    <div style="text-align: center;">
      <p style="margin: 0; font-weight: bold; font-size: 12px;">DR. DEEPAK AGRAWAL</p>
      <p style="margin: 0; font-size: 10px; color: #718096;">M.D. (Radiology)</p>
    </div>
  </div>
</div>`
    },
    {
      id: 'xray-template',
      name: 'X-Ray (Digital)',
      html: `<div style="font-family: 'Arial', sans-serif; color: #000; max-width: 800px; margin: 0 auto; padding: 40px; background: #fff; min-height: 1000px;">
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #000; padding-bottom: 20px; margin-bottom: 30px;">
    <div>
      <h1 style="margin: 0; font-size: 32px; font-weight: 900;">JP <span style="color: #3b82f6;">DIAGNOSTICS</span></h1>
      <p style="margin: 0; font-size: 14px; letter-spacing: 2px;">DIGITAL RADIOGRAPHY SERVICES</p>
    </div>
    <div style="text-align: right; background: #000; color: #fff; padding: 10px 20px;">
      <h2 style="margin: 0; font-size: 18px;">X-RAY REPORT</h2>
    </div>
  </div>

  <div style="margin-bottom: 40px;">
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <tr>
        <td style="padding: 8px; border: 1px solid #000;"><strong>PATIENT NAME</strong></td>
        <td style="padding: 8px; border: 1px solid #000; text-transform: uppercase;">{{patient_name}}</td>
        <td style="padding: 8px; border: 1px solid #000;"><strong>AGE/SEX</strong></td>
        <td style="padding: 8px; border: 1px solid #000;">{{age}} / {{sex}}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #000;"><strong>REF. DOCTOR</strong></td>
        <td style="padding: 8px; border: 1px solid #000;">{{ref_doctor}}</td>
        <td style="padding: 8px; border: 1px solid #000;"><strong>DATE</strong></td>
        <td style="padding: 8px; border: 1px solid #000;">{{date}}</td>
      </tr>
    </table>
  </div>

  <div style="margin-bottom: 30px;">
    <h3 style="background: #f3f4f6; padding: 10px; border-left: 5px solid #000;">STUDY: {{study}}</h3>
  </div>

  <div style="font-size: 16px; line-height: 1.8; margin-bottom: 50px;">
    {{reportText}}
  </div>

  <div style="background: #000; color: #fff; padding: 15px; border-radius: 4px; margin-bottom: 40px;">
    <h4 style="margin: 0 0 5px 0; color: #fbd38d; font-size: 14px;">FINAL IMPRESSION</h4>
    <p style="margin: 0; font-weight: bold; font-size: 16px;">{{impression}}</p>
  </div>

  <div style="display: flex; justify-content: flex-end; margin-top: 100px;">
    <div style="text-align: center; width: 250px;">
      <div style="border-top: 1px solid #000; padding-top: 10px;">
        <p style="margin: 0; font-weight: bold;">Dr. DEEPAK AGRAWAL</p>
        <p style="margin: 0; font-size: 12px;">Consultant Radiologist</p>
      </div>
    </div>
  </div>
</div>`
    },
    {
      id: 'ct-template',
      name: 'CT Scan',
      html: `<div style="font-family: 'Helvetica', Arial, sans-serif; color: #333; max-width: 800px; margin: 0 auto; background: #fff;">
  <div style="padding: 40px; border: 10px solid #f3f4f6;">
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="margin: 0; color: #1e40af; font-size: 36px;">JP DIAGNOSTICS</h1>
      <p style="margin: 0; font-weight: 600; color: #64748b;">ADVANCED MULTI-SLICE CT CENTER</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px; font-size: 14px;">
      <div style="padding: 15px; background: #eff6ff; border-radius: 8px;">
        <p style="margin: 5px 0;"><strong>Patient Name:</strong> {{patient_name}}</p>
        <p style="margin: 5px 0;"><strong>Age / Sex:</strong> {{age}} / {{sex}}</p>
        <p style="margin: 5px 0;"><strong>UHID:</strong> {{uhid}}</p>
      </div>
      <div style="padding: 15px; background: #eff6ff; border-radius: 8px;">
        <p style="margin: 5px 0;"><strong>Referring Doctor:</strong> {{ref_doctor}}</p>
        <p style="margin: 5px 0;"><strong>Date:</strong> {{date}}</p>
        <p style="margin: 5px 0;"><strong>Study:</strong> {{study}}</p>
      </div>
    </div>

    <div style="border-bottom: 2px solid #1e40af; margin-bottom: 30px;">
      <h2 style="font-size: 20px; color: #1e40af; margin: 0 0 10px 0;">COMPUTED TOMOGRAPHY REPORT</h2>
    </div>

    <div style="font-size: 15px; line-height: 1.6; min-height: 400px;">
      {{reportText}}
    </div>

    <div style="margin-top: 40px; padding: 20px; border: 2px solid #1e40af; border-radius: 8px; background: #fff;">
      <h3 style="margin: 0 0 10px 0; color: #1e40af; font-size: 16px;">CLINICAL IMPRESSION:</h3>
      <div style="font-weight: 600;">{{impression}}</div>
    </div>
  </div>
</div>`
    },
    {
      id: 'mri-template',
      name: 'MRI Scan',
      html: `<div style="font-family: 'Times New Roman', Times, serif; color: #000; max-width: 800px; margin: 0 auto; padding: 50px; background: #fff; border: 1px solid #000;">
  <div style="text-align: center; margin-bottom: 40px;">
    <h1 style="margin: 0; font-size: 40px; letter-spacing: 5px;">JP DIAGNOSTICS</h1>
    <p style="margin: 5px 0; font-size: 16px; font-weight: bold;">3T SILENT MRI PLATFORM</p>
  </div>

  <table style="width: 100%; border-top: 2px solid #000; border-bottom: 2px solid #000; margin-bottom: 30px; font-size: 14px;">
    <tr>
      <td style="padding: 5px 0;"><strong>Patient:</strong> {{patient_name}}</td>
      <td style="padding: 5px 0; text-align: right;"><strong>Ref By:</strong> {{ref_doctor}}</td>
    </tr>
    <tr>
      <td style="padding: 5px 0;"><strong>Age/Sex:</strong> {{age}} / {{sex}}</td>
      <td style="padding: 5px 0; text-align: right;"><strong>Date:</strong> {{date}}</td>
    </tr>
  </table>

  <div style="text-align: center; margin-bottom: 30px;">
    <h2 style="font-size: 20px; text-decoration: underline;">MRI REPORT: {{study}}</h2>
  </div>

  <div style="font-size: 16px; line-height: 2; margin-bottom: 60px;">
    {{reportText}}
  </div>

  <div style="margin-top: 40px;">
    <h3 style="font-size: 18px; margin-bottom: 10px;">IMPRESSION:</h3>
    <div style="font-weight: bold; border-left: 4px solid #000; padding-left: 20px;">
      {{impression}}
    </div>
  </div>
</div>`
    }
  ];

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
