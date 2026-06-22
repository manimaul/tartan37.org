<?php
define('IN_PHPBB', true);
$phpbb_root_path = './forum/';
$phpEx = substr(strrchr(__FILE__, '.'), 1);
include($phpbb_root_path . 'common.' . $phpEx);

header('Content-Type: application/json');

$user->session_begin();
$auth->acl($user->data);
$user->setup();

if ((int) $user->data['user_id'] === ANONYMOUS) {
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

$data = json_decode($_POST['data'] ?? '', true);
if (json_last_error() !== JSON_ERROR_NONE || !isset($data['hull'])) {
    http_response_code(400);
    echo json_encode(['error' => 'invalid JSON or missing hull number']);
    exit;
}

$hull = (int) $data['hull'];
$pendingDir = './fleet_pending/';
if (!is_dir($pendingDir) && !mkdir($pendingDir, 0755, true) && !is_dir($pendingDir)) {
    http_response_code(500);
    echo json_encode(['error' => 'failed to create pending directory']);
    exit;
}

if (!is_array($data['owner'] ?? null)) {
    $data['owner'] = [];
}
$data['owner']['modified_by_user_id'] = (int) $user->data['user_id'];
$data['owner']['modified_by_username'] = $user->data['username'];
$data['owner']['modified_ds'] = date('c');

$allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
if (!empty($_FILES['image']['tmp_name']) && is_uploaded_file($_FILES['image']['tmp_name'])) {
    $ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $allowedExt, true)) {
        http_response_code(400);
        echo json_encode(['error' => 'unsupported image type']);
        exit;
    }
    foreach ($allowedExt as $oldExt) {
        @unlink($pendingDir . '/' . $hull . '.' . $oldExt);
    }
    $imageName = $hull . '.' . $ext;
    if (!move_uploaded_file($_FILES['image']['tmp_name'], $pendingDir . '/' . $imageName)) {
        http_response_code(500);
        echo json_encode(['error' => 'failed to save image']);
        exit;
    }
    $data['img'] = $imageName;
}

$tmp = $pendingDir . '/' . $hull . '.json.tmp';
$final = $pendingDir . '/' . $hull . '.json';
if (file_put_contents($tmp, json_encode($data, JSON_PRETTY_PRINT)) === false
    || !rename($tmp, $final)) {
    http_response_code(500);
    echo json_encode(['error' => 'failed to write pending record']);
    exit;
}

echo json_encode(['ok' => true, 'hull' => $hull]);
