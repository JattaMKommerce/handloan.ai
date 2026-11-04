<?php
/**
 * HandLoan.ai contact form handler (Hostinger PHP).
 * Sends the enquiry to support. Stores nothing on disk.
 *
 * Before going live, create the mailbox `no-reply@handloan.ai` in Hostinger
 * (Emails → Email Accounts) so messages aren't marked as spam.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');
date_default_timezone_set('Asia/Kolkata');

const TO_EMAIL   = 'help@handloan.ai';
const FROM_EMAIL = 'no-reply@handloan.ai';

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
if ($origin !== '' && !preg_match('#^https://(www\.)?handloan\.ai$#', $origin)) {
    respond(403, ['ok' => false, 'error' => 'Forbidden.']);
}

// Spam traps: honeypot field must be empty, and humans take > 3 seconds
if (!empty($_POST['website']) || (int)($_POST['elapsed'] ?? 0) < 3000) {
    respond(200, ['ok' => true]); // pretend success to bots
}

// Simple per-IP rate limit: 5 messages / hour
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

$name    = field('name', 80);
$phone   = field('phone', 15);
$email   = field('email', 120);
$subject = field('subject', 60);
$message = field('message', 2000);
$consent = ($_POST['consent'] ?? '') === 'yes';

$allowedSubjects = [
    'General enquiry', 'Help with my application', 'App support',
    'Complaint / grievance', 'Partnership enquiry', 'Careers',
];

if ($name === '' || $message === '' || !$consent) {
    respond(422, ['ok' => false, 'error' => 'Please fill in all required fields.']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'Please enter a valid email address.']);
}
if (!preg_match('/^[0-9+\s\-]{10,15}$/', $phone)) {
    respond(422, ['ok' => false, 'error' => 'Please enter a valid mobile number.']);
}
if (!in_array($subject, $allowedSubjects, true)) {
    $subject = 'General enquiry';
}
$name = str_replace("\n", ' ', $name);

$body = "New enquiry from handloan.ai\n\n"
      . "Name:    {$name}\n"
      . "Phone:   {$phone}\n"
      . "Email:   {$email}\n"
      . "Topic:   {$subject}\n"
      . "Consent: Yes (contact about this enquiry)\n"
      . "Time:    " . date('d M Y, H:i') . " IST\n\n"
      . "Message:\n{$message}\n";

$headers = [
    'From: HandLoan.ai Website <' . FROM_EMAIL . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail(TO_EMAIL, "[Website] {$subject} — {$name}", $body, implode("\r\n", $headers), '-f' . FROM_EMAIL);

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'We could not send your message right now.']);
}

$_SESSION['hits'][] = $now;
respond(200, ['ok' => true]);
