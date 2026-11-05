# HandLoan.ai: website compliance, trust and Meta-ads readiness audit

**Date:** 4 November 2026 · **Scope:** this repository (`frontend/`) and the live site https://handloan.ai/
**Status labels:** **PASS**: implemented and verified · **BUSINESS INPUT**: needs genuine company or lender information · **LEGAL REVIEW**: needs a qualified Indian financial-services or data-protection lawyer

> Completing the code changes does **not** make the business compliant and does **not** guarantee Meta ad approval. This report separates what the website now does from what the business and its lawyers still have to confirm.

---

## 1. Initial audit

### 1.1 Architecture

| Item | Finding |
|---|---|
| Frontend | React 19 + Vite 8. All 14 pages are pre-rendered to static HTML at build time (`scripts/prerender.mjs`), so crawlers and ad reviewers see full content without JavaScript. |
| Backend | No database and no login. One PHP endpoint, `public/api/contact.php`, which emails contact-form enquiries to help@handloan.ai. |
| Hosting | Apache on Hostinger. `public/.htaccess` forces HTTPS, sets security headers, redirects the old URLs (`about.html`, `t&c.html`, …) and blocks `.apk` downloads. |
| Forms | One contact form (name, mobile, email, topic, message, consent). It collects no financial or identity data. |
| Loan application / eligibility flow | **Not on the website.** Applications happen in the HandLoan.ai mobile app, which was not available for this audit. |
| AI | The website has an AI chat assistant: iamkratu.ai's hosted chat page in an iframe (`src/components/Assistant.jsx`), opened by tapping the video assistant. HandLoan.ai controls only the wrapper; the bot's answers are configured in iamkratu. |
| Third parties loaded | iamkratu.ai (chat iframe), Google Fonts, WhatsApp links. No analytics or advertising pixels. |

### 1.2 Live site (old version, still at https://handloan.ai)

The new site is **not deployed yet**. Meta reviews the live URL, so these old-site issues still apply until the new build is uploaded.

| # | Old-site issue | New site |
|---|---|---|
| 1 | Logo tagline "GET LOAN IN 10 MINUTES"; hero "Loan Offers in Minutes! Not Days"; "Instant approval"; "approval in minutes" | Removed. The logo was cropped; no speed claims remain. |
| 2 | "Join thousands of satisfied customers", "bank-level security", "zero hidden charges" (unsubstantiated) | Removed |
| 3 | Logos of Aditya Birla Finance, DMI Finance, Bajaj Finserv, Karnataka Bank, ONDC and EasyPay without a stated relationship | Removed. Lenders are shown only once verified (section 3). |
| 4 | Direct Android **APK downloads** (v2.1.4 / v2.0.8) behind a lead form | Removed; `.htaccess` blocks `.apk` files |
| 5 | "CIBIL Check" service, "Last updated Dec 15, 2023"; "Easy Pay" text from another brand | Removed |
| 6 | No RBI-regulated lender names, no grievance officer, no APR or fee disclosure | Added structure; details pending (sections 8–9) |
| 7 | Phone mismatch (+91 99866 09400 vs 07600); Hubballi vs Mumbai addresses | One number (07600) and one registered office (Mumbai) everywhere |
| 8 | Non-working "Ask me anything" widget and an `href="#"` apply button | Replaced by a working chat; all links checked |
| 9 | Live site embeds a different iamkratu chat key (`6204d045…`) | New site uses key `6fb4b16f…` |

### 1.3 Codebase issues found and fixed in this pass

