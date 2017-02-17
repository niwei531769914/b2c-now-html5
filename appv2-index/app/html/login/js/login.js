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
	 
	 	var _login_free = true,
		_need_ck = true,
		_len_user = 0,
		_len_passwd = 0;

		hasCookie();
		bindEvents();

	
	/*判断手机禁用cookie*/
	function hasCookie() {
		if (!navigator.cookieEnabled) {
			$('.item_tips').show().children('.err-msg').html('您的手机浏览器不支持或已经禁止使用cookie，无法正常登录，请开启或更换其他浏览器');
		}
	}
	
	/*页面上所有处理事件*/
	function bindEvents() {
		
		/*返回*/
		$('.back').on('click', function() {
			window.history.back();
		});
		
		/*一个月内免登录*/
		$('.login_free').on('click', function() {
			$(this).toggleClass('login_free_selected');
			_login_free = !_login_free;
		});
		
		
		/*密码显示按钮*/
		$('.btn_off').on('click', function() {
			if ($(this).hasClass('btn_on')) {
				$(this).removeClass('btn_on');
				$(this).prev().attr('type', 'password');
			} else {
				$(this).addClass('btn_on');
				$(this).prev().attr('type', 'text');
			}
		});
		
		/*关闭按钮*/
		$('.btn_cancel').on('click', function() {
			$(this).parents('#pop-choose').css('display', 'none');
		});
		
		/*确定按钮*/
		$('.btn_confirm').on('click', function() {
			$(this).parents('#pop_confirm').css('display', 'none');
		});
		
		/*用户名*/
		_len_user = $('.txt_username').on('input', function() {
			$(this).removeClass('txt_err');
			_len_user = this.value.length;
			enableLogin();
		}).val().length;
		
		/*密码*/
		_len_passwd = $('.txt_password').on('input', function() {
			$(this).removeClass('txt_err');
			_len_passwd = this.value.length;
			enableLogin();
		}).val().length;
		
		/*登录按钮*/
		$('.btn_login').on('click', function() {
			if (!$(this).hasClass('btn_disabled')) {
				login();
			}
		});
	}
	

	/*登录按钮样式判断*/
	function enableLogin() {
		if (_len_user&&_len_passwd&&(!_need_ck||_need_ck)) {
			$('.btn_login').removeClass('btn_disabled');
		} else {
			$('.btn_login').addClass('btn_disabled');
		}
	}


	
	/*错误信息提示*/
	function errTips(msg) {
		if (msg == undefined || msg.length == 0) {
			$('.item_tips').hide();
		} else {
			$('.item_tips').show().children('.err-msg').html(msg);
		}
	}
	
	/*提交*/
	function login() {
		$('.btn_login').addClass('btn_disabled').html('登录中');
		$('.item_tips').hide();
	}
};