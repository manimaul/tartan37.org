<?php
define('IN_PHPBB', true);
$phpbb_root_path = './forum/';
$phpEx = substr(strrchr(__FILE__, '.'), 1);
include($phpbb_root_path . 'common.' . $phpEx);

header('Content-Type: application/json');

if ($request->server('REQUEST_METHOD') !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);
$username = trim($body['username'] ?? '');
$password = (string) ($body['password'] ?? '');

if ($username === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['error' => 'missing username or password']);
    exit;
}

$user->session_begin();
$auth->acl($user->data);
$user->setup();

$result = $auth->login($username, $password, false, false, true);

if ($result['status'] !== LOGIN_SUCCESS) {
    http_response_code(401);
    echo json_encode(['error' => 'invalid credentials']);
    exit;
}

echo json_encode([
    'username' => $user->data['username'],
    'is_admin' => (bool) $auth->acl_get('a_'),
]);
