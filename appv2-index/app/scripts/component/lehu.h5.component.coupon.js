define('lehu.h5.component.coupon', [
    'zepto',
    'can',
    'lehu.h5.business.config',
    'lehu.util',
    'lehu.h5.api',
    'lehu.hybrid',

    'imagelazyload',
    'lehu.utils.busizutil',

    'text!template_components_coupon'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid,
    imagelazyload, busizutil,
    template_components_coupon) {
    'use strict';

    // 1全部（未使用），2即将过期，3待领取的
    var COUPON_ALL = "1";
    var COUPON_UNUSED = "2";
    var COUPON_UNGET = "3";

    return can.Control.extend({

      param: {},

      helpers: {
        hasnodata: function(data, options) {
          if (!data || data.length == 0) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },
      },

      /**
       * @override
       * @description 初始化方法
       */
      init: function() {
        this.initData();
        this.render();
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

        var jsonParams = {
          'funName': 'share_fun',
          'params': {
            'title': "汇银乐虎全球购-领券中心",
            'type': "1",
            'video_img': "",
            'shareUrl': 'http://' + window.location.host + "/html5/app/coupon.html?from=share",
            'shareImgUrl': "http://app.lehumall.com/html5/app/images/Shortcut_114_114.png",
            'text': "汇银乐虎全球购，赶紧领取优惠券吧，手慢无！"
          }
        };
        LHHybrid.nativeFun(jsonParams);
      },

      initData: function() {
        this.URL = LHHybrid.getUrl();
      },

      render: function() {
        var that = this;

        this.param = {
          // "userId": this.userId,
          "status": COUPON_UNGET,
          "pageindex": "1",
          "pagesize": "20"
        };

        busizutil.encription(this.param);

        var api = new LHAPI({
          // url: this.URL.SERVER_URL + LHConfig.setting.action.ticketData,
          url: this.URL.SERVER_URL + "j",
          data: this.param,
          method: 'post'
        });
        api.sendRequest()
          .done(function(data) {
            that.options.data = data.ticketList;

            _.each(that.options.data, function(item) {
              if (item.HQ_TYPE == "1") {
                item.TIP = "满" + item.DEMAND + "立减";
              } else if (item.HQ_TYPE == "2") {
                item.TIP = "面值" + item.PRICE;
              }
              item.START_TIME = item.START_TIME.replace(/-/g, ".");
              item.END_TIME = item.END_TIME.replace(/-/g, ".")
            })

            var renderList = can.mustache(template_components_coupon);
            var html = renderList(that.options, that.helpers);
            that.element.html(html);
          })
          .fail(function(error) {
            util.tip(error.msg);
            // var jsonParams = {
            //   'funName': 'network_error',
            //   'params': {}
            // };
            // LHHybrid.nativeFun(jsonParams);
          });
      },

      getCoupon: function(userId, acitveId) {
        var that = this;

        this.param = {
          "userId": userId,
          "acitveId": acitveId
        };

        busizutil.encription(this.param);

        var api = new LHAPI({
          url: this.URL.SERVER_URL + LHConfig.setting.action.getLHTicket,
          data: this.param,
          method: 'post'
        });
        api.sendRequest()
          .done(function(data) {
            $(".coupons_box_r").removeClass("disabled");
            util.tip(data.msg);

            if (util.isMobile.WeChat()) {
              setTimeout(function() {
                window.location.href = "http://www.lehumall.com/ios/huiyin_ios_download/nearShop_-1.html";
              }, 2000);
            }
          })
          .fail(function(error) {
            $(".coupons_box_r").removeClass("disabled");
            util.tip(error.msg);
          });
      },

      ".coupons_box_r click": function(element, event) {
        var couponid = element.attr("data-id");
        var param = can.deparam(window.location.search.substr(1));

        this.userId = busizutil.getUserId();
        if (!this.userId) {
          if (util.isMobile.WeChat() || param.from == 'share' || !param.appinner) {
            location.href = "login.html?from=coupon.html";
            return false;
          } else {
            var jsonParams = {
              'funName': 'login',
              'params': {
                "backurl": "index"
              }
            };
            LHHybrid.nativeFun(jsonParams);

            return false;
          }
        }

        if ($(".coupons_box_r").hasClass("disabled")) {
          return false;
        }

        $(".coupons_box_r").addClass("disabled");

        this.getCoupon(this.userId, couponid);
      },

      '.back click': function() {

        if (util.isMobile.Android() || util.isMobile.iOS()) {
          var jsonParams = {
            'funName': 'back_fun',
            'params': {
              "backurl": "index"
            }
          };
          LHHybrid.nativeFun(jsonParams);
          console.log('back_fun');
        } else {
          if (history.length == 1) {
            window.opener = null;
            window.close();
          } else {
            history.go(-1);
          }
        }

      }
    });

  });