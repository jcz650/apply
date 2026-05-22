# Mortgage Application Form

**Live Site:** https://jcz650.github.io/apply/

**Loan Officer:** Jack Chen, NMLS #2425956  
**Company:** General Mortgage Capital Corporation  
**Email:** jack.chen@gmccloan.com  
**Phone:** 929-523-5865

---

## Overview

Bilingual (English/中文) mortgage application form that collects borrower information and auto-sends completed applications via EmailJS. Generates MISMO 3.4 XML for Encompass import.

### Key Features

✅ **Bilingual Support** - Toggle between English and Chinese  
✅ **URLA Section 5 (Declarations)** - Full 1003-compliant questions with recursive sub-questions  
✅ **MISMO 3.4 XML Export** - Encompass-ready format included in email  
✅ **EmailJS Auto-Send** - Applications sent to jack.chen@gmccloan.com on submit  
✅ **Mobile-Optimized** - Responsive design, works on all devices  
✅ **No Backend Required** - Static site hosted on GitHub Pages

---

## Files

- **index.html** - Main HTML structure, styles, EmailJS SDK loader
- **app.js** - Application logic, form flow, EmailJS integration, MISMO XML generator
- **SETUP.md** - EmailJS configuration and deployment instructions
- **DEPLOYMENT.md** - Cache-busting strategy and troubleshooting

---

## Form Flow

1. **About You** - Borrower name, contact info
2. **Co-Borrower** - Optional co-borrower details
3. **Property** - Transaction type, occupancy, property type, address, loan amount
4. **Income** - Employment/self-employment details (with 2-year history validation)
5. **Declarations** - URLA Section 5 (Property & Funding + Financial History)
6. **Co-Borrower Declarations** - Same questions for co-borrower (if applicable)
7. **Attestation** - Borrower confirmation and consent
8. **Review** - Summary of all answers
9. **Done** - Auto-email sent to Jack with summary + MISMO XML

---

## EmailJS Configuration

**Current Setup (in app.js):**

```javascript
var EMAILJS_PUBLIC_KEY  = 'P0b76QpSqy7Hq_rMR';
var EMAILJS_SERVICE_ID  = 'service_9gmygbi';
var EMAILJS_TEMPLATE_ID = 'template_0q403z9';
var JACK_EMAIL = 'jack.chen@gmccloan.com';
```

**Email Template Variables:**
- `to_email` - Recipient (jack.chen@gmccloan.com)
- `subject` - "New Loan Application - [Borrower Name]"
- `borrower_name`, `borrower_email`, `borrower_phone`
- `transaction`, `loan_amount`, `property_address`
- `summary` - Plain text summary of all answers
- `mismo_xml` - Full MISMO 3.4 XML document
- `submitted_at` - Timestamp

**Service:** Gmail connected to service_9gmygbi  
**Quota:** 200 emails/month (free tier)  
**Important:** "Send email on your behalf" permission must be granted when connecting Gmail

---

## MISMO 3.4 XML Output

The `genMISMO()` function generates a complete URLA (Uniform Residential Loan Application) in MISMO 3.4 format, ready for Encompass import. Includes:

