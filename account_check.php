<?php 
session_start();

// route to login
if (!isset($_SESSION['account']))
{
    include('login.php');
    exit;
}
?>