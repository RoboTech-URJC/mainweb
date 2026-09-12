<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

const BIT_CHAT_URL = 'https://cloud.vento.build/api/networks/v1/amanza17/robotech/bit-chat?token=onfzafcXpMG40ySuoY6gYZfI8cuGW3gwmbkkrAhL';

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'error' => 'Method not allowed'], 405);
}

$rawBody = file_get_contents('php://input') ?: '';
$input = json_decode($rawBody, true);

if (!is_array($input)) {
    json_response(['ok' => false, 'error' => 'Invalid JSON'], 400);
}

$question = trim((string)($input['question'] ?? ''));
$sessionId = trim((string)($input['sessionId'] ?? ''));

if ($question === '' || $sessionId === '') {
    json_response(['ok' => false, 'error' => 'Missing question or sessionId'], 400);
}

$payload = json_encode([
    'question' => $question,
    'sessionId' => $sessionId,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

if ($payload === false) {
    json_response(['ok' => false, 'error' => 'Could not encode request'], 500);
}

$statusCode = 0;
$transportError = '';

if (function_exists('curl_init')) {
    $ch = curl_init(BIT_CHAT_URL);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 20,
    ]);

    $responseBody = curl_exec($ch);
    $statusCode = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $transportError = curl_error($ch);
    curl_close($ch);
} else {
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json
",
            'content' => $payload,
            'timeout' => 20,
            'ignore_errors' => true,
        ],
    ]);
    $responseBody = file_get_contents(BIT_CHAT_URL, false, $context);
    $statusLine = $http_response_header[0] ?? '';
    if (preg_match('/\s(\d{3})\s/', $statusLine, $matches)) {
        $statusCode = (int)$matches[1];
    }
}

if ($responseBody === false) {
    json_response(['ok' => false, 'error' => 'BIT request failed'], 502);
}

$response = json_decode($responseBody, true);

if (!is_array($response)) {
    json_response(['ok' => false, 'error' => 'Invalid BIT response'], 502);
}

if ($statusCode < 200 || $statusCode >= 300) {
    json_response([
        'ok' => false,
        'error' => $response['error'] ?? $transportError ?: 'BIT returned an error',
    ], 502);
}

json_response([
    'ok' => (bool)($response['ok'] ?? false),
    'answer' => (string)($response['answer'] ?? ''),
    'links' => is_array($response['links'] ?? null) ? $response['links'] : [],
    'filtered' => $response['filtered'] ?? null,
    'conversationId' => $response['conversationId'] ?? null,
]);
