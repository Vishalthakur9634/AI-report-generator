export const defaultTemplates = [
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
    },
    {
      id: 'blood-test-template',
      name: 'Pathology (Blood Test)',
      html: `<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; max-width: 800px; margin: 0 auto; padding: 40px; background: #fff; border: 1px solid #eee;">
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e11d48; padding-bottom: 20px; margin-bottom: 30px;">
    <div>
      <h1 style="margin: 0; color: #e11d48; font-size: 28px;">PATHOLOGY REPORT</h1>
      <p style="margin: 5px 0 0 0; font-size: 14px; letter-spacing: 2px; color: #64748b;">JP DIAGNOSTICS & LABS</p>
    </div>
    <div style="text-align: right;">
      <p style="margin: 0; font-weight: 700;">ISO 9001:2015 CERTIFIED</p>
      <p style="margin: 2px 0; font-size: 12px; color: #64748b;">Accredited Laboratory</p>
    </div>
  </div>

  <div style="background: #fff1f2; padding: 20px; border-radius: 8px; margin-bottom: 40px; border: 1px solid #fecdd3;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 13px;">
      <div>
        <p style="margin: 4px 0;"><strong>PATIENT NAME:</strong> {{patient_name}}</p>
        <p style="margin: 4px 0;"><strong>AGE / SEX:</strong> {{age}} / {{sex}}</p>
        <p style="margin: 4px 0;"><strong>PATIENT ID:</strong> {{uhid}}</p>
      </div>
      <div style="text-align: right;">
        <p style="margin: 4px 0;"><strong>DATE:</strong> {{date}}</p>
        <p style="margin: 4px 0;"><strong>REF BY:</strong> {{ref_doctor}}</p>
        <p style="margin: 4px 0;"><strong>COLLECTION:</strong> LAB CENTER</p>
      </div>
    </div>
  </div>

  <div style="margin-bottom: 40px;">
    <h3 style="background: #e11d48; color: #fff; padding: 8px 15px; font-size: 16px; border-radius: 4px; margin-bottom: 20px;">{{study}}</h3>
    <div style="line-height: 1.8; font-size: 14px;">
      {{reportText}}
    </div>
  </div>

  <div style="background: #f8fafc; padding: 20px; border-left: 5px solid #e11d48; margin-bottom: 50px;">
    <h4 style="margin: 0 0 10px 0; color: #e11d48; font-size: 14px;">PATHOLOGIST'S INTERPRETATION</h4>
    <div style="font-size: 14px; font-weight: 600; white-space: pre-line;">{{impression}}</div>
  </div>

  <div style="display: flex; justify-content: space-between; margin-top: 100px; font-size: 12px;">
    <div style="text-align: center;">
      <div style="height: 50px;"></div>
      <p style="margin: 0; font-weight: bold;">Lab Technician</p>
    </div>
    <div style="text-align: center;">
      <div style="height: 50px;"></div>
      <p style="margin: 0; font-weight: bold;">DR. VISHAL SHARMA</p>
      <p style="margin: 0;">MD (Pathology)</p>
    </div>
  </div>
</div>`
    }
  ];
