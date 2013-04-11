// main.js
(function() {


// =================================================================================
// log() define 

var DEBUG = true;
//console = console || {};
console = typeof console==='undefined' ? {} : console; // avoid error on IE6
console.log = console.log || function(){};
log = function(s) {
    if (DEBUG) {
        console.log(s);
    }
};


// =================================================================================
// $.functions define

// Cmmon facilities
$.inputHangup = function() {
    $("#mask").css('display', 'block');
}

$.inputRecover = function() {
    $("#mask").css('display', 'none');
}


// =================================================================================
// Context global

Context = {};
Context.navi = {};
Context.navi.focused = 'navi_plog'; // default key
Context.navi.addrMaps = {
    'navi_plog'     : 'plog',
    'navi_plans'    : 'plans',
    'navi_banks'    : 'banks',
    'navi_calendar' : 'calendar',
    'navi_settings' : 'settings'
};


// =================================================================================
// Context navigartion

Context.navi.isFocusedId = function(id) {
    return id==Context.navi.focused;
}

Context.navi.getFocusedObj = function() {
    return $("#"+Context.navi.focused);
}

Context.navi.getFocusedKey = function() {
    with (Context.navi) {
        if (addrMaps[focused]) {
            return addrMaps[focused];
        }

        // fetch a default or the stored one
        return 'plog';
    }
}

Context.navi.getFocusedNaviId = function() {
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

Context.navi.updateCSS = function() {
    with (Context.navi) {
        $("#navi li").removeClass().addClass('navi_elem')
        .hover(function() {
            var elem = $(this);
            if (!isFocusedId(elem.attr("id"))) {
                elem.removeClass().addClass('navi_elem_mouseover');
            }
        }, function() {
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
        $("#navi li").click(function() {
            var elem = $(this);
            if (!isFocusedId(elem.attr("id"))) {
                goto(elem.attr("id"));
            }
        });

        updateCSS();
    }

};


// =================================================================================
// Context content

Context.content = {};
Context.content.unload = null; // setup by[plog.js|plans.js|banks.js ...]

Context.content.load = function(destKey) {
    with(Context.content) {
        if ($.isFunction(unload)) {
            unload();
            unload = null;
        }

        // animation unload

        // load new content
        var body = $('#content_body');
        body.empty();
        $.get('?c='+destKey, {},
            function (data) {
                body.html(data);
            }, 'html')
         .fail(function() { log('>>> Content request failed.'); })
         .done(function() {
            // load and execute script
            var options = {
            url: "js/"+destKey+'.js',
            dataType: "script",
            cache: true
            };

            jQuery.ajax(options)
            .fail(function() { log('>>> js request failed.'); });
         });
    }
}

Context.content.init = function() {
    Context.navi.goto(Context.navi.getFocusedNaviId());
}


// =================================================================================
// Button
$.button = function(conf) {
    ;
}


// =================================================================================
// Init
$(document).ready(function() {
    Context.navi.init();
    Context.content.init();

    /** test code
    $('#btn1').plbtn({id:'#btn1', click:function(){alert('btn1');}});
    $("#btn2").plbtn({id:'#btn2', click:function(){alert('btn2');}});
    $("#btn3").plbtn({id:'#btn3', click:function(){alert('btn3');}});
    $("#btn4").plbtn({id:'#btn4', click:function(){alert('btn4');}});
    $("#btn1").tipsy({delayIn:500, fallback:"btn1"});
    $("#btn2").tipsy({delayIn:500, fallback:"btn2"});
    $("#btn3").plbtn('disable');
    $("#btn4").plbtn('check');*/
    
});


})();

