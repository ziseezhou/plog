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
* {
    padding:0;
    margin:0;
}
html {
    overflow-y:scroll;
}
body {
    margin:0;
    padding:45px 0 0;
    font-family: arial, sans-serif;
    background:#ffffff;
}
ol,ul {
    list-style:none;
}
li{
    float:left;
    clear:both;
    display:block;
    height: 40px;
}
form {
    position: absolute;
    top: 50%;
    left:50%;
    height: 136px;
    margin-top: -60px;
    width: 160px;
    margin-left: -80px;
}
#loginBox {
    position: absolute;
    top: 50%;
    left:50%;
    height: 360px;
    margin-top: -180px;
    width: 560px;
    margin-left: -280px;
    border: solid 1px #C3D9FF;
    border-radius:5px;
    background-color: #F8FCFE;
    box-shadow:0 0 3px rgba(103,166,217,0.5);
    -moz-box-shadow:0 0 3px rgba(103,166,217,0.5);
    -webkit-box-shadow:0 0 3px rgba(103,166,217,0.5);
    -o-box-shadow:0 0 3px rgba(103,166,217,0.5);
    background-image: url(img/bg_loginBox.gif);
    background-repeat: no-repeat;
    background-position: right bottom;
}
#a input, #p input {
    height: 25px;
    width: 155px;
    vertical-align:middle;
    padding-top: 3px;
    background-color: white;
}
#s input {
    height:28px;
    width: 155px;
}
#info {
    display:none;
    padding: 3px;
    width: 155px;
    text-align: left;
    color: red;
    background-color:#FFFFDD;
    border: solid 1px #E3E197;
}
#title {
    font-size: 14px;
    font-weight:bold;
    text-align: center;
    height: 35px; 
    line-height: 35px; 
    /* Firefox 3.6+ */
    background: -moz-linear-gradient(top, #ace, #F8FCFE); 
    /* Safari 4-5, Chrome 1-9 */ 
    /* -webkit-gradient(,  [, ]?,  [, ]? [, ]*) */
    background: -webkit-gradient(linear,top,from(#ace),to(#F8FCFE));
    /* Safari 5.1+, Chrome 10+ */
    background: -webkit-linear-gradient(top, #ace, #F8FCFE);
    /* Opera 11.10+ */
    background: -o-linear-gradient(top, #ace, #F8FCFE);
    border-bottom: dashed 1px #ECFFFF;
}
input[type=text], input[type=password] {
    transition: all 0.20s ease-in-out;
    -webkit-transition: all 0.20s ease-in-out;
    -moz-transition: all 0.20s ease-in-out;
    border:1px solid #C3D9FF;
    border-radius: 3px;
    outline: none;
}
input[type=text]:focus,input[type=password]:focus,textarea:focus{
    box-shadow:0 0 5px rgba(103,166,217,1);
    -moz-box-shadow:0 0 5px rgba(103,166,217,1);
    -webkit-box-shadow:0 0 5px rgba(103,166,217,1);
    -o-box-shadow:0 0 5px rgba(103,166,217,1);
}
</style>
</head>
<body>
<div id="loginBox">
<div id="title">PLOG - <?=_('login');?></div>
<form action="./" id="loginForm">
<ul>
<li id="a"><input type="text" name="a" maxlength="30" placeholder="<?=_('login_name');?>" /></li>
<li id="p"><input type="password" name="p"  maxlength="30" placeholder="<?=_('login_pwd');?>" /></li>
<li id="s"><input type="submit" value="<?=_('login');?>" /></li>
<li id="info"></li>
</ul>
</form>
</div>
</body>
</body>
</html>