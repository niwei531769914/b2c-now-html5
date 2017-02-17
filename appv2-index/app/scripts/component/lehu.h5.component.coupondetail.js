define('lehu.h5.component.coupondetail', [
    'zepto',
    'can',
    'lehu.h5.business.config',
    'lehu.util',
    'lehu.h5.api',
    'lehu.hybrid',

    'imagelazyload',
    'lehu.utils.busizutil',

    'text!template_components_coupondetail'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid,
    imagelazyload, busizutil,
    template_components_coupondetail) {
    'use strict';

    // 1全部（未使用），2即将过期，3待领取的
    var COUPON_ALL = "1";
    var COUPON_UNUSED = "2";
    var COUPON_UNGET = "3";

    return can.Control.extend({

      param: {},

      /**
       * @override
       * @description 初始化方法
       */
      init: function() {
        this.initData();
        this.render();
      },

      isEnd: function() {
        var activeId = $(".bt_get").attr("data-id");

        this.userId = busizutil.getUserId();
        if (this.userId) {
          this.param = {
            "userId": this.userId,
            "acitveIds": activeId
          };

          busizutil.encription(this.param);

          var api = new LHAPI({
            url: this.URL.SERVER_URL + "judgeLHTicketReceived.do",
            data: this.param,
            method: 'post'
          });
          api.sendRequest()
            .done(function(data) {

              if (data.hasReceived) {
                $(".bt_get").addClass("end");
                $(".coupons_main").addClass("end");
              } else {
                $(".bt_get").removeClass("end");
                $(".coupons_main").removeClass("end");
              }
            })
            .fail(function(error) {
              // util.tip(error.msg);
            });
        }
      },

      "#sharetip click": function(element, event) {
        $("#sharetip").hide();
      },

      ".bt_share click": function(element, event) {
        var param = can.deparam(window.location.search.substr(1));

        if (util.isMobile.WeChat()) {
          $("#sharetip").show();
          return false;
        }

        // var jsonParams = {
        //   'funName': 'share_fun',
        //   'params': {
        //     'title': "汇银乐虎全球购-领券中心",
        //     'type': "1",
        //     'video_img': "",
        //     'shareUrl': 'http://' + window.location.host + "/html5/app/coupon.html?from=share",
        //     'shareImgUrl': "http://app.lehumall.com/html5/app/images/Shortcut_114_114.png",
        //     'text': "汇银乐虎全球购，赶紧领取优惠券吧，手慢无！"
        //   }
        // };
        // LHHybrid.nativeFun(jsonParams);
      },

      initData: function() {
        this.URL = LHHybrid.getUrl();
      },

      render: function() {
        var that = this;
        var param = can.deparam(window.location.search.substr(1));

        this.param = {
          "ID": param.id
        };

        busizutil.encription(this.param);

        var api = new LHAPI({
          // url: this.URL.SERVER_URL + LHConfig.setting.action.ticketData,
          url: this.URL.SERVER_URL + "getTicketInfo.do",
          data: this.param,
          method: 'post'
        });
        api.sendRequest()
          .done(function(data) {

            if (data.ticketList.length == 0) {
              util.tip("客官来晚喽，券已经被领完啦");
              $("#content").empty();
              return false;
            }

            if (data.ticketList.length > 0) {
              that.options.data = data.ticketList[0];
              document.title = "汇银乐虎";
            }

            if (that.options.data.HQ_TYPE == "1") {
              that.options.data.TIP = "满" + that.options.data.DEMAND + "使用";
            } else if (that.options.data.HQ_TYPE == "2") {
              that.options.data.TIP = "面值" + that.options.data.PRICE;
            }

            var renderList = can.mustache(template_components_coupondetail);
            var html = renderList(that.options, that.helpers);
            that.element.html(html);

            that.isEnd();
          })
          .fail(function(error) {
            util.tip(error.msg);
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
            util.tip(data.msg);

            $(".bt_get").addClass("end");
            $(".coupons_main").addClass("end");
            $(".bt_get").removeClass("disabled");

            // if (util.isMobile.WeChat()) {
            //   setTimeout(function() {
            //     window.location.href = "http://www.lehumall.com/ios/huiyin_ios_download/nearShop_-1.html";
            //   }, 2000);
            // }
          })
          .fail(function(error) {
            util.tip(error.msg);
            $(".bt_get").removeClass("disabled");
          });
      },

      ".bt_get click": function(element, event) {
        if ($(".bt_get").hasClass("end") || $(".bt_get").hasClass("disabled")) {
          return false;
        }

        $(".bt_get").addClass("disabled");

        var couponid = element.attr("data-id");
        var param = can.deparam(window.location.search.substr(1));

        this.userId = busizutil.getUserId();
        if (!this.userId) {
          location.href = "login.html?from=" + escape(location.href);
          return false;
        }

        this.getCoupon(this.userId, couponid);
      },

      '.foot_text click': function() {

        window.location.href = "http://www.lehumall.com/ios/huiyin_ios_download/nearShop_-1.html";

      }
    });

  });