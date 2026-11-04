# HandLoan.ai website

React + Vite site. Every page is **pre-rendered to plain HTML** at build time, so it runs on any Hostinger plan
and Meta's crawler can read the full content without JavaScript.

## 1. Edit the content

| What | Where |
|------|-------|
| Company, contacts, grievance officer, rates, lending partners, policy blanks | `src/config/site.js` |
| Images | `public/images/` (replace a file, keeping the same name). Prompts: `IMAGE-PROMPTS.md` |
| FAQs | `src/config/faqs.jsx` |
| Assistant video + pop-up messages (bottom-right, every page) | `src/components/Assistant.jsx` (`MESSAGES` at the top). Video: `public/video/assistant.mp4` |
| Page text | `src/pages/*.jsx` |

Anything still missing shows on the page as `[TODO: …]`, and `npm run build` lists every one.

## 2. Run locally

```bash
npm install
npm run dev        # http://localhost:5173 (live editing)
npm run build      # creates dist/ and prints the TODO checklist
npm run preview    # http://localhost:4173 (tests the built site)
```

## 3. Deploy to Hostinger

1. Run `npm run package`. This builds the site and creates `handloan-site.zip`.
2. In hPanel, open **Websites → handloan.ai → File Manager → `public_html`**.
3. **Back up the old site first:** select everything, download it, then delete it. That includes old `.html`
   files, `css/`, `lib/`, `newimage/` and any `.apk` files.
4. Upload `handloan-site.zip`, right-click it, choose **Extract**, then delete the zip.
   Make sure `.htaccess` is present. Turn on "show hidden files" if you can't see it.
5. In hPanel, under **Security → SSL**, make sure SSL is active.
6. For the contact form, create the mailbox `no-reply@handloan.ai` in **Emails**. Form messages go to
   `help@handloan.ai`. To change that, edit `public/api/contact.php`.
7. Test the live site: every page, the mobile menu, the EMI calculator, and the contact form (check the inbox).
   Also check that old links redirect, for example `https://handloan.ai/about.html` → `/about/`.

## 4. Before running Meta ads: compliance checklist

**Website**
- [ ] `npm run build` prints **"No TODO placeholders found"**.
- [ ] Interest rates, tenures, amounts and the representative example match real lender KFS documents.
- [ ] The Lending Partners page lists only lenders you have a signed agreement with, plus their RBI registration numbers.
- [ ] The grievance officer's name, email, phone and address are real and monitored.
- [ ] The "Get the App" button links to **Google Play**, not a direct APK download.
- [ ] Policy effective dates are filled in.

**Business Manager**
- [ ] Complete **Business Verification** in Meta Business Settings, using the legal name *Jatta M Kommerce Private Limited*.
- [ ] Complete Meta's **financial services advertiser verification for India** if Ads Manager asks for it.
- [ ] The Facebook Page name, website URL and business details match this website exactly.

**Ad copy and creative**
- [ ] Target **18+** only. Don't use lead forms that ask for PAN, Aadhaar, bank or card details.
- [ ] No "guaranteed approval", "instant loan", "no CIBIL check", "loan in 10 minutes" or "lowest rate".
- [ ] Don't address the viewer's finances directly ("In debt?", "Bad credit?", "Need cash urgently?").
- [ ] Any rate or amount in an ad must match this website exactly.
- [ ] Use the cleaned logo (`public/images/logo.png`). The original logo's "GET LOAN IN 10 MINUTES" tagline is a guaranteed-speed claim.
- [ ] No images of cash, gold, or RBI or bank logos.

Example compliant ad text:

> **HandLoan.ai: personal & business loans from RBI-regulated lenders.** Apply digitally, compare offers, and
> see the APR and all charges before you accept. Tenure 6–60 months. HandLoan.ai is a loan facilitation
> platform, not a lender. Subject to lender approval.
