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
    echo json_encode(['username' => null]);
    exit;
}

echo json_encode([
    'username' => $user->data['username'],
    'is_admin' => (bool) $auth->acl_get('a_'),
]);