- Borrower & Co-Borrower parties with contact details
- Loan Originator info (Jack Chen, NMLS #2425956)
- All Section 5 Declarations (Property & Funding, Financial History)
- Property details (address, type, occupancy, estimated value)
- Loan details (amount, purpose, term)
- Employment history

---

## Declaration Logic (URLA Section 5)

### Property & Funding (DEC_PROPERTY)
- **occupyProperty** → Yes → **priorProperty** → Yes → **Two Dropdowns:**
  - `priorPropertyType`: Primary Residence / FHA Secondary Residence / Second Home / Investment Property
  - `titleHeld`: By Yourself / Jointly with Spouse / Jointly with Another Person
- **sellerRelationship** (purchase only)
- **borrowedFunds** → Yes → `borrowedAmount` (text input)
- **otherMortgage**, **newCredit**, **priorityLien** (standalone Yes/No)

### Financial History (DEC_FINANCIAL)
- **coSigner**, **judgments**, **federalDebt**, **lawsuit**, **deedInLieu**, **shortSale**, **foreclosure** (standalone Yes/No)
- **bankruptcy** → Yes → **Dropdown:**
  - `bankruptcyType`: Chapter 7 / Chapter 11 / Chapter 12 / Chapter 13 (single-select)

**Required Field Enforcement:** All visible questions (including triggered sub-questions) must be answered before Next button enables.

---

## Cache-Busting Strategy

The `index.html` file loads `app.js` with a version query parameter:

```html
<script src="app.js?v=20260522c"></script>
```

**After any code change:**
1. Bump the version string (e.g., `?v=20260522d`)
2. Commit and push
3. Wait ~60 seconds for GitHub Pages to redeploy
4. Hard refresh browser (Cmd/Ctrl+Shift+R) or manually append `?v=20260522d` to URL

---

## Development Notes

### Working Patterns (DO NOT CHANGE)

**Yes/No button generation:**
```javascript
h+='<button type="button" class="dec-btn'+ysel+'" data-sv="'+sv+'" data-did="'+did+'" data-val="'+yL+'" onclick="window.handleDec(this)">'+yL+'</button>';
```
⚠️ **Critical:** `data-val` uses RAW `yL` (not `esc()`) — must match trigger comparisons exactly.

**Dropdown sub-questions:**
```javascript
if(sub.type==='dropdown'){
  r+='<div style="..."><div class="sub-label">'+sub.q+'</div><select class="dur-select" data-sv="'+sv+'" data-did="'+sid+'" onchange="window.handleDecDropdown(this)"><option value="">'+selectPrompt+'</option>';
  for(var oi=0;oi<sub.opts.length;oi++){
    var opt=sub.opts[oi];
    r+='<option value="'+esc(opt)+'"'+(store[sid]===opt?' selected':'')+'>'+esc(opt)+'</option>';
  }
  r+='</select></div>';
}
```

**Required-field enforcement:**  
`allDecAnswered()` walks the trigger tree recursively. Next button stays disabled until all visible questions (including triggered subs) are answered.

### Known Constraints

- **No backend** - Static GitHub Pages site, no server-side logic
- **AdobeSign NOT implemented** - Requires server to hold OAuth secrets. Workaround: auto-email Jack → he manually sends via DocuSign
- **Credit card fields deliberately left blank** - PCI compliance — never store CC data in web forms
- **Browser cache** - Users must hard-refresh after deploys to get latest code

---

## Testing Checklist

- [ ] Form loads at https://jcz650.github.io/apply/
- [ ] Language toggle works (EN ↔ ZH)
- [ ] All form steps advance correctly
- [ ] Declarations show sub-questions when triggered
- [ ] Next button disabled until all visible fields answered
- [ ] Review screen shows all answers
- [ ] Submit → "Application Submitted!" screen appears
- [ ] Email arrives at jack.chen@gmccloan.com within 30 seconds
- [ ] Email contains both summary and MISMO XML

---

## Troubleshooting

**Email not sending:**
1. Check browser console (F12) for errors
2. Verify EmailJS service `service_9gmygbi` has "Send email on your behalf" permission granted
3. Confirm monthly quota (200 emails) not exceeded
4. Test EmailJS credentials at https://dashboard.emailjs.com/admin/templates

**Form not loading:**
1. Hard refresh (Cmd/Ctrl+Shift+R)
2. Manually append `?v=20260522c` to URL
3. Check GitHub Actions for failed deployments

**Buttons not clickable:**
1. Check browser console for JS errors
2. Verify `app.js` loaded (Network tab in DevTools)
3. Clear cache and hard refresh

---

## Security Notes

⚠️ **NEVER expose the EmailJS Private Key** - Only the Public Key should be in code  
⚠️ **Rotate keys if accidentally exposed** - EmailJS → Account → General → Refresh Keys  
⚠️ **No sensitive data in URLs** - Never pass SSN, credit card numbers, or passwords as query parameters

---

## Future Enhancements (Not Implemented)

- Server-side PDF generation
- DocuSign/AdobeSign API integration
- Backend for secure credential storage
- Application status tracking dashboard
- Document upload functionality
- Credit check integration

---

## License

Proprietary - Jack Chen / General Mortgage Capital Corporation
