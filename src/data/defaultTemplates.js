export const defaultTemplates = [
    {
      id: 'usg-template',
      name: 'Ultrasound (USG)',
      html: `<div style="font-family: 'Inter', 'Segoe UI', Arial, sans-serif; color: #1a202c; max-width: 850px; margin: 0 auto; padding: 0; background: #fff; line-height: 1.4; border: 1px solid #e2e8f0;">
  <!-- Header -->
  <div style="padding: 20px 40px; border-bottom: 4px solid #fbd38d; background: #fff;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 20px;">
        <div style="width: 70px; height: 70px; border: 2px solid #1e3a8a; border-radius: 50%; display: flex; alignItems: center; justifyContent: center; color: #1e3a8a; font-weight: 800; font-size: 24px;">JP</div>
        <div>
          <h1 style="margin: 0; font-size: 32px; font-weight: 800; color: #1e3a8a; letter-spacing: 1px;">JP DIAGNOSTICS</h1>
          <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 3px; color: #64748b; font-weight: 600;">RADIOLOGY | PATHOLOGY</p>
          <div style="background: #ed8936; color: white; padding: 2px 10px; display: inline-block; font-size: 11px; font-weight: 700; border-radius: 2px; margin-top: 5px;">WE DIAGNOSE RIGHT</div>
        </div>
      </div>
      <div style="text-align: right; font-size: 11px; color: #4a5568;">
        <p style="margin: 0; display: flex; align-items: center; justify-content: flex-end; gap: 5px;"><span style="color: #1e3a8a;">📞</span> +91-7579470000 | +91-7579430000</p>
        <p style="margin: 2px 0;">✉️ info@jpdiagnostics.in</p>
        <p style="margin: 2px 0;">📍 JSR Tower, Goverdhan Crossing, NH-19, Mathura</p>
      </div>
    </div>
  </div>

  <!-- Patient Info Grid -->
  <div style="padding: 15px 40px; background: #fdfcfb; border-bottom: 1px solid #edf2f7; font-size: 12px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 3px 0; width: 35%;"><strong>Patient ID:</strong> {{uhid}}</td>
        <td style="padding: 3px 0; width: 35%;"><strong>UHID:</strong> {{uhid}}</td>
        <td style="padding: 3px 0; text-align: right;"><strong>Reg. Date:</strong> {{date}}</td>
      </tr>
      <tr>
        <td style="padding: 3px 0;"><strong>Name:</strong> <span style="text-transform: uppercase;">{{patient_name}}</span></td>
        <td style="padding: 3px 0;"><strong>Sex :</strong> {{sex}}</td>
        <td style="padding: 3px 0; text-align: right;"><strong>Report Date:</strong> {{date}}</td>
      </tr>
      <tr>
        <td style="padding: 3px 0;"><strong>Age:</strong> {{age}}</td>
        <td style="padding: 3px 0;"><strong>Ref By:</strong> {{ref_doctor}}</td>
        <td style="padding: 3px 0; text-align: right;"></td>
      </tr>
    </table>
  </div>

  <!-- Content -->
  <div style="padding: 30px 45px; min-height: 450px;">
    <h2 style="text-align: center; text-decoration: underline; font-size: 16px; margin-bottom: 25px; text-transform: uppercase; font-weight: 800;">{{study}}</h2>
    
    <div style="font-size: 14.5px; color: #1a202c; text-align: justify;">
      {{reportText}}
    </div>

    <!-- Impression Section -->
    <div style="margin-top: 35px; border-top: 1px solid #1a202c; padding-top: 15px;">
      <h3 style="margin: 0 0 10px 0; font-size: 15px; text-decoration: underline; font-weight: 800;">IMPRESSION:</h3>
      <div style="font-weight: 700; font-size: 14.5px; line-height: 1.6;">
        {{impression}}
      </div>
    </div>
  </div>

  <!-- Signatories -->
  <div style="padding: 20px 45px; display: flex; justify-content: space-between; align-items: flex-start; background: #fff; margin-top: 20px;">
    <div style="text-align: center; max-width: 250px;">
      <p style="margin: 0; font-weight: bold; font-size: 12px;">DR. NIKHIL VIKRAM</p>
      <p style="margin: 0; font-size: 9px; color: #4a5568;">D.N.B. Radiodiagnosis, Fellowship in advanced USG Mumbai, P.G. DIP. MSK USG, UCAM, Spain</p>
    </div>
    <div style="text-align: center; max-width: 250px;">
      <p style="margin: 0; font-weight: bold; font-size: 12px;">DR. NIDHI AGRAWAL</p>
      <p style="margin: 0; font-size: 9px; color: #4a5568;">M.D. ( Radiology ), Director, Consultant Radiologist CT/MRI, Cardiac and Breast Imaging Consultant.</p>
    </div>
    <div style="text-align: center; max-width: 250px;">
      <p style="margin: 0; font-weight: bold; font-size: 12px;">DR. DEEPAK AGRAWAL</p>
      <p style="margin: 0; font-size: 9px; color: #4a5568;">M.D. ( Radiology ), Gold Medalist, Consultant Radiologist, CT/MRI Head & Neck, Body Imaging Specialist</p>
    </div>
  </div>

  <!-- Footer Status Bar -->
  <div style="background: #553c9a; color: white; padding: 10px; text-align: center; font-size: 9px; font-weight: 500;">
    Silent MRI (3T Platform) | CT scan (True 16 multidetectors) | 3D/4D Ultrasound | Digital X-Ray | Mammography | Advanced Pathology Lab | ECG/EEG/TMT | DEXA Scan | Sleep Study
  </div>
  <div style="background: #fff; color: #e53e3e; padding: 5px; text-align: center; font-size: 10px; font-weight: bold;">
    🚫 Sex determination & sex selective abortion is prohibited & punishable offense.
  </div>
</div>`
    },
    {
      id: 'xray-template',
      name: 'X-Ray (Digital)',
      html: `<div style="font-family: 'Arial', sans-serif; color: #000; max-width: 800px; margin: 0 auto; padding: 40px; background: #fff; min-height: 1000px; border: 1px solid #eee;">
  <!-- Header -->
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #000; padding-bottom: 20px; margin-bottom: 30px;">
    <div>
      <h1 style="margin: 0; font-size: 32px; font-weight: 900; color: #1e3a8a;">JP <span style="color: #ed8936;">DIAGNOSTICS</span></h1>
      <p style="margin: 0; font-size: 14px; letter-spacing: 2px; font-weight: bold;">DIGITAL RADIOGRAPHY SERVICES</p>
    </div>
    <div style="text-align: right; background: #1e3a8a; color: #fff; padding: 10px 20px; border-radius: 4px;">
      <h2 style="margin: 0; font-size: 18px;">X-RAY REPORT</h2>
    </div>
  </div>

  <div style="margin-bottom: 40px;">
    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      <tr>
        <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>PATIENT NAME</strong></td>
        <td style="padding: 8px; border: 1px solid #e2e8f0; text-transform: uppercase;">{{patient_name}}</td>
        <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>AGE/SEX</strong></td>
        <td style="padding: 8px; border: 1px solid #e2e8f0;">{{age}} / {{sex}}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>REF. DOCTOR</strong></td>
        <td style="padding: 8px; border: 1px solid #e2e8f0;">{{ref_doctor}}</td>
        <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>DATE</strong></td>
        <td style="padding: 8px; border: 1px solid #e2e8f0;">{{date}}</td>
      </tr>
    </table>
  </div>

  <div style="margin-bottom: 30px;">
    <h3 style="background: #f1f5f9; padding: 12px; border-left: 5px solid #1e3a8a; margin: 0; font-size: 16px;">STUDY: {{study}}</h3>
  </div>

  <div style="font-size: 15px; line-height: 1.8; margin-bottom: 50px; min-height: 300px;">
    {{reportText}}
  </div>

  <div style="background: #1e3a8a; color: #fff; padding: 20px; border-radius: 8px; margin-bottom: 40px;">
    <h4 style="margin: 0 0 8px 0; color: #fbd38d; font-size: 13px; text-transform: uppercase;">FINAL IMPRESSION</h4>
    <p style="margin: 0; font-weight: bold; font-size: 16px; line-height: 1.4;">{{impression}}</p>
  </div>

  <div style="display: flex; justify-content: flex-end; margin-top: 100px;">
    <div style="text-align: center; width: 250px;">
      <div style="border-top: 2px solid #1e3a8a; padding-top: 10px;">
        <p style="margin: 0; font-weight: bold; font-size: 14px;">DR. DEEPAK AGRAWAL</p>
        <p style="margin: 0; font-size: 11px; color: #64748b;">Consultant Radiologist</p>
      </div>
    </div>
  </div>
</div>`
    },
    {
      id: 'ct-template',
      name: 'CT Scan',
      html: `<div style="font-family: 'Helvetica', Arial, sans-serif; color: #333; max-width: 800px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0;">
  <div style="padding: 40px; border: 12px solid #f8fafc;">
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="margin: 0; color: #1e40af; font-size: 38px; font-weight: 900;">JP DIAGNOSTICS</h1>
      <p style="margin: 5px 0; font-weight: 700; color: #64748b; letter-spacing: 2px;">ADVANCED MULTI-SLICE CT CENTER</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; font-size: 13px;">
      <div style="padding: 15px; background: #f0f7ff; border-radius: 8px; border: 1px solid #dbeafe;">
        <p style="margin: 6px 0;"><strong>Patient Name:</strong> {{patient_name}}</p>
        <p style="margin: 6px 0;"><strong>Age / Sex:</strong> {{age}} / {{sex}}</p>
        <p style="margin: 6px 0;"><strong>UHID:</strong> {{uhid}}</p>
      </div>
      <div style="padding: 15px; background: #f0f7ff; border-radius: 8px; border: 1px solid #dbeafe;">
        <p style="margin: 6px 0;"><strong>Referring Doctor:</strong> {{ref_doctor}}</p>
        <p style="margin: 6px 0;"><strong>Date:</strong> {{date}}</p>
        <p style="margin: 6px 0;"><strong>Study:</strong> {{study}}</p>
      </div>
    </div>

    <div style="border-bottom: 3px solid #1e40af; margin-bottom: 30px; padding-bottom: 10px;">
      <h2 style="font-size: 22px; color: #1e40af; margin: 0; font-weight: 800;">COMPUTED TOMOGRAPHY REPORT</h2>
    </div>

    <div style="font-size: 15px; line-height: 1.7; min-height: 400px; color: #1f2937;">
      {{reportText}}
    </div>

    <div style="margin-top: 40px; padding: 25px; border: 2px solid #1e40af; border-radius: 12px; background: #fff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <h3 style="margin: 0 0 12px 0; color: #1e40af; font-size: 16px; font-weight: 800; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">CLINICAL IMPRESSION:</h3>
      <div style="font-weight: 700; color: #111827; font-size: 15.5px;">{{impression}}</div>
    </div>
  </div>
</div>`
    }
  ];
