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
$fleetImgDir = './fleetimg/';
$fleetFile = './fleet.json';
$allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

$fleet = [];
if (file_exists($fleetFile)) {
    $fleet = json_decode(file_get_contents($fleetFile), true) ?: [];
}

$approved = [];
foreach ($hulls as $rawHull) {
    $hull = (int) $rawHull;
    if ($hull <= 0) {
        continue;
    }

    $pendingJson = $pendingDir . $hull . '.json';
    if (!file_exists($pendingJson)) {
        continue;
    }

    $record = json_decode(file_get_contents($pendingJson), true);
    if (!is_array($record)) {
        continue;
    }
    $record['hull'] = $hull;

    $pendingImage = null;
    foreach ($allowedExt as $ext) {
        $candidate = $pendingDir . $hull . '.' . $ext;
        if (file_exists($candidate)) {
            $pendingImage = $candidate;
            $imageExt = $ext;
            break;
        }
    }

    if ($pendingImage !== null) {
        foreach ($allowedExt as $oldExt) {
            @unlink($fleetImgDir . $hull . '.' . $oldExt);
        }
        $imageName = $hull . '.' . $imageExt;
        if (!rename($pendingImage, $fleetImgDir . $imageName)) {
            http_response_code(500);
            echo json_encode(['error' => 'failed to move image for hull ' . $hull]);
            exit;
        }
        $record['img'] = $imageName;
    }

    $found = false;
    foreach ($fleet as $i => $existing) {
        if ((int) ($existing['hull'] ?? 0) === $hull) {
            $fleet[$i] = $record;
            $found = true;
            break;
        }
    }
    if (!$found) {
        $fleet[] = $record;
    }

    unlink($pendingJson);
    $approved[] = $hull;
}

if (empty($approved)) {
    http_response_code(400);
    echo json_encode(['error' => 'no matching pending records']);
    exit;
}

$tmp = $fleetFile . '.tmp';
if (file_put_contents($tmp, json_encode($fleet, JSON_PRETTY_PRINT)) === false
    || !rename($tmp, $fleetFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'failed to write fleet.json']);
    exit;
}

echo json_encode(['ok' => true, 'approved' => $approved]);
