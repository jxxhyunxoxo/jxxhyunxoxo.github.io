/*
 * writer : onekwan
 * version : 1.0.6
 * update-date : 2015.6.25
 * use : $().smImg({resize:'on'});
 * data-smimg=''
*/
(function (window, $, undefined) {
    $.fn.smImg = function (options) {
        var instance = new $.SmImg(this, options);
        instance._init();
        return instance;
    };
    $.SmImg = function (container, options) {
        this.container = $(container);
        this.options = $.extend({ resize: "" }, options);
        this.imgItems = [];
    };
    $.SmImg.prototype = {
        _init: function () {
            var self = this;
            this.search_imgTag(); 
            this.apply_style(); 
            if (this.options.resize === "on") {
                this.resizeEvent();
            }
        },
        search_imgTag: function () { 
            var self = this;
            self.container.each(function () {
                if ($(this).get(0).nodeName === "IMG") {
                    self.slide_attr(self.imgItems, $(this));
                }
            });
            $("img", self.container).each(function () {
                self.slide_attr(self.imgItems, $(this));
            });
        },
        slide_attr: function (container, ele) { 
			ele.css({ 
				'position':   'static',
				'width':      '100%',
				'height': 'auto',
                'visibility' : 'hidden'
			});
            if (ele.attr("data-smimg") === "undefined" || ele.attr("data-smimg") == null) {
                var attr = [];
            } else {
                var attr = ele.attr("data-smimg").split(" ");
            }

            if (attr.length < 0 || attr.length > 3) { return false; }
            var obj = {};
            obj.obj = ele;
            switch (attr.length) {
                case 0:
                    obj.x = "center";
                    obj.y = "center";
                    obj.type = "cover";
                    break;
                case 1:
                    obj.x = "center";
                    obj.y = "center";
                    obj.type = attr[0];
                    break;
                case 2:
                    obj.x = attr[0];
                    obj.y = attr[1];
                    obj.type = "cover";
                    break;
                case 3:
                    obj.x = attr[0];
                    obj.y = attr[1];
                    obj.type = attr[2];
                    break;
            }
            container.push(obj);
        },
        apply_style: function () { 
            var self = this;
            this.setCss();
            for (var i = 0, e = self.imgItems.length; i < e; i++) {
                (function (idx) {
                    var img = self.imgItems[idx].obj;
                    if (img.get(0).complete || img.get(0).readyState === 'complete') {
                        self.resizing(self.imgItems[idx]);
                        self.positioning(self.imgItems[idx]);
                        self.imgItems[idx].obj.css({ visibility: "visible" });
                    } else {
                        img.bind("load", function () {
                            self.resizing(self.imgItems[idx]);
                            self.positioning(self.imgItems[idx]);
                            self.imgItems[idx].obj.css({ visibility: "visible" });
                        });
                        
                        if (navigator.userAgent.indexOf("Trident/5") >= 0 || navigator.userAgent.indexOf("Trident/6")) {
                            self.imgItems[i].obj.attr("src", self.imgItems[i].obj.attr("src"));
                        }
                    }

                })(i);
            }
        },
        resizeEvent: function () { 
            var self = this;
            $(window).resize(function () {
                for (var i = 0, e = self.imgItems.length; i < e; i++) {
                    self.resizing(self.imgItems[i]);
                    self.positioning(self.imgItems[i]);
                }
            });
        },
        resizing: function (ele) { 
            var setSt = 0;
            if (ele.type === "cover" || ele.type === "cover_auto") {
                this.compareImageRatio(ele.obj);
            } else if (ele.type === "cover_width") {
                setSt = 1;
            } else if (ele.type === "cover_height") {
                setSt = 2;
            } else {
                return false;
            }

            switch (setSt) {
                case 1:
                    ele.obj.css({ width: "100%", height: "auto" });
                    break;
                case 2:
                    ele.obj.css({ width: "auto", height: "100%" });
                    break;
                case 0:
                    return false;
            }
        },
        setCss: function () { 
            var self = this;
            for (var i = 0, e = self.imgItems.length; i < e; i++) {
                var parent = self.imgItems[i].obj.parent();
                parent.css({ overflow: "hidden", position: parent.css("position") == "absolute" ? "absolute" : "relative" });
                self.imgItems[i].obj.css({ "position": "absolute", "top": "0", "left": "0" });
            }
        },
        compareImageRatio: function (obj) {  
            var parent = obj.parent();
            var p_r = parent.width() / parent.height();
            var c_r = obj.width() / obj.height();
            if (p_r >= c_r) {
                
                obj.css({ width: parent.width(), height: parent.width()*(1/c_r) });
            } else {
                obj.css({ width: parent.height()*(c_r), height: parent.height() });
            }
        },
        positioning: function (ele) { 
            var x = "";
            var y = "";
            var parent = ele.obj.parent();
            var diffWidth = parent.width() - ele.obj.width();
            var diffHeight = parent.height() - ele.obj.height();
            

            if (ele.x === "center") {
                x = Math.floor(diffWidth / 2);
            } else if (ele.x === "left") {
                x = "0";
            } else if (ele.x === "right") {
                x = diffWidth;
            } else if (checkPer(ele.x)) {
                var val = ele.x.substring(0, ele.x.length - 1);
                val = parseInt(val);
                x = Math.floor(diffWidth * (val / 100));
            }
            if (ele.y === "center") {
                y = Math.floor(diffHeight / 2);
            } else if (ele.y === "top") {
                y = "0";
            } else if (ele.y === "bottom") {
                y = diffHeight;
            } else if (checkPer(ele.y)) {
                var val = ele.y.substring(0, ele.y.length - 1);
                val = parseInt(val);
                y = Math.floor(diffHeight * (val / 100));
            }
            ele.obj.css({ top: y + "px", left: x + "px" });
            function checkPer(val) {
                var check = val.substring(0, val.length - 1);
                var ch = val.substring(val.length - 1, val.length);
                if (jQuery.isNumeric(check) && ch === "%") {
                    return true;
                } else {
                    return false;
                }
            }
           
           
        },
		update : function(){
			this.search_imgTag();
            this.apply_style();
		}
    }
})(window, jQuery);