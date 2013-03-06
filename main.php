<?php
include_once('security.php');
include_once('fun.php');
include_once('config.php');
PG_ASSERT(_local_file_load('common'));

?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href='css/main.css' rel='stylesheet' type='text/css' />
<title>PLOG</title>
<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
<script type="text/javascript">
var context = {'sceneValue':'navi_plog'};
context.update_navi_css = function(){
    $("#navi li").mouseover(function(){
        var elem = $(this);
        if (elem.attr("id")!=context.sceneValue) {
            elem.removeClass().addClass('navi_elem_mouseover');
        }
    }).mouseout(function(){
        var elem = $(this);
        if (elem.attr("id")!=context.sceneValue) {
            elem.removeClass().addClass('navi_elem_mouseout');
        }
    }).removeClass().addClass('navi_elem');

    //alert(context.sceneValue);
    $("#"+context.sceneValue).removeClass().addClass('navi_elem_focus');
};

$(document).ready(function(){
    $("#navi li").click(function(){
        var thisId = $(this).attr('id');
        if (thisId != context.sceneValue) {
            context.sceneValue = $(this).attr('id');
            context.update_navi_css();
        }
    });
    context.update_navi_css();
});


</script>
</head>
<body>
<?php 

?>
<div id="lay0">
<div id="lay1">

<div id="navi">
    <ul>
        <li id="navi_plog"><?=_('navi_plog');?></li>
        <li id="navi_thoughts"><?=_('navi_thoughts');?></li>
        <li id="navi_banks"><?=_('navi_banks');?></li>
        <li id="navi_calendar"><?=_('navi_calendar');?></li>
        <li id="navi_settings"><?=_('navi_settings');?></li>
    </ul>
</div>
<div id="noti"></div>

<div id="scene"></div>

</div>
</div>
</body>
</html>