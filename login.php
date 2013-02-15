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

    _exit_json(array('ret'=>false, 'account'=>$account, 'pwd'=>$pwd, 'md5'=>md5('zhouguijun')));
}

?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>PLOG</title>
 <script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>          
 <script type="text/javascript">                                         
    $(document).ready(function(){
        $("#loginForm").submit(function(event){
            event.preventDefault();

            var form    = $(this);
            var account = form.find('input[name="a"]').val();
            var pwd     = form.find('input[name="p"]').val();
            var url     = form.attr('action');

            if (account.length==0 || pwd.length==0) {
                alert("<?=_('login_input_null');?>");
                return;
            }

            $.post(url, {a:account, p:pwd},
            function(data){
                //alert(data.ret);
                if (data.ret) {
                    //alert('true, ret='+data.ret+', account='+data.account);
                } else {
                    alert(jQuery.param(data));
                    //alert('false, ret='+data.ret+', account='+data.account);
                    //console.log(data);
                }
            }, "json");
        });
    });
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