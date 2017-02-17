var param = {};


//1销量2价格3评价4人气
if (GetQueryString("sortMode")) {
	param["sortMode"] = GetQueryString("sortMode");
}

//1,升序，2降序
if (GetQueryString("sortType")) {
	param["sortType"] = GetQueryString("sortType");
}

//（城市）区域ID
if (GetQueryString("areaId")) {
	params["areaId"] = GetQueryString("areaId");
}


//4表示，是通过筛选
var mark = GetQueryString("mark");
if (mark) {
	param["mark"] = mark;
}


if (mark) {
	//关键字   店铺ID
	if (mark == 1) {
		if (GetQueryString("keyword")) {
			param["keyword"] = GetQueryString("keyword");
			$(".nkeyword").html(param["keyword"]);
		}

		if (GetQueryString("storeId")) {
			param["storeId"] = GetQueryString("storeId");
		}
	}

	//全部和二级分分类    三级类目id
	if (mark == 2 || mark == 3) {
		if (GetQueryString("categoryId")) {
			param["categoryId"] = GetQueryString("categoryId");
		}
	}

	//品牌id     属性id,多个属性以逗号隔开
	if (mark == 4 || mark == 3) {
		if (GetQueryString("brandIds")) {
			param["brandIds"] = GetQueryString("brandIds");
		}
		if (GetQueryString("attributeIds")) {
			param["attributeIds"] = GetQueryString("attributeIds");
		}
	}

	//店铺ID
	if (mark == 5) {
		if (GetQueryString("storeId")) {
			param["storeId"] = GetQueryString("storeId");
		}
	}

	//国家馆(mark=8时使用)
	if (mark == 8) {
		if (GetQueryString("originIds")) {
			param["originIds"] = GetQueryString("originIds");
		}
	}

}

//每页显示
param["pageSize"] = 8;

//当前第几页
param["pageIndex"] = 1;
//URLS.SERVER_URL = "http://192.168.200.70:8088/lehu-app-back/";
var totalPageNum="";
//加载商品列表	
function goodsCategoryList() {


	var paramsStr = '';
	for (v in param) {
		paramsStr = paramsStr + v + '=' + param[v] + '&';
	}
	console.log(URLS.SERVER_URL + URLS.goodsCategoryList + '?' + paramsStr.substr(0, paramsStr.length - 1));

	var url = URLS.SERVER_URL + URLS.goodsCategoryList;
	var data = param;
	//成功回调函数
	var success = function(data){
		$("html").attr("data_type", data.type);
		
		var html = "";
		//总页数
		totalPageNum = data.totalPageNum;
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
				html += "<img class='nlist_list_mainleft lazyload'  src=" + URLS.IMAGE_URL + goodsList[k]['GOODS_IMG'] + " >";
				html += "<div class='nlist_list_mainright'>";
				html += "<div class='nlist_list_title'>";
				if (zy == 1) {
					html += "<span class='nlist_list_title_zhiyou'>【海外直邮】</span>";
				}
				if (zy == 2) {
					html += "<span class='nlist_list_title_zhiyou'>【保税区发货】</span>";
				}
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
				<!--html += "<div class='nlist_list_pinglun'>好评度：<em>" + Math.floor(goodsList[k]['REVIEW_PERCENT']) + "%</em>（<em>" + goodsList[k]['REVIEW_NUMBER'] + "</em>人）</div>"; -->
				if(goodsList[k]['STORE_NAME']){
					html += "<div class='nlist_list_pinglun'>" + goodsList[k]['STORE_NAME'] + "</div>";
				}
				html += "</div></div>";
			}
			$("#ajax_goodsList").append(html);
			lazyload();
			$(".nwrapper_list").removeClass("one_loading");
			//商品点击事件

				$(".nlist_list_main").unbind('click').click(function () {
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
					native.nativeFun(jsonParams);
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
			native.nativeFun(jsonParams);

		})
	
		} else {
			nlist_no();
		}
		
		if (param["pageIndex"] == data["totalPageNum"]) {
			nlist_no();
		}
		
	};
	
	//失败回调函数
	var error = function (){
		//location.href ="404.html";
		$(".ajax_noload").show();
	};

	ajaxPost(url,data,success,error);
	
	//URLS.SERVER_URL+URLS.goodsCategoryList   'http://192.168.200.70:8088/lehu-app-back/h5Goods/goodsList.do'
	
}


//首次加载
goodsCategoryList();

//滚动加载
var range = 1000; //距下边界长度/单位px

var huadong = true;

var totalheight = 0;
var main = $("#ajax_goodsList"); //主体元素
$(window).scroll(function() {
	
	    if(param["pageIndex"] > totalPageNum  ){
			nlist_no();
			return;
		}
	
	
	var srollPos = $(window).scrollTop(); //滚动条距顶部距离(页面超出窗口的高度)
	
	totalheight = parseFloat($(window).height()) + parseFloat(srollPos); //滚动条当前位置距顶部距离+浏览器的高度
	
		
		
		if(($(document).height() == totalheight)){
			param["pageIndex"]++;
				
				goodsCategoryList();
				
				
				$('.lazyload').picLazyLoad({
					threshold: 1000
				}); //图片延时加载
		}else {
			if (($(document).height() - totalheight) <= range) { //页面底部与滚动条底部的距离<range
			if(huadong){
				huadong = false;
				param["pageIndex"]++;
				
				goodsCategoryList();
				
				
				$('.lazyload').picLazyLoad({
					threshold: 1000
				}); //图片延时加载
				
			}
		}else {
			huadong = true;
		}
		}

});