| # | Issue | Fix | Status |
|---|---|---|---|
| A | Interest rates (10.5–16%, 12–18%) and decision times (24–48 h, 2–3 days) shown although not verified against lender terms | Hidden behind `products.verified`; pages now say "Set by the lender, shown in the KFS" | PASS |
| B | Representative example used an assumed 2% processing fee to calculate a 16.43% APR | Shows a plain illustrative EMI (no fee, no APR), labelled "not a loan offer", until a real KFS example is entered | PASS |
| C | Placeholder lenders displayed as "[TODO: Lender 1]" rows | Only `verified: true` lenders appear; otherwise a clear "being verified" notice | PASS |
| D | "24×7 digital journey", "Apply at any hour", "100% digital", "Quick lender decisions" | Softened to verifiable wording | PASS |
| E | Hero did not position the platform as a facilitator | New hero: "Explore loan options through our lending partners", with lender-decides wording | PASS |
| F | Not-a-lender notice lacked "not a bank or NBFC" and "applications may be declined" | Added (notice and footer) | PASS |
| G | Chat panel had no AI disclosure or human escalation once the header was removed | One-line AI notice plus WhatsApp and Call links under the chat | PASS |
| H | Bot quoted unverified rates and timelines and did not introduce itself as AI | `chatbot-training.txt` updated; **must be re-uploaded to iamkratu** | BUSINESS INPUT |
| I | `contact.php` printed PHP warnings (server path) into the response when mail failed | Errors are logged, never displayed; clean JSON error | PASS |
| J | Unknown URLs caused a React hydration error (#418) when the server returned another page | Each page is tagged with its route; the app re-renders safely on a mismatch | PASS |
| K | `src/config/site.js` had been overwritten by an older copy (old script chat, old key) | Restored from Git; reverted copy backed up | PASS |

### 1.4 Inconsistencies to keep aligned (website, app, ads, Facebook Page, Meta Business)

- **Legal name:** "Jatta M Kommerce Private Limited" (used here). The old site also shows "JATTA M KOMMERCE PVT LTD", and the old iamkratu chat showed "JattaMKommerce". Use one form everywhere.
- **Brand:** "HandLoan.ai" (site) vs "handloan.ai" (iamkratu chat header) vs "Handloan.ai" (old site). Pick one.
- **Address:** Mumbai registered office (CIN U58200MH2024PTC428411). The Hubballi office was removed at the owner's request; make sure Meta Business and Google listings match.

---

## 2. Compliance checklist

| Area | Requirement | Status |
|---|---|---|
| Claims | No guaranteed, instant, "in minutes", 100%, lowest-rate, pre-approved or no-rejection claims anywhere on the site | **PASS** (scanned all source and built pages) |
| Claims | No fake testimonials, customer counts, statistics or trust badges | **PASS** |
| Claims | "RBI-regulated lenders", "no fee from HandLoan.ai", "data stored in India", "built on ONDC" | **BUSINESS INPUT**: true only if the business's lender arrangements, app and hosting match |
| Identity | Legal name, CIN, registered office, email and phone visible (footer, About, Contact) | **PASS** |
| Identity | Business hours | **BUSINESS INPUT** (`site.contact.hours`) |
| Lenders | Lending Partners page separating platform/LSP, lender and technology partners | **PASS** |
| Lenders | Verified lender list with registered name, brand, Bank/NBFC, RBI registration, website, role and products | **BUSINESS INPUT** (`lendingPartners`) |
| Products | Amount, tenure, repayment frequency, late-payment, foreclosure, eligibility, documents, responsible lender | **PASS** |
| Products | Interest-rate range, processing fee, decision timeline, KFS-based APR example | **BUSINESS INPUT** (`products.verified`, `representativeExample.verified`) |
| Products | No short-term (≤ 90 days) or payday loans; tenure 6–60 months shown | **PASS** (confirm the app matches) |
| EMI calculator | Reducing-balance formula; EMI, total interest, total payable; labelled as an estimate, not an offer | **PASS** (7/7 maths tests) |
| Privacy | Covers collection, purposes, Aadhaar/PAN, bank, income, device, website data (incl. chat), sharing, consent, retention, deletion and rights, security, children, grievance and DPB | **PASS** (text) · **LEGAL REVIEW** (adequacy) |
| Privacy | KYC storage, bank-statement method, service-provider list, retention schedule, tracking notice | **BUSINESS INPUT** |
| Privacy | Website puts no financial data in URLs or analytics; no tracking pixels; contact form asks no financial data | **PASS** |
| Privacy | App practices (no SMS, contacts or call-log access; unticked separate consents; documents not publicly stored) | **BUSINESS INPUT**: the policy says so, so the app must match |
| Terms | Role, services, lender relationship, process, lender authority, responsibilities, eligibility, fees, third parties, limitation of liability, disputes, grievance, termination and deletion | **PASS** (text) · **LEGAL REVIEW** |
| Disclaimer | Not a bank/NBFC, lender decides, no guarantee, terms set by lender, calculators, AI assistant, third-party links | **PASS** · **LEGAL REVIEW** |
| Fees | Site states HandLoan.ai charges borrowers nothing; no CIBIL, eKYC or platform fee offered | **PASS** (site) · **BUSINESS INPUT** (confirm the app charges nothing) |
| Grievance | Dedicated page with 4-level escalation incl. RBI CMS; contact page summary | **PASS** |
| Grievance | Officer name, designation, email, phone, address, response timeline | **BUSINESS INPUT** |
| AI | Chat clearly labelled as AI, can't approve loans, human escalation link | **PASS** (website wrapper) |
| AI | Bot greeting identifies as AI; bot never quotes unverified rates or timelines | **BUSINESS INPUT**: update iamkratu settings and retrain |
| AI | Whether the bot (or the app) performs credit profiling or scoring | **LEGAL REVIEW** if it does |
| Forms | Purpose explained; consent unticked and not bundled; spam protection | **PASS** |
| Meta | No countdowns, fake scarcity, pre-approval or eligibility results | **PASS** |
| Tech | All routes, links, console, mobile layout, form errors, secrets | **PASS** (section 7) |

---

## 3. Files modified in this pass

| File | Change |
|---|---|
| `frontend/src/config/site.js` | Restored the iframe chat config. Added grievance `responseTimeline`, a `products.repayment` line, and a verification gate for rates. Lenders are now `verified` entries with legal name, brand, classification, RBI registration, website, role and products. Added `technologyPartners`, `legal.kycStorage`, `legal.bankDataMethod` and new build warnings. |
| `frontend/src/lib/derived.js` | Helpers that hide unverified rates, fees and timelines; verified lender and technology-partner lists |
| `frontend/src/components/ui.jsx` | Stronger not-a-lender notice; rate-aware key facts; illustrative EMI block; "partners being verified" notice; verified-only partner cards |
| `frontend/src/components/Assistant.jsx` | AI disclosure and human-escalation line under the chat |
| `frontend/src/components/Layout.jsx` | Footer links (How It Works, Loan Products, Eligibility); "applications may be declined" |
| `frontend/src/pages/Home.jsx` | New hero positioning, softened claims, `#how-it-works` anchor, lender-set rates |
| `frontend/src/pages/Services.jsx` | Gated rates, fees and timelines; repayment frequency; responsible-lender row; eligibility anchors |
| `frontend/src/pages/Partners.jsx` | Rewritten: who-does-what roles, verified lender table, technology partners |
| `frontend/src/pages/Privacy.jsx` | Owner's draft kept; added sensitive data (Aadhaar/PAN, bank, income, device), website data incl. chat, consent, DPDP rights, children, Data Protection Board |
| `frontend/src/pages/Terms.jsx` | Owner's draft kept; added third-party services, limitation of liability, suspension, termination and account deletion |
| `frontend/src/pages/Disclaimer.jsx` | Not a bank/NBFC; AI assistant; third-party links |
| `frontend/src/pages/Grievance.jsx`, `Contact.jsx` | Response-time field; form purpose line; CIN; grievance summary |
| `frontend/src/config/faqs.jsx` | Interest-rate answer no longer quotes unverified numbers |
| `frontend/src/styles/global.css` | Chat disclosure styling |
| `frontend/public/api/contact.php` | Errors are never displayed in responses |
| `frontend/src/main.jsx`, `frontend/scripts/prerender.mjs` | Route-tagged pre-rendering; safe re-render on a mismatch |
| `frontend/chatbot-training.txt` | AI greeting, rules 11–14 (no RBI-authorisation claims, no rates or timelines, no pre-approval, AI intro); rates and timelines removed |

**Pages updated:** Home, Services (loan products and eligibility), Lending Partners, Privacy Policy, Terms & Conditions, Disclaimer, Contact, Grievance Redressal, FAQ, and the footer and chat on every page.

---

## 4. AI chatbot

**Tested on 4 Nov 2026** (live iamkratu page, key `6fb4b16f…`):

| Question | Bot behaviour | Result |
|---|---|---|
| "Will my loan be approved for sure?" | Refused to guarantee; lender decides | PASS |
| "Are you an RBI registered lender?" | "No … we're a lending service provider" | PASS |
| "Am I talking to a human or an AI?" | "virtual assistant" plus phone, email and WhatsApp | PASS |
| "Can you get me a loan in 10 minutes?" | Refused the 10-minute promise, **but quoted "24–48 hours"** | Fix: retrain |
| "What is the interest rate?" | **Quoted 10.5–16%** (unverified) | Fix: retrain |
| Greeting | "Hello! 👋 Welcome to handloan.ai" with **no AI disclosure** | Fix in iamkratu settings |

**What to do in iamkratu:**
1. Re-upload the updated `frontend/chatbot-training.txt`.
2. Set the welcome message to: *"I am HandLoan.ai's AI assistant. I can help explain available loan information and guide you through the application process. I cannot guarantee loan approval or make final lending decisions. Final decisions are made by the respective lending institution."*
3. Set the display name to "HandLoan.ai".

The bot's in-chat lead form (name, phone, email) and voice calls are covered in the Privacy Policy. A data-processing agreement with iamkratu is a **LEGAL REVIEW** item.

---

## 5. Technical testing results

| Test | Result |
|---|---|
| Lint (oxlint) | PASS, 0 warnings |
| Build and pre-render | PASS, 14 pages plus sitemap |
| Every route (14 pages, sitemap, robots) | PASS, all HTTP 200 |
| Internal links and anchors (25 unique) | PASS, none broken |
| Browser console, desktop 1440 px and mobile 390 px, all pages | PASS, no errors (after fix J) |
| Horizontal scroll on mobile | PASS, none on any page |
| EMI maths (₹1L/14%/24m = ₹4,801.29; ₹5L/12%/60m = ₹11,122.22; 0% rate; schedule sums; APR = rate without fees) | PASS 7/7 |
| Contact form server (`php -S`): wrong method 405, foreign origin 403, honeypot and instant-submit bots ignored, missing fields, consent, email and phone 422, mail failure clean 500 | PASS |
| Contact form in browser when the server is unavailable | PASS: visitor sees the error plus the email address |
| Consent checkbox pre-ticked? | PASS: unticked |
| Chat opens and closes, AI note visible, iframe loads | PASS |
| Tracking pixels or analytics | PASS: none |
| Secrets in repository or build | PASS: none (the chat key is public by design) |
| Rate limit (5 per hour) | Not testable locally (no mail server); test on Hostinger |

---

## 6. Outstanding business input (all in `frontend/src/config/site.js` unless noted)

`npm run build` lists every remaining item. Don't run ads until it prints "No TODO placeholders found".

1. **Grievance Officer:** name, designation, email, direct phone, postal address and response timeline.
2. **Support hours.**
3. **Lending partners:** for each lender with a signed agreement, the registered name, brand, Bank/NBFC, RBI registration number, website and grievance URL. Then set `verified: true`.
4. **Loan terms:** confirm amounts, tenures, rate ranges, processing fee and decision times from lender agreements, then set `products.verified = true`. Replace the example with a real KFS example and set `representativeExample.verified = true`.
5. **Privacy facts:** where KYC documents are stored, how bank statements are obtained, the service-provider list, the retention schedule and the tracking notice.
6. **Policy dates:** effective date and refund working days.
7. **App:** a Google Play link (`site.app.playStoreUrl`); stop all APK distribution.
8. **Confirm claims are true for the app:** no borrower fees; no SMS, contacts or call-log access; separate unticked consents; data stored in India; ONDC participation (then set the ONDC technology partner to `verified: true`).
9. **iamkratu:** retrain, AI greeting and display name (section 4).
10. **Deploy:** upload the new build to Hostinger (`npm run package`, then extract into `public_html`), replacing the old site.

## 7. Outstanding legal and compliance verification

1. **RBI (Digital Lending) Directions, 2025:** LSP agreements with each lender; LSP obligations (lender list on the website, grievance officer, no borrower fees, KFS and cooling-off, multi-lender offer display, reporting of the app in RBI's CIMS directory, data localisation).
2. **DPDP Act, 2023 and the DPDP Rules:** adequacy of notices and consent flows in the app; rights handling; processor agreements (lenders, KYC providers, iamkratu, Hostinger); retention; breach handling.
3. **Aadhaar:** whether and how Aadhaar is collected or used, only through authorised entities under the Aadhaar Act and UIDAI rules.
4. **Terms of use:** the limitation-of-liability wording; jurisdiction and courts (not specified, so a lawyer should decide); consumer-protection interaction.
5. **Refund policy, section 5:** it covers "payments made to HandLoan", which conflicts with "no borrower fees" unless some payment genuinely exists.
6. **AI:** whether the bot or the app profiles or scores applicants. If so, a separate privacy and regulatory review is needed.
7. **Advertising copy:** the ads themselves (not just the website) against Meta's financial-services standards and ASCI guidelines.

---

## 8. Meta advertising readiness assessment

**Current verdict: NOT READY to submit loan ads.**

**Ready on the website:** a transparent platform role; no misleading financial promises; company identity, contact details and policies one click from every page; loan terms structure; illustrative-only calculations; a clean contact form with proper consent; an AI chat that is labelled as AI and links to a human; no fake urgency, pre-approvals or statistics.

**Blocking items:**
1. The live URL still serves the **old site**, with "10 minutes" and "instant approval" claims and APK downloads. Deploy the new build.
2. **No verified lending partner** is published. Reviewers and RBI rules expect the regulated lender to be identifiable.
3. **Grievance officer and other TODO placeholders** are visible on legal pages.
4. **App distribution:** the ad destination journey leads to the app, so it must be on Google Play and match the website's claims.
5. **iamkratu bot** still greets without an AI disclosure and quotes unverified rates and timelines until retrained.
6. **Meta account set-up:** Business Verification for Jatta M Kommerce Private Limited, plus any financial-services advertiser verification Meta requests for India. The Facebook Page name, URL and details must match the website.

Even after these are resolved, Meta makes its own decision; nothing in this audit guarantees approval.
