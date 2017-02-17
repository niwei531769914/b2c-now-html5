define('lehu.h5.component.login', [
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

    'text!template_components_login'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid, md5, store,
    imagelazyload, busizutil,
    template_components_login) {
    'use strict';

    var DEFAULT_GOTO_URL = "index.html";

    return can.Control.extend({

      param: {},

      /**
       * @override
       * @description 初始化方法
       */
      init: function() {
        this.initData();

        var params = can.deparam(window.location.search.substr(1));
        this.from = params.from;

        var renderList = can.mustache(template_components_login);
        var html = renderList(this.options);
        this.element.html(html);

        this.bindEvent();
      },

      bindEvent: function() {
        var that = this;

        this.userNameLength = 0;
        this.passwordLength = 0;
        this.captchaLength = 0;


        $('.txt_username').on('keyup', function() {
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
        if (this.loginBysms) {
          if (this.userNameLength && this.captchaLength) {
            $('.btn_login').removeClass('btn_disabled');
          } else {
            $('.btn_login').addClass('btn_disabled');
          }
        } else {
          if (this.userNameLength && this.passwordLength) {
            $('.btn_login').removeClass('btn_disabled');
          } else {
            $('.btn_login').addClass('btn_disabled');
          }
        }
      },

      initData: function() {
        this.URL = LHHybrid.getUrl();
        this.loginBysms = false;
      },

      '.txt_username keyup': function(element, event) {
        event && event.preventDefault();
        this.element.find('.item_tips').hide();
      },

      '.txt_password keyup': function(element, event) {
        event && event.preventDefault();
        this.element.find('.item_tips').hide();
      },

      '.login_tab span click': function(element, event) {
        $('.login_tab span').removeClass('active');
        element.addClass('active');

        if ($('.login_tab_sms').hasClass('active')) {
          this.loginBysms = true;
          $('.item.item_password').hide();
          $('.item.item_sms_captcha').show();
          $('.txt_password').val("");
        } else {
          this.loginBysms = false;
          $('.item.item_password').show();
          $('.item.item_sms_captcha').hide();
          $('.txt_sms_captcha').val("");
        }
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

      checkmobile: function(mobile) {
        if (!mobile) {
          return false;
        }
        return /^1\d{10}$/.test(mobile);
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

      '.btn_retransmit click': function(element, event) {

        if (element.hasClass("btn_retransmit_disabled")) {
          return false;
        }
        var that = this;
        var userName = $(".txt_username").val();

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
          'flag': "4"
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

      loginBySms: function(userName, captcha) {
        var that = this;

        if (captcha == "") {
          $(".err_msg").text("验证码不能为空!").parent().css("display", "block")
          return false;
        }

        this.param = {
          'phone': userName,
          'code': captcha,
          'origin': '5'
        };

        busizutil.encription(this.param);

        var api = new LHAPI({
          url: this.URL.SERVER_URL + LHConfig.setting.action.login4Code,
          data: this.param,
          method: 'post'
        });
        api.sendRequest()
          .done(function(data) {
            store.set("user", data.user);
            location.href = that.from || DEFAULT_GOTO_URL;
          })
          .fail(function(error) {
            $(".err_msg").text(error.msg).parent().css("display", "block")
          })
      },

      '.btn_login click': function(element, event) {
        if (element.hasClass('btn_disabled')) {
          return false;
        }

        var that = this;

        var userName = $(".txt_username").val();
        var passWord = $(".txt_password").val();
        var captcha = $(".txt_sms_captcha").val();

        if (userName == "") {
          $(".err_msg").text("手机号码不能为空!").parent().css("display", "block");
          return false;
        }

        // 如果是验证码登录走另一个分支
        if (this.loginBysms) {
          this.loginBySms(userName, captcha);
          return false;
        }

        if (passWord == "") {
          $(".err_msg").text("密码不能为空!").parent().css("display", "block")
          return false;
        }

        this.param = {
          'userName': userName,
          'password': md5(passWord),
          'openId': "",
          'thirdPartyFlag': "-1",
          'origin': '5'
        };

        busizutil.encription(this.param);

        var api = new LHAPI({
          url: this.URL.SERVER_URL + LHConfig.setting.action.login,
          data: this.param,
          method: 'post'
        });
        api.sendRequest()
          .done(function(data) {
            store.set("user", data.user);
            location.href = that.from || DEFAULT_GOTO_URL;
            return false;
          })
          .fail(function(error) {
            $(".err_msg").text(error.msg).parent().css("display", "block")
          })
      },

      '.rightlink click': function(element, event) {
        if (this.from) {
          window.location.href = 'register.html?from=' + this.from;
        } else {
          window.location.href = 'register.html';
        }
      },

      ".login_free click": function(element, event) {
        element.toggleClass('login_free_selected');
      },

      '.retrieve_password click': function(element, event) {
        window.location.href = "forgetpassword.html";
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