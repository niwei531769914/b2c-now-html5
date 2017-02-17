//页面rem
(function (doc, win) {
          var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
              var clientWidth = docEl.clientWidth;
			  var clientWidth = $(".nwrapper").width();
              /*if (!clientWidth) return;*/
              docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
			  
            };
          if (!doc.addEventListener) return;
          win.addEventListener(resizeEvt, recalc, false);
          doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);



//图片预加载
function lazyload(){
	$('.lazyload').picLazyLoad({
	threshold: 400
	});
}

//首页楼层商品效果
function prommotionLayout_swiper(){
	var swiper = new Swiper('.ntuijian_main .swiper-container', {
		slidesPerView: 3,
		paginationClickable: true,
		spaceBetween: 8,
		freeMode: true
	});
}

//弹出框
function showMessage(b) {
var d = null;
var c;
var a = {
		addHtml: function() {
			var e = '<div class="message-floor" id="messageBox">';
			e += '<div class="messge-box">';
			e += '<div class="messge-box-icon"><i class="message-toast-icon ' + b.cls + '"></i></div>';
			e += '<div class="messge-box-content">' + b.message + "</div>";
			e += "</div>";
			e += "</div>";
			$("body").append(e)
		},
		adjustHeight: function() {
			var e = document.documentElement.clientHeight;
			$(c).find(".messge-box")[0].style.marginTop = (e - b.height) / 2 + "px"
		},
		setInfo: function() {
			$(c).find(".messge-box-content").text(b.message);
			$(c).find(".messge-box").width(b.width + "px");
			$(c).find(".messge-box").height(b.height + "px");
			$(c).find(".bottom-focus-icon").attr("class", "bottom-focus-icon " + b.cls)
		}
	};
	if ($("#messageBox").length == 0) {
		a.addHtml()
	}
	c = document.getElementById("messageBox");
	a.adjustHeight();
	a.setInfo();
	c.style.display = "block";
	if (d != null) {
		clearTimeout(d)
	}
	d = setTimeout(function() {
		c.style.display = "none";
		d = null
	}, b.duration)
}


//返回顶部
function goTop(acceleration,time){acceleration=acceleration||0.1;time=time||1;var x1=0;var y1=0;var x2=0;var y2=0;var x3=0;var y3=0;if(document.documentElement){x1=document.documentElement.scrollLeft||0;y1=document.documentElement.scrollTop||0}if(document.body){x2=document.body.scrollLeft||0;y2=document.body.scrollTop||0}var x3=window.scrollX||0;var y3=window.scrollY||0;var x=Math.max(x1,Math.max(x2,x3));var y=Math.max(y1,Math.max(y2,y3));var speed=1+acceleration;window.scrollTo(Math.floor(x/speed),Math.floor(y/speed));if(x>0||y>0){var invokeFunction="goTop("+acceleration+", "+time+")";window.setTimeout(invokeFunction,time)}}
//$(".fix_go_top").on("click", function() {goTop();});


var goBack2Top = function() {
		var b = document.querySelector(".fix_go_top");
		var a = {
			init: function() {
				a.scrollEvt();
				a.toTopEvt()
			},
			toTopEvt: function() {
				b.addEventListener("click", function() {
					scroll(0, 0);
					//goTop();
					b.style.display = "none"
				}, false)
			},
			scrollEvt: function() {
				window.addEventListener("scroll", function() {
					var c = document.documentElement.clientHeight || document.body.clientHeight;
					var d = document.documentElement.scrollTop || document.body.scrollTop;
					if (d > c) {
						b.style.display = "block"
					} else {
						b.style.display = "none"
					}
				}, false)
			}
		};
		return a.init()
	};
$(document).ready(function(e) {
    $("body").css("visibility","visible");$("body").addClass("jbox");
});

setTimeout(function () {$("body").css("visibility","visible");$("body").addClass("jbox");}, 200);

//获取url
function GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(decodeURIComponent(r[2]));
    }
    return null;
}

$(".ajax_noload").click(function() {
	var jsonParams = {
		'funName': 'reload_web_fun',
		'params': {}
	};
	native.nativeFun(jsonParams);
})

 