import React, { useState, useEffect, useContext } from 'react';
import { Mic, FileText, ArrowRight, Download, CheckCircle2, Activity } from 'lucide-react';
import { API_URL } from '../services/api';


const CreateReport = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [transcript, setTranscript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = React.useRef(null);

  const toggleDictation = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Your browser does not support dictation. Please use Google Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    // Set interimResults to false to make it cleaner and only append final sentences
    recognition.interimResults = false; 
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          const newText = event.results[i][0].transcript.trim();
          setTranscript((prev) => prev + (prev ? ' ' : '') + newText + '. ');
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      if (event.error !== 'no-speech') {
        setError('Microphone error: ' + event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.error('Recognition start error:', err);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(`${API_URL}/templates/`);
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
        if (data.length > 0) {
          setSelectedTemplate(data[0]._id);
        }
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    }
  };

  const handleGenerate = async () => {
    if (!transcript || !selectedTemplate) {
      setError('Please provide a transcript and select a template.');
      return;
    }

    setIsGenerating(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/reports/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          template_id: selectedTemplate,
          transcript: transcript
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Generation failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!result || !result.file_id) return;
    
    try {
      const response = await fetch(`${API_URL}/reports/download/${result.file_id}`);
      
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Report_${result.report_id || 'filled'}.docx`;
      document.body.appendChild(a);
      a.click();
      a.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Generate Report</h1>
          <div className="page-subtitle">Transcribe or type notes to instantly map data to your Center's Template.</div>
        </div>
      </div>

      {error && error !== 'GROQ_RATE_LIMIT_EXCEEDED' && (
        <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', marginBottom: '24px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          {error}
        </div>
      )}

      {error === 'GROQ_RATE_LIMIT_EXCEEDED' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '24px',
            padding: '36px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(239, 68, 68, 0.15)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto 20px auto',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              <Activity size={32} color="#EF4444" style={{ animation: 'pulse 2s infinite' }} />
            </div>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '12px' }}>
              Groq AI Rate Limit Reached
            </h2>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Your Groq free tier limit has been temporarily reached. The system uses a free tier API key which restricts the number of generations per minute or day.
            </p>
            
            <div style={{ 
              textAlign: 'left', 
              background: 'rgba(0, 0, 0, 0.2)', 
              borderRadius: '12px', 
              padding: '16px', 
              marginBottom: '28px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              fontSize: '0.9rem',
              color: '#CBD5E1'
            }}>
              <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '8px' }}>How to resolve this:</strong>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Wait <strong>1-2 minutes</strong> and try generating again.</li>
                <li>Go to the <a href="https://console.groq.com" target="_blank" rel="noreferrer" style={{ color: '#60A5FA', textDecoration: 'underline' }}>Groq Console</a> and add a card for a pay-as-you-go plan (adds higher limits for pennies).</li>
                <li>Or update the <code>GROQ_API_KEY</code> in your <code>.env</code> file with a new key.</li>
              </ul>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn btn-outline" 
                onClick={() => setError('')}
                style={{ flex: 1, borderColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF' }}
              >
                Close
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  setError('');
                  handleGenerate();
                }}
                style={{ flex: 1, background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', border: 'none', color: '#FFFFFF' }}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}


      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        
        {/* Left Side: Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="glass-card">
            <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>1. Select Center Template</h3>
            <select 
              className="input-field"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              style={{ background: 'rgba(0,0,0,0.3)' }}
            >
              {templates.length === 0 ? (
                <option value="">No templates found. Please upload one.</option>
              ) : (
                templates.map(t => (
                  <option key={t._id} value={t._id}>{t.name} ({t.modality})</option>
                ))
              )}
            </select>
          </div>

          <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem' }}>2. Input Medical Notes</h3>
              <button 
                className="btn btn-outline" 
                onClick={toggleDictation}
                style={{ 
                  padding: '6px 12px', 
                  fontSize: '0.85rem', 
                  color: isListening ? '#EF4444' : 'var(--danger)', 
                  borderColor: isListening ? '#EF4444' : 'rgba(239, 68, 68, 0.3)',
                  background: isListening ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {isListening ? (
                  <>
                    <div className="recording-indicator" style={{ width: '8px', height: '8px', background: '#EF4444' }}></div>
                    Stop Dictation
                  </>
                ) : (
                  <>
                    <Mic size={14} /> Start Dictation
                  </>
                )}
              </button>
            </div>
            
            <textarea
              className="input-field"
              style={{ flex: 1, minHeight: '300px', resize: 'none', background: 'rgba(0,0,0,0.3)' }}
              placeholder="Start typing shorthand notes here, or use the dictation feature..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '24px', padding: '16px' }}
              onClick={handleGenerate}
              disabled={isGenerating || templates.length === 0}
            >
              {isGenerating ? (
                <>
                  <div className="recording-indicator" style={{ marginRight: '8px', background: '#fff' }}></div>
                  AI is mapping to your Template...
                </>
              ) : (
                <>Generate Exact DOCX Report <ArrowRight size={18} /></>
              )}
            </button>
          </div>

        </div>

        {/* Right Side: Output/Preview */}
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: result ? 'flex-start' : 'center', textAlign: 'center' }}>
          
          {!result && !isGenerating && (
            <div style={{ color: 'var(--text-muted)' }}>
              <FileText size={64} style={{ margin: '0 auto 24px', opacity: 0.2 }} />
              <h3 style={{ marginBottom: '8px', color: '#fff' }}>Awaiting Generation</h3>
              <p>Your generated .docx report preview will appear here.</p>
            </div>
          )}

          {isGenerating && (
            <div className="fade-in" style={{ color: 'var(--primary)' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <Activity size={32} className="fade-in" style={{ animationIterationCount: 'infinite' }} />
              </div>
              <h3 style={{ color: '#fff', marginBottom: '8px' }}>Processing via GPT-4o</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Enforcing strict JSON mapping to your DOCX tags...</p>
            </div>
          )}

          {result && !isGenerating && (
            <div className="fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Dancing+Script:wght@600&display=swap');
                
                @media print {
                  /* Hide all UI layout elements for pure report printout */
                  body, html {
                    background: #ffffff !important;
                    color: #000000 !important;
                    margin: 0 !important;
                    padding: 0 !important;
                  }
                  .no-print {
                    display: none !important;
                  }
                  .print-page-layout {
                    position: absolute !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    margin: 0 !important;
                    padding: 30px !important;
                    box-shadow: none !important;
                    border: none !important;
                    background: #ffffff !important;
                  }
                }
              `}</style>

              <div className="no-print" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px', padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', color: 'var(--success)' }}>
                <CheckCircle2 size={24} />
                <span style={{ fontWeight: 500, fontSize: '1.1rem' }}>Report Successfully Generated</span>
              </div>

              {/* Realistic White Page Preview Container */}
              <div className="print-page-layout" style={{
                background: '#ffffff',
                color: '#1a1a1a',
                padding: '40px 50px',
                borderRadius: '8px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                width: '100%',
                maxWidth: '800px',
                margin: '0 auto 24px',
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '11pt',
                lineHeight: '1.3',
                textAlign: 'left',
                border: '1px solid #ddd',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* 0. Background Watermark */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '350px',
                  height: '350px',
                  opacity: 0.03,
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 0
                }}>
                  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#3B1E54" strokeWidth="8" />
                    <text x="50" y="58" fontSize="24" fontWeight="bold" fill="#3B1E54" textAnchor="middle">JP</text>
                  </svg>
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* 1. Header Table */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    {/* Left: Logo */}
                    <div style={{ width: '15%' }}>
                      <div style={{
                        width: '68px',
                        height: '68px',
                        border: '3px double #3B1E54',
                        borderRadius: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#3B1E54',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        lineHeight: '1.1',
                        textAlign: 'center',
                        background: 'rgba(59, 30, 84, 0.04)'
                      }}>
                        <div style={{ color: '#CC0000', fontSize: '9px', marginBottom: '2px' }}>★ ★</div>
                        JP
                        <div style={{ fontSize: '8px', color: '#555555', marginTop: '2px' }}>DIAG</div>
                      </div>
                    </div>
                    {/* Center: Branding */}
                    <div style={{ width: '55%', textAlign: 'center' }}>
                      <div style={{ fontSize: '26pt', fontWeight: 'bold', color: '#3B1E54', fontFamily: '"Times New Roman", Times, serif', lineHeight: '1' }}>JP DIAGNOSTICS</div>
                      <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#000000', margin: '3px 0 2px', letterSpacing: '1px' }}>RADIOLOGY | PATHOLOGY</div>
                      <div style={{
                        display: 'inline-block',
                        fontSize: '9.5pt',
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        background: '#FF9800',
                        padding: '2px 16px',
                        borderRadius: '3px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>We Diagnose Right</div>
                    </div>
                    {/* Right: Contact */}
                    <div style={{ width: '30%', textAlign: 'right', fontSize: '8pt', color: '#444444', lineHeight: '1.4' }}>
                      <div style={{ fontWeight: 'bold', color: '#3B1E54' }}>📞 +91-7579470000</div>
                      <div style={{ fontWeight: 'bold', color: '#3B1E54' }}>📞 +91-7579430000</div>
                      <div>✉️ info@jpdiagnostics.in</div>
                      <div>🏠 JSR Tower, Goverdhan Crossing</div>
                      <div>NH-19, Mathura</div>
                    </div>
                  </div>

                  {/* Separator line */}
                  <hr style={{ border: 'none', borderBottom: '1.5px solid #888888', margin: '4px 0 8px' }} />

                  {/* 2. Patient Demographics */}
                  <div style={{ borderBottom: '1px solid #888888', paddingBottom: '6px', marginBottom: '8px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt', fontFamily: '"Times New Roman", Times, serif' }}>
                      <tbody>
                        <tr>
                          <td style={{ fontWeight: 'bold', width: '12%', padding: '2px 0' }}>Patient ID</td>
                          <td style={{ width: '38%' }}>: {result.preview_data.patient_id || '1025100634835UHID'} <b style={{ marginLeft: '10px' }}>P10100025954</b></td>
                          <td style={{ fontWeight: 'bold', width: '12%' }}>Reg. Date</td>
                          <td style={{ width: '38%' }}>: {result.preview_data.reg_date || '15/03/2026 12:18:50'}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: 'bold', padding: '2px 0' }}>Name</td>
                          <td style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>: {result.preview_data.patient_name || 'Mr. Rohit Soni'}</td>
                          <td style={{ fontWeight: 'bold' }}>Report Date</td>
                          <td>: {result.preview_data.report_date || '15/03/2026 13:02:54'}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: 'bold', padding: '2px 0' }}>Age</td>
                          <td>: {result.preview_data.age || '36 Yrs'} <span style={{ fontWeight: 'bold', marginLeft: '24px' }}>Sex :</span> {result.preview_data.sex || 'Male'}</td>
                          <td colSpan="2" style={{ verticalAlign: 'middle', padding: '2px 0' }}>
                            {/* Visual Barcode bar renderer */}
                            <div style={{ display: 'flex', alignItems: 'flex-end', height: '14px', opacity: 0.8, marginTop: '2px' }}>
                              {[1, 2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 2, 1, 4, 1, 2, 1, 3, 2, 1, 1, 2, 1, 3, 1, 2].map((w, idx) => (
                                <div key={idx} style={{ width: `${w}px`, height: '100%', background: '#000000', marginRight: '1px' }} />
                              ))}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: 'bold', padding: '2px 0' }}>Ref. By</td>
                          <td style={{ textTransform: 'uppercase' }} colSpan="3">: {result.preview_data.ref_by || 'SINGH SURGICAL & TRAUMA CENTER'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Double Separator Line */}
                  <div style={{ borderTop: '2px solid #000000', margin: '4px 0 12px' }}></div>

                  {/* 3. Study Title */}
                  <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '13pt', textDecoration: 'underline', marginBottom: '16px', letterSpacing: '0.5px' }}>
                    USG WHOLE ABDOMEN MALE
                  </div>

                  {/* 4. Findings Section */}
                  <div style={{ fontSize: '10.5pt', lineHeight: '1.45', color: '#000000', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {result.preview_data.findings ? (
                      /* Fallback if single findings tag is returned */
                      <div style={{ whiteSpace: 'pre-wrap', textAlign: 'justify' }}>{result.preview_data.findings}</div>
                    ) : (
                      /* Render structured organ findings */
                      <>
                        {result.preview_data.liver_finding && (
                          <div style={{ textAlign: 'justify' }}>
                            The <strong><u>Liver</u></strong> {result.preview_data.liver_finding}
                          </div>
                        )}
                        {result.preview_data.gallbladder_finding && (
                          <div style={{ textAlign: 'justify' }}>
                            The <strong><u>Gall Bladder</u></strong> {result.preview_data.gallbladder_finding}
                          </div>
                        )}
                        {result.preview_data.pancreas_finding && (
                          <div style={{ textAlign: 'justify' }}>
                            The <strong><u>Pancreas</u></strong> {result.preview_data.pancreas_finding}
                          </div>
                        )}
                        {result.preview_data.spleen_finding && (
                          <div style={{ textAlign: 'justify' }}>
                            <strong><u>Spleen</u></strong> {result.preview_data.spleen_finding}
                          </div>
                        )}
                        {result.preview_data.kidneys_finding && (
                          <div style={{ textAlign: 'justify' }}>
                            Both <strong><u>Kidneys</u></strong> {result.preview_data.kidneys_finding}
                          </div>
                        )}
                        {result.preview_data.urinary_bladder_finding && (
                          <div style={{ textAlign: 'justify' }}>
                            The <strong><u>Urinary Bladder</u></strong> {result.preview_data.urinary_bladder_finding}
                          </div>
                        )}
                        {result.preview_data.prostate_finding && (
                          <div style={{ textAlign: 'justify' }}>
                            <strong>Prostate</strong>: {result.preview_data.prostate_finding}
                          </div>
                        )}
                        {result.preview_data.additional_finding && (
                          <div style={{ textAlign: 'justify', fontStyle: 'italic', marginTop: '4px' }}>
                            {result.preview_data.additional_finding}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* 5. Impression Section */}
                  <div style={{ marginTop: '20px' }}>
                    <div style={{ fontWeight: 'bold', textDecoration: 'underline', fontSize: '11pt', marginBottom: '8px' }}>IMPRESSION:</div>
                    <div style={{ paddingLeft: '15px', fontSize: '10.5pt', lineHeight: '1.4' }}>
                      {Array.isArray(result.preview_data.impression) ? (
                        <ol style={{ margin: 0, paddingLeft: '15px', fontWeight: 'bold' }}>
                          {result.preview_data.impression.map((imp, idx) => (
                            <li key={idx} style={{ marginBottom: '4px' }}>{imp}</li>
                          ))}
                        </ol>
                      ) : (
                        <div style={{ fontWeight: 'bold', whiteSpace: 'pre-wrap' }}>{result.preview_data.impression}</div>
                      )}
                    </div>
                  </div>

                  {/* Spacing before signature */}
                  <div style={{ height: '40px' }}></div>

                  {/* 6. Doctors Signatures with Handwriting Cursive overlays */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', fontSize: '7.5pt', color: '#333333', borderTop: '1px solid #dddddd', paddingTop: '10px' }}>
                    <div style={{ position: 'relative' }}>
                      {/* Signature graphic overlay */}
                      <div style={{ position: 'absolute', top: '-30px', left: '10px', fontFamily: '"Caveat", cursive', fontSize: '24pt', color: '#1B365D', transform: 'rotate(-4deg)', opacity: 0.8 }}>
                        Nikhil Vikram
                      </div>
                      <div style={{ height: '24px' }}></div>
                      <div style={{ fontWeight: 'bold', fontSize: '9pt', color: '#000000', marginBottom: '2px' }}>DR. NIKHIL VIKRAM</div>
                      <div>D.N.B. Radiodiagnosis, Fellowship in advanced USG Mumbai, P.G. DIP. MSK USG, UCAM, Spain FMF, Certified U.K. ID 209647, FIPM, Certified pain & Palliative Care Physician, Fellowship in 2D Echo</div>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '-30px', left: '15px', fontFamily: '"Dancing Script", cursive', fontSize: '22pt', color: '#183B56', transform: 'rotate(-2deg)', opacity: 0.85 }}>
                        Nidhi Agrawal
                      </div>
                      <div style={{ height: '24px' }}></div>
                      <div style={{ fontWeight: 'bold', fontSize: '9pt', color: '#000000', marginBottom: '2px' }}>DR. NIDHI AGRAWAL</div>
                      <div>M.D. (Radiology)</div>
                      <div>Director, Consultant Radiologist CT/MRI, Cardiac and Breast Imaging Consultant.</div>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '-30px', left: '15px', fontFamily: '"Caveat", cursive', fontSize: '24pt', color: '#1D3B5C', transform: 'rotate(-5deg)', opacity: 0.8 }}>
                        Deepak Agrawal
                      </div>
                      <div style={{ height: '24px' }}></div>
                      <div style={{ fontWeight: 'bold', fontSize: '9pt', color: '#000000', marginBottom: '2px' }}>DR. DEEPAK AGRAWAL</div>
                      <div>M.D. (Radiology), Gold Medalist</div>
                      <div>Director, Consultant Radiologist CT/MRI Head & Neck, Spine, MSK, Chest-Abdomen, Whole Body Imaging & Fetal Medicine Specialist</div>
                    </div>
                  </div>

                  {/* 7. Footer disclaimer & legal */}
                  <div style={{ borderTop: '1px solid #888888', marginTop: '16px', paddingTop: '4px', textAlign: 'center', fontSize: '6.5pt', color: '#555555', lineHeight: '1.2' }}>
                    N.B. This is only a professional opinion and not the final diagnosis. Please correlate clinical findings with scan findings, if any disparity arises, please ask for rescan, please intimate us for any typing mistakes and sent the report for correction immediately within 7 days.<br/>
                    <strong style={{ color: '#000000' }}>THIS REPORT IS NOT VALID FOR MEDICO LEGAL PURPOSES</strong>
                  </div>

                  {/* Services banner (Purple strip) */}
                  <div style={{ background: '#500078', color: '#ffffff', textAlign: 'center', fontSize: '7.2pt', fontWeight: 'bold', padding: '5px 10px', margin: '6px 0 2px', lineHeight: '1.35', borderRadius: '2px' }}>
                    Silent MRI (3T Platform) | CT scan (True 16 multidetectors-96 slice per rotation Recon.) | 3D/4D Ultrasound | Digital X-Ray (DR-500 mA) | Mammography | Advanced Pathology Lab | ECG/EEG/NCV/EMG/TMT/CT Denta Scan | DEXA Scan | Sleep Study
                  </div>

                  {/* Legal warning */}
                  <div style={{ color: '#CC0000', textAlign: 'center', fontSize: '7.8pt', fontWeight: 'bold', marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span>Sex determination & sex selective abortion is prohibited & punishable offense.</span>
                    <span style={{ fontSize: '8.5pt' }}>गर्भ का लिंग परीक्षण करना कानूनन अपराध है।</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="no-print" style={{ display: 'flex', gap: '16px', width: '100%', maxWidth: '800px' }}>
                <button className="btn btn-success" style={{ flex: 1 }} onClick={handleDownload}>
                  <Download size={18} /> Download Final .DOCX
                </button>
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => window.print()}>
                  Print directly
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default CreateReport;
