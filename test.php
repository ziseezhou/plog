<!DOCTYPE html>
 <html>
 <head>
   <meta charset="utf-8">
   <title>Plog test page</title>
 </head>
 <body>
<?php 

// test L10n
include_once('config.php');
include_once('fun.php');

$_SESSION['local'] = 'zh_rCN';

PG_ASSERT(_local_file_load('common'));

echo "<br/>";

echo "settings:"._('settings');

?>
 </body>
 </html>