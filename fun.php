<?php 

// check requst is or not from mobile
function is_mobile(){
    $regex_match="/(nokia|iphone|android|motorola|^mot\-|softbank|foma|docomo|kddi|up\.browser|up\.link|";
    $regex_match.="htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|";
    $regex_match.="blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam\-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|";
    $regex_match.="symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte\-|longcos|pantech|gionee|^sie\-|portalmmm|";
    $regex_match.="jig\s browser|hiptop|^ucweb|^benq|haier|^lct|opera\s*mobi|opera\*mini|320x320|240x320|176x220";
    $regex_match.=")/i";

    return isset($_SERVER['HTTP_X_WAP_PROFILE']) or isset($_SERVER['HTTP_PROFILE']) or preg_match($regex_match, strtolower($_SERVER['HTTP_USER_AGENT']));
}

// push 404
function push_404() {
    header('HTTP/1.1 404 Not Found');
    header("status: 404 Not Found"); 
}

// filter sql injection char
function str_remove_sql_injection($s)
{
    //$s=str_replace("\\", '&#92;', $s);
    $s = ereg_replace("'", "&#39", $s);
    $s = ereg_replace('"', "&quot;", $s);

    return $s;
}


function _local_file_load($localFileName){
    global $_PG_LOCAL;

    if (!isset($_PG_LOCAL) || !is_array($_PG_LOCAL)) {
        $_PG_LOCAL = array();
    }

    // fetch local flag
    $local = $_SESSION['local']; // example: zh_rCN
    if ( strlen($local)<=0) {
        $local = "en_rUS"; // default
    } 

    $filePath = "./local/".$local."/".$localFileName.'.txt'; // example: /local/zh_rCN/common.txt

    // according to the local session, load the matching local string file.
    $fArray = @file($filePath);
    if ($fArray==FALSE) {
        return array(-1, "Failed to open file:".$filePath);
    }

    foreach ($fArray as $lineStr) {
        $keyValue = explode("|", $lineStr, 2);

        $_PG_LOCAL[$keyValue[0]] = $keyValue[1];
    }

}

function PG_ASSERT($ret) {
    global $_PG_LOCAL;
    global $_PG_DEBUG;

    if (isset($_PG_DEBUG) && $_PG_DEBUG && is_array($ret)) {
        echo "Assert: ".$ret[0].", ".$ret[1];
    }
}

function _($key) {
    global $_PG_LOCAL;

    if (!isset($_PG_LOCAL) || 
        !is_array($_PG_LOCAL) ||
        !array_key_exists($key, $_PG_LOCAL)) {
        return $key;
    }

    return $_PG_LOCAL[$key];
}


?>