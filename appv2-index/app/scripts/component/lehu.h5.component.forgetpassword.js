define('lehu.h5.component.forgetpassword', [
    'zepto',
    'can',
    'lehu.h5.business.config',
    'lehu.util',
    'lehu.h5.api',
    'lehu.hybrid',
    'md5',

    'imagelazyload',
    'lehu.utils.busizutil',

    'text!template_components_forgetpassword'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid, md5,
    imagelazyload, busizutil,
    template_components_forgetpassword) {
    'use strict';

    return can.Control.extend({

      param: {},

      /**
       * @override
       * @description 初始化方法
       */
      init: function() {
        this.initData();

        var renderList = can.mustache(template_components_forgetpassword);
        var html = renderList(this.options);
        this.element.html(html);

        this.bindEvent();
      },


      bindEvent: function() {
        var that = this;

        this.userNameLength = 0;
        this.passwordLength = 0;
        this.captchaLength = 0;

        $('.txt_phone').on('keyup', function() {
          that.userNameLength = this.value.length;
          that.enableLogin();
        });

        /*密码*/
        $('.txt_password').on('keyup', function() {
          that.passwordLength = this.value.length;
          that.enableLogin();
        })

        $('.txt_sms_captcha').on('keyup', function() {
          that.captchaLength = this.value.length;
          that.enableLogin();
        })
      },

      enableLogin: function() {
        if (this.userNameLength && this.captchaLength && this.passwordLength) {
          $('.btn_login').removeClass('btn_disabled');
        } else {
          $('.btn_login').addClass('btn_disabled');
        }
      },

      initData: function() {
        this.URL = LHHybrid.getUrl();
      },

      checkmobile: function(mobile) {
        if (!mobile) {
          return false;
        }
        return /^1\d{10}$/.test(mobile);
      },

      /*密码显示按钮*/
      ".btn_off click": function(element, event) {
        if (element.hasClass('btn_on')) {
          element.removeClass('btn_on');
          element.prev().attr('type', 'password');
        } else {
          element.addClass('btn_on');
          element.prev().attr('type', 'text');
        }
      },

      countdown: function(time) {
        var that = this;
        setTimeout(function() {
          if (time > 0) {
            time--;
            that.element.find('.btn_retransmit').text(time + '秒后可重新发送').addClass('btn_retransmit_disabled');
            that.countdown.call(that, time);
          } else {
            that.element.find('.btn_retransmit').text('获取验证码').removeClass('btn_retransmit_disabled');
          }
        }, 1000);
      },

      '.btn_findpwd click': function(element, event) {
        var that = this;

        if (element.hasClass('btn_disabled')) {
          return false;
        }

        var userName = $(".txt_phone").val();
        var passWord = $(".txt_password").val();
        var captcha = $(".txt_sms_captcha").val();

        if (userName == "") {
          $(".err_msg").text("手机号码不能为空!").parent().css("display", "block");
          return false;
        }
        if (captcha == "") {
          $(".err_msg").text("验证码不能为空!").parent().css("display", "block")
          return false;
        }
        if (passWord == "") {
          $(".err_msg").text("密码不能为空!").parent().css("display", "block")
          return false;
        }

        if (!that.checkmobile(userName)) {
          $(".err_msg").text("手机号码格式错误!").parent().css("display", "block");
          return false;
        }

        this.param = {
          'phone': userName,
          'password': md5(passWord),
          'code': captcha,
          'pwdSafe': busizutil.getPasswordSafe(passWord),
          'origin': '5'
        };

        busizutil.encription(this.param);

        var api = new LHAPI({
          url: this.URL.SERVER_URL + LHConfig.setting.action.appFindPasswordSave,
          data: this.param,
          method: 'post'
        });
        api.sendRequest()
          .done(function(data) {
            if (data.type == 1) {
              location.href = 'login.html';
            } else {
              $(".err_msg").text(data.msg).parent().css("display", "block");
            }
          })
          .fail(function(error) {
            $(".err_msg").text("找回密码失败").parent().css("display", "block");
          })
      },

      '.btn_retransmit click': function(element, event) {

        if (element.hasClass("btn_retransmit_disabled")) {
          return false;
        }
        var that = this;
        var userName = $(".txt_phone").val();

        if (userName == "") {
          $(".err_msg").text("手机号码不能为空").parent().css("display", "block");
          return false;
        }

        if (!that.checkmobile(userName)) {
          $(".err_msg").text("手机号码格式错误").parent().css("display", "block");
          return false;
        }

        this.param = {
          'phone': userName,
          'flag': "1"
        };

        busizutil.encription(this.param);

        var api = new LHAPI({
          url: this.URL.SERVER_URL + LHConfig.setting.action.verifycode,
          data: this.param,
          method: 'post'
        });
        api.sendRequest()
          .done(function(data) {
            if (data.type == 1) {
              that.countdown.call(that, 60);
              $(".item_tips").css("display", "none");
            } else {
              $(".err_msg").text(data.msg).parent().css("display", "block");
            }
          })
          .fail(function(error) {
            $(".err_msg").text("短信验证码发送失败").parent().css("display", "block");
          })
      },

      '.back click': function() {

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