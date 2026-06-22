<?php
define('IN_PHPBB', true);
$phpbb_root_path = './forum/';
$phpEx = substr(strrchr(__FILE__, '.'), 1);
include($phpbb_root_path . 'common.' . $phpEx);

$user->session_begin();
$auth->acl($user->data);
$user->setup();

if ((int) $user->data['user_id'] === ANONYMOUS) {
    http_response_code(401);
    exit;
}

$request->enable_super_globals();

$hull = (int) ($_GET['hull'] ?? 0);
if ($hull <= 0) {
    http_response_code(400);
    exit;
}

$dir = './fleet_pending/';
$mimeByExt = [
    'jpg' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'png' => 'image/png',
    'gif' => 'image/gif',
    'webp' => 'image/webp',
];

foreach ($mimeByExt as $ext => $mime) {
    $path = $dir . '/' . $hull . '.' . $ext;
    if (file_exists($path)) {
        header('Content-Type: ' . $mime);
        header('Cache-Control: no-store');
        readfile($path);
        exit;
    }
}

http_response_code(404);
