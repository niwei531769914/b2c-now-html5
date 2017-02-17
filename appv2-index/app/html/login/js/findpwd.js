//页面rem
(function (doc, win) {
          var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
              var clientWidth = docEl.clientWidth;
			  var clientWidth = $(".nwrapper").width();
              /*if (!clientWidth) return;*/
              docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
			  
            };
          if (!doc.addEventListener) return;
          win.addEventListener(resizeEvt, recalc, false);
          doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);




window.onload=function(){
	//淡入
     $("body").css("visibility","visible");$("body").addClass("jbox");
	 
	 var 
		_phone = '',
		_len_phone = 0,
		_len_passwd = 0,
		_len_sms = 0;
	$(document).ready(function() {
		hasCookie();
		bindEvents();
		enableCaptcha();
		enableRegister();
		_phone = $('.txt_phone').val();
	});
	
	/*判断手机禁用cookie*/
	function hasCookie() {
		if (!navigator.cookieEnabled) {
			$('.item_tips').show().children('.err_msg').html('您的手机浏览器不支持或已经禁止使用cookie，无法正常登录，请开启或更换其他浏览器');
		}
	}
	
	/*页面上所有处理事件*/
	function bindEvents() {
		
		/*返回*/
		$('.back').on('click', function() {
			window.history.back();
		});
		
		/*密码显示按钮*/
		$('.tp_btn').on('click', function() {
			if ($(this).hasClass('btn_on')) {
				$(this).removeClass('btn_on');
				$(this).prev().attr('type', 'password');
			} else {
				$(this).addClass('btn_on');
				$(this).prev().attr('type', 'text');
			}
		});
		
		/*手机号*/
		_len_phone = $('.txt_phone').on('input', function() {
			$(this).removeClass('txt_err');
			_phone = this.value;
			_len_phone = _phone.length;
			enableCaptcha();
			enableRegister();
		}).val().length;
		
		/*密码*/
		_len_passwd = $('.txt_password').on('input', function() {
			$(this).removeClass('txt_err');
			_len_passwd = this.value.length;
			enableRegister();
		}).val().length;
		
		
		
		/*短信验证码*/
		_len_sms = $('.txt_sms_captcha').on('input', function() {
			$(this).removeClass('txt_err');
			_len_sms = this.value.length;
			enableRegister();
		}).val().length;
		
	
	
		/*获取短信验证码*/
		$('.btn_retransmit').on('click', function() {
			if (!$(this).hasClass('btn_retransmit_disabled')) {
				docheckPhone();
			}
		});
		
		/*注册按钮*/
		$('.btn_login').on('click', function() {
			if (!$(this).hasClass('btn_disabled')) {
				register();
			}
		});
	}
	
	
	/*验证判断*/
	function enableRegister() {
		if (_len_phone && _len_passwd && _len_sms) {
			$('.btn_login').removeClass('btn_disabled');
		} else {
			$('.btn_login').addClass('btn_disabled');
		}
	}
	
	/*判断短信验证码是否可点击*/
	function enableCaptcha() {
		var $btn = $('.btn_retransmit');
		if (_len_phone && !$btn.hasClass('is_restransit')) {
			$btn.removeClass('btn_retransmit_disabled');
		} else {
			$btn.addClass('btn_retransmit_disabled');
		}
	}
	

	
	/*验证手机号*/
	function checkPhone(phone) {
		var pattern = /^1[0-9]{10}$/;
		return pattern.test(phone);
	}
	
	/*验证密码*/
	function checkPassword(pwd) {
		var len = pwd.length;
		return (len >= 6 && len <= 20);
	}
	
	/*错误信息提示*/
	function errTips(msg) {
		if (msg == undefined || msg.length == 0) {
			$('.item_tips').hide();
		} else {
			$('.item_tips').show().children('.err_msg').html(msg);
		}
	}
	
	
	/*手机号验证*/
	function docheckPhone() {
		var params = {
			'mobile': _phone
		};
		
		if (!checkPhone(_phone)) {
			errTips('手机号格式错误');
			$('.txt-phone').addClass('txt-err');
			return;
		}
		$('.item_tips').hide();
		sendSmsCode();

	}
	
	/*发送短信验证码*/
	function sendSmsCode() {
					var $btn = $('.btn_retransmit');
					$btn.html('120s').addClass('btn_retransmit_disabled').addClass('is_restransit');
					var count = 120;
					var ret = setInterval(function() {
						--count;
						if (count == 0) {
							$btn.html('获取验证码').removeClass('btn_retransmit_disabled').removeClass('is_restransit');
							clearInterval(ret);
						} else {
							$btn.html('' + count + 's');
						}
					}, 1000);
					
	}
	

	
	
	/*提交验证*/
	function register() {
		if (!checkPhone(_phone)) {
			errTips('手机号格式错误');
			$('.txt_phone').focus().addClass('txt_err');
			return;
		}
		if (!checkPassword($('.txt_password').val())) {
			errTips('请将密码位数设置为6-20位');
			$('.txt_password').focus().addClass('txt_err');
			return;
		}
		$('.item_tips').hide();
		$('.btn_login').addClass('btn_disabled').html('注册中');
	}
	
	
};