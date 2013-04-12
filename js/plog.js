(function() {

// =================================================================================
// Destructor
Context.content.unload = function() {
    // unbind hotkeys
    with(Context.content.subContext) {
        if (tabIsCurrent('day')) {
            hotkeyDayUnbind();
        }
    }

    // remove sub context
    Context.content.subContext = {};
}


// =================================================================================
// Defines (subContext, functions ...)
Context.content.subContext = Context.content.subContext || {};
Context.content.subContext.tab = ''; // [day|month|year]

// plog::functions
Context.content.subContext.save = function() {
    log('>>> save()');
    return false;
}

Context.content.subContext.tabIsCurrent = function(keyId) {
    return Context.content.subContext.tab==keyId;
}

Context.content.subContext.tabIsNull = function() {
    return Context.content.subContext.tab.length==0;
}

Context.content.subContext.tabSwitchToDay = function() {
    $("#plog_body textarea").css('display', 'block');
    $("#pb_m").css('display', 'none');
    $("#pb_y").css('display', 'none');
    $("#pt_d_t").css('display', 'block');
    Context.content.subContext.hotkeyDayBind();
    Context.content.subContext.tab = 'day';
}

Context.content.subContext.tabSwitchToMonth = function() {
    $("#pt_d_t").css('display', 'none');
    $("#plog_body textarea").css('display', 'none');
    $("#pb_m").css('display', 'block');
    $("#pb_y").css('display', 'none');
    Context.content.subContext.hotkeyDayUnbind();
    Context.content.subContext.tab = 'month';
}

Context.content.subContext.tabSwitchToYear = function() {
    $("#pt_d_t").css('display', 'none');
    $("#plog_body textarea").css('display', 'none');
    $("#pb_m").css('display', 'none');
    $("#pb_y").css('display', 'block');
    Context.content.subContext.hotkeyDayUnbind();
    Context.content.subContext.tab = 'year';
}

Context.content.subContext.hotkeyDayBind = function() {
    $(document).bind('keydown', 'Ctrl+s', Context.content.subContext.save);
    $("#plog_body textarea").bind('keydown', 'Ctrl+s', Context.content.subContext.save);
}
Context.content.subContext.hotkeyDayUnbind = function() {
    $(document).unbind('keydown', Context.content.subContext.save);
    $("#plog_body textarea").unbind('keydown', Context.content.subContext.save);
}

// =================================================================================
// Init

// [[
with (Context.content.subContext) {

    // toolbar button css&tip
    $(".pt").each(function() {
        var tip  = $(this).text();
        var id   = "#"+$(this).attr('id');
        var cssN = $(this).attr('id')+'_normal';
        var cssH = $(this).attr('id')+'_hover';
        var cssD = $(this).attr('id')+'_disabled';
        var cssC = $(this).attr('id')+'_checked';

        $(this).tipsy({delayIn:500, fallback:tip});
        $(this).plbtn({cssNormal:cssN, cssHover:cssH, cssDisabled:cssD, cssChecked:cssC});
        $(this).plbtn('normal');
    });


    // toolbar button click
    $("#pt_d_t_s").click(save);
    $("#pt_d").plbtn('belongGroup', 'toolbarTab', tabSwitchToDay);
    $("#pt_m").plbtn('belongGroup', 'toolbarTab', tabSwitchToMonth);
    $("#pt_y").plbtn('belongGroup', 'toolbarTab', tabSwitchToYear);

    // plog tab switch, can load from cookie
    $('#pt_d').click();


    // bind hotkeys if needed (after everything is ok)
    

} // ]] end with(Context.content.subContext)


})();