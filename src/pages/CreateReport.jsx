import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, FileText, Loader, FileDown, CheckCircle, FileCheck, Trash2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const CreateReport = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [filledHTML, setFilledHTML] = useState('');
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [selectedModality, setSelectedModality] = useState('USG');
  
  const modalities = [
    { id: 'USG', label: 'Ultrasound', icon: '🩺' },
    { id: 'X-RAY', label: 'X-Ray', icon: '🦴' },
    { id: 'CT', label: 'CT Scan', icon: '🧬' },
    { id: 'MRI', label: 'MRI Scan', icon: '🧠' },
    { id: 'BLOOD TEST', label: 'Blood Test', icon: '🩸' },
    { id: 'DOPPLER', label: 'Doppler', icon: '🌊' }
  ];
  
  const recognitionRef = useRef(null);
  const reportRef = useRef(null);

  // Initialize Speech Recognition (Browser Native - Free and Reliable)
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onresult = (event) => {
        let final = '';
        let interim = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const trans = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += trans + ' ';
          } else {
            interim += trans;
          }
        }
        
        if (final) {
          const lowerFinal = final.toLowerCase().trim();
          
          // AI Voice Commands
          if (lowerFinal.includes('generate report')) {
            generateReport();
            return;
          }
          if (lowerFinal.includes('clear transcript') || (lowerFinal === 'clear')) {
            setTranscript('');
            return;
          }
          if (lowerFinal.includes('stop recording') || lowerFinal === 'stop dictation') {
            toggleRecording();
            return;
          }

          setTranscript(prev => prev + final);
          setInterimTranscript('');
        } else {
          setInterimTranscript(interim);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };
      
      recognitionRef.current.onend = () => {
        if (isRecording) {
            try { recognitionRef.current.start(); } catch(e) {}
        }
      };
    }
  }, [isRecording]);

  // Load templates on mount
  useEffect(() => {
    const savedTemplates = localStorage.getItem('medvoice_templates');
    if (savedTemplates) {
      const parsed = JSON.parse(savedTemplates);
      setTemplates(parsed);
      if (parsed.length > 0) {
        setSelectedTemplateId(parsed[0].id);
      }
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      setInterimTranscript('');
    } else {
      setReportData(null);
      setFilledHTML('');
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch(e) {
        console.error("Failed to start recognition", e);
      }
    }
  };

  const clearTranscript = () => {
    if (window.confirm("Clear current transcript?")) {
      setTranscript('');
      setInterimTranscript('');
    }
  };

  const generateReport = async () => {
    if (!transcript.trim()) return;
    
    setIsProcessing(true);
    try {
      // Call our FastAPI backend
      // Clean up the URL (remove trailing slash and spaces)
      // Fallback to the known working Render URL if the environment variable is missing
      let API_URL = (import.meta.env.VITE_API_URL || 'https://ai-report-generator-backend.onrender.com').trim().replace(/\/$/, '');
      if (API_URL.endsWith('/api')) API_URL = API_URL.slice(0, -4);
      
      const response = await fetch(`${API_URL}/api/generate_report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          transcript,
          modality: selectedModality
        })
      });
      
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API failed with status ${response.status}: ${errText}`);
      }
      
      const data = await response.json();
      setReportData(data);
      fillTemplate(data);
      
      // Success "WOW" effect
      const btn = document.querySelector('.btn-success');
      if (btn) {
        btn.classList.add('fade-in');
        setTimeout(() => btn.classList.remove('fade-in'), 1000);
      }
    } catch (error) {
      console.error("Detailed failure:", error);
      const urlUsed = import.meta.env.VITE_API_URL || 'MISSING';
      alert(`Connection Error: Could not reach the AI backend.\n\n` +
            `DEVOPS INFO:\n` +
            `- Attempted Base URL: ${urlUsed}\n` +
            `- Full Path: ${urlUsed}/api/generate_report\n` +
            `- Reason: ${error.message}\n\n` +
            `FIX: If URL says 'MISSING', you must add VITE_API_URL to Netlify!`);
    } finally {
      setIsProcessing(false);
    }
  };

  const fillTemplate = (data) => {
    const activeTemplate = templates.find(t => t.id === selectedTemplateId);
    if (!activeTemplate) return;

    const templateHTML = activeTemplate.html;

    // Flatten data for easy replacement
    const flatData = {
      ...data.patientData,
      reportText: data.reportText,
      impression: data.impression
    };

    let finalHTML = templateHTML;
    
    // Replace known keys
    Object.keys(flatData).forEach(key => {
      const val = flatData[key] || '';
      const regex = new RegExp(`{{${key}}}`, 'g');
      finalHTML = finalHTML.replace(regex, val);
    });

    // Clean up any other {{placeholder}} tags that weren't matched
    finalHTML = finalHTML.replace(/{{[a-zA-Z0-9_]+}}/g, '');

    setFilledHTML(finalHTML);
  };

  const downloadPDF = () => {
    const element = reportRef.current;
    if (!element) return;
    
    const opt = {
      margin:       15,
      filename:     `radiology_report_${reportData?.patientData?.patient_name || 'draft'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="fade-in" style={{ display: 'flex', gap: '32px', height: 'calc(100vh - 120px)' }}>
      {/* Left Column - Voice Input */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '400px', height: '100%' }}>
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
          <div style={{ marginBottom: '16px' }}>
            {isRecording ? (
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(218, 54, 51, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(218, 54, 51, 0.6)' }} className="recording-indicator">
                  <Mic size={24} color="white" />
                </div>
              </div>
            ) : (
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(88, 166, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mic size={24} color="white" />
                </div>
              </div>
            )}
          </div>

          <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Voice Dictation</h3>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '32px', maxWidth: '300px' }}>
            Click start and begin dictating the patient's radiology findings.
          </p>

          <div style={{ width: '100%', marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Select Study Category</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
              {modalities.map(m => (
                <div 
                  key={m.id}
                  onClick={() => {
                    setSelectedModality(m.id);
                    // Auto-select corresponding template if available
                    const templateMatch = templates.find(t => t.name.toUpperCase().includes(m.id) || t.id.toUpperCase().includes(m.id));
                    if (templateMatch) setSelectedTemplateId(templateMatch.id);
                  }}
                  style={{
                    padding: '10px 4px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: selectedModality === m.id ? 'rgba(88, 166, 255, 0.2)' : 'rgba(255,255,255,0.03)',
                    border: selectedModality === m.id ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'var(--transition)'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{m.icon}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: selectedModality === m.id ? '#fff' : 'var(--text-muted)' }}>{m.label}</span>
                </div>
              ))}
            </div>

            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Active Report Template</label>
            <select 
              value={selectedTemplateId} 
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="glass-panel"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'rgba(56, 139, 253, 0.05)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {templates.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
            <button 
              onClick={toggleRecording} 
              className={`btn ${isRecording ? 'btn-danger' : 'btn-primary'}`}
              style={{ flex: 1, padding: '12px', minHeight: '48px', position: 'relative', overflow: 'hidden' }}
            >
              {isRecording ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="wave-container">
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                  </div>
                  Stop
                </div>
              ) : (
                <><Mic size={18} /> Start</>
              )}
            </button>
            <button 
              onClick={generateReport}
              disabled={!transcript && !interimTranscript || isRecording || isProcessing}
              className="btn btn-success"
              style={{ flex: 1.5, padding: '12px' }}
            >
              {isProcessing ? <><Loader size={18} className="spin" /> Sending...</> : <><FileText size={18} /> Generate</>}
            </button>
            <button 
              onClick={clearTranscript}
              disabled={isRecording || isProcessing || !transcript}
              className="btn btn-outline"
              style={{ padding: '12px', width: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Clear Transcript"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {isRecording && (
            <div className="fade-in" style={{ marginTop: '20px', padding: '12px 20px', borderRadius: '30px', backgroundColor: 'rgba(88, 166, 255, 0.1)', border: '1px solid rgba(88, 166, 255, 0.2)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="recording-indicator"></div>
              <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500 }}>
                AI is listening... Try "Generate Report" or "Clear"
              </span>
            </div>
          )}
        </div>

        {/* Live Transcript View */}
        <div className="glass-panel" style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '200px', backgroundColor: 'rgba(22, 27, 34, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '1rem', margin: 0, color: 'var(--primary)' }}>Live Transcript</h4>
            {isRecording && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><span className="recording-indicator" style={{ width: '6px', height: '6px' }}></span> Real-time</span>}
          </div>
            <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
              <textarea 
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Your dictated text will appear here..."
                style={{
                  flex: 1, 
                  backgroundColor: 'rgba(1, 4, 9, 0.3)', 
                  borderRadius: '12px', 
                  padding: '16px',
                  color: '#fff',
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  border: '1px solid rgba(88, 166, 255, 0.2)',
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              />
              {interimTranscript && (
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  color: 'var(--primary)',
                  fontSize: '0.9rem',
                  fontStyle: 'italic',
                  opacity: 0.7,
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {interimTranscript}...
                </div>
              )}
            </div>
        </div>
      </div>

      {/* Right Column - Report Preview */}
      <div className="glass-panel" style={{ flex: 1, padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(22, 27, 34, 0.6)' }}>
          <h4 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={20} color="var(--primary)" /> Final Report Preview
          </h4>
          <button 
            onClick={downloadPDF}
            disabled={!filledHTML}
            className="btn btn-outline"
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            <FileDown size={18} /> Download PDF
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#e2e8f0', padding: '32px' }}>
          {!filledHTML && !isProcessing && (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
              <FileCheck size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <p>Generate a report to see the rendered preview.</p>
            </div>
          )}
          
          {isProcessing && (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
               <h3 style={{ color: 'var(--primary)', marginBottom: '16px' }}>AI Magic at work...</h3>
               <p>Extracting medical payload and formatting template.</p>
            </div>
          )}

          {/* Actual Rendered HTML for PDF */}
          {filledHTML && (
            <div 
              ref={reportRef}
              style={{
                backgroundColor: '#fff',
                color: '#000',
                padding: '40px',
                minHeight: '842px', // A4 approximate
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                fontFamily: 'serif',
                lineHeight: '1.6',
                borderRadius: '4px'
                // This div handles the PDF export styling natively.
              }}
              dangerouslySetInnerHTML={{ __html: filledHTML }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateReport;
