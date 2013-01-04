<?php
session_start();

// already checkin

if (isset($_SESSION['account']))
{
    include('main.php');
    exit;
}

// else login firstly.

$formSubmitted = $_POST['formSubmitted'];

if ('yes'== $formSubmitted)
{
	$account = $_POST['account'];
	$pwd     = $_POST['pwd'];

	$sql = "select * from u where a='$account'";
	
	$conn = conn();
	PG_ASSERT($conn, true);
	
	$rs = @mysql_query($sql, $conn) or die("db query error!");
	if (mysql_num_rows($rs)>0)
	{
		$row = mysql_fetch_array($rs);
		$sqlPwd = $row['p'];
		
		if ($sqlPwd == $pwd)
		{
			$_SESSION['account'] = $account;
			header("Location: today.php");
			exit(0);
		}
	}

	$loginInfo = "帐号或密码错误 !";
	if (isset($_SESSION['account']))
	{
		unset($_SESSION['account']);
	}
}

?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>PLOG-login</title>
</head>
<body>
<?php 

?>
</body>
</html>