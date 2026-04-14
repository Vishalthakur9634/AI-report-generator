export const defaultTemplates = [
  {
    id: 'usg-template',
    name: 'Ultrasound (USG)',
    html: `<div style="font-family: 'Inter', sans-serif; color: #1a202c; max-width: 850px; margin: 0 auto; background: #fff; line-height: 1.4; border: 1px solid #e2e8f0;">
  <!-- Professional Header -->
  <div style="padding: 30px 45px; border-bottom: 2px solid #edf2f7; position: relative;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 20px;">
        <div style="width: 75px; height: 75px; border: 3px solid #b91c1c; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #b91c1c; font-weight: 900; font-size: 28px; position: relative;">
          <span style="border: 2px solid #b91c1c; border-radius: 50%; width: 55px; height: 55px; display: flex; align-items: center; justify-content: center;">JP</span>
        </div>
        <div>
          <h1 style="margin: 0; font-size: 34px; font-weight: 800; color: #1e3a8a; letter-spacing: 1.5px; text-transform: uppercase;">{{centerName}}</h1>
          <p style="margin: 0; font-size: 15px; text-transform: uppercase; letter-spacing: 3px; color: #4b5563; font-weight: 700;">{{centerTagline}}</p>
          <div style="background: #f97316; color: white; padding: 2px 10px; display: inline-block; font-size: 11px; font-weight: 800; border-radius: 2px; margin-top: 6px;">{{centerSlogan}}</div>
        </div>
      </div>
      <div style="text-align: right; font-size: 11.5px; color: #1f2937; line-height: 1.6;">
        <p style="margin: 0; font-weight: 700; color: #b91c1c;">📞 {{centerPhone}}</p>
        <p style="margin: 2px 0;">✉️ {{centerEmail}}</p>
        <p style="margin: 2px 0;">📍 {{centerAddress}}</p>
      </div>
    </div>
    <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 5px; background: linear-gradient(to right, #1e3a8a, #f97316);"></div>
  </div>

  <!-- Patient Info row -->
  <div style="padding: 20px 45px; background: #fafafa; border-bottom: 1px solid #e5e7eb; font-size: 13px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 5px 0;"><strong>Patient ID</strong>: {{uhid}}</td>
        <td style="padding: 5px 0;"><strong>Name</strong>: <span style="text-transform: uppercase; font-weight: 800;">{{patient_name}}</span></td>
        <td style="padding: 5px 0; text-align: right;"><strong>Reg. Date</strong>: {{date}}</td>
      </tr>
      <tr>
        <td style="padding: 5px 0;"><strong>Age / Sex</strong>: {{age}} / {{sex}}</td>
        <td style="padding: 5px 0;"><strong>Ref. By</strong>: {{ref_doctor}}</td>
        <td style="padding: 5px 0; text-align: right;"><strong>Report Date</strong>: {{date}}</td>
      </tr>
    </table>
  </div>

  <!-- Findings -->
  <div style="padding: 45px; min-height: 550px;">
    <h2 style="text-align: center; font-size: 18px; margin-bottom: 35px; text-transform: uppercase; font-weight: 900; color: #111827; text-decoration: underline;">{{study}}</h2>
    
    <div style="font-family: 'Times New Roman', serif;">
      {{reportText}}
    </div>

    <!-- Impression Section -->
    <div style="margin-top: 45px; border-top: 2px solid #111827; padding-top: 20px;">
      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 900; color: #111827;">IMPRESSION:</h3>
      <div style="font-weight: 800; font-size: 15.5px; line-height: 1.6; color: #000;">
        {{impression}}
      </div>
    </div>
  </div>

  <!-- Elite Signatories Row -->
  <div style="padding: 40px 45px; display: flex; justify-content: space-between; align-items: flex-start; margin-top: 40px; border-top: 1px dashed #e5e7eb;">
    <div style="text-align: center; width: 30%;">
      <div style="height: 50px; font-family: 'Dancing Script', cursive; font-size: 24px; color: #6b7280; margin-bottom: 10px;">{{sig1_sign}}</div>
      <p style="margin: 0; font-weight: 800; font-size: 13px;">{{sig1_name}}</p>
      <p style="margin: 0; font-size: 10px; color: #4b5563;">{{sig1_degree}}</p>
    </div>
    <div style="text-align: center; width: 30%;">
      <div style="height: 50px; font-family: 'Dancing Script', cursive; font-size: 24px; color: #6b7280; margin-bottom: 10px;">{{sig2_sign}}</div>
      <p style="margin: 0; font-weight: 800; font-size: 13px;">{{sig2_name}}</p>
      <p style="margin: 0; font-size: 10px; color: #4b5563;">{{sig2_degree}}</p>
    </div>
    <div style="text-align: center; width: 30%;">
      <div style="height: 50px; font-family: 'Dancing Script', cursive; font-size: 24px; color: #6b7280; margin-bottom: 10px;">{{sig3_sign}}</div>
      <p style="margin: 0; font-weight: 800; font-size: 13px;">{{sig3_name}}</p>
      <p style="margin: 0; font-size: 10px; color: #4b5563;">{{sig3_degree}}</p>
    </div>
  </div>

  <div style="background: #4c1d95; color: white; padding: 10px; text-align: center; font-size: 10px; font-weight: 700; letter-spacing: 1px;">
    SILENT MRI (3T) | MULTISLICE CT | 3D/4D USG | DIGITAL X-RAY | MAMMOGRAPHY | ADVANCED PATHOLOGY
  </div>
  <div style="padding: 8px; text-align: center; font-size: 11px; color: #dc2626; font-weight: 800;">
    ⚠ Sex determination & sex selective abortion is prohibited & punishable offense under PCPNDT Act.
  </div>
</div>`
  },
  {
    id: 'xray-template',
    name: 'X-Ray (Digital)',
    html: `<div style="font-family: 'Inter', sans-serif; color: #000; max-width: 850px; margin: 0 auto; background: #fff; border: 1px solid #000;">
  <div style="padding: 35px; border-bottom: 3px solid #1e3a8a;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h1 style="margin: 0; font-size: 32px; font-weight: 900; color: #1e3a8a;">{{centerName}}</h1>
        <p style="margin: 0; font-size: 14px; color: #f97316; font-weight: 800;">DIGITAL RADIOGRAPHY DEPARTMENT</p>
      </div>
      <div style="text-align: right; font-size: 12px;">
        <p style="margin: 0;">{{centerAddress}}</p>
        <p style="margin: 2px 0; font-weight: 800;">Contact: {{centerPhone}}</p>
      </div>
    </div>
  </div>

  <div style="padding: 20px 35px; border-bottom: 1px solid #eee;">
    <table style="width: 100%; font-size: 13.5px;">
      <tr>
        <td><strong>Patient</strong>: {{patient_name}}</td>
        <td><strong>Age/Sex</strong>: {{age}} / {{sex}}</td>
        <td style="text-align: right;"><strong>Date</strong>: {{date}}</td>
      </tr>
    </table>
  </div>

  <div style="padding: 45px; min-height: 500px;">
    <h3 style="margin-bottom: 30px; font-size: 18px; color: #1e3a8a; border-left: 5px solid #1e3a8a; padding-left: 15px;">STUDY: {{study}}</h3>
    <div style="font-size: 16px; line-height: 1.8;">
      {{reportText}}
    </div>
    <div style="margin-top: 50px; padding: 25px; background: #f8fafc; border: 1px solid #1e3a8a; border-radius: 8px;">
      <h4 style="margin: 0 0 10px 0; color: #1e3a8a; font-weight: 900; font-size: 14px;">FINAL OPINION</h4>
      <p style="margin: 0; font-weight: 800; font-size: 17px;">{{impression}}</p>
    </div>
  </div>

  <div style="padding: 40px; display: flex; justify-content: flex-end;">
    <div style="text-align: center; width: 250px; border-top: 2px solid #1e3a8a; padding-top: 10px;">
      <p style="margin: 0; font-weight: 900;">{{sig3_name}}</p>
      <p style="margin: 0; font-size: 11px;">{{sig3_degree}}</p>
    </div>
  </div>
</div>`
  },
  {
    id: 'ct-mri-template',
    name: 'CT / MRI Report',
    html: `<div style="font-family: 'Times New Roman', serif; color: #111; max-width: 850px; margin: 0 auto; background: #fff; border: 4px double #1e3a8a;">
  <div style="padding: 45px;">
    <div style="text-align: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 20px; margin-bottom: 30px;">
      <h1 style="margin: 0; font-size: 44px; font-weight: 900; color: #1e3a8a;">{{centerName}}</h1>
      <p style="margin: 5px 0; font-size: 16px; letter-spacing: 4px; font-weight: 700;">ADVANCED MEDICAL IMAGING CENTER</p>
      <p style="margin: 0; font-size: 12px;">{{centerAddress}} | {{centerPhone}}</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; border: 1px solid #ddd; padding: 20px; margin-bottom: 40px; font-size: 14px; background: #fcfcfc;">
      <div><strong>Patient</strong>: {{patient_name}}</div>
      <div><strong>ID</strong>: {{uhid}}</div>
      <div><strong>Age / Sex</strong>: {{age}} / {{sex}}</div>
      <div><strong>Date</strong>: {{date}}</div>
      <div><strong>Ref By</strong>: {{ref_doctor}}</div>
      <div><strong>Study</strong>: <strong>{{study}}</strong></div>
    </div>

    <div style="min-height: 500px;">
      <h2 style="font-size: 24px; color: #1e3a8a; border-bottom: 1px solid #1e3a8a; margin-bottom: 25px;">DIAGNOSTIC FINDINGS</h2>
      {{reportText}}
    </div>

    <div style="margin-top: 50px; padding: 30px; border: 2px solid #1e3a8a; background: #fdfdfd;">
      <h3 style="margin: 0 0 10px 0; font-size: 17px; font-weight: 900;">CLINICAL IMPRESSION:</h3>
      <div style="font-weight: 900; font-size: 17px; line-height: 1.5;">{{impression}}</div>
    </div>

    <div style="margin-top: 80px; display: flex; justify-content: space-around;">
      <div style="text-align: center;">
        <div style="height: 40px;"></div>
        <p style="margin: 0; font-weight: 900;">{{sig2_name}}</p>
        <p style="margin: 0; font-size: 11px;">{{sig2_degree}}</p>
      </div>
      <div style="text-align: center;">
        <div style="height: 40px;"></div>
        <p style="margin: 0; font-weight: 900;">{{sig3_name}}</p>
        <p style="margin: 0; font-size: 11px;">{{sig3_degree}}</p>
      </div>
    </div>
  </div>
</div>`
  }
];


