define('lehu.h5.component.list', [
    'zepto',
    'can',
    'lehu.h5.business.config',
    'lehu.util',
    'lehu.h5.api',
    'lehu.hybrid',

    'imagelazyload',

    'text!template_components_list'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid,
    imagelazyload,
    template_components_list) {
    'use strict';

    return can.Control.extend({

      param: {},

      /**
       * @override
       * @description 初始化方法
       */
      init: function() {
        this.initData();

        var renderList = can.mustache(template_components_list);
        var html = renderList(this.options);
        this.element.html(html);

        this.param = this.initParams();
        this.totalPageNum = "";
        this.goodsCategoryList();

        this.bindScroll();
      },

      initData: function() {
        this.URL = LHHybrid.getUrl();
      },

      // sortMode 1销量2价格3评价4人气
      // sortType 1,升序，2降序
      // areaId (城市）区域ID
      // mark 4表示，是通过筛选
      initParams: function() {
        var param = can.deparam(window.location.search.substr(1));

        //每页显示
        param["pageSize"] = 10;

        //当前第几页
        param["pageIndex"] = 1;

        return param;
      },

      goodsCategoryList: function() {
        var that = this;

        var api = new LHAPI({
          url: this.URL.SERVER_URL + LHConfig.setting.action.goodsCategoryList,
          data: this.param,
          method: 'post'
        });
        api.sendRequest()
          .done(function(data) {
            $("html").attr("data_type", data.type);

            var html = "";
            //总页数
            that.totalPageNum = data.totalPageNum;
            var goodsList = data && data.goodsList;

            if (goodsList && goodsList.length > 0) {
              $(".nlist_nomore,.nlist_no").css("display", "none");
              for (var k = 0; k < goodsList.length; k++) {
                var zy = goodsList[k]['IS_CONSUMPTION_COUPON'];

                var PRICE = String(goodsList[k]['PRICE'].toString());
                var q = Math.floor(PRICE);
                var h = (PRICE).slice(-2);

                var DISCOUNT_PRICE = goodsList[k]['DISCOUNT_PRICE'];

                html += "<div class='nlist_list_main'  data-STORE_ID='" + goodsList[k]['STORE_ID'] + "' data-GOODS_NO='" + goodsList[k]['GOODS_NO'] + "' data-GOODS_ID='" + goodsList[k]['GOODS_ID'] + "' >";
                html += "<img class='nlist_list_mainleft lazyload'  src=" + that.URL.IMAGE_URL + goodsList[k]['GOODS_IMG'] + " >";
                html += "<div class='nlist_list_mainright'>";
                html += "<div class='nlist_list_title'>";

                // 海安需求 去掉 20160804 季严亮
                // if (zy == 1) {
                //   html += "<span class='nlist_list_title_zhiyou'>【海外直邮】</span>";
                // }
                // if (zy == 2) {
                //   html += "<span class='nlist_list_title_zhiyou'>【保税区发货】</span>";
                // }
                html += goodsList[k]['GOODS_NAME'];
                html += "</div>";
                if (DISCOUNT_PRICE !== undefined) {
                  var DISCOUNT_PRICEa = String(DISCOUNT_PRICE);
                  var z_q = Math.floor(DISCOUNT_PRICEa);
                  var z_h = (DISCOUNT_PRICEa).slice(-2);
                  html += "<div class='nlist_list_jiage'><span>￥" + z_q + ".<em>" + z_h + "</em></span><i>￥<del>" + PRICE + "</del></i></div>";
                } else {
                  html += "<div class='nlist_list_jiage'><span>￥" + q + ".<em>" + h + "</em></span></div>";
                }
                // html += "<div class='nlist_list_pinglun'>好评度：<em>" + Math.floor(goodsList[k]['REVIEW_PERCENT']) + "%</em>（<em>" + goodsList[k]['REVIEW_NUMBER'] + "</em>人）</div>";
                if (goodsList[k]['STORE_NAME']) {
                  html += "<div class='nlist_list_pinglun'>" + goodsList[k]['STORE_NAME'] + "</div>";
                }
                html += "</div></div>";
              }
              $("#ajax_goodsList").append(html);
              that.lazyload();
              $(".nwrapper_list").removeClass("one_loading");
              //商品点击事件

              $(".nlist_list_main").unbind('click').click(function() {
                var STORE_ID = $(this).attr("data-STORE_ID");
                var GOODS_NO = $(this).attr("data-GOODS_NO");
                var GOODS_ID = $(this).attr("data-GOODS_ID");
                var jsonParams = {
                  'funName': 'good_detail_fun',
                  'params': {
                    'STORE_ID': STORE_ID,
                    'GOODS_NO': GOODS_NO,
                    'GOODS_ID': GOODS_ID
                  }
                };
                LHHybrid.nativeFun(jsonParams);
                console.log('good_detail_fun');
                console.log("1");
              })

              //商品
              $(".nmiaosha_main a,.prommotionLayout_detail").click(function() {

                var STORE_ID = $(this).attr("data-STORE_ID");
                var GOODS_NO = $(this).attr("data-GOODS_NO");
                var GOODS_ID = $(this).attr("data-GOODS_ID");
                var jsonParams = {
                  'funName': 'good_detail_fun',
                  'params': {
                    'STORE_ID': STORE_ID,
                    'GOODS_NO': GOODS_NO,
                    'GOODS_ID': GOODS_ID
                  }
                };
                LHHybrid.nativeFun(jsonParams);

              })

            } else {
              that.nlist_no();
            }

            if (that.param["pageIndex"] == data["totalPageNum"]) {
              that.nlist_no();
            }
          })
          .fail(function(error) {
            $(".ajax_noload").show();
          });

      },

      bindScroll: function() {
        var that = this;

        //滚动加载
        var range = 400; //距下边界长度/单位px
        var huadong = true;

        var totalheight = 0;
        var main = $("#ajax_goodsList"); //主体元素
        $(window).scroll(function() {

          if (that.param["pageIndex"] > that.totalPageNum) {
            that.nlist_no();
            return;
          }

          var srollPos = $(window).scrollTop(); //滚动条距顶部距离(页面超出窗口的高度)
          totalheight = parseFloat($(window).height()) + parseFloat(srollPos); //滚动条当前位置距顶部距离+浏览器的高度

          if (($(document).height() == totalheight)) {
            that.param["pageIndex"]++;

            that.goodsCategoryList();
            that.lazyload();
          } else {
            if (($(document).height() - totalheight) <= range) { //页面底部与滚动条底部的距离<range
              if (huadong) {
                huadong = false;
                that.param["pageIndex"]++;

                that.goodsCategoryList();
                that.lazyload();
              }
            } else {
              huadong = true;
            }
          }

        });
      },

      //销量
      "#salesvolume click": function(element, event) {
        if (!element.hasClass("cur")) {
          $(".nlist_nomore").css("display", "none");
          $(".nlist_loading").css("display", "block");
          $(".nwrapper_list").addClass("one_loading");
          this.param["pageIndex"] = 1;
          this.param["sort"] = 2;
          this.param["sortMode"] = 1;
          this.param["sortType"] = 2;
          $("#ajax_goodsList").empty();
          this.goodsCategoryList();
          $("#price").removeClass("jiang");
          $("#price").removeClass("sheng");
        }
      },

      //价格
      "#price click": function(element, event) {
        if (element.hasClass("sheng")) {
          element.removeClass("sheng");
          element.addClass("jiang");
          $(".nlist_nomore").css("display", "none");
          $(".nlist_loading").css("display", "block");
          $(".nwrapper_list").addClass("one_loading");
          this.param["pageIndex"] = 1;
          this.param["sort"] = 2;
          this.param["sortMode"] = 2;
          this.param["sortType"] = 2;
          $("#ajax_goodsList").empty();
          this.goodsCategoryList();

        } else {
          element.removeClass("jiang");
          element.addClass("sheng");
          $(".nlist_nomore").css("display", "none");
          $(".nlist_loading").css("display", "block");
          $(".nwrapper_list").addClass("one_loading");
          this.param["pageIndex"] = 1;
          this.param["sort"] = 2;
          this.param["sortMode"] = 2;
          this.param["sortType"] = 1;
          $("#ajax_goodsList").empty();
          this.goodsCategoryList();

        }
      },

      //评价
      "#countreview click": function(element, event) {
        if (!element.hasClass("cur")) {
          $(".nlist_nomore").css("display", "none");
          $(".nlist_loading").css("display", "block");
          $(".nwrapper_list").addClass("one_loading");
          this.param["pageIndex"] = 1;
          this.param["sort"] = 2;
          this.param["sortMode"] = 3;
          this.param["sortType"] = 2;
          $("#ajax_goodsList").empty();
          this.goodsCategoryList();
          $("#price").removeClass("jiang");
          $("#price").removeClass("sheng");
        }
      },

      //人气
      "#viewcount click": function(element, event) {
        if (!$(this).hasClass("cur")) {
          $(".nlist_nomore").css("display", "none");
          $(".nlist_loading").css("display", "block");
          $(".nwrapper_list").addClass("one_loading");
          this.param["pageIndex"] = 1;
          this.param["sort"] = 2;
          this.param["sortMode"] = 4;
          this.param["sortType"] = 2;
          $("#ajax_goodsList").empty();
          this.goodsCategoryList();
          $("#price").removeClass("jiang");
          $("#price").removeClass("sheng");
        }
      },

      '.nlist_top span click': function(element, event) {
        $(".nlist_top span").removeClass("cur");
        element.addClass("cur");
        $(".nlist_top").css("position", "static");
        $(".nlist_list").css("margin-top", "0");
      },

      '.list_style click': function(element, event) {
        element.toggleClass('list_style_kuai');

        if (element.hasClass("list_style_kuai")) {
          $(".nlist_list").removeClass("nlist_list_kuai");
          $("body").css("background", "#ffffff");
          this.lazyload();
        } else {
          $(".nlist_list").addClass("nlist_list_kuai");
          $("body").css("background", "#ecebf2");
        }
      },

      //判断商品是否存在
      nlist_no: function() {
        $(".nlist_loading").css("display", "none");

        var goodsNum = $("#ajax_goodsList").html();
        if (goodsNum == "") {
          $(".nlist_no").show();
        } else {
          $(".nlist_nomore").css("display", "block");
        }
      },

      lazyload: function() {
        $('.lazyload').picLazyLoad({
          threshold: 1000
        });
      },

      '.nindex_sousuo click': function() {
        var jsonParams = {
          'funName': 'search_fun',
          'params': {}
        };
        LHHybrid.nativeFun(jsonParams);
        console.log(search_fun);
      },

      '.nindex_fanhui click': function() {

        var jsonParams = {
          'funName': 'back_fun',
          'params': {}
        };
        LHHybrid.nativeFun(jsonParams);
        console.log('back_fun');

      },

      '.ajax_noload click': function() {
        var jsonParams = {
          'funName': 'reload_web_fun',
          'params': {}
        };
        LHHybrid.nativeFun(jsonParams);
      }
    });

  });