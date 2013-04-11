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
Context.content.subContext.tab = "day"; // can load from cookie, [day|month|year]

// plog::functions
Context.content.subContext.save = function() {
    log('>>> save()');
    return false;
}

Context.content.subContext.tabIsCurrent = function(keyId) {
    return Context.content.subContext.tab==keyId;
}

Context.content.subContext.tabSwitchTo = function(keyId, force) {
    if (Context.content.subContext.tabIsCurrent(keyId) && !force) {
        return;
    }

    //log('>>> tab '+Context.content.subContext.tab+'->'+keyId);

    //$("#pt_d").tipsy('disable');
    //$("#pt_m").tipsy('disable');
    //$("#pt_y").tipsy('disable');
    $("#pt_d_t").css('display', 'none');

    if (keyId == "day") {
        $("#pt_d").plbtn('check');
        $("#pt_m").plbtn('discheck');
        $("#pt_y").plbtn('discheck');
        $("#plog_body textarea").css('display', 'block');
        $("#pb_m").css('display', 'none');
        $("#pb_y").css('display', 'none');
        $("#pt_d_t").css('display', 'block');
        Context.content.subContext.hotkeyDayBind();
    } else if (keyId == "month") {
        $("#pt_d").plbtn('discheck');
        $("#pt_m").plbtn('check');
        $("#pt_y").plbtn('discheck');
        $("#plog_body textarea").css('display', 'none');
        $("#pb_m").css('display', 'block');
        $("#pb_y").css('display', 'none');
        Context.content.subContext.hotkeyDayUnbind();
    } else if (keyId == "year") {
        $("#pt_d").plbtn('discheck');
        $("#pt_m").plbtn('discheck');
        $("#pt_y").plbtn('check');
        $("#plog_body textarea").css('display', 'none');
        $("#pb_m").css('display', 'none');
        $("#pb_y").css('display', 'block');
        Context.content.subContext.hotkeyDayUnbind();
    }

    // toolbar button tip
    //$(".pt").each(function() {
    //    var tip = $(this).text();
    //    $(this).tipsy({delayIn:500, fallback:tip}).tipsy('enable');
    //});

    Context.content.subContext.tab = keyId;
}

Context.content.subContext.hotkeyDayBind = function() {
    //log('>>> day bind hotkey');
    $(document).bind('keydown', 'Ctrl+s', Context.content.subContext.save);
    $("#plog_body textarea").bind('keydown', 'Ctrl+s', Context.content.subContext.save);
}
Context.content.subContext.hotkeyDayUnbind = function() {
    //log('>>> day unbind hotkey ~');
    $(document).unbind('keydown', Context.content.subContext.save);
    $("#plog_body textarea").unbind('keydown', Context.content.subContext.save);
}

// =================================================================================
// Init

// [[
with (Context.content.subContext) {

    // toolbar button tip
    
    $(".pt").each(function() {
        var tip  = $(this).text();
        var id   = "#"+$(this).attr('id');
        var cssN = $(this).attr('id')+'_normal';
        var cssH = $(this).attr('id')+'_hover';
        var cssD = $(this).attr('id')+'_disabled';
        var cssC = $(this).attr('id')+'_checked';

        //log(">>> id="+id+", cssN="+cssN+", cssH="+cssH+", cssD="+cssD+", cssC="+cssC);
        $(this).tipsy({delayIn:500, fallback:tip});
        $(this).plbtn({cssNormal:cssN, cssHover:cssH, cssDisabled:cssD, cssChecked:cssC});
        $(this).plbtn('normal');
    });


    // toolbar button click
    $('.pt').click(function() {
        var btnId = $(this).attr('id');

        if (btnId == 'pt_d') {
            tabSwitchTo("day");
        } else if (btnId == 'pt_m') {
            tabSwitchTo("month");
        } else if (btnId == 'pt_y') {
            tabSwitchTo("year");
        } else if (btnId == 'pt_d_t_s') {
            save();
        } else if (btnId == 'pt_d_t_p') {
            ;
        }
    });

    // plog tab switch
    tabSwitchTo(tab, true);

    // bind hotkeys (after everything is ok)
    

} // ]] end with(Context.content.subContext)


})();