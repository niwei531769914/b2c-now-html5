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
	
	//导航
	if($(".list_main_nav")[0]){ 
	 var nav= $(".list_main_nav").offset().top;
	 var a=$('#list_box_0').offset().top-$('.list_main_nav').height()-5;
	 var b=$('#list_box_1').offset().top-$('.list_main_nav').height()-5;
	 var c=$('#list_box_2').offset().top-$('.list_main_nav').height()-5;
	 $(window).scroll(function() {
        var s = $(window).scrollTop();
		//着重
		if (s > a) {
            $(".list_main_nav li").removeClass("active");
			$(".list_main_nav li:nth-child(1)").addClass("active");
        }
		if (s > b) {
            $(".list_main_nav li").removeClass("active");
			$(".list_main_nav li:nth-child(2)").addClass("active");
        }
		if (s > c) {
            $(".list_main_nav li").removeClass("active");
			$(".list_main_nav li:nth-child(3)").addClass("active");
        }
		//置顶
        if (s > nav) {
            $(".list_main_nav").css("position","fixed");
			$(".list_main_nav").next().css("margin-top",".9rem");
        } else {
            $(".list_main_nav").css("position","relative");
			$(".list_main_nav").next().css("margin-top","0rem");
        };
    });
	}
	
	//点击跳转
	$(".list_main_nav li").click(function(){
		$(".list_main_nav li").removeClass("active");
		$(this).addClass("active");
		var h=$('#list_box_'+$(this).index()).offset().top-$('.list_main_nav').height();
		$("body").scrollTop(h);
	})
	
	
};