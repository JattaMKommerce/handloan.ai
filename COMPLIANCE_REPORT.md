# HandLoan.ai — Compliance Report

**Date:** 5 November 2026 (updated the same day: lending partners added)
**Site:** handloan.ai (built from `frontend/`, deployed to Hostinger)
**Operator:** Jatta M Kommerce Private Limited · CIN U58200MH2024PTC428411
**Position on the site:** HandLoan.ai is a loan facilitation platform, **not a lender**. Loans are offered by the **lending partners** listed on the Lending Partners page. Enquiries are shared with a partner only after the customer is told which lender and consents.

> **Change of position, 5 November 2026.** The first version of this report described a site with *no active lending partner*. Management then confirmed 10 lending partners, and the whole site was switched to list them. The no-partner version is saved as the git stash `no-partner-version` and can be restored with `git stash apply` if needed.

---

## 1. Lending partners shown on the site

They appear in a logo strip on Home and the Lending Partners page that moves left to right and pauses on hover; visitors who turn off animations see a still grid. There is also a table on the Lending Partners page. The config is `frontend/src/config/site.js` → `lendingPartners`.

| # | Partner (as shown) | Registered name | Type | Logo source |
|---|---|---|---|---|
| 1 | GROx (formerly MyShubhLife) | *needed from agreement* | Digital lending platform | myshubhlife.com (the site now says "GROx, formerly MyShubhLife") |
| 2 | FlexiLoans | *needed from agreement* | Digital lending platform | flexiloans.com |
| 3 | Fibe | *needed from agreement* | Digital lending platform | fibe.in |
| 4 | Zype | *needed from agreement* | Digital lending app of Respo Financial Capital | getzype.com |
| 5 | Respo Financial Capital | Respo Financial Capital Private Limited | NBFC | respo.co.in |
| 6 | L&T Finance | L&T Finance Limited | NBFC | ltfinance.com |
| 7 | Aditya Birla Capital (formerly Aditya Birla Finance) | Aditya Birla Capital Limited | NBFC | adityabirlacapital.com |
| 8 | Bajaj Finance (Bajaj Finserv) | Bajaj Finance Limited | NBFC | bajajfinserv.in (current logo, Nov 2026) |
| 9 | DMI Finance | DMI Finance Private Limited | NBFC | dmifinance.in (logo updated May 2026) |
| 10 | Karnataka Bank | Karnataka Bank Limited | Bank | karnatakabank.bank.in |

From the old website's six logos, **ONDC and EasyPay were not added**: ONDC is a network and EasyPay is a payments company, so neither is a lender.

### ⚠ Required before running ads

1. **Proof of each partnership.** I found no agreements in the company files. The old website showed only logos. Meta and RBI can ask for the agreement with each partner, and each lender must list HandLoan.ai / Jatta M Kommerce on **its own website's list of LSPs / partner platforms** (an RBI requirement). Check each of the 10 lenders' lists. Any partner that doesn't list HandLoan.ai should be removed: set `verified: false` in `site.js` and rebuild.
2. **RBI registration numbers** for all 10 partners are empty in `site.js` (`rbiReg`). The table shows "Verify on rbi.org.in" until they are filled. Copy them from the agreements or RBI certificates, never from memory.
3. **Registered company names** for GROx, FlexiLoans, Fibe and Zype. These are app brands, and the lending entity behind each must come from the agreement.
4. **Logo permission.** Most lenders require written permission to show their logo. The page notes that "Logos and names belong to their respective owners".

The build prints items 2 and 3 as reminders on every run.

---

## 2. Final check (automated)

70 content checks across all 14 built pages, plus 16 end-to-end form tests: **all passed**.

