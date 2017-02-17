define('lehu.h5.component.activity1111', [
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

    'text!template_components_activity1111'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid, _, md5,
    imagelazyload, tripledes, modeecb, busizutil,
    template_components_activity1111) {
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
        var renderFn = can.view.mustache(template_components_activity1111);
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

      ".sale_box a click": function(element, event) {
        var goodsid = element.attr("data-goodsid");
        var goodsno = element.attr("data-goodsno");
        var storeid = element.attr("data-storeid");
        this.toDetail(storeid, goodsno, goodsid);
      },

      '.sale_msg click': function(element, event) {
        window.location.href = "http://app.lehumall.com/html5/app/activityreward.html?test=test";
      },

      '.sale_box_01 .sale_box_top click': function(element, event) {
        window.location.href = "http://app.lehumall.com/html5/app/activities.html?ids=1238|1239|1240|1241|1242&pageIndex=1&flag=2";
      },

      '.sale_box_02 .sale_box_top click': function(element, event) {
        window.location.href = "http://app.lehumall.com/html5/app/activities.html?ids=1243|1244|1245|1246|1247&pageIndex=1&flag=2";
      },

      '.sale_box_03 .sale_box_top click': function(element, event) {
        window.location.href = "http://app.lehumall.com/html5/app/activities.html?ids=1248|1249|1252|1253|1254|1255&pageIndex=1&flag=2";
      },

      '.sale_box_04 .sale_box_top click': function(element, event) {
        window.location.href = "http://app.lehumall.com/html5/app/activities.html?ids=1256|1257|1198|1200|1201|1202&pageIndex=1&flag=2";
      },

      '.sale_box_05 .sale_box_top click': function(element, event) {
        window.location.href = "http://app.lehumall.com/html5/app/activities.html?ids=1203|1204|1222|1223|1224&pageIndex=1&flag=2";
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