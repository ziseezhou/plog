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

// =================================================================================
// Context navigartion, [plog|plans|banks|calendar|settings]

Context.navi               = {};
Context.navi.clickPlog     = function(){ Context.content.load('plog');      };
Context.navi.clickPlans    = function(){ Context.content.load('plans');     };
Context.navi.clickBanks    = function(){ Context.content.load('banks');     };
Context.navi.clickCalendar = function(){ Context.content.load('calendar');  };
Context.navi.clickSettings = function(){ Context.content.load('settings');  };

Context.init = function() {
    $('#navi li').each(function(){
        $(this).plbtn({cssNormal:'navi_normal', cssHover:'navi_hover', cssDisabled:'navi_normal', cssChecked:'navi_checked'});
        $(this).plbtn('normal');
    });
    $("#navi_plog").plbtn('belongGroup',     'toolbarTab', Context.navi.clickPlog);
    $("#navi_plans").plbtn('belongGroup',    'toolbarTab', Context.navi.clickPlans);
    $("#navi_banks").plbtn('belongGroup',    'toolbarTab', Context.navi.clickBanks);
    $("#navi_calendar").plbtn('belongGroup', 'toolbarTab', Context.navi.clickCalendar);
    $("#navi_settings").plbtn('belongGroup', 'toolbarTab', Context.navi.clickSettings);

    // init channel, default can be read from cookie
    var defaultChannel = 'plog';
    $('#navi_'+defaultChannel).click();
};


// =================================================================================
// Context content

Context.content = {};
Context.content.unload = null; // setup by [plog.js| plans.js| banks.js ...]

Context.content.load = function(destKey) {
    with(Context.content) {
        $.inputHangup();

        // destructor
        if ($.isFunction(unload)) {
            unload();
            unload = null;
        }

        // load new content
        $('#content_body').hide();
        $('#content_body').empty();

        $.get(
            '?c='+destKey, 
            {},
            function (data) {
                $('#content_body').html(data);
            },
            'html'
        )
        .fail(function() { log('>>> Content request failed.'); $.inputRecover(); })
        .done(function() {

            // load and execute script
            var options = {
                url:        "js/"+destKey+'.js',
                dataType:   "script",
                cache:      true
            };

            jQuery.ajax(options)
            .fail(function() { log('>>> js request failed.'); $.inputRecover(); })
            .done(function() { $('#content_body').fadeIn(300); $.inputRecover(); });
         });
    }
}

// =================================================================================
// Init
$(document).ready(function() {
    Context.init();

    // @supress default ctrl+s behave
    $(document).bind('keydown', 'Ctrl+s', function(){return false;});

    /** test code
    //$('#btn1').plbtn({click:function(){alert('btn1');}});
    //$("#btn2").plbtn({click:function(){alert('btn2');}});
    $("#btn3").plbtn({click:function(){alert('btn3');}});
    $("#btn4").plbtn({click:function(){alert('btn4');}});
    //$("#btn1").tipsy({delayIn:500, fallback:"btn1"});
    //$("#btn2").tipsy({delayIn:500, fallback:"btn2"});
    $("#btn3").plbtn('disable');
    $("#btn4").plbtn('check');
    $('#btn1').plbtn({group:'toolbarTab'});
    $("#btn2").plbtn({group:'toolbarTab'});
    $("#btn1").plbtn('belongGroup', 'toolbarTab');
    $("#btn2").plbtn('belongGroup', 'toolbarTab');
    $("#btn2").click();*/
    
});


})();

