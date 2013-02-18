<?php 
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
            _exit_json(array('ret'=>true, 'account'=>$account));
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
<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
<script type="text/javascript">                                         
$(document).ready(function(){
    $("#loginForm").submit(function(event){
        event.preventDefault();

        var form    = $(this);
        var account = form.find('input[name="a"]').val();
        var pwd     = form.find('input[name="p"]').val();
        var url     = form.attr('action');
        var infobox = $('#info');

        if (account.length==0 || pwd.length==0) {
            //alert("<?=_('login_input_null');?>");
            infobox.html("<?=_('login_input_null');?>");
            infobox.show();
            return;
        }

        $.post(url, {a:account, p:pwd},
        function(data){
            if (data.ret) {
                //alert('here');
                location.reload(true);
            } else {
                //alert(jQuery.param(data));
                infobox.html("<?=_('login_input_error');?>");
                infobox.show();
            }
        }, "json");
    });
});
</script>
<style type="text/css">
* { padding:0; margin:0; }
html { overflow-y:scroll; }
body { margin:0; padding:45px 0 0; font:12px/1.5 \5b8b\4f53,Arial,sans-serif; background:#ffffff; }
ol,ul { list-style:none; }
li{ float:left; clear:both; display:block; height: 40px; }
form { margin-top:100px; margin-left: 170px; }
#loginBox { position: absolute; top: 50%; left:50%; height: 360px; margin-top: -180px; width: 560px; margin-left: -280px; background-color: #F8FCFE; border: solid 1px #C3D9FF; border-radius:5px}
#a input, #p input { height: 20px; width: 145px; border: solid 1px #A2BAE7; vertical-align:middle; padding-top: 3px; background-color: white; }
#s input { height:25px; width: 200px; }
.topic { float:left; width:55px; line-height:25px; text-align:justify; font-size:14px; }
#info { display:none; padding: 3px; width: 200px; text-align: left; color: red; background-color:#FFFFDD; border: solid 1px #E3E197; }
</style>
</head>
<body>
<div id="loginBox">
<form action="./" id="loginForm">
<ul>
<li id="a"><div class="topic"><?=_('login_name');?>: </div><input type="text" name="a" maxlength="30" /></li>
<li id="p"><div class="topic"><?=_('login_pwd');?>:  </div><input type="password" name="p"  maxlength="30" /></li>
<li id="s"><input type="submit" value="<?=_('login');?>" /></li>
<li id="info"></li>
</ul>
</form>
</div>
</body>
</body>
</html>