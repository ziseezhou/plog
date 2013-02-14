<?php 
session_start();
if (isset($_SESSION['account']))
{
    include('main.php');
    exit;
}

include_once('fun.php');
PG_ASSERT(_local_file_load('common'));

$account    = $_POST['a'];
$pwd        = $_POST['p'];

$account    = db_str_filter($account);
$pwd        = db_str_filter($pwd);

if (strlen($account) > 0) {
    $sql = "select * from u where a='$account'";
    
    $conn = conn();
    PG_ASSERT2($conn, "db conn error!", true);
    
    $rs = @mysql_query($sql, $conn);
    PG_ASSERT2($rs, "db query error!", true);

    if (mysql_num_rows($rs)>0) {
        $row = mysql_fetch_array($rs);
        $sqlPwd = $row['p'];
        
        if ($sqlPwd == $pwd) {
            $_SESSION['account'] = $account;
            header("Location: main.php");
            exit;
        }
    }

    _exit_json(array('ret'=>false));
}

?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>PLOG</title>
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script language="javascript">
$(document).ready(function() {
    $("#loginForm").submit(function(event){
        event.preventDefault();

        //alert("xxx");

        var $form   = $(this);
        var $account = $form.find('account').val();
        var $pwd     = $form.find('pwd').val();
        var $url     = $form.attr('action');

        if ($account.lenght==0 || $pwd.lenght==0) {
            alert("<?=_(login_input_null);?>");
            return;
        }

        var post = $.post($url, {account:$account, pwd:$pwd});

        post.done(function(data){
            var ret = $(data).attr('ret');
            alert(ret);
        });
    });
);
</script>
</head>
<body>
<div id="container">
<div id="loginBox">
<form action="main.php" id="loginForm">
<ul>
<li id="a"><span><?=_('account');?> </span><input type="text" name="a" maxlength="30" /></li>
<li id="p"><span><?=_('pwd');?> </span><input type="password" name="p"  maxlength="30" /></li>
<li id="l"><span><input type="submit" value="<?=_('login');?>" /></span></li>
</ul>
</form>
</div>
</div>
</body>
</body>
</html>