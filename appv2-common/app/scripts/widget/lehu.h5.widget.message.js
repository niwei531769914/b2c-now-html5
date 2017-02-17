define('lehu.h5.widget.message',

  [
    'zepto',
    'can',
    'lehu.h5.business.config',
    'text!template_widget_message'
  ],

  function($, can, LHConfig, template_widget_message) {
    'use strict';

    return can.Control.extend({

      init: function(element, options) {

        // 初始化数据
        this.data.height = options.height;
        this.data.width = options.width;
        this.data.cls = option.cls;
        this.data.message = options.message;
        this.data.duration = options.duration || 3000;

        // 初始化组件
        if ($("#messageBox").length == 0) {
          this.render();
          this.adjustHeight();
        }

        // 隐藏弹窗口
        var that = this;

        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(function() {
          $("#messageBox").style("display", "none");
          that.data = null;
        }, this.data.duration)
      },

      render: function() {
        this.setup($('body'));
        var renderFn = can.mustache(template_widget_message);
        this.options.html = renderFn(this.data);
        $('body').append(this.options.html);
      },

      adjustHeight: function() {
        $("#messageBox").find(".messge-box")[0].style.marginTop = (document.documentElement.clientHeight - this.data.height) / 2 + "px"
        $("#messageBox").find(".messge-box").width(this.data.width + "px");
        $("#messageBox").find(".messge-box").height(this.data.height + "px");
        $("#messageBox").style("display", "block");
      }
    });
  })