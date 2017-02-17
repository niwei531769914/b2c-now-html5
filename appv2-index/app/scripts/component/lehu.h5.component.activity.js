define('lehu.h5.component.activity', [
    'zepto',
    'can',
    'lehu.h5.business.config',
    'lehu.util',
    'lehu.h5.api',
    'lehu.hybrid',
    'underscore',

    'imagelazyload',

    'text!template_components_activity'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid, _,
    imagelazyload,
    template_components_activity) {
    'use strict';

    var DEFAULT_PAGE_INDEX = 0;
    var NODATA = false;

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
          if (parseFloat(discount()) < parseFloat(price()) && discount() != 0) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        }
      },

      init: function() {
        this.initData();
        this.render();
      },

      initData: function() {
        this.URL = LHHybrid.getUrl();
        // this.URL.SERVER_URL = 'http://app.lehumall.com/'
        // this.URL.SERVER_URL = 'http://172.16.201.68:8082/'
      },

      render: function() {
        var params = can.deparam(window.location.search.substr(1));
        params = _.extend(params, can.route.attr());

        this.request({
          pageIndex: params.pageIndex,
          id: params.id,
          flag: params.flag
        });
      },

      request: function(cparams) {
        var that = this;

        this.pageIndex = cparams.pageIndex;
        this.id = cparams.id;
        this.flag = cparams.flag;

        var query = can.param({
          pageIndex: this.pageIndex || DEFAULT_PAGE_INDEX,
          id: this.id,
          flag: this.flag
        });

        var that = this;
        var api = new LHAPI({
          url: this.URL.SERVER_URL + 'appPrefecture.do?' + query,
          data: {}
        });
        api.sendRequest()
          .done(function(data) {
            that.paint(data);
          })
      },

      paint: function(data) {
        var params = can.deparam(window.location.search.substr(1));
        params = _.extend(params, can.route.attr());
        var renderFn = can.view.mustache(template_components_activity);

        data.supplement = {
          onLoadingData: false
        };
        this.options.data = new can.Map(data);
        this.options.data.attr("imgprefix", this.URL.IMAGE_URL);
        this.options.data.attr("bannerImg", data.list.prefecture[0].BIG_IMG);
        this.options.data.attr("pageIndex", this.pageIndex);
        this.options.data.attr("supplement.noData", false);
        var html = renderFn(this.options.data, this.helpers);
        this.element.html(html);

        this.initLoadDataEvent();
      },

      /**
       * @author zhangke
       * @description 初始化上拉加载数据事件
       */
      initLoadDataEvent: function() {
        var that = this;
        var renderData = this.options.data;
        //节流阀
        var loadingDatas = function() {
          if (that.options.data.attr("supplement.noData") || that.options.data.attr("supplement.onLoadingData")) {
            return false;
          }
          var srollPos = $(window).scrollTop(); //滚动条距离顶部的高度
          var windowHeight = $(window).height(); //窗口的高度
          var dbHiht = $("#activity").height(); //整个页面文件的高度

          if ((windowHeight + srollPos + 200) >= (dbHiht)) {

            that.loadingData();
          }
        };

        $(window).scroll(_.throttle(loadingDatas, 200));
      },

      loadingData: function(cparams) {

        var that = this;
        that.options.data.attr("supplement.onLoadingData", true);

        var params = can.deparam(window.location.search.substr(1));
        params = _.extend(params, can.route.attr());

        var query = can.param({
          pageIndex: parseInt(this.options.data.pageIndex) + 1,
          id: params.id,
          flag: params.flag
        });

        var that = this;
        var api = new LHAPI({
          url: this.URL.SERVER_URL + 'appPrefecture.do?' + query,
          data: {}
        });
        api.sendRequest()
          .done(function(data) {

            that.options.data.attr("supplement.onLoadingData", false);

            if (data.list.pageBean) {
              _.each(data.list.pageBean, function(item) {
                that.options.data.list.pageBean.push(item);
              });

              that.options.data.attr("pageIndex", parseInt(that.options.data.pageIndex) + 1);
              that.options.data.attr("supplement.onLoadingData", false);
            } else {
              that.options.data.attr("supplement.noData", true);
            }

          })
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