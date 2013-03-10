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

function isFocused(id) {
    return id==Context.navi.focused;
}

function getFocused() {
    return $("#"+Context.navi.focused);
}

Context.navi.goto = function(addrKey) {
    var dest = Context.navi.addrMaps[addrKey] || (function(){
        log('navi no key='+addr);
        addrKey = 'navi_plog';
        return 'plog';
    })();

    Context.navi.focused = addrKey;
    Context.navi.updateCSS();

    // switch to new channel
};
Context.navi.updateCSS = function(){
    $("#navi li").removeClass().addClass('navi_elem')
    .hover(function(){
        var elem = $(this);
        if (!isFocused(elem.attr("id"))) {
            elem.removeClass().addClass('navi_elem_mouseover');
        }
    }, function(){
        var elem = $(this);
        if (!isFocused(elem.attr("id"))) {
            elem.removeClass().addClass('navi_elem');
        }
    });

    getFocused().removeClass().addClass('navi_elem_focus');
};
Context.navi.init = function() {
    $("#navi li").click(function(){
        var elem = $(this);
        if (!isFocused(elem.attr("id"))) {
            Context.navi.goto(elem.attr("id"));
        }
    });

    Context.navi.updateCSS();
};


})();

// main initialization
$(document).ready(function(){
    Context.navi.init();
});