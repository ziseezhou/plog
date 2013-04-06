<?php
include_once('security.php');
include_once('fun.php');
include_once('config.php');
PG_ASSERT(_local_file_load('common'));

?>
<!DOCTYPE HTML>
<html>
<head>
<title>PLOG</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href='css/main.css' rel='stylesheet' type='text/css' />
<link href='css/tipsy.css' rel='stylesheet' type='text/css' />
<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="js/jquery.tipsy.js"></script>
<script type="text/javascript" src="js/jquery.hotkeys.js"></script>
<script type="text/javascript" src="js/main.js"></script>
</head>
<body>
<div id="mask"></div>
<div id="lay0">
<div id="lay1">

<div id="navi">
    <ul>
        <li id="navi_plog"><?=_('navi_plog');?></li>
        <li id="navi_plans"><?=_('navi_plans');?></li>
        <li id="navi_banks"><?=_('navi_banks');?></li>
        <li id="navi_calendar"><?=_('navi_calendar');?></li>
        <li id="navi_settings"><?=_('navi_settings');?></li>
    </ul>
</div>
<div id="noti"></div>

<div id="content">
    <div id="content_title"></div>
    <div id="content_body"></div>
</div>

</div>
</div>
</body>
</html>