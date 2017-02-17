define('lehu.h5.component.detail', [
    'zepto',
    'can',
    'lehu.h5.business.config',
    'lehu.util',
    'lehu.h5.api',
    'lehu.hybrid',
    'underscore',

    'swipe',
    'imagelazyload',

    'text!template_components_detail'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid, _,
    Swipe, imagelazyload,
    template_components_detail) {
    'use strict';

    return can.Control.extend({

      userId: null,

      param: {},

      /**
       * @override
       * @description 初始化方法
       */
      init: function() {

        this.initData();

        var renderList = can.mustache(template_components_detail);
        var html = renderList(this.options);
        this.element.html(html);

        this.getUserId(_.bind(this.callback, this));
      },

      initData: function() {
        this.URL = LHHybrid.getUrl();
      },

      callback: function(id) {
        this.userId = id;
        this.getGoodsDetailData();
      },

      getUserId: function(callback) {
        LHHybrid.getUserId().done(callback.apply(this));
      },

      getGoodsDetailData: function() {
        var that = this;

        this.param = {};

        if (this.userId) {
          this.param["userId"] = this.userId;
        }

        this.param = can.deparam(window.location.search.substr(1));

        var api = new LHAPI({
          url: this.URL.SERVER_URL + LHConfig.setting.action.goodsInfo,
          data: this.param
        });

        api.sendRequest()
          .done(function(data) {
            var goodsDetail = data && data.goodsDetail;
            if (goodsDetail) {

              var FLAG_ACTIVITY = goodsDetail.FLAG_ACTIVITY;

              if (FLAG_ACTIVITY == "3") {
                $(".npost_foot_go,.npost_foot_add").css("display", "none");
                $(".npost_foot_kill").css("display", "block");
              }

              //商品图片
              var GOODS_IMG_LIST = "";
              for (var k = 0; k < goodsDetail.GOODS_IMG_LIST.split(',').length; k++) {
                GOODS_IMG_LIST += "<div class='swiper-slide'>";
                GOODS_IMG_LIST += "<img class='lazyload' data-original=" + that.URL.IMAGE_URL + goodsDetail.GOODS_IMG_LIST.split(',')[k] + " >";
                GOODS_IMG_LIST += "</div>";
              }
              $(".swiper-wrapper").append(GOODS_IMG_LIST);

              that.lazyload();

              new Swipe($('.npost_top .swiper-container')[0], {
                pagination: $('.swiper-pagination')[0],
                startSlide: 0,
                speed: 300,
                auto: 2000,
                continuous: true,
                disableScroll: false,
                stopPropagation: false,
                callback: function(index, elem) {

                },
                transitionEnd: function(index, elem) {}
              });

              //商品名称
              $(".npost_title").append('<span>' + goodsDetail.GOODS_NAME + '</span>');

              if (goodsDetail.IS_CONSUMPTION_COUPON == "1") {
                $(".npost_title").append('<em>海外直邮</em>');
                $(".npost_xinxi_zhiyou").css("display", "block");
              }

              if (goodsDetail.IS_CONSUMPTION_COUPON == "2") {
                $(".npost_title").append('<em>保税区发货</em>');
                $(".npost_xinxi_zhiyou").css("display", "block");
              }

              $(".npost_jieshao").append(goodsDetail.AD);

              var PRICE = String(goodsDetail.GOODS_PRICE.toString());

              var q = Math.floor(PRICE);
              var h = (PRICE).slice(-2);

              var DISCOUNT_PRICE = goodsDetail.DISCOUNT_PRICE;

              var zhekou = (DISCOUNT_PRICE / PRICE * 10).toFixed(1);

              var npost_jiage = "";
              if (DISCOUNT_PRICE !== undefined) {
                var DISCOUNT_PRICEa = String(DISCOUNT_PRICE);
                var z_q = Math.floor(DISCOUNT_PRICEa);
                var z_h = (DISCOUNT_PRICEa).slice(-2);
                npost_jiage += "<span>￥" + z_q + ".<i>" + z_h + "</i></span><em>促销价" + zhekou + "折</em><br/><b>乐虎价：￥" + PRICE + "</b>";
              } else {
                npost_jiage += "<span>￥" + q + ".<i>" + h + "</i></span>";
              }

              $(".npost_jiage").append(npost_jiage);

              $(".dianpu").append(goodsDetail.STORE_NAME);

              $(".REVIEW_NUMBER").append(goodsDetail.REVIEW_NUMBER);
              $(".REVIEW_PERCENT").append(Math.floor(goodsDetail.REVIEW_PERCENT));

              $(".npost_top_fenxiang").attr("data_goods_img", that.URL.IMAGE_URL + goodsDetail.GOODS_IMG);
              $(".npost_top_fenxiang").attr("data_goods_url", 'http://wap.lehumall.com/wapGoods.do?goods_id=' + goodsDetail.ID);

              var wsc = "";
              wsc += "<div class='focus-container'><div class='focus-icon'><i class='bottom-focus-icon focus-out'></i><i class='focus-scale focus-scale-show'></i></div><span class='focus-info'>收藏</span></div>";

              var sc = "";
              sc += "<div class='focus-container'><div class='focus-icon'><i class='bottom-focus-icon focus-out click-focus-show'></i><i class='focus-scale' style='display: inline-block;'></i></div><span class='focus-info'>已收藏</span></div>";

              var FLAG_FOCUS_GOODS = goodsDetail.FLAG_FOCUS_GOODS;

              if (FLAG_FOCUS_GOODS == "0") {
                $(".npost_foot_shouchang").append(wsc);
              } else {
                $(".npost_foot_shouchang").append(sc);
              }

              if (goodsDetail.SHOPPING_CAR_NUM) {
                var num = "";
                num += "<i class='order-numbers'>";
                num += goodsDetail.SHOPPING_CAR_NUM;
                num += "</i>";
                $(".order-numbers-cont").append(num);
              }

              if (data.canBuy == false) {
                $(".npost_foot_add,.npost_foot_go,.npost_foot_kill").addClass("npost_foot_no");
              }

              //获取地区 是否可以购买 包邮            
              $("html").attr("data_FREIGHT_TYPE", goodsDetail.FREIGHT_TYPE);
              $("html").attr("data_ID", goodsDetail.ID);
              $("html").attr("data_IS_GENERATION_OPERATION", goodsDetail.IS_GENERATION_OPERATION);
              $("html").attr("data_GOODS_NO", goodsDetail.GOODS_NO);
              $("html").attr("data_cityId", "220");
              $("html").attr("data_FREIGHT", goodsDetail.FREIGHT);
              $("html").attr("data_PROMOTION_ID", "-1");

              $(".provinceName,.ndz_nav01").append(that.param["provinceName"]);
              $(".cityName,.ndz_nav02").append(that.param["cityName"]);
            }

            return goodsDetail;
          })
          .then(function(goodsDetail) {

            var queryGoodsStock = new LHAPI({
              url: that.URL.SERVER_URL + LHConfig.setting.action.queryGoodsStock + "?freightType=" + goodsDetail.FREIGHT_TYPE + "&goodsId=" + goodsDetail.ID + "&is_generation_operation=" + goodsDetail.IS_GENERATION_OPERATION + "&goodsNo=" + goodsDetail.GOODS_NO + "&cityId=" + goodsDetail.cityId + "&freight=" + goodsDetail.FREIGHT,
              data: {}
            });

            return queryGoodsStock.sendRequest();
          })
          .done(function(stockData) {
            var postage = stockData && stockData.postage;
            if (postage) {
              $(".postage").empty().append(postage);
            }

            if (stockData.canBuy == true) {
              $("#npost_dizhi em").empty().append("有货");
            } else {
              $("#npost_dizhi em").css("color", "#aaaaaa");
              $("#npost_dizhi em").empty().append("无货");
              $(".npost_foot_add,.npost_foot_go,.npost_foot_kill").addClass("npost_foot_no");
            }
          })
          .then(function() {

            var queryGoodsReview = new LHAPI({
              url: that.URL.SERVER_URL + LHConfig.setting.action.queryGoodsReview + "?COMMDOITY_ID=" + that.param["goodsId"] + "&pageSize=2&pageIndex=1&flag=0",
              data: {}
            });

            return queryGoodsReview.sendRequest();
          })
          .done(function(commentData) {
            var reviewList = commentData.reviewList;
            if (reviewList) {
              var html = "";
              for (var k = 0; k < reviewList.length; k++) {
                html += "<div class='npost_pinglun_box'><span class='product-item-star'><span class='real-star comment-stars-width"
                html += reviewList[k]['SCORE'];
                html += "'></span></span><span class='npost_pinglun_msg'>";
                html += reviewList[k]['USER_NAME'];
                html += "&nbsp;";
                html += reviewList[k]['CREATE_TIME'];
                html += "</span><span class='npost_pinglun_text'>";
                html += reviewList[k]['CONTENT'];
                html += "</span>";
                html += "</div>";
              }
              $(".npost_pinglun_list").empty().append(html);
            }
          })
          .then(function() {

            var goodsContent = new LHAPI({
              url: that.URL.SERVER_URL + LHConfig.setting.action.goodsContent + "?COMMDOITY_ID=" + that.param["goodsId"] + "&pageSize=2&pageIndex=1&flag=0",
              data: {}
            });

            return goodsContent.sendRequest();
          })
          .done(function(goodsContentData) {
            var goodsContent = goodsContentData && goodsContentData.goodsContent;
            if (goodsContent) {
              $(".npost_xiangqing").append(goodsContent['info_content_map']);
            }
          });
      },

      //返回
      '.npost_top_fanhui click': function() {
        var jsonParams = {
          'funName': 'back_fun',
          'params': {}
        };
        LHHybrid.nativeFun(jsonParams);
      },

      //分享
      '.npost_top_fenxiang click': function() {
        var title = $(".npost_title span").html();
        var type = "1";
        var video_img = "";
        var shareUrl = $(".npost_top_fenxiang").attr("data_goods_url");
        var shareImgUrl = $(".npost_top_fenxiang").attr("data_goods_img");
        var text = $(".npost_jieshao").html();
        var jsonParams = {
          'funName': 'share_fun',
          'params': {
            'title': title,
            'type': type,
            'video_img': video_img,
            'shareUrl': shareUrl,
            'shareImgUrl': shareImgUrl,
            'text': text
          }
        };
        LHHybrid.nativeFun(jsonParams);
      },

      //客服
      '.npost_foot_kefu click': function() {
        var jsonParams = {
          'funName': 'customer_service_fun',
          'params': {}
        };
        LHHybrid.nativeFun(jsonParams);
      },

      //购物车
      '.npost_foot_cart click': function() {
        var shopping_cart_numbers = $(".order-numbers").html();
        var jsonParams = {
          'funName': 'shopping_cart_fun',
          'params': {
            'shopping_cart_numbers': shopping_cart_numbers
          }
        };
        LHHybrid.nativeFun(jsonParams);
      },

      //更多评价
      '.npost_pinglun_more click': function() {
        var jsonParams = {
          'funName': 'goods_comment_fun',
          'params': {
            'goodsId': this.param["goodsId"]
          }
        };
        LHHybrid.nativeFun(jsonParams);
      },

      lazyload: function() {
        $('.lazyload').picLazyLoad({
          threshold: 400
        });
      }
    });

  });