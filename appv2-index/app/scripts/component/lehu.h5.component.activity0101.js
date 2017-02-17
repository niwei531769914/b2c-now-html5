define('lehu.h5.component.activity0101', [
    'zepto',
    'can',
    'lehu.h5.business.config',
    'lehu.util',
    'lehu.h5.api',
    'lehu.hybrid',
    'underscore',
    'md5',
    'imagelazyload',
    'tripledes',
    'modeecb',
    'lehu.utils.busizutil',
    'text!template_components_activity0101'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid, _, md5, imagelazyload, tripledes, modeecb, busizutil, template_components_activity0101) {
    'use strict';

    /**
     * 接口加密key
     */
    var KEY = "abc123wm456de789";
    var DES3_KEY = "eimseimseim@wm100$#365#$";
    var DES3_IV = "20141109";

    return can.Control.extend({

      helpers: {

      },

      init: function() {

        this.initData();

        this.render();
      },

      initData: function() {
        this.URL = LHHybrid.getUrl();
        this.URL.SERVER_URL = 'http://app.lehumall.com/'
      },

      render: function() {
        var renderFn = can.view.mustache(template_components_activity0101);
        var html = renderFn(this.options.data, this.helpers);
        this.element.html(html);

      },

      toDetail: function(STORE_ID, GOODS_NO, GOODS_ID) {
        var jsonParams = {
          'funName': 'good_detail_fun',
          'params': {
            'STORE_ID': STORE_ID,
            'GOODS_NO': GOODS_NO,
            'GOODS_ID': GOODS_ID
          }
        };
        LHHybrid.nativeFun(jsonParams);
      },

      ".activity_box a click": function(element, event) {
        var goodsid = element.attr("data-goodsid");
        var goodsno = element.attr("data-goodsno");
        var storeid = element.attr("data-storeid");
        this.toDetail(storeid, goodsno, goodsid);
      },

      '.activity_group click': function(element, event) {
        window.location.href = "http://app.lehumall.com/html5/app/group.html";
      },

      '.activity_carousel click': function(element, event) {
        window.location.href = "http://app.lehumall.com/html5/app/carousel.html";
      },

      '.activity_coupon click': function(element, event) {
        window.location.href = "http://app.lehumall.com/html5/app/coupon.html";
      },

      '.activity_box_01 .activity_box_top click': function(element, event) {
        window.location.href = "http://app.lehumall.com/html5/app/activities.html?ids=1309|1310|1311|1312|1313|1314&pageIndex=1&flag=2";
      },

      '.activity_box_02 .activity_box_top click': function(element, event) {
        window.location.href = "http://app.lehumall.com/html5/app/activities.html?ids=1315|1422|1423|1424|1006|1008&pageIndex=1&flag=2";
      },

      '.activity_box_03 .activity_box_top click': function(element, event) {
        window.location.href = "http://app.lehumall.com/html5/app/activities.html?ids=1149|1151|1152|1155|1156&pageIndex=1&flag=2";
      },

      '.activity_box_04 .activity_box_top click': function(element, event) {
        window.location.href = "http://app.lehumall.com/html5/app/activities.html?ids=1154|1157|1158|1160|1164&pageIndex=1&flag=2";
      },

      '.activity_box_05 .activity_box_top click': function(element, event) {
        window.location.href = "http://app.lehumall.com/html5/app/activities.html?ids=1162|1159|1161|1167|1166|1352&pageIndex=1&flag=2";
      },
      '.activity_box_06 .activity_box_top click': function(element, event) {
        window.location.href = "http://app.lehumall.com/html5/app/activities.html?ids=993|994|1004|992|1165|1372&pageIndex=1&flag=2";
      },
      '.activity_box_07 .activity_box_top click': function(element, event) {
        window.location.href = "http://app.lehumall.com/html5/app/activities.html?ids=1373|1374|1375|1376|1377|1378&pageIndex=1&flag=2";
      },
      '.activity_box_08 .activity_box_top click': function(element, event) {
        window.location.href = "http://app.lehumall.com/html5/app/activities.html?ids=1379|1380|1381|1382|1383|1384&pageIndex=1&flag=2";
      },

      '.back click': function() {
        // temp begin  
        // 在app外部使用 点击返回 如果没有可返回则关闭掉页面
        var param = can.deparam(window.location.search.substr(1));
        if (!param.version) {
          if (history.length == 1) {
            window.opener = null;
            window.close();
          } else {
            history.go(-1);
          }
          return false;
        }
        // temp end

        if (util.isMobile.Android() || util.isMobile.iOS()) {
          var jsonParams = {
            'funName': 'back_fun',
            'params': {}
          };
          LHHybrid.nativeFun(jsonParams);
          console.log('back_fun');
        } else {
          history.go(-1);
        }
      },

      '.getCoupon click': function(element, event) {
        var activeId = $(element).attr("data-acitveId");
        var param = can.deparam(window.location.search.substr(1));
        var userid = param.userid;
        if (!userid) {
          var jsonParams = {
            'funName': 'login',
            'params': {}
          };
          LHHybrid.nativeFun(jsonParams);
        } else {
          this.getCoupon(userid, activeId);
        }
      }
    });
  });