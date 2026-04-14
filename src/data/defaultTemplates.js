export const defaultTemplates = [
  {
    id: 'usg-template',
    name: 'Ultrasound (USG)',
    html: `<div style="font-family: 'Inter', 'Segoe UI', Arial, sans-serif; color: #1a202c; max-width: 850px; margin: 0 auto; padding: 0; background: #fff; line-height: 1.4; border: 1px solid #e2e8f0;">
  <!-- Header -->
  <div style="padding: 20px 40px; border-bottom: 4px solid #fbd38d; background: #fff;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 20px;">
        <div style="width: 75px; height: 75px; border: 3px solid #b91c1c; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #b91c1c; font-weight: 900; font-size: 28px; position: relative; padding: 5px;">
           <span style="border: 2px solid #b91c1c; border-radius: 50%; width: 55px; height: 55px; display: flex; align-items: center; justify-content: center;">JP</span>
        </div>
        <div>
          <h1 style="margin: 0; font-size: 38px; font-weight: 800; color: #1e3a8a; letter-spacing: 2px;">JP DIAGNOSTICS</h1>
          <p style="margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 4px; color: #4b5563; font-weight: 700;">RADIOLOGY | PATHOLOGY</p>
          <div style="background: #ef4444; color: white; padding: 3px 12px; display: inline-block; font-size: 12px; font-weight: 800; border-radius: 2px; margin-top: 8px;">WE DIAGNOSE RIGHT</div>
        </div>
      </div>
      <div style="text-align: right; font-size: 12px; color: #1f2937; line-height: 1.6;">
        <p style="margin: 0; font-weight: 700; color: #1e3a8a;">📞 +91-7579470000 | +91-7579430000</p>
        <p style="margin: 2px 0;">✉️ info@jpdiagnostics.in</p>
        <p style="margin: 2px 0;">🌐 www.jpdiagnostics.in</p>
        <p style="margin: 2px 0;">📍 JSR Tower, Goverdhan Crossing, Mathura</p>
      </div>
    </div>
  </div>

  <!-- Patient Info Grid -->
  <div style="padding: 20px 40px; background: #fafafa; border-bottom: 2px solid #e5e7eb; font-size: 13px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 4px 0; width: 35%;"><strong>Patient ID</strong> : {{uhid}}</td>
        <td style="padding: 4px 0; width: 35%;"><strong>UHID</strong> : {{uhid}}</td>
        <td style="padding: 4px 0; text-align: right;"><strong>Reg. Date</strong> : {{date}}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0;"><strong>Name</strong> : <span style="text-transform: uppercase; font-weight: 800;">{{patient_name}}</span></td>
        <td style="padding: 4px 0;"><strong>Sex</strong> : {{sex}}</td>
        <td style="padding: 4px 0; text-align: right;"><strong>Report Date</strong> : {{date}}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0;"><strong>Age</strong> : {{age}}</td>
        <td style="padding: 4px 0;"><strong>Ref By</strong> : {{ref_doctor}}</td>
        <td style="padding: 4px 0; text-align: right;"></td>
      </tr>
    </table>
  </div>

  <!-- Content -->
  <div style="padding: 40px 50px; min-height: 500px;">
    <h2 style="text-align: center; text-decoration: underline; font-size: 18px; margin-bottom: 30px; text-transform: uppercase; font-weight: 900; color: #111827;">{{study}}</h2>
    
    <div style="font-size: 15.5px; color: #111827; text-align: justify; line-height: 1.6; font-family: 'Georgia', serif;">
      {{reportText}}
    </div>

    <!-- Impression Section -->
    <div style="margin-top: 40px; border-top: 2px solid #111827; padding-top: 20px;">
      <h3 style="margin: 0 0 12px 0; font-size: 16px; text-decoration: underline; font-weight: 900; color: #111827;">IMPRESSION:</h3>
      <div style="font-weight: 800; font-size: 15.5px; line-height: 1.6; color: #000;">
        {{impression}}
      </div>
    </div>
  </div>

  <!-- Signatories -->
  <div style="padding: 40px 50px; display: flex; justify-content: space-between; align-items: flex-start; background: #fff; margin-top: 50px; border-top: 1px dashed #e5e7eb;">
    <div style="text-align: center; width: 30%;">
      <div style="height: 50px; margin-bottom: 10px; font-style: italic; color: #6b7280;">NikhVik...</div>
      <p style="margin: 0; font-weight: 800; font-size: 13px;">DR. NIKHIL VIKRAM</p>
      <p style="margin: 0; font-size: 10px; color: #4b5563; line-height: 1.3;">D.N.B. Radiodiagnosis, Fellowship in advanced USG Mumbai, P.G. DIP. MSK USG</p>
    </div>
    <div style="text-align: center; width: 30%;">
      <div style="height: 50px; margin-bottom: 10px; font-style: italic; color: #6b7280;">AgrawN...</div>
      <p style="margin: 0; font-weight: 800; font-size: 13px;">DR. NIDHI AGRAWAL</p>
      <p style="margin: 0; font-size: 10px; color: #4b5563; line-height: 1.3;">M.D. (Radiology), Director, Consultant Radiologist CT/MRI</p>
    </div>
    <div style="text-align: center; width: 30%;">
      <div style="height: 50px; margin-bottom: 10px; font-style: italic; color: #6b7280;">DeepAg...</div>
      <p style="margin: 0; font-weight: 800; font-size: 13px;">DR. DEEPAK AGRAWAL</p>
      <p style="margin: 0; font-size: 10px; color: #4b5563; line-height: 1.3;">M.D. (Radiology), Gold Medalist, Consultant Radiologist</p>
    </div>
  </div>

  <!-- Footer -->
  <div style="background: #4c1d95; color: white; padding: 12px; text-align: center; font-size: 10px; font-weight: 600; letter-spacing: 0.5px;">
    SILENT MRI (3T) | CT SCAN (MULTISLICE) | 3D/4D ULTRASOUND | DIGITAL X-RAY | MAMMOGRAPHY | ADVANCED PATHOLOGY | ECG/EEG/TMT | DEXA
  </div>
  <div style="background: #fff; color: #dc2626; padding: 8px; text-align: center; font-size: 11px; font-weight: 800; border-top: 1px solid #fee2e2;">
    ⚠ Sex determination & sex selective abortion is prohibited & punishable offense under PCPNDT Act.
  </div>
</div>`
  },
  {
    id: 'xray-template',
    name: 'X-Ray (Digital)',
    html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #000; max-width: 850px; margin: 0 auto; padding: 0; background: #fff; line-height: 1.5; border: 1px solid #333;">
  <div style="padding: 30px; border-bottom: 3px solid #000;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h1 style="margin: 0; font-size: 34px; font-weight: 900; color: #1e3a8a;">JP DIAGNOSTICS</h1>
        <p style="margin: 0; font-size: 14px; font-weight: 800; color: #d97706;">ADVANCED DIGITAL RADIOGRAPHY CENTER</p>
      </div>
      <div style="text-align: center; background: #1e3a8a; color: #fff; padding: 8px 20px;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 900;">X-RAY REPORT</h2>
      </div>
    </div>
  </div>

  <div style="padding: 20px 30px; border-bottom: 1px solid #000;">
    <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
      <tr>
        <td style="padding: 5px 0;"><strong>Patient Name</strong>: <span style="text-transform: uppercase;">{{patient_name}}</span></td>
        <td style="padding: 5px 0;"><strong>Age / Sex</strong>: {{age}} / {{sex}}</td>
        <td style="padding: 5px 0; text-align: right;"><strong>Date</strong>: {{date}}</td>
      </tr>
      <tr>
        <td style="padding: 5px 0;"><strong>Ref. Doctor</strong>: {{ref_doctor}}</td>
        <td style="padding: 5px 0;"><strong>UHID</strong>: {{uhid}}</td>
        <td style="padding: 5px 0; text-align: right;"><strong>ID</strong>: {{uhid}}</td>
      </tr>
    </table>
  </div>

  <div style="padding: 40px; min-height: 600px;">
    <div style="margin-bottom: 35px; background: #f8fafc; padding: 15px; border-left: 6px solid #1e3a8a;">
      <h3 style="margin: 0; font-size: 18px; font-weight: 900; color: #1e3a8a;">STUDY: {{study}}</h3>
    </div>

    <div style="font-size: 16px; line-height: 1.8; color: #000;">
      {{reportText}}
    </div>

    <div style="margin-top: 50px; padding: 25px; background: #1e3a8a; color: #fff; border-radius: 4px;">
      <h4 style="margin: 0 0 10px 0; color: #facc15; font-size: 14px; text-transform: uppercase; font-weight: 900;">FINAL IMPRESSION</h4>
      <p style="margin: 0; font-weight: 800; font-size: 18px; line-height: 1.4;">{{impression}}</p>
    </div>
  </div>

  <div style="padding: 30px; display: flex; justify-content: flex-end; border-top: 1px solid #e5e7eb;">
     <div style="text-align: center; width: 250px;">
        <div style="height: 40px;"></div>
        <p style="margin: 0; font-weight: 900; font-size: 14px;">DR. DEEPAK AGRAWAL</p>
        <p style="margin: 0; font-size: 11px; color: #4b5563;">M.D. Radiology, Consultant Radiologist</p>
     </div>
  </div>
</div>`
  },
  {
    id: 'ct-mri-template',
    name: 'CT / MRI Report',
    html: `<div style="font-family: 'Helvetica', Arial, sans-serif; color: #333; max-width: 850px; margin: 0 auto; background: #fff; border: 2px solid #e2e8f0; position: relative;">
  <div style="padding: 40px; border: 15px solid #f8fafc;">
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="margin: 0; color: #1e40af; font-size: 42px; font-weight: 900; letter-spacing: -1px;">JP DIAGNOSTICS</h1>
      <p style="margin: 5px 0; font-weight: 800; color: #64748b; letter-spacing: 3px;">ADVANCED NEURO & BODY IMAGING CENTER</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px; font-size: 14px;">
      <div style="padding: 20px; background: #f0f7ff; border-radius: 12px; border: 1px solid #dbeafe; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
        <p style="margin: 8px 0;"><strong>PATIENT NAME</strong> : <span style="font-weight: 900;">{{patient_name}}</span></p>
        <p style="margin: 8px 0;"><strong>AGE / SEX</strong> : {{age}} / {{sex}}</p>
        <p style="margin: 8px 0;"><strong>UHID NO.</strong> : {{uhid}}</p>
      </div>
      <div style="padding: 20px; background: #f0f7ff; border-radius: 12px; border: 1px solid #dbeafe; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
        <p style="margin: 8px 0;"><strong>REFERRING DOCTOR</strong> : {{ref_doctor}}</p>
        <p style="margin: 8px 0;"><strong>STUDY DATE</strong> : {{date}}</p>
        <p style="margin: 8px 0;"><strong>STUDY NAME</strong> : <span style="font-weight: 800;">{{study}}</span></p>
      </div>
    </div>

    <div style="border-bottom: 4px solid #1e40af; margin-bottom: 30px; padding-bottom: 10px; display: flex; justify-content: space-between; align-items: flex-end;">
      <h2 style="font-size: 26px; color: #1e40af; margin: 0; font-weight: 900;">DIAGNOSTIC REPORT</h2>
      <span style="font-size: 12px; font-weight: 700; color: #64748b;">COPY NO: 101/A</span>
    </div>

    <div style="font-size: 16.5px; line-height: 1.8; min-height: 500px; color: #1f2937; text-align: justify; font-family: 'Times New Roman', serif;">
      {{reportText}}
    </div>

    <div style="margin-top: 50px; padding: 30px; border: 3px solid #1e40af; border-radius: 16px; background: #fff; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
      <h3 style="margin: 0 0 15px 0; color: #1e40af; font-size: 18px; font-weight: 900; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">CLINICAL IMPRESSION / OPINION:</h3>
      <div style="font-weight: 900; color: #111827; font-size: 17px; line-height: 1.6;">{{impression}}</div>
    </div>

    <div style="margin-top: 60px; display: flex; justify-content: space-around; padding-top: 30px; border-top: 1px dashed #cbd5e1;">
       <div style="text-align: center;">
          <p style="margin: 0; font-weight: 900; font-size: 14px;">DR. NIDHI AGRAWAL</p>
          <p style="margin: 0; font-size: 11px;">Cons. Radiologist</p>
       </div>
       <div style="text-align: center;">
          <p style="margin: 0; font-weight: 900; font-size: 14px;">DR. DEEPAK AGRAWAL</p>
          <p style="margin: 0; font-size: 11px;">Cons. Radiologist</p>
       </div>
    </div>
  </div>
</div>`
  }
];

