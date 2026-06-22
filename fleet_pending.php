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

$hull = (int) ($_GET['hull'] ?? 0);

if ($hull <= 0) {
    $records = [];
    foreach (glob('./fleet_pending/*.json') as $file) {
        $records[] = json_decode(file_get_contents($file), true);
    }
    echo json_encode(['records' => $records]);
    exit;
}

$file = './fleet_pending/' . $hull . '.json';
if (!file_exists($file)) {
    echo json_encode(['record' => null]);
    exit;
}

echo json_encode(['record' => json_decode(file_get_contents($file), true)]);
