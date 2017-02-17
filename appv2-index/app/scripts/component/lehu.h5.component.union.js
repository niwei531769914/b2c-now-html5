define('lehu.h5.component.union', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',

        'lehu.utils.busizutil',

        'text!template_components_union'
    ],

    function ($, can, LHConfig, util, LHAPI, LHHybrid,
              busizutil,
              template_components_union) {
        'use strict';

        return can.Control.extend({

            /**
             * @override
             * @description 初始化方法
             */
            init: function () {

                var that = this;
                this.initData();

                var renderList = can.mustache(template_components_union);
                var html = renderList(this.options);
                that.element.html(html);
                that.getUionData.apply(that);

                //判断用户是否输入内容符合要求
                setInterval(function() {
                    that.getMessage.apply(that);
                }, 0);

            },

            initData: function () {
                this.param = {};
                this.param = can.deparam(window.location.search.substr(1));
                this.URL = LHHybrid.getUrl();
            },

            //商户
            getUionData : function(){

                var that = this ;

                var api = new LHAPI({
                    url : "http://app.lehumall.com/queryInfoForleague.do",
                    data : {
                        goodsId : that.param.goodsId
                    },
                    method : "post"
                });

                api.sendRequest()
                    .done(function(data){

                        var goodsList = data.data[0];

                        var html = "";

                        html += "<div class='union_coupon_car'><img src=' " + that.URL.IMAGE_URL + goodsList.GOODS_IMG +"'></div>";
                        html += "<div class='union_coupon_title' data-goods" + goodsList.GOODS_ID + "><span class='coupon_title_name'>" + goodsList.GOODS_NAME + "</span><span class='coupon_title_fuwu'>" + goodsList.GOODS_DESCRIBE + "</span><span class='coupon_title_carname'>" + goodsList.MERCHANT_NAME + "</span><span class='coupon_title_val'>" + goodsList.EXCHANGE_VALUE + "积分</span></div>";

                        $('.union_coupon').empty().append(html);

                    })
                    .fail(function(error){
                        util.tip("数据错误，请重新进入！",2000);
                    })
            },

            //查询用户积分
            '.union_card_fc click' : function(element,event){

                var that = this;

                var PHVALUE = $.trim(String($('.union_card_code').val()));

                if( PHVALUE == ""){
                    util.tip("卡号不能为空！",2000);
                    return false;
                }
                var api = new LHAPI({
                    url : "http://app.lehumall.com/queryIntegralForleague.do",
                    data : {
                        cardCode : PHVALUE,
                        type : "1"
                    },
                    method : "post"
                })

                api.sendRequest()
                    .done(function(data){
                        console.log(3);
                        if(data.type == 0){
                            console.log(5);
                            util.tip(data.msg,2000);
                            return false;
                        }
                        if(data.type == 1){
                            console.log(4);
                            $('.union_integral_val').html(data.iBalance + "积分");
                            return false;
                        }

                    })
                    .fail(function(){
                       util.tip("会员信息不存在!",2000);
                    })

            },

            //获取短信验证码
            '.union_ph_mes click' : function(element ,event){
                var that = this;


                var timer;
                var PHVALUE = $.trim(String($('.union_card_code').val()));

                if(PHVALUE == ""){

                    util.tip("卡号不能为空！",2000);
                    return false;
                }

                var api = new LHAPI({
                    url : "http://app.lehumall.com/sendMessageForleague.do",
                    data : {
                        cardCode : PHVALUE,
                        type : "1"
                    },
                    method : "post"
                })

                api.sendRequest()
                    .done(function(data){

                        if(data.type == 1){
                            console.log("发送成功");
                            console.log(2);

                            $(element).attr("disabled","true").css("color","#999999");
                            $(element).html("60秒后重新获取");

                            timer = setInterval(function(){
                                var COUNT = parseInt($(element).html());
                                COUNT = COUNT -1;
                                $(element).html(COUNT + "秒后重新获取");
                                console.log(COUNT);
                                if(COUNT == 0 ){
                                    clearInterval(timer);
                                    $(element).removeAttr("disabled").html("点击获取验证码").css("color","#f5174b");
                                }
                            },1000)
                        }

                    })
                    .fail(function(error){
                        util.tip("系统错误，发送失败",2000)
                    })

            },


            //确定兑换
            '.union_exchange click' : function(element,event){

                var that= this ;

                var PHVALUE = $.trim(String($('.union_card_code').val()));
                var PHLENE = $.trim(String($('.union_ph_code').val()));
                var NJIFEN = parseInt($('.union_integral_val').text());
                var Gjifen = parseInt($('.coupon_title_val').text());


                if( PHVALUE == ""){
                    util.tip("卡号不能为空！",2000);
                    return false;
                };

                if( PHLENE == ""){
                    util.tip("验证码不能为空！",2000);
                    return false;
                };

                var api = new LHAPI({
                    url :  "http://app.lehumall.com/exchangeForleague.do",
                    data : {
                        merchantCode : that.param.link,
                        cardCode : PHVALUE,
                        phoneCode : PHLENE,
                        goodsId : that.param.goodsId
                    },
                    method : "post"
                })

                api.sendRequest()
                    .done(function(data){
                        if(data.type == "1") {
                            util.tip(data.msg, 2000);
                            var JIFEN = NJIFEN - Gjifen;
                            $('.union_integral_val').html(JIFEN);
                        }
                        else {
                            util.tip(data.msg,2000);
                        }
                    })
                    .fail(function(error){
                        util.tip("兑换失败!",2000);
                    })

            },

            getMessage : function(){
                console.log(2);
                var PHVALUE = $.trim(String($('.union_card_code').val()));
                var PHLENE = $.trim(String($('.union_ph_code').val()));

                if(!PHLENE == ""&& !PHVALUE == ""){
                    $('.union_exchange').removeAttr("disabled").css("color","#f5174b");
                    return false;
                }
                else {
                    $('.union_exchange').attr("disabled","true").css("color","#999");
                    return false;
                }

            },

            '.back click': function () {
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