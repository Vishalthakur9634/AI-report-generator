import React, { useState, useEffect } from 'react';
import { Save, FileCheck, Code } from 'lucide-react';

const TemplateManager = () => {
  const [template, setTemplate] = useState('');
  const [saved, setSaved] = useState(false);

  const defaultTemplate = `<div style="font-family: 'Times New Roman', Times, serif; color: #000; max-width: 800px; margin: 0 auto; padding: 10px;">
  <!-- Header Section -->
  <div style="display: flex; justify-content: center; align-items: center; border-bottom: 3px solid #1a365d; padding-bottom: 15px; margin-bottom: 20px;">
    <div style="text-align: center;">
      <h1 style="color: #1a365d; margin: 0; font-size: 28px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">JP DIAGNOSTICS CENTRE</h1>
      <p style="margin: 6px 0 0; font-size: 13px; font-family: Arial, sans-serif; font-weight: bold; color: #4a5568;">ADVANCED IMAGING & RESEARCH INSTITUTE</p>
      <p style="margin: 3px 0 0; font-size: 12px; font-family: Arial, sans-serif; color: #718096;">123 Healthcare Avenue, Medical District, City - 123456</p>
      <p style="margin: 3px 0 0; font-size: 12px; font-family: Arial, sans-serif; color: #718096;">Ph: (555) 123-4567 | Email: reports@jpdiagnostics.com</p>
    </div>
  </div>

  <!-- Demographic Details -->
  <div style="border: 1px solid #cbd5e0; padding: 15px; background-color: #f7fafc; margin-bottom: 25px; font-family: Arial, sans-serif;">
    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      <tbody>
        <tr>
          <td style="padding: 4px 0; width: 50%;"><strong>Patient Name:</strong> <span style="text-transform: uppercase;">{{patient_name}}</span></td>
          <td style="padding: 4px 0; width: 50%;"><strong>Age / Gender:</strong> {{age}} / {{sex}}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0;"><strong>Referred By:</strong> {{ref_doctor}}</td>
          <td style="padding: 4px 0;"><strong>Date:</strong> {{date}}</td>
        </tr>
        <tr>
          <td colspan="2" style="padding: 8px 0 4px; border-top: 1px dashed #cbd5e0; margin-top: 5px;">
            <strong style="color: #1a365d; font-size: 14px;">INVESTIGATION:</strong> <span style="font-weight: bold; text-transform: uppercase;">{{study}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Report Main Content -->
  <div style="margin-bottom: 35px; min-height: 250px;">
    <h3 style="color: #1a365d; text-align: center; text-decoration: underline; text-underline-offset: 4px; font-size: 18px; margin-bottom: 25px; text-transform: uppercase;">Radiological Report</h3>
    
    <div style="line-height: 1.8; font-size: 15px; text-align: justify; padding: 0 10px;">
      {{reportText}}
    </div>
  </div>

  <!-- Impression Box -->
  <div style="margin-bottom: 50px; font-family: Arial, sans-serif; break-inside: avoid;">
    <div style="background-color: #ebf8ff; border: 1px solid #bee3f8; border-left: 5px solid #3182ce; padding: 15px 20px;">
      <h3 style="color: #2b6cb0; margin-top: 0; margin-bottom: 12px; text-transform: uppercase; font-size: 15px; letter-spacing: 1px;">Impression</h3>
      <p style="margin: 0; font-size: 15px; font-weight: bold; line-height: 1.6; color: #1a365d;">{{impression}}</p>
    </div>
  </div>

  <!-- Signatures (pushed to bottom) -->
  <div style="display: flex; justify-content: space-between; margin-top: 40px; padding: 0 20px; font-family: Arial, sans-serif; break-inside: avoid;">
    <div style="text-align: center;">
      <p style="margin: 0; font-size: 14px; font-weight: bold;">Dr. A. Sharma</p>
      <p style="margin: 3px 0 0; font-size: 12px; color: #4a5568;">MD (Radiodiagnosis)</p>
      <p style="margin: 2px 0 0; font-size: 12px; color: #718096;">Consultant Radiologist</p>
    </div>
    <div style="text-align: center;">
      <div style="height: 40px;"></div> <!-- Space for signature image if needed later -->
      <p style="margin: 0; font-size: 14px; font-weight: bold;">Dr. S. Patel</p>
      <p style="margin: 3px 0 0; font-size: 12px; color: #4a5568;">DMRD, DNB</p>
      <p style="margin: 2px 0 0; font-size: 12px; color: #718096;">Chief Radiologist</p>
    </div>
  </div>
  
  <!-- Footer -->
  <div style="text-align: center; margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 10px; font-family: Arial, sans-serif; color: #a0aec0; break-inside: avoid;">
    <p style="margin: 0;">This is a digitally generated report based on AI transcription. Not valid for medico-legal purposes without a physical/digital seal.</p>
    <p style="margin: 4px 0 0; font-weight: bold; color: #718096;">** Please correlate clinically **</p>
    <p style="margin: 4px 0 0;">End of Report</p>
  </div>
</div>`;

  useEffect(() => {
    const savedTemplate = localStorage.getItem('medvoice_template');
    if (savedTemplate) {
      setTemplate(savedTemplate);
    } else {
      setTemplate(defaultTemplate);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('medvoice_template', template);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    localStorage.removeItem('medvoice_template');
    setTemplate(defaultTemplate);
  };

  return (
    <div className="fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Manage Centre Template</h2>
            <p style={{ color: 'var(--text-muted)' }}>Use HTML and placeholders to format your final PDF report.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={handleReset} 
              className="btn btn-danger"
              style={{ padding: '12px 24px' }}
            >
              Reset to Premium Default
            </button>
            <button 
              onClick={handleSave} 
              className={saved ? "btn btn-success" : "btn btn-primary"}
              style={{ padding: '12px 24px' }}
            >
              {saved ? <><FileCheck size={18} /> Saved!</> : <><Save size={18} /> Save Template</>}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Editor */}
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
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              style={{
                width: '100%',
                height: '400px',
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
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>

          {/* Variables Guide */}
          <div style={{ flex: 1 }}>
            <div className="glass-card" style={{ padding: '20px', backgroundColor: 'transparent' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Supported Variables</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Use these variables within <code>{`{{}}`}</code> tags to inject patient data automatically.
              </p>
              
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '8px',
                fontSize: '0.95rem'
              }}>
                {[
                  'patient_name', 'age', 'sex', 
                  'ref_doctor', 'date', 'study', 
                  'reportText', 'impression'
                ].map(variable => (
                  <li key={variable} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '6px'
                  }}>
                    <code style={{ color: 'var(--primary)' }}>{`{{${variable}}}`}</code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateManager;
