<?php
session_start();
include('config.php');

/**
 * $watchdog is a flag that indicates:
 * the requestion is normally routed in here, unless
 * we will consider it as a illegal one and return 404 error
 */
$watchdog = true;

if (!isset($_SESSION['account']))
{
    include('login.php');
    exit;
}

// ===========================================
// dispatch engine
/*

[
[]

]


*/

$content = $_GET['c'];

if ($content == '') {
    include('main.php');
    exit;
}

foreach ($_CONTENT_MAP as $key => $value) {
    if ($key == $content) {
        include($value);
        exit;
    }
}

include('404.php');

?>