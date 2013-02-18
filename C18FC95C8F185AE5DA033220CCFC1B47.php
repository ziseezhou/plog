<?php
session_start();

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




*/

$action = $_GET['action'];
include('main.php');

?>