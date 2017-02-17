define('lehu.h5.framework.global', function() {
  'use strict';

  var global = {

    init: function() {

      //1. 页面rem计算
      this.initRem();

      //2. 显示文档结构
      this.showDocument();
    },

    // 显示文档结构
    showDocument: function() {
      var that = this;

      that.setDocumentVisibility();

      // setTimeout(function() {
      //   that.setDocumentVisibility();
      // }, 200);
    },

    setDocumentVisibility: function() {
      document.body.style.visibility = "visible";
      document.body.style.visibility = "visible";

      var classVal = document.body.getAttribute("class");
      if (!classVal) {
        classVal = document.createAttribute("class");
        classVal.value = "jbox";
      } else {
        classVal = classVal.concat(" jbox");
      }

      document.body.setAttribute("class", classVal);
    },

    //页面rem计算
    initRem: function(argument) {

      this.recalc();

      if (!document.addEventListener) {
        return false;
      }

      window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', this.recalc, false);
      document.addEventListener('DOMContentLoaded', this.recalc, false);
    },

    recalc: function() {
      // ?为啥两个一样的变量 这不被覆盖了么
      var clientWidth = document.documentElement.clientWidth;
      // var clientWidth = document.getElementsByClassName("nwrapper")[0].style.width;
      document.documentElement.style.fontSize = 100 * (clientWidth / 640) + 'px';
    }
  }

  global.init();

});