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
<script type="text/javascript" src="js/main.js"></script>
</head>
<body>
<?php 

?>
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

<div id="scene"></div>

</div>
</div>
</body>
</html>