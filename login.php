<?php 
session_start();
include('db.php');
include('fun.php');

$account    = $_POST['a'];
$pwd        = $_POST['p'];
$hidden     = $_POST['h'];

$account    = strFilter($account);
$pwd        = strFilter($pwd);


?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>PLOG</title>
</head>
<body></body>
</html>