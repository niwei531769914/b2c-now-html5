define('lehu.h5.component.activities', [
    'zepto',
    'can',
    'lehu.h5.business.config',
    'lehu.util',
    'lehu.h5.api',
    'lehu.hybrid',
    'underscore',

    'imagelazyload',

    'text!template_components_activities'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid, _,
    imagelazyload,
    template_components_activities) {
    'use strict';

    var DEFAULT_PAGE_SIZE = 0;

    can.route.ready();

    return can.Control.extend({

      helpers: {
        'lehu.img': function(imgprefix, img) {
          if (_.isFunction(img)) {
            img = img();
          }

          return imgprefix + img;
        },

        'lehu-showDis': function(discount, price, options) {
          if (parseFloat(discount) < parseFloat(price) && discount != 0) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },
      },

      init: function() {
        // alert(4);
        this.initData();
        this.render();
      },

      initData: function() {
        this.URL = LHHybrid.getUrl();
        // this.URL.SERVER_URL = 'http://172.16.201.68:8082/'
        // this.URL.SERVER_URL = 'http://app.lehumall.com/'
      },

      render: function() {
        var that = this;
        var params = can.deparam(window.location.search.substr(1));
        params = _.extend(params, can.route.attr());

        var ids = params.ids;

        var idArr = ids.split("|");

        var query = can.param({
          pageSize: DEFAULT_PAGE_SIZE,
          ids: idArr.join(","),
          flag: params.flag
        });

        var api = new LHAPI({
          url: that.URL.SERVER_URL + 'appHomePromotion.do?' + query,
          data: {}
        });
        api.sendRequest()
          .done(function(data) {

            var data = data.data;

            // 对返回数据排序
            var dataCollection = [];

            _.each(idArr, function(id) {
              dataCollection.push(that.getActivityData(id, data));
            })

            // 设置banner
            that.options.imgprefix = that.URL.IMAGE_URL;
            that.options.summary = {};
            that.options.summary.bannerImg = dataCollection[0].promotion_banner;
            that.options.summary.activityName = dataCollection[0].promotion_name;

            //去掉第一个对象
            dataCollection.shift();

            //剩下的条数
            that.options.tabWidth = Math.floor(100 / (dataCollection.length));

            that.options.data = dataCollection;
            // test
            // dataCollection[0].goodsList[0].DISCOUNT_PRICE = "200";

            var renderFn = can.view.mustache(template_components_activities);
            var html = renderFn(that.options, that.helpers);
            that.element.html(html);

            $(".list_main_nav li:first-child").addClass("active")

            setTimeout(that.autoFixed, 1000);
          })
      },

      getActivityData: function(activityId, data) {
        var result = _.find(data, function(item) {
          return item.promotion_id == activityId;
        });

        return result;
      },

      /**
       * 设置自动悬浮
       * @param  {[type]} element [description]
       * @return {[type]} [description]
       */
      autoFixed: function(element) {
        var that = this;

        var nav = $(".list_main_nav").offset().top;

        $(window).scroll(function() {
          // var nav = $(".list_main_nav").offset().top;
          var s = $(window).scrollTop();
          if (s > nav) {
            $(".list_main_nav").css("position", "fixed");
            $(".list_main_nav").next().css("margin-top", ".9rem");
          } else {
            $(".list_main_nav").css("position", "relative");
            $(".list_main_nav").next().css("margin-top", "0rem");
          };
        });
      },

      isSupportSticky: function() {
        var vendorList = ['', '-webkit-', '-ms-', '-moz-', '-o-'],
          vendorListLength = vendorList.length,
          stickyElement = document.createElement('div');

        for (var i = 0; i < vendorListLength; i++) {
          stickyElement.style.position = vendorList[i] + 'sticky';
          if (stickyElement.style.position != '') {
            return true;
          }
        }
        return false;
      },

      ".list_box_title click": function(element, event) {
        var activityId = element.attr('data-activityid');

        var params = can.deparam(window.location.search.substr(1));
        params = _.extend(params, can.route.attr());

        window.location.href = "activity.html?id=" + activityId + "&pageIndex=1&flag=" + params.flag;
      },

      '.list_box_cont a click': function(element, event) {
        var goodsId = element.attr('data-goods-id');
        var goodsNo = element.attr('data-goods-no');
        var storeId = element.attr('data-store-id');

        var jsonParams = {
          'funName': 'good_detail_fun',
          'params': {
            'STORE_ID': storeId,
            'GOODS_NO': goodsNo,
            'GOODS_ID': goodsId
          }
        };
        LHHybrid.nativeFun(jsonParams);
      },

      ".list_main_nav li click": function(element, event) {
        var floorId = element.attr('data-floor');
        $(".list_main_nav li").removeClass("active");
        $(element).addClass("active");
        var floorPosition = $("#" + floorId).offset().top - $('.list_main_nav').height();
        $("body").scrollTop(floorPosition);
      },

      '.nindex_fanhui click': function() {

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