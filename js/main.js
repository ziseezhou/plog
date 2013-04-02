// main.js

(function(){
var DEBUG = true;
console = console || {};
console.log = console.log || function(){};
log = function(s) {
    if (DEBUG) {
        console.log(s);
    }
};

// Context zone
Context = {};
Context.navi = {};
Context.navi.focused = 'navi_plog'; // default key
Context.navi.addrMaps = {
    'navi_plog'     : 'plog',
    'navi_plans'    : 'plans',
    'navi_banks'    : 'banks',
    'navi_calendar' : 'calendar',
    'navi_settings' : 'settings',
};

Context.navi.isFocusedId = function(id) {
    return id==Context.navi.focused;
}

Context.navi.getFocusedObj = function (){
    return $("#"+Context.navi.focused);
}

Context.navi.getFocusedKey = function () {
    with (Context.navi) {
        if (addrMaps[focused]) {
            return addrMaps[focused];
        }

        // fetch a default or the stored one
        return 'plog';
    }
}

Context.navi.getFocusedNaviId = function () {
    with (Context.navi) {
        if (addrMaps[focused]) {
            return focused;
        }

        // fetch a default or the stored one
        return 'navi_plog';
    }
}

Context.navi.goto = function(naviId) {
    if (!Context.navi.addrMaps[naviId]) {
        log('>>> navi no naviId='+naviId);
        return;
    }

    var dest = Context.navi.addrMaps[naviId];
    Context.navi.focused = naviId;
    Context.navi.updateCSS();

    // switch to new channel
    Context.content.load(dest);
};

Context.navi.updateCSS = function(){
    with (Context.navi) {
        $("#navi li").removeClass().addClass('navi_elem')
        .hover(function(){
            var elem = $(this);
            if (!isFocusedId(elem.attr("id"))) {
                elem.removeClass().addClass('navi_elem_mouseover');
            }
        }, function(){
            var elem = $(this);
            if (!isFocusedId(elem.attr("id"))) {
                elem.removeClass().addClass('navi_elem');
            }
        });

        getFocusedObj().removeClass().addClass('navi_elem_focus');
    }
};
Context.navi.init = function() {
    with (Context.navi) {
        $("#navi li").click(function(){
            var elem = $(this);
            if (!isFocusedId(elem.attr("id"))) {
                goto(elem.attr("id"));
            }
        });

        updateCSS();
    }

};

Context.content = {};
Context.content.unload = null;
Context.content.load = function(destKey) {
    with(Context.content) {
        if ($.isFunction(unload)) unload();

        // animation unload

        // load new content
        var body = $('#content_body');
        body.empty();
        $.get(destKey+'.php', {},
            function (data){
                body.html(data);
            }, 'html')
         .fail(function(){ log('Content request failed.'); });

         // load and execute script
         var options = {
            url: "js/"+destKey+'.js',
            dataType: "script",
            cache: true
         };

         jQuery.ajax(options)
         .fail(function(){ log('js request failed.'); });
    }
}
Context.content.init = function() {
    // fetch the default or stored channel
    with (Context.navi) {
        goto(getFocusedNaviId());
    }
}




})();

// main initialization
$(document).ready(function(){
    Context.navi.init();
    Context.content.init();
});