# Deployment Guide

This document explains how to deploy changes to the mortgage application form.

---

## GitHub Pages Setup

**Repository:** jcz650/apply  
**Branch:** main  
**Live URL:** https://jcz650.github.io/apply/

**How it works:**
1. Push commits to `main` branch
2. GitHub Actions automatically deploys to GitHub Pages
3. Deployment takes ~60 seconds
4. Site updates at https://jcz650.github.io/apply/

---

## Cache-Busting Strategy

**Problem:** Browsers aggressively cache JavaScript files. Users may see old code even after deploying new versions.

**Solution:** Version query parameter in `index.html`:

```html
<script src="app.js?v=20260522c"></script>
```

The `?v=20260522c` parameter forces browsers to treat it as a new file when the version changes.

---

## Deployment Workflow

### 1. Make Code Changes

Edit `app.js` locally or via GitHub web interface.

### 2. Bump Cache Buster

Edit `index.html` and increment the version:

**Before:**
```html
<script src="app.js?v=20260522c"></script>
```

**After:**
```html
<script src="app.js?v=20260522d"></script>
```

**Version Format:**
- Date-based: `YYYYMMDD` + letter (a, b, c...)
- Example progression: `20260522a` → `20260522b` → `20260522c` → `20260523a`

### 3. Commit and Push

```bash
git add app.js index.html
git commit -m "Fix declaration button click issue"
git push origin main
```

Or use GitHub web interface:
1. Edit files
2. Write commit message
3. Click "Commit changes"

### 4. Wait for Deployment

- **Check status:** Go to https://github.com/jcz650/apply/actions
- **Typical time:** 30-90 seconds
- **Success indicator:** Green checkmark next to latest commit

### 5. Verify Changes

**Option A: Hard Refresh**
- **Windows/Linux:** Ctrl + Shift + R
- **Mac:** Cmd + Shift + R
- This bypasses cache and loads latest version

**Option B: Manual Version Parameter**
- Go to: `https://jcz650.github.io/apply/?v=20260522d`
- The `?v=` parameter matches what you set in `index.html`

### 6. Test Form

- Fill out with test data
- Submit and verify email arrives
- Check browser console (F12) for errors

---

## Common Deployment Scenarios

### Scenario 1: Bug Fix in JavaScript

**Files changed:** `app.js`

**Steps:**
1. Fix bug in `app.js`
2. Bump version in `index.html`: `?v=20260522c` → `?v=20260522d`
3. Commit both files with message: "Fix [bug description]"
4. Push
5. Wait 60 seconds
6. Hard refresh and test

### Scenario 2: Styling Change

**Files changed:** `index.html` (CSS in `<style>` block)

**Steps:**
1. Edit CSS in `index.html`
2. Commit with message: "Update button styling"
3. Push
4. Wait 60 seconds
5. Hard refresh (Ctrl/Cmd + Shift + R)

**Note:** No cache-buster bump needed for CSS-only changes, but a hard refresh is still required.

### Scenario 3: EmailJS Configuration Change

**Files changed:** `app.js` (credentials at top)

**Steps:**
1. Update credentials in `app.js`:
   ```javascript
   var EMAILJS_PUBLIC_KEY  = 'NEW_KEY_HERE';
   ```
2. Bump version in `index.html`: `?v=20260522d` → `?v=20260522e`
3. Commit both with message: "Update EmailJS public key"
4. Push
5. Wait 60 seconds
6. Hard refresh
7. **Test submission** to verify email sends

### Scenario 4: Multi-File Update

**Files changed:** `app.js`, `index.html`, `README.md`

**Steps:**
1. Make all changes
2. Bump cache buster in `index.html` (if `app.js` changed)
3. Commit all files together:
   ```bash
   git add .
   git commit -m "Add co-borrower support and update docs"
   git push
   ```
4. Wait 60 seconds
5. Hard refresh and test

---

## Rollback Procedure

If a deployment breaks the site:

### Option 1: Revert via GitHub Web

1. Go to https://github.com/jcz650/apply/commits/main
2. Find the last working commit (green checkmark, before the bad one)
3. Click the commit SHA (e.g., `1a600e2`)
4. Click the **`<>`** button in top-right ("Browse the repository at this point")
5. For each file that changed:
   - Click the file
   - Click "Raw" button
   - Copy the old content
   - Go back to main branch, edit the file, paste old content
   - Commit
6. Bump cache buster in `index.html`
7. Push

### Option 2: Revert via Git Command

```bash
git log  # Find the bad commit SHA
git revert <bad-commit-sha>
git push origin main
```

This creates a new commit that undoes the bad changes.

### Option 3: Hard Reset (Nuclear Option)

```bash
git reset --hard <last-good-commit-sha>
git push origin main --force
```

⚠️ **Warning:** Force-push rewrites history. Only use if other options fail.

---

## Troubleshooting

### Issue: Changes Not Appearing

**Cause:** Browser cache or GitHub Pages not deployed yet

**Fix:**
1. Check GitHub Actions: https://github.com/jcz650/apply/actions
   - Wait for green checkmark
2. Hard refresh (Ctrl/Cmd + Shift + R)
3. Clear browser cache:
   - Chrome: Settings → Privacy → Clear browsing data → Cached images and files
   - Firefox: Settings → Privacy → Clear Data → Cached Web Content
4. Try incognito/private window
5. Try different browser
6. Append `?v=YYYYMMDDX` to URL manually

### Issue: JavaScript Errors After Deploy

**Cause:** Syntax error in `app.js` or version mismatch

**Fix:**
1. Open DevTools (F12) → Console tab
2. Look for red errors (syntax errors, undefined variables, etc.)
3. Fix errors in `app.js`
4. Bump cache buster
5. Commit and push
6. If urgent, rollback to last working version first

### Issue: EmailJS Stopped Working

**Cause:** Credentials changed, quota exceeded, or service disconnected

**Fix:**
1. Check browser console for "401 Unauthorized" or "429 Too Many Requests"
2. Verify credentials in EmailJS dashboard match `app.js`
3. Check quota: https://dashboard.emailjs.com (top bar)
4. Check service connection: Email Services → service_9gmygbi → Verify Gmail connected
5. Test send from EmailJS dashboard: Templates → template_0q403z9 → Test

### Issue: GitHub Pages Not Deploying

**Cause:** Failed build, branch settings, or GitHub outage

**Fix:**
1. Check Actions tab for error logs
2. Verify Pages settings:
   - Go to Settings → Pages
   - Source should be "Deploy from a branch"
   - Branch should be `main` / `/(root)`
3. Check GitHub status: https://www.githubstatus.com
4. Re-trigger deploy: Make a trivial change (e.g., add comment to `app.js`), commit, push

---

## Cache-Buster Version History

| Version | Date | Changes |
|---------|------|----------|
| 20260522a | 2026-05-22 | Initial hard fix: const→var, window.*, type=button |
| 20260522b | 2026-05-22 | Fix button click: raw data-val, remove scroll overflow |
| 20260522c | 2026-05-22 | Wire EmailJS credentials (service, template, public key) |
| 20260522d | TBD | *Next version* |

**Naming convention:**
- Date: YYYYMMDD (year-month-day)
- Letter: a, b, c... (increment for each deploy that day)
- Next day: Reset letter to 'a' (e.g., `20260523a`)

---

## Best Practices

✅ **Always bump cache buster** when editing `app.js`  
✅ **Test locally first** if you have a dev environment  
✅ **Write clear commit messages** (future-you will thank you)  
✅ **Check Actions tab** after every push (catch failures early)  
✅ **Test on mobile** after major changes (responsive issues)  
✅ **Keep EmailJS keys secure** (never commit Private Key)  
✅ **Monitor email quota** (check dashboard weekly)  

❌ **Don't skip cache-buster bump** (users will see old code)  
❌ **Don't force-push** unless emergency (breaks team workflows)  
❌ **Don't commit sensitive data** (API keys, passwords, etc.)  
❌ **Don't deploy without testing** (test form submission every time)  

---

## Monitoring

**Site uptime:**
- Use a service like UptimeRobot or Pingdom to monitor https://jcz650.github.io/apply/
- Get alerts if site goes down

**Email deliverability:**
- Check EmailJS dashboard daily: https://dashboard.emailjs.com
- Email History tab shows all sends with status
- Set up alerts for failed sends

**User issues:**
- Ask users to report bugs via email or phone
- Check browser console logs if user reports issue
- Keep changelog of fixes in commit messages

---

## Contact

For deployment issues or questions:  
**Jack Chen**  
jack.chen@gmccloan.com  
929-523-5865