| Requirement | Result | Where |
|---|---|---|
| `[TODO: …]` placeholders | ✅ **0** | Build prints "No TODO placeholders found" |
| CIN U58200MH2024PTC428411 | ✅ Present | Footer (all 14 pages), About, Privacy, Terms, Contact, Disclaimer, Refund |
| Grievance Officer **Amit** + **help@handloan.ai** (single customer email; no grievance@ address anywhere) | ✅ Present | Footer (all 14 pages), Grievance, Privacy, Terms, Refund, Disclaimer, Contact |
| Mumbai registered address + Bangalore REGUS operating office | ✅ Present | Footer (all 14 pages) and About, Contact, policies |
| Support hours (Mon–Sat, 9:30 AM – 6:30 PM IST) | ✅ Present | Footer (all 14 pages), Contact, Grievance, policies |
| Logo strip: 10 logos with alt text, all files in build | ✅ Pass | Home, Lending Partners. Direction checked: moves left to right |
| Partner table lists all 10 | ✅ Pass | Lending Partners |
| Old "no active lending partner" wording | ✅ None left | All pages, titles, descriptions, chatbot file, form emails |
| "Not a lender" + "Loans are offered by the lending partners listed…" | ✅ Present | All 14 pages (footer) |
| Enquiry form: 4 consent boxes, first 3 mandatory, **none pre-ticked** | ✅ Pass | Home, Services, Contact. Blocked in the browser **and** on the server |
| Sharing with a lender only after naming the lender + consent | ✅ Present | Consent box 3, form note, Privacy, Terms, FAQ, Lending Partners |
| Form asks no PAN / Aadhaar / bank / documents / OTP | ✅ Pass | No such fields on any page |
| Age **21 to 58**, income **₹15,000** | ✅ Pass | Home, Services, FAQ, Terms, Privacy, Contact. No "18+" or "21–60" |
| Banned words (Instant, Guaranteed, 5-min, No CIBIL, Lowest, Quick Cash, Approved in minutes, 100% Approval, Hubli, QvikLoan) | ✅ None | All pages, titles and descriptions |
| ONDC / EasyPay claims | ✅ None | All pages |
| Effective date 5 November 2026 | ✅ Present | Privacy, Terms, Disclaimer, Refund |
| 404 returns HTTP 404 | ✅ Configured — **verify after deploy** | `public/.htaccess` |
| Sitemap excludes 404 page | ✅ Pass | 13 content pages; 404 page is `noindex` |
| No Meta Pixel / Google Analytics / API secrets in browser code | ✅ Pass | All shipped HTML and JS |
| Fraud warning in every footer | ✅ Present | "Never pay anyone an upfront fee and never share your OTP…" |
| Tenure 6–60 months, no payday loans; EMI calculator browser-only | ✅ Kept | |

**Form tests (16/16):**
- Any missing required consent, a bad mobile number, an out-of-range amount, a GET request or a foreign website is rejected with no email sent.
- Bots get a fake "success" and no email is sent.
- Enquiries go to **help@handloan.ai**. Grievances also go to **help@handloan.ai**, with "[Grievance]" in the subject.
- Every email carries the exact consent wording with a [YES]/[NO] for each box. Enquiry emails also remind staff to share only with a listed partner after the customer consents.

---

## 3. Judgement calls (please review)

1. **Logos used "as updated".** MyShubhLife's website now shows **GROx**, Aditya Birla Finance is now **Aditya Birla Capital**, and Bajaj Finserv's website now shows the **Bajaj Finance** mark. The labels keep the names you know, e.g. "GROx (formerly MyShubhLife)".
2. **Bajaj and Zype logos** are white-only in their official versions, so they sit on navy tiles. Respo's site ships a white SVG but shows the logo in black, so the black version is used.
3. **Zype and Respo** are the same lender (Zype is Respo's app). Both are shown, as you asked.
4. **Consent box 3** now reads: "HandLoan.ai will share my details only with a lending partner listed on its Lending Partners page, and only after telling me which lender and taking my consent." Your form never shares automatically, which keeps the privacy position strong.
5. **"QvikLoan"** is not on the site, to avoid brand confusion with Meta.
6. **Privacy mentions Meta Pixel / Google Analytics "with your consent"**, but neither is installed. Add a cookie-consent banner before installing either.
7. **Chatbot key** in the iamkratu URL is a public widget ID, not a secret.

---

## 4. Things only you can do

1. **Partner proof, RBI numbers and registered names** (see §1).
2. **Hostinger → Emails:** create `no-reply@handloan.ai` (the form sender). All customer email, complaints included, goes to `help@handloan.ai`, so the Grievance Officer (Amit) must read that mailbox. Watch for subjects starting "[Grievance]". Do not use amit.qvikloan@gmail.com.
3. **SPF:** one TXT record allowing Hostinger and GoDaddy, e.g. `v=spf1 include:_spf.mail.hostinger.com include:secureserver.net ~all`. Confirm the exact includes with each provider.
4. **Deploy** `frontend/dist/` (`npm run package`), then check:
   - `curl -I` on `/404.html` and on a made-up URL → both **404**
   - Send one test enquiry and one grievance, and confirm they arrive
   - Open the chat on desktop and on a phone
5. **Chatbot:** upload the new `frontend/chatbot-training.txt` to iamkratu.ai. It now lists the partners.
6. **jattamkommerce.com** must be live (linked from About).
7. **Ads:** copy must match the site, meaning "not a lender" and "loans from our lending partners". No approval or speed promises. Only name a partner in an ad if you have that partner's permission.

---

## READY FOR META FINANCIAL SERVICES AUTHORIZATION — once §1 and §4 are done

Meta makes the final decision; nothing on our side can guarantee approval.

**User must upload:**
1. CIN certificate
2. Company PAN
3. Domain verification for handloan.ai
4. Website URL
5. Proof of the lending relationships shown on the site: the agreements, or each lender's public LSP / partner list naming HandLoan.ai or Jatta M Kommerce. This replaces the earlier "no active lending partner" declaration, which is no longer true for this version of the site.
