<?php
header('Content-Type: text/html; charset=utf-8');
include_once('security.php');
include_once('fun.php');
include_once('config.php');
PG_ASSERT(_local_file_load('common'));
?>
<div id="plog_root">
    <div id="plog_toolbar">
        <div id="pt_d" class="pt"><span><?=_('day');?></span></div>
        <div id="pt_m" class="pt"><span><?=_('month');?></span></div>
        <div id="pt_y" class="pt"><span><?=_('year');?></span></div>
        <div id="pt_d_t">
            <div class="pt_divider"></div>
            <div id="pt_d_t_s" class="pt"><span><?=_('save');?></span></div>
            <div id="pt_d_t_p" class="pt"><span><?=_('prev');?></span></div>
            <div id="pt_d_t_n" class="pt"><span><?=_('next');?></span></div>
            <div id="pt_d_t_t" class="pt"><span><?=_('today');?></span></div>
        </div>
        <div id="pt_m_t"></div>
        <div id="pt_y_t"></div>
    </div>
    <div id="plog_body">
        <textarea cols="30" rows="10"></textarea>
        <div id="pb_m">m</div>
        <div id="pb_y">y</div>
    </div>
</div>