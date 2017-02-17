define('lehu.h5.component.groupsuccess', [
    'zepto',
    'can',
    'lehu.h5.business.config',
    'lehu.util',
    'lehu.h5.api',
    'lehu.hybrid',
    'md5',
    'store',

    'imagelazyload',
    'lehu.utils.busizutil',

    'text!template_components_groupsuccess'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid, md5, store,
    imagelazyload, busizutil,
    template_components_groupsuccess) {
    'use strict';

    return can.Control.extend({

      helpers: {
        'lehu-img': function(imgprefix, img) {
          if (_.isFunction(imgprefix)) {
            imgprefix = imgprefix();
          }

          if (_.isFunction(img)) {
            img = img();
          }

          if (img.indexOf("http://") > -1) {
            return img;
          }

          return imgprefix + img;
        }
      },

      param: {},

      /**
       * @override
       * @description 初始化方法
       */
      init: function() {
        this.initData();
        this.render();
      },

      initData: function() {
        this.URL = LHHybrid.getUrl();
        this.options.data = new can.Map({
          "grouplist": null,
          "joinlist": null,
          "successlist": null
        });
      },

      render: function() {
        var param = can.deparam(window.location.search.substr(1));

        var map = {
          "open": "queryActivityInfo.do",
          "join": "partInActivityInfo.do",
          "success": "getSuccGroupInfo.do"
        }
        this.sendRequest(map[param.action], param.activityid, param.id);
      },

      /**
       *id（团的id），activityid（活动id）
       */
      sendRequest: function(action, activityId, id) {
        var that = this;

        var param = {
          "activityId": activityId
        }

        if (id) {
          param.id = id;
        }

        var api = new LHAPI({
          url: this.URL.SERVER_URL + action,
          data: param,
          method: 'post'
        });

        api.sendRequest()
          .done(function(data) {

            that.options.activitymap = data.activitymap;
            that.options.userlist = data.userlist;
            that.options.partake_num = data.partake_num;

            that.options.firstUser = that.options.userlist[0];
            that.options.secondUser = that.options.userlist[1];

            if (that.options.userlist.length > 2) {
              that.options.thirdUser = that.options.userlist[2];
              that.options.lastUser = that.options.userlist.slice(2);
            }

            //图片前缀
            that.options.imgprefix = that.URL.IMAGE_URL;

            var renderList = can.mustache(template_components_groupsuccess);
            var html = renderList(that.options, that.helpers);
            that.element.html(html);
          })
          .fail(function(error) {
            util.tip(error.msg);
          })
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

      ".footer_buy click": function() {
        this.toDetail(this.options.activitymap.STORE_ID, this.options.activitymap.GOODS_NO, this.options.activitymap.GOODS_ID);
      },

      "#sharetip click": function(element, event) {
        $("#sharetip").hide();
      },

      "#share click": function(element, event) {
        var param = can.deparam(window.location.search.substr(1));
        var version = param.version;
        if (!version && !util.isMobile.WeChat()) {
          util.tip("请升级app到最新版本后使用!");
          return false;
        }

        if (util.isMobile.WeChat()) {
          $("#sharetip").show();
          return false;
        }

        var paramObj = can.deparam(window.location.search.substr(1));
        // paramObj.sharefromapp = true;
        delete paramObj.version;
        delete paramObj.userid;
        delete paramObj.youtui;
        var paramStr = can.param(paramObj);

        var shareURL = 'http://' + location.host + location.pathname + "?" + paramStr;

        var jsonParams = {
          'funName': 'share_fun',
          'params': {
            'title': "汇银乐虎全球购-领券中心",
            'type': "1",
            'video_img': "",
            'shareUrl': shareURL,
            'shareImgUrl': "http://app.lehumall.com/html5/app/images/Shortcut_114_114.png",
            'text': "汇银乐虎全球购，赶紧领取优惠券吧，手慢无！"
          }
        };
        LHHybrid.nativeFun(jsonParams);
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
      }
    });

  });