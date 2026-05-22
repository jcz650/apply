# EmailJS Setup Guide

This document explains how the EmailJS integration works and how to modify it.

---

## Current Configuration

**Service ID:** `service_9gmygbi`  
**Template ID:** `template_0q403z9`  
**Public Key:** `P0b76QpSqy7Hq_rMR`  
**Recipient:** `jack.chen@gmccloan.com`

**Gmail Connected:** service_9gmygbi uses Gmail to send emails  
**Monthly Quota:** 200 emails (EmailJS free tier)

---

## How It Works

1. User fills out form at https://jcz650.github.io/apply/
2. User clicks Submit → reaches "Application Submitted!" screen
3. After 500ms, `sendEmail()` function fires automatically
4. EmailJS SDK sends email to jack.chen@gmccloan.com using template_0q403z9
5. Template receives variables: borrower info, summary, MISMO XML, timestamp
6. Email arrives in Jack's inbox within ~10-30 seconds
7. Done screen shows "✓ Sent to Jack successfully" (or error message if failed)

---

## Email Template Variables

The template `template_0q403z9` receives these variables:

```javascript
{
  to_email: 'jack.chen@gmccloan.com',
  subject: 'New Loan Application - [Borrower First] [Borrower Last]',
  borrower_name: '[First Last]',
  borrower_email: 'user@example.com',
  borrower_phone: '555-1234',
  transaction: 'Purchase' or 'Refinance',
  loan_amount: '500000',
  property_address: '123 Main St, City, State ZIP',
  summary: '=== LOAN APPLICATION SUMMARY ===\n--- About You ---\n...',
  mismo_xml: '<?xml version="1.0"?>\n<MESSAGE>...</MESSAGE>',
  submitted_at: '5/22/2026, 3:30:00 AM'
}
```

### Template Format Example

```
Subject: {{subject}}

New loan application submitted:

BORROWER: {{borrower_name}}
EMAIL: {{borrower_email}}
PHONE: {{borrower_phone}}
TRANSACTION: {{transaction}}
LOAN AMOUNT: ${{loan_amount}}
PROPERTY: {{property_address}}

SUBMITTED AT: {{submitted_at}}

---

{{summary}}

---

MISMO 3.4 XML (for Encompass):

{{mismo_xml}}
```

---

## Changing the Recipient Email

To send to a different email address:

1. Open `app.js`
2. Find the line:
   ```javascript
   var JACK_EMAIL = 'jack.chen@gmccloan.com';
   ```
3. Change to new email:
   ```javascript
   var JACK_EMAIL = 'newemail@example.com';
   ```
4. Commit and push to GitHub
5. Bump cache buster in `index.html` (e.g., `?v=20260522d`)
6. Wait 60 seconds for GitHub Pages to redeploy
7. Hard refresh browser

---

## Switching Gmail Accounts

**Current:** service_9gmygbi connected to personal Gmail (650nyc@gmail.com)  
**To switch to company Gmail (jack.chen@gmccloan.com):**

1. Go to https://dashboard.emailjs.com/admin
2. Click **Email Services** in left sidebar
3. Click on `service_9gmygbi`
4. Click **Disconnect** next to current Gmail
5. Click **Connect** and sign in with jack.chen@gmccloan.com
6. **CRITICAL:** On Google's permission screen, check the box for **"Send email on your behalf"**
   - Without this permission, sends will fail with "412 Gmail_API: insufficient authentication scopes"
7. Click Allow
8. Service is now connected to company Gmail

**No code change needed** — Service ID stays the same.

---

## Creating a New Template

If you need a different email format:

1. Go to https://dashboard.emailjs.com/admin/templates
2. Click **Create New Template**
3. Design template using variables like `{{borrower_name}}`, `{{summary}}`, etc.
4. Save and copy the Template ID (e.g., `template_xyz123`)
5. Update `app.js`:
   ```javascript
   var EMAILJS_TEMPLATE_ID = 'template_xyz123';
   ```
6. Commit, push, bump cache buster, redeploy

---

## Rotating API Keys (Security)

**When to rotate:**
- Private Key was accidentally exposed (screenshot, screen-share, code commit)
- Suspicious activity in EmailJS dashboard
- Regular security maintenance (every 6-12 months)

**How to rotate:**

1. Go to https://dashboard.emailjs.com/admin/account
2. Click **General** tab
3. Scroll to **API Keys** section
4. Click **Refresh Keys** button
5. Confirm — this generates NEW Public Key and NEW Private Key
6. Copy the NEW Public Key (NOT the private one)
7. Update `app.js`:
   ```javascript
   var EMAILJS_PUBLIC_KEY = 'NEW_PUBLIC_KEY_HERE';
   ```
8. Commit, push, bump cache buster, redeploy

⚠️ **Never commit the Private Key to GitHub** — it's only used for server-side requests (not needed for browser-based apps).

---

## Monitoring Usage

**Check quota:**
1. Go to https://dashboard.emailjs.com
2. Top bar shows "X requests left" out of 200/month
3. Resets on the date shown below (e.g., "Resets on Jun 22")

**View sent emails:**
1. Click **Email History** in left sidebar
2. Shows all sent emails with status (Success / Failed)
3. Click on an email to see details and error logs

---

## Troubleshooting

### Email Not Arriving

**Check 1:** Browser console errors
- Open DevTools (F12) → Console tab
- Submit form again
- Look for red errors starting with "EmailJS send failed"

**Check 2:** EmailJS service permissions
- Go to Email Services → service_9gmygbi
- Verify Gmail is connected
- Reconnect and ensure "Send email on your behalf" is checked

**Check 3:** Monthly quota
- Dashboard shows "0 requests left" → wait until next month or upgrade plan

**Check 4:** Spam folder
- Check jack.chen@gmccloan.com spam/junk folder
- Mark as "Not Spam" if found

### "412 Gmail_API" Error

**Cause:** Gmail doesn't have "Send email on your behalf" permission

**Fix:**
1. Disconnect Gmail from service_9gmygbi
2. Reconnect and CHECK the "Send email on your behalf" box when Google prompts
3. Test form submission again

### "Unauthorized" or "403" Error

**Cause:** Invalid Public Key or Service ID

**Fix:**
1. Verify credentials in EmailJS dashboard
2. Copy exact values:
   - Account → General → Public Key
   - Email Services → Click service → Copy Service ID
   - Email Templates → Click template → Copy Template ID
3. Update `app.js` with correct values
4. Commit, push, bump cache buster, redeploy

---

## Code Reference

**Email send function (in app.js):**

```javascript
function sendEmail(){
  if(emailSent)return;
  if(EMAILJS_PUBLIC_KEY==='YOUR_PUBLIC_KEY'){
    var el=document.getElementById('email-status');
    if(el){el.textContent='Email service not configured';
    el.className='status-msg err';}
    return;
  }
  if(typeof emailjs==='undefined'){
    console.warn('EmailJS SDK not loaded');
    return;
  }
  try{emailjs.init(EMAILJS_PUBLIC_KEY);}catch(e){console.warn('emailjs.init failed',e);}
  emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,{
    to_email:JACK_EMAIL,
    subject:'New Loan Application - '+(answers.borrowerFirst||'')+' '+(answers.borrowerLast||''),
    borrower_name:(answers.borrowerFirst||'')+' '+(answers.borrowerLast||''),
    borrower_email:answers.email||'',
    borrower_phone:answers.phone||'',
    transaction:answers.transaction||'',
    loan_amount:answers.loanAmount||'',
    property_address:answers.address||'',
    summary:genSummary(),
    mismo_xml:genMISMO(),
    submitted_at:new Date().toLocaleString()
  }).then(function(){
    emailSent=true;
    var el=document.getElementById('email-status');
    if(el){el.textContent=LANG[lang].sentToJack;el.className='status-msg ok';}
  }).catch(function(err){
    console.error('EmailJS send failed',err);
    var el=document.getElementById('email-status');
    if(el){el.textContent=LANG[lang].sendFailed;el.className='status-msg err';}
  });
}
```

**Trigger:** Called 500ms after reaching done screen

```javascript
if(phase==='done'){
  document.body.style.justifyContent='center';
  setTimeout(sendEmail,500);  // <-- Auto-fires here
  // ... render done screen HTML ...
}
```

---

## Testing

**Test email send:**
1. Go to https://jcz650.github.io/apply/
2. Fill form with test data (use your own email for borrower email)
3. Submit
4. Done screen should show "Sending..." then "✓ Sent to Jack successfully"
5. Check jack.chen@gmccloan.com inbox within 30 seconds
6. Email should contain summary + MISMO XML

**Test error handling:**
1. Temporarily change Public Key in `app.js` to `'INVALID_KEY'`
2. Submit form
3. Done screen should show error message
4. Restore correct Public Key

---

## Upgrading EmailJS Plan

If 200 emails/month isn't enough:

1. Go to https://dashboard.emailjs.com/admin/account
2. Click **Subscription** tab
3. Choose a paid plan (starts at $8/month for 1,000 emails)
4. No code changes needed after upgrading

---

## Support

EmailJS Documentation: https://www.emailjs.com/docs/  
EmailJS Support: support@emailjs.com
