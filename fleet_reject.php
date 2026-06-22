<?php
define('IN_PHPBB', true);
$phpbb_root_path = './forum/';
$phpEx = substr(strrchr(__FILE__, '.'), 1);
include($phpbb_root_path . 'common.' . $phpEx);

header('Content-Type: application/json');

$user->session_begin();
$auth->acl($user->data);
$user->setup();

if ((int) $user->data['user_id'] === ANONYMOUS || !$auth->acl_get('a_')) {
    http_response_code(401);
    echo json_encode(['error' => 'unauthorized']);
    exit;
}

$request->enable_super_globals();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$hulls = $input['hulls'] ?? null;
if (!is_array($hulls) || empty($hulls)) {
    http_response_code(400);
    echo json_encode(['error' => 'no hulls specified']);
    exit;
}

$pendingDir = './fleet_pending/';
$allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

$rejected = [];
foreach ($hulls as $rawHull) {
    $hull = (int) $rawHull;
    if ($hull <= 0) {
        continue;
    }

    $pendingJson = $pendingDir . $hull . '.json';
    if (!file_exists($pendingJson)) {
        continue;
    }

    unlink($pendingJson);
    foreach ($allowedExt as $ext) {
        @unlink($pendingDir . $hull . '.' . $ext);
    }
    $rejected[] = $hull;
}

if (empty($rejected)) {
    http_response_code(400);
    echo json_encode(['error' => 'no matching pending records']);
    exit;
}

echo json_encode(['ok' => true, 'rejected' => $rejected]);
