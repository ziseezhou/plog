// pl_btn, plog simple button wedgit
// version 0.0.1
// (c) 2013 zisee zhou [fzzhgj@gmail.com]
// released under the MIT license

(function($) {

    function removeCssClass(obj) {
        var css = $.trim(obj.options.cssNormal+' '+obj.options.cssHover+' '+obj.options.cssDisabled+' '+obj.options.cssChecked);
        if (css.length > 0) {
            obj.$element.removeClass(css);
        }
    };

    function addCssClass(obj, css){
        var css = $.trim(css);
        if (css.length > 0) {
            obj.$element.addClass(css);
        }
    }

    function Group(groupName) {
        if (!this[groupName]) {
            this[groupName] = {};
        }

        this[groupName].checkId = '';
        this[groupName].name = groupName;
        this[groupName].elems = [];
    }

    function getGroup(obj, g) {
        var parent = obj.$element.parent();
        var group = parent.data('group');
        if (!group) {
            group = new Group(g);
            parent.data('group', group);
        }
        return group;
    }

    function Plbtn(element, options) {
        this.$element = $(element);
        this.options = options;
        this.enabled = true;
        this.checked = false;
    }

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

        uncheck: function() { 
            this.checked = false; 
            removeCssClass(this);
            addCssClass(this, this.options.cssNormal);
        },

        clickfun : function() {
            if (this.enabled && !this.checked) {
                if (this.options.group.length > 0) {
                    // uncheck the old none
                    var group = getGroup(this, this.options.group);
                    if (group){
                        var checkedDivId = group[this.options.group].checkId;
                        if (checkedDivId.length > 0) {
                            $('#'+checkedDivId).plbtn('uncheck');
                        }

                        group[this.options.group].checkId = this.$element.attr("id");
                    }

                    this.check();
                }

                if (typeof this.options.click == 'function') {
                    this.options.click.call();
                }
            }
        },


        belongGroup : function(g, f) {
            var group = getGroup(this, g);

            if (this.options.group != g) {
                this.options.group = g;
            }

            if (typeof f == 'function') {
                this.options.click = f;
            }

            group[g].elems.push(this.$element.attr("id"));
        }
        
    };

    $.fn.plbtn = function(options) {

        if (options === true) {
            return this.data('plbtn');
        } else if (typeof options == 'string') {
            var plbtn = this.data('plbtn');
            if (plbtn) { // execute functions
                if (!arguments[1]) {
                    plbtn[options]();
                } else {
                    plbtn[options](arguments[1], arguments[2]);
                }
            }
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
        }
        
        function leave() {
            var plbtn = get(this);
            plbtn.normal();
        }

        function clickfun() {
            var plbtn = get(this);
            plbtn.clickfun();
        }

        function belongGroup(g) {
            var plbtn = get(this);
            plbtn.belongGroup(g);
        }

        this.each(function() { get(this); });
        this.bind('mouseenter', enter).bind('mouseleave', leave);
        this.bind('click', clickfun);

        return this;
    };

    $.fn.plbtn.defaults = {
        cssNormal:   'plbtn_normal',
        cssHover:    'plbtn_hover',
        cssDisabled: 'plbtn_disabled',
        cssChecked:  'plbtn_checked',
        click: null,
        group: ''
    };

    $.fn.plbtn.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };

})(jQuery);