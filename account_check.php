<?php 
session_start();

// route to login
if (!isset($_SESSION['account']))
{
    include('index.php');
    exit;
}
?>