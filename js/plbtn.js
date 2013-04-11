// pl_btn, plog simple button wedgit
// version 0.0.1
// (c) 2013 zisee zhou [fzzhgj@gmail.com]
// released under the MIT license

(function($) {

    function removeCssClass(obj) {
        var css = $.trim(obj.options.cssNormal+' '+obj.options.cssHover+' '+obj.options.cssDisabled+' '+obj.options.cssChecked);
        //log(">>> $element="+obj.$element.attr('id'));
        if (css.length > 0) {
            if (typeof obj.id == 'string' && obj.id.length > 0) {
                $(obj.id).removeClass(css); // why use id, as a unknow bug
            } else {
                obj.$element.removeClass(css);
            }
        }
    };

    function addCssClass(obj, css){
        var css = $.trim(css);
        if (css.length > 0) {
            if (typeof obj.id == 'string' && obj.id.length > 0) {
                $(obj.id).addClass(css);
            } else {
                obj.$element.addClass(css);
            }
        }
    }

    function Plbtn(element, options) {
        this.$element = $(element);
        this.id      = options.id;
        this.options = options;
        this.enabled = true;
        this.checked = false;
    };

    Plbtn.prototype = {
        normal: function(){
            if (!this.enabled || this.checked) return;
            removeCssClass(this);
            addCssClass(this, this.options.cssNormal);
        },

        hover: function(){
            if (!this.enabled || this.checked) return;
            removeCssClass(this);
            addCssClass(this, this.options.cssHover);
        },

        enable: function() { 
            this.enabled = true;
            removeCssClass(this);
            addCssClass(this, this.options.cssNormal);
        },

        disable: function() { 
            this.enabled = false;
            removeCssClass(this);
            addCssClass(this, this.options.cssDisabled);
        },

        toggleEnabled: function() { 
            this.enabled = !this.enabled;
            if (this.enabled) {
                enable();
            } else {
                disable();
            }
        },

        check: function() { 
            this.checked = true;
            removeCssClass(this);
            addCssClass(this, this.options.cssChecked);
        },

        discheck: function() { 
            this.checked = false; 
            removeCssClass(this);
            addCssClass(this, this.options.cssNormal);
        },

        clickfun : function() {
            if (typeof this.options.click == 'function' && this.enabled && !this.checked) {
                this.options.click.call();
            }
        },

        setclick: function() {
            //this.$element.unbind('click');
            //if (typeof c == 'function') {
            //    this.$element.bind('click', c);
            //}
            if (typeof this.options.id == 'string' && this.options.id.length > 0 ) {
                $(this.options.id).bind('click', this.clicked);
            }
        }
    };

    $.fn.plbtn = function(options) {

        if (options === true) {
            return this.data('plbtn');
        } else if (typeof options == 'string') {
            var plbtn = this.data('plbtn');
            if (plbtn) plbtn[options](); // execute functions
            return this;
        }

        options = $.extend({}, $.fn.plbtn.defaults, options);

        function get(ele) {
            var plbtn = $.data(ele, 'plbtn');
            if (!plbtn) {
                plbtn = new Plbtn(ele, $.fn.plbtn.elementOptions(ele, options));
                $.data(ele, 'plbtn', plbtn);
            }
            return plbtn;
        }

        function enter() {
            var plbtn = get(this);
            plbtn.hover();
        };
        
        function leave() {
            var plbtn = get(this);
            plbtn.normal();
        };

        function clickfun() {
            var plbtn = get(this);
            plbtn.clickfun();
        }

        this.each(function() { get(this); });
        this.bind('mouseenter', enter).bind('mouseleave', leave);
        //setclick();
        if (options.click != null && (typeof options.id == 'string' && options.id.length > 0) ) {
            $(options.id).bind('click', clickfun);
        }

        return this;
    };

    $.fn.plbtn.defaults = {
        id:'',
        cssNormal: 'plbtn_normal',
        cssHover: 'plbtn_hover',
        cssDisabled: 'plbtn_disabled',
        cssChecked: 'plbtn_checked',
        click: null
    };

    $.fn.plbtn.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };

})(jQuery);