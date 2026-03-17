import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, FileText, Loader, FileDown, CheckCircle, FileCheck } from 'lucide-react';
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
      const response = await fetch('http://localhost:8000/api/generate_report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript })
      });
      
      if (!response.ok) throw new Error("API failed");
      
      const data = await response.json();
      setReportData(data);
      fillTemplate(data);
    } catch (error) {
      console.error("Failed to generate report:", error);
      alert("Failed to reach AI backend. Ensure FastAPI server is running.");
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
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
          <div style={{ marginBottom: '24px' }}>
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

          <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
            <button 
              onClick={toggleRecording} 
              className={`btn ${isRecording ? 'btn-danger' : 'btn-primary'}`}
              style={{ flex: 1, padding: '16px' }}
            >
              {isRecording ? <><Square size={20} /> Stop Dictation</> : <><Mic size={20} /> Start Dictation</>}
            </button>
            <button 
              onClick={generateReport}
              disabled={!transcript && !interimTranscript || isRecording || isProcessing}
              className="btn btn-success"
              style={{ flex: 1, padding: '16px' }}
            >
              {isProcessing ? <><Loader size={20} className="spin" /> Processing...</> : <><FileText size={20} /> Generate Report</>}
            </button>
            <button 
              onClick={clearTranscript}
              disabled={isRecording || isProcessing || !transcript}
              className="btn btn-danger"
              style={{ flex: 0.3, padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Clear Transcript"
            >
              <Square size={18} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Live Transcript View */}
        <div className="glass-panel" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1.1rem', margin: 0 }}>Live Transcript</h4>
            {isRecording && <span style={{ color: 'var(--danger)', fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}><span className="recording-indicator" style={{ width: '8px', height: '8px' }}></span> Listening</span>}
          </div>
            <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
              <textarea 
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Transcript will appear here... (Example: 'Patient name Rahul Sharma age 45 male ref doctor Dr Gupta ultrasound whole abdomen...') You can also type manually here."
                style={{
                  flex: 1, 
                  backgroundColor: 'rgba(1, 4, 9, 0.5)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '20px',
                  color: '#e6edf3',
                  fontSize: '1.05rem',
                  lineHeight: '1.6',
                  border: '1px solid var(--border-color)',
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'inherit',
                  paddingBottom: '40px'
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
