<?php
/**
 * HandLoan.ai form handler (Hostinger PHP). Stores nothing on disk.
 *
 *   form_type = enquiry | contact  → emailed to help@handloan.ai
 *   form_type = grievance          → emailed to help@handloan.ai, subject starts with [Grievance]
 *
 * Before going live, create these mailboxes in Hostinger (Emails → Email Accounts):
 *   no-reply@handloan.ai (sender) and help@handloan.ai (the Grievance Officer must also read it)
 * and make sure the domain's SPF record allows Hostinger, or these emails will land in spam.
 */

// Never print PHP warnings into the response (they break the JSON and leak server paths).
ini_set('display_errors', '0');
ini_set('log_errors', '1');

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');
header('Cache-Control: no-store');
date_default_timezone_set('Asia/Kolkata');

const SUPPORT_EMAIL   = 'help@handloan.ai';
const GRIEVANCE_EMAIL = 'help@handloan.ai';
const FROM_EMAIL      = 'no-reply@handloan.ai';

function respond(int $code, array $body): void {
    http_response_code($code);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

// Only accept submissions from our own site
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
// Local testing only: the dev server sets HANDLOAN_DEV_ORIGIN (e.g. http://localhost:8000). Unset on Hostinger.
$devOrigin = (string)getenv('HANDLOAN_DEV_ORIGIN');
if ($origin !== '' && $origin !== $devOrigin && !preg_match('#^https://(www\.)?handloan\.ai$#', $origin)) {
    respond(403, ['ok' => false, 'error' => 'Forbidden.']);
}

// Spam traps: honeypot field must be empty, and humans take > 3 seconds
if (!empty($_POST['website']) || (int)($_POST['elapsed'] ?? 0) < 3000) {
    respond(200, ['ok' => true]); // pretend success to bots
}

// Simple per-session rate limit: 5 messages / hour
session_start();
$now = time();
$_SESSION['hits'] = array_filter($_SESSION['hits'] ?? [], fn($t) => $t > $now - 3600);
if (count($_SESSION['hits']) >= 5) {
    respond(429, ['ok' => false, 'error' => 'Too many messages. Please try again later.']);
}

function field(string $key, int $max): string {
    $v = trim((string)($_POST[$key] ?? ''));
    $v = str_replace(["\r", "\0"], '', $v);
    return mb_substr($v, 0, $max);
}
function oneLine(string $v): string {
    return trim(preg_replace('/\s+/', ' ', $v));
}
function ticked(string $key): bool {
    return ($_POST[$key] ?? '') === 'yes';
}
/** Indian digit grouping: 4000000 -> 40,00,000 */
function inr(int $n): string {
    $s = (string)$n;
    if (strlen($s) <= 3) return $s;
    $rest = preg_replace('/\B(?=(\d{2})+(?!\d))/', ',', substr($s, 0, -3));
    return $rest . ',' . substr($s, -3);
}
function fail(string $msg): void {
    respond(422, ['ok' => false, 'error' => $msg]);
}

$type = field('form_type', 20);
if (!in_array($type, ['enquiry', 'contact', 'grievance'], true)) {
    fail('Please reload the page and try again.');
}

// ---- Fields common to every form ----
$name  = oneLine(field('name', 80));
$email = field('email', 120);
$phoneRaw = field('phone', 16);
$digits = preg_replace('/\D/', '', $phoneRaw);
if (strlen($digits) === 12 && str_starts_with($digits, '91')) $digits = substr($digits, 2);

if ($name === '') fail('Please enter your full name.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) fail('Please enter a valid email address.');
if (!preg_match('/^[6-9]\d{9}$/', $digits)) fail('Please enter a valid 10-digit Indian mobile number.');
$phone = '+91 ' . substr($digits, 0, 5) . ' ' . substr($digits, 5);

// ---- Consent record (exact wording shown on the form) ----
$consentText = [
    'consent_terms'     => 'I have read and agree to the Privacy Policy and Terms & Conditions.',
    'consent_contact'   => $type === 'grievance'
        ? 'I consent to HandLoan.ai contacting me about this complaint by call, SMS, WhatsApp and email.'
        : 'I consent to HandLoan.ai contacting me about my enquiry by call, SMS, WhatsApp and email. I understand HandLoan.ai is not a lender.',
    'consent_future'    => 'I understand that HandLoan.ai will share my details only with a lending partner listed on its Lending Partners page, and only after telling me which lender and taking my consent.',
    'consent_marketing' => 'Optional: Send me information about other loan products from HandLoan.ai by SMS, WhatsApp or email. I can withdraw this at any time.',
];
$required = $type === 'grievance'
    ? ['consent_terms', 'consent_contact']
    : ['consent_terms', 'consent_contact', 'consent_future'];
foreach ($required as $key) {
    if (!ticked($key)) fail('Please tick all the required consent boxes to continue.');
}
$shown = $type === 'grievance' ? $required : array_keys($consentText);

$time = date('d M Y, H:i') . ' IST';
$lines = [];

if ($type === 'grievance') {
    $topics = [
        'My enquiry', 'Customer support', 'Website or chat assistant', 'Privacy or personal data',
        'Someone asked for money, OTP or documents in HandLoan.ai’s name', 'Other',
    ];
    $topic     = field('topic', 120);
    $reference = oneLine(field('reference', 60));
    $message   = field('message', 2000);
    if (!in_array($topic, $topics, true)) fail('Please choose what your complaint is about.');
    if ($message === '') fail('Please describe your complaint.');

    $to      = GRIEVANCE_EMAIL === SUPPORT_EMAIL ? SUPPORT_EMAIL : GRIEVANCE_EMAIL . ', ' . SUPPORT_EMAIL;
    $subject = "[Grievance] {$topic} — {$name}";
    $lines[] = 'New GRIEVANCE from handloan.ai/grievance-redressal/';
    $lines[] = 'Acknowledge within 2 working days; resolve within 15 days.';
    $lines[] = '';
    $lines[] = "Name:      {$name}";
    $lines[] = "Mobile:    {$phone}";
    $lines[] = "Email:     {$email}";
    $lines[] = "Topic:     {$topic}";
    $lines[] = 'Reference: ' . ($reference !== '' ? $reference : '—');
    $lines[] = "Received:  {$time}";
    $lines[] = '';
    $lines[] = 'Complaint:';
    $lines[] = $message;
} else {
    $loanTypes  = ['Personal Loan', 'Business Loan'];
    $employment = ['Salaried', 'Self-employed professional', 'Self-employed business owner'];
    $incomes    = ['₹15,000 – ₹25,000', '₹25,001 – ₹50,000', '₹50,001 – ₹1,00,000', 'Above ₹1,00,000'];

    $loanType = field('loan_type', 40);
    $amount   = (int)preg_replace('/\D/', '', field('loan_amount', 12));
    $city     = oneLine(field('city', 60));
    $emp      = field('employment', 60);
    $income   = field('income', 40);
    $message  = $type === 'contact' ? field('message', 2000) : '';

    if (!in_array($loanType, $loanTypes, true)) fail('Please choose a loan type.');
    $maxAmount = $loanType === 'Personal Loan' ? 2500000 : 5000000;
    if ($amount < 25000 || $amount > $maxAmount) {
        fail($loanType === 'Personal Loan'
            ? 'Personal loan enquiries are for ₹25,000 to ₹25,00,000.'
            : 'Business loan enquiries are for ₹25,000 to ₹50,00,000.');
    }
    if (mb_strlen($city) < 2) fail('Please enter your city.');
    if (!in_array($emp, $employment, true)) fail('Please choose your employment type.');
    if (!in_array($income, $incomes, true)) fail('Please choose your monthly income.');

    $to      = SUPPORT_EMAIL;
    $label   = $type === 'contact' ? 'Contact page' : 'Enquiry';
    $subject = "[{$label}] {$loanType} ₹" . inr($amount) . " — {$name}, {$city}";
    $lines[] = "New LOAN ENQUIRY from handloan.ai ({$label} form)";
    $lines[] = 'Share only with a listed lending partner, and only after telling the customer which lender and getting consent.';
    $lines[] = '';
    $lines[] = "Name:        {$name}";
    $lines[] = "Mobile:      {$phone}";
    $lines[] = "Email:       {$email}";
    $lines[] = "Loan type:   {$loanType}";
    $lines[] = 'Amount:      ₹' . inr($amount);
    $lines[] = "City:        {$city}";
    $lines[] = "Employment:  {$emp}";
    $lines[] = "Income/mo:   {$income}";
    $lines[] = 'Age 21–58 and Indian resident: confirmed by submitting';
    $lines[] = "Received:    {$time}";
    if ($message !== '') {
        $lines[] = '';
        $lines[] = 'Message:';
        $lines[] = $message;
    }
}

$lines[] = '';
$lines[] = '--- Consent record ---';
foreach ($shown as $key) {
    $lines[] = (ticked($key) ? '[YES] ' : '[NO]  ') . $consentText[$key];
}
$lines[] = "Recorded: {$time}";

$headers = [
    'From: HandLoan.ai Website <' . FROM_EMAIL . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$sent = mail($to, $encodedSubject, implode("\n", $lines) . "\n", implode("\r\n", $headers), '-f' . FROM_EMAIL);

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'We could not send your message right now.']);
}

$_SESSION['hits'][] = $now;
respond(200, ['ok' => true]);