//销量
$("#salesvolume").click(function() {
	if ($(this).hasClass("cur")) {} else {
		$(".nlist_nomore").css("display", "none");
		$(".nlist_loading").css("display", "block");
		$(".nwrapper_list").addClass("one_loading");
		param["pageIndex"] = 1;
		param["sort"] = 2;
		param["sortMode"] = 1;
		param["sortType"]=2;
		$("#ajax_goodsList").empty();
		goodsCategoryList();
		$("#price").removeClass("jiang");
		$("#price").removeClass("sheng");
	}

});

//价格
$("#price").click(function() {
	if ($(this).hasClass("sheng")) {
		$(this).removeClass("sheng");
		$(this).addClass("jiang");
		$(".nlist_nomore").css("display", "none");
		$(".nlist_loading").css("display", "block");
		$(".nwrapper_list").addClass("one_loading");
		param["pageIndex"] = 1;
		param["sort"] = 2;
		param["sortMode"] = 2;
		param["sortType"]=2;
		$("#ajax_goodsList").empty();
		goodsCategoryList();
		
		}
	
	 else {
		$(this).removeClass("jiang");
		$(this).addClass("sheng");
		$(".nlist_nomore").css("display", "none");
		$(".nlist_loading").css("display", "block");
		$(".nwrapper_list").addClass("one_loading");
		param["pageIndex"] = 1;
		param["sort"] = 2;
		param["sortMode"] = 2;
		param["sortType"]=1;
		$("#ajax_goodsList").empty();
		goodsCategoryList();
		
		
	}
});


//评价
$("#countreview").click(function() {
	if ($(this).hasClass("cur")) {} else {
		$(".nlist_nomore").css("display", "none");
		$(".nlist_loading").css("display", "block");
		$(".nwrapper_list").addClass("one_loading");
		param["pageIndex"] = 1;
		param["sort"] = 2;
		param["sortMode"] = 3;
		param["sortType"]=2;
		$("#ajax_goodsList").empty();
		goodsCategoryList();
		$("#price").removeClass("jiang");
		$("#price").removeClass("sheng");
	}
});
//人气
$("#viewcount").click(function() {
	if ($(this).hasClass("cur")) {} else {
		$(".nlist_nomore").css("display", "none");
		$(".nlist_loading").css("display", "block");
		$(".nwrapper_list").addClass("one_loading");
		param["pageIndex"] = 1;
		param["sort"] = 2;
		param["sortMode"] = 4;
		param["sortType"]=2;
		$("#ajax_goodsList").empty();
		goodsCategoryList();
		$("#price").removeClass("jiang");
		$("#price").removeClass("sheng");
	}
});





//判断商品是否存在
function nlist_no() {

	$(".nlist_loading").css("display", "none");

	var goodsNum = $("#ajax_goodsList").html();
	if (goodsNum == "") {
		$(".nlist_no").show();
	} else {
		$(".nlist_nomore").css("display", "block");
	}
}






//返回


/*$(".nindex_fanhui").unbind('click').click(function () {
var jsonParams = {
		'funName': 'back_fun',
		'params': {}
	};
	native.nativeFun(jsonParams);
	console.log('back_fun');
})
	*/			
function back_fun() {
	var jsonParams = {
		'funName': 'back_fun',
		'params': {}
	};
	native.nativeFun(jsonParams);
	console.log('back_fun');
};

//搜索
function search_fun() {
	var jsonParams = {
		'funName': 'search_fun',
		'params': {}
	};
	native.nativeFun(jsonParams);
	console.log(search_fun);
};



//select
$(".nlist_top span").click(function() {
	$(".nlist_top span").removeClass("cur");
	$(this).addClass("cur");
	$(".nlist_top").css("position", "static");
	$(".nlist_list").css("margin-top", "0");
})


//select置顶
$(document).ready(function(e) {
	var try_select_top = $(".nlist_top").offset().top;
	$(window).scroll(function() {
		var s = $(window).scrollTop();
		if (s >= try_select_top) {
			$(".nlist_top").css("position", "fixed");
			$(".nlist_list").css("margin-top", ".795rem");

		} else if(s < try_select_top){
			$(".nlist_top").css("position", "static");
			$(".nlist_list").css("margin-top", "0");
		};
	});
});


//列表样式切换
$(".list_style").click(function() {
	if ($(this).hasClass("list_style_kuai")) {
		$(this).removeClass("list_style_kuai");
		$(".nlist_list").removeClass("nlist_list_kuai");
		$("body").css("background","#ffffff");
		lazyload();
	} else {
		$(this).addClass("list_style_kuai");
		$(".nlist_list").addClass("nlist_list_kuai");
		$("body").css("background","#ecebf2");
	}
})

//返回顶部 
goBack2Top();



function connectWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) {
		callback(WebViewJavascriptBridge)
	} else {
		document.addEventListener('WebViewJavascriptBridgeReady', function() {
			callback(WebViewJavascriptBridge)
		}, false)
	}
}

connectWebViewJavascriptBridge(function(bridge) { 
	bridge.init(function(message, responseCallback) {
		goodsCategoryList();
		if (responseCallback) {
			var type = $("html").attr("data_type")
			responseCallback(type);
		}
	})

})