# Changelog

All notable changes to the mortgage application form.

---

## [2026-05-22] - EmailJS Integration Complete ✅

### Added
- EmailJS auto-send on form submission
- Service ID: `service_9gmygbi`
- Template ID: `template_0q403z9`
- Public Key: `P0b76QpSqy7Hq_rMR`
- Email includes full summary + MISMO 3.4 XML
- Status indicator on done screen ("✓ Sent to Jack successfully" or error)

### Changed
- Done screen simplified: removed Text/Email/Copy buttons
- Now shows single status message with auto-send result

### Fixed
- Email sends automatically 500ms after reaching done screen
- Proper error handling for EmailJS SDK failures
- Console warnings for missing SDK or invalid config

### Tested
- ✅ Form submission with test data
- ✅ Email arrival at jack.chen@gmccloan.com
- ✅ Summary and MISMO XML both present in email body
- ✅ Status message updates correctly on success/failure

---

## [2026-05-22] - Declaration Sub-Questions as Dropdowns

### Changed
- `priorPropertyType`: Now a dropdown (was multi-choice pills)
  - Options: Primary Residence, FHA Secondary Residence, Second Home, Investment Property
- `titleHeld`: Now a dropdown (was multi-choice pills)
  - Options: By Yourself, Jointly with Spouse, Jointly with Another Person
- `bankruptcyType`: Now a **single-select** dropdown (was multi-check)
  - Options: Chapter 7, Chapter 11, Chapter 12, Chapter 13

### Added
- Required-field enforcement: Next button disabled until all visible questions answered
- Recursive sub-question validation (walks trigger tree to check nested questions)
- `handleDecDropdown()` handler for dropdown change events
- `updateDecNextButton()` to enable/disable Next without full re-render

### Fixed
- Sub-questions now render as proper form controls (dropdowns) instead of pill buttons
- Next button correctly enables only when all required fields (including nested subs) are filled

---

## [2026-05-22] - Yes/No Button Click Issues RESOLVED

### Fixed
- Declaration Yes/No buttons now clickable on all devices
- Root cause: Multiple compounding issues
  1. `const`/`let` scoping prevented `onclick` from finding `handleDec` globally → Changed to `var` + explicit `window.*` assignments
  2. Inline `onclick` HTML attribute quoting bugs → Switched to `data-*` attributes
  3. HTML entity encoding mismatches (e.g., `&#x662F;` stored but raw `是` compared) → Use raw `yL`/`nL` values in `data-val`, no `esc()`
  4. CSS `overflow-y:auto` on scroll container eating touch events → Removed scroll container, let card scroll naturally
  5. Browser cache serving stale JS → Implemented cache-busting with `?v=YYYYMMDDX` version parameter

### Changed
- Button HTML structure:
  ```javascript
  h+='<button type="button" class="dec-btn'+ysel+'" data-sv="'+sv+'" data-did="'+did+'" data-val="'+yL+'" onclick="window.handleDec(this)">'+yL+'</button>';
  ```
- Handler function:
  ```javascript
  window.handleDec = function(btn){
    var sv = btn.getAttribute('data-sv');
    var id = btn.getAttribute('data-did');
    var val = btn.getAttribute('data-val');
    if (!sv || !id || val === null) return;
    if (!window[sv]) window[sv] = {};
    window[sv][id] = val;
    if (sv === 'dec') dec = window.dec;
    if (sv === 'coDec') coDec = window.coDec;
    render();
  };
  ```

### Added
- Cache-busting strategy: `app.js?v=20260522c` in `index.html`
- Explicit `window.*` exports for all global functions
- `type="button"` on all buttons to prevent form submission behavior

---

## [2026-05-21] - Declaration Questions & Recursive Triggers

### Added
- Full URLA Section 5 (Declarations) for borrower and co-borrower
- Two categories:
  - Property & Funding (DEC_PROPERTY)
  - Financial History (DEC_FINANCIAL)
- Recursive trigger logic:
  - `occupyProperty` → Yes → `priorProperty` → Yes → `priorPropertyType` + `titleHeld`
  - `borrowedFunds` → Yes → `borrowedAmount`
  - `bankruptcy` → Yes → `bankruptcyType`
- Bilingual support for all declaration questions (EN/ZH)
- `purchaseOnly` flag for questions that only apply to purchase transactions

### Changed
- Declaration rendering: Questions display as rows with Yes/No buttons
- Sub-questions indent and show only when parent triggers them
- MISMO 3.4 XML export includes all declaration answers

---

## [2026-05-20] - MISMO 3.4 XML Generator

### Added
- `genMISMO()` function generates full URLA XML for Encompass import
- Includes:
  - Borrower & Co-Borrower parties with contact details
  - Loan Originator (Jack Chen, NMLS #2425956)
  - All Section 5 Declarations (Y/N/amounts)
  - Property details (address, type, occupancy, value)
  - Loan details (amount, purpose, term)
  - Employment history
- XML validation against MISMO 3.4 schema

### Changed
- Review screen now shows both summary and XML in done screen
- XML copied to clipboard on "Copy" button click

---

## [2026-05-19] - Co-Borrower Support & Income Details

### Added
- Co-borrower optional flow
- Co-borrower income questions (W2/Self-Employed/Other)
- Previous employer logic: If current employment <2 years, ask for previous employer
- Employment duration selector (Years + Months dropdowns)
- FHA Secondary Residence option in occupancy field

### Changed
- Dynamic step generation based on co-borrower presence
- Income section adapts to borrower and co-borrower individually

---

## [2026-05-18] - Bilingual Support (EN/ZH)

### Added
- Language toggle button (English ↔ 中文)
- Full Chinese translations for all questions and UI text
- Bilingual answer storage with automatic translation on language switch
- Translation maps (MAP_EN_ZH, MAP_ZH_EN) for consistent answer mapping

### Changed
- All UI strings moved to `LANG` object with `en` and `zh` keys
- Form answers translate on-the-fly when user toggles language

---

## [2026-05-17] - LTV Calculator & Property Details

### Added
- Loan-to-Value (LTV) calculator with bidirectional sync
  - User can enter loan amount → LTV auto-calculates
  - User can enter LTV% → loan amount auto-calculates
- Property details dropdowns:
  - Occupancy: Primary Residence, Second Home, Investment Property
  - Property Type: Single Family, 2-Family, 3-Family, 4-Family, Condo/Townhouse, PUD, Co-op
- Transaction type selection: Purchase vs Refinance
- Conditional fields:
  - Purchase → asks for purchase price
  - Refinance → asks for appraised value

### Changed
- Property address field now has subtitle: "If you don't have one yet, enter the city & state you're looking in."

---

## [2026-05-16] - Initial Multi-Step Form

### Added
- Multi-step form flow with progress bar
- Step sections:
  - About You (name, email, phone)
  - Property (address, loan amount)
  - Income (employer, position, duration)
  - Review (summary of all answers)
  - Done (confirmation screen)
- Navigation: Next/Back buttons
- Required field validation
- Mobile-responsive design
- Custom fonts (Newsreader from Google Fonts)
- Warm gradient background (#fef7ed → #fdebd4 → #fce0c2)
- Jack Chen branding (JC logo, NMLS #2425956)

### Design
- Clean, minimal card-based layout
- Warm earth tones (browns, tans, oranges)
- Professional typography with serif font
- Hover states and transitions on interactive elements
- Touch-friendly button sizes (min 44x44px)

---

## Project Info

**Repository:** jcz650/apply  
**Branch:** main  
**Live URL:** https://jcz650.github.io/apply/  
**Loan Officer:** Jack Chen, NMLS #2425956  
**Company:** General Mortgage Capital Corporation  
**Contact:** jack.chen@gmccloan.com | 929-523-5865
