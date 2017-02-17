//加载banner列表
var juli;
var shengyu;

function ajax() {
	var url = URLS.SERVER_URL + URLS.appNewIndexFirst;
	var data = {};
	//成功回调函数
	var success = function(data){
		
		//console.log(URLS.SERVER_URL + URLS.appNewIndexFirst);
		$("html").attr("data_type", data.type);
		//加载_幻灯片	
		var html = "";
		var bannerList = data.bannerList;
		for (var k = 0; k < bannerList.length; k++) {
			html += "<div class='swiper-slide' data-SORT='" + bannerList[k]['SORT'] + "' data-BANNER_JUMP_ID='" + bannerList[k]['BANNER_JUMP_ID'] + "' data-BANNER_CONTENT='" + bannerList[k]['BANNER_CONTENT'] + "' data-BANNER_IMG='" + bannerList[k]['BANNER_IMG'] + "' data-ID='" + bannerList[k]['ID'] + "' data-BANNER_LAYOUT='" + bannerList[k]['BANNER_LAYOUT'] + "' data-BANNER_JUMP_FLAG='" + bannerList[k]['BANNER_JUMP_FLAG'] + "' data-STATUS='" + bannerList[k]['STATUS'] + "' data-NUM='" + bannerList[k]['NUM'] + "' data-BANNER_NAME='" + bannerList[k]['BANNER_NAME'] + "'>";
			html += "<img class='lazyload' src=" + URLS.IMAGE_URL + bannerList[k]['BANNER_IMG'] + " >";
			html += "</div>";
		}
		
		localStorage.removeItem("html01");
		localStorage.html01 = html; 
		$("#ajax_banner").empty().append(html);
		
		lazyload();

		
		//插件_幻灯片
		var swiper = new Swiper('.nbanner .swiper-container', {
			pagination: '.nbanner .swiper-pagination',
			autoplay: 2000,
			autoplayDisableOnInteraction : false,
			speed:300,
			loop: true,
			longSwipesRatio : 0.1,
			
		});

		//点击_幻灯片
		$(".nbanner .swiper-slide").click(function() {
			var SORT = $(this).attr("data-SORT");
			var BANNER_JUMP_ID = $(this).attr("data-BANNER_JUMP_ID");
			var BANNER_CONTENT = $(this).attr("data-BANNER_CONTENT");
			var BANNER_IMG = $(this).attr("data-BANNER_IMG");
			var ID = $(this).attr("data-ID");
			var BANNER_LAYOUT = $(this).attr("data-BANNER_LAYOUT");
			var BANNER_JUMP_FLAG = $(this).attr("data-BANNER_JUMP_FLAG");
			var STATUS = $(this).attr("data-STATUS");
			var NUM = $(this).attr("data-NUM");
			var BANNER_NAME = $(this).attr("data-BANNER_NAME");

			var jsonParams = {
				'funName': 'banner_item_fun',
				'params': {
					'SORT': SORT,
					'BANNER_JUMP_ID': BANNER_JUMP_ID,
					'BANNER_CONTENT': BANNER_CONTENT,
					'BANNER_IMG': BANNER_IMG,
					'ID': ID,
					'BANNER_LAYOUT': BANNER_LAYOUT,
					'BANNER_JUMP_FLAG': BANNER_JUMP_FLAG,
					'STATUS': STATUS,
					'NUM': NUM,
					'BANNER_NAME': BANNER_NAME
				}
			};
			native.nativeFun(jsonParams);

		})


		//加载_标签	

		var fastList_html = "";
		var fastList = data.fastList;

		for (var k = 0; k < fastList.length; k++) {

			fastList_html += "<a href='javascript:;' data-FAST_NAME='" + fastList[k]['FAST_NAME'] + "' data-ID='" + fastList[k]['ID'] + "' data-LINK_NAME='" + fastList[k]['LINK_NAME'] + "' data-FAST_IMG='" + fastList[k]['FAST_IMG'] + "'>";
			fastList_html += "<img class='lazyload' src=" + URLS.IMAGE_URL + fastList[k]['FAST_IMG'] + " >";
			fastList_html += "<span>" + fastList[k]['FAST_NAME'] + "</span>";
			fastList_html += "</a>";
		}
		localStorage.removeItem("html02");
		localStorage.html02 = fastList_html; 
		$("#ajax_fastList").empty().append(fastList_html);
		lazyload();

		//点击_标签
		$(".ntag a").click(function() {
			var FAST_NAME = $(this).attr("data-FAST_NAME");
			var ID = $(this).attr("data-ID");
			var LINK_NAME = $(this).attr("data-LINK_NAME");
			var FAST_IMG = $(this).attr("data-FAST_IMG");
			//console.log(funName,url);
			var jsonParams = {
				'funName': 'shortcut_fun',
				'params': {
					'FAST_NAME': FAST_NAME,
					'dID': ID,
					'LINK_NAME': LINK_NAME,
					'FAST_IMG': FAST_IMG
				}
			};
			native.nativeFun(jsonParams);
		})

		//加载_秒杀时间
		if(data.seckillList){

		$(".nmiaosha,.nmiaosha_nhr").css("display", "block");
		var seckillList = data.seckillList;
		var ajax_REMARK=seckillList['REMARK'];
		$(".ajax_REMARK").empty().append(ajax_REMARK);
		
		
		

		if (seckillList['END_TIME']) {
			var endtime = Date.parse(new Date(getDateTime(seckillList['END_TIME'])));
			endtime = endtime / 1000;
			var START_TIME = Date.parse(new Date(getDateTime(seckillList['START_TIME'])));
			START_TIME = START_TIME / 1000;
			var current_Time = Date.parse(new Date(getDateTime(data.currentTime)));
			current_Time = current_Time / 1000;

			
			
			juli = START_TIME-current_Time; //距离时间
			shengyu = endtime-current_Time; //距离时间


			
			/*if(current_Time >= START_TIME){
				$(".ajax_timetext").empty().append("还剩");
				$(".getting-started").attr("data-countdown", endtime);

			}else{
				$(".ajax_timetext").empty().append("距离开始");
				$(".getting-started").attr("data-countdown", STARTTIME);	
			}*/
			
			
			
			/*$('[data-countdown]').each(function() {
					var $this = $('[data-countdown]'),
					finalDate = $(this).data('countdown');
				 	$this.countdown(finalDate, {elapse: true}).on('update.countdown', function(event) {
					  	var totalHours = event.offset.totalDays * 24 + event.offset.hours;
						$this.html(event.strftime('<em>'+totalHours+'</em>:<em>%M</em>:<em>%S</em>'));
					});
			});*/
			


			
			

		}

		//加载_秒杀列表

		var COMMODITY_LIST_html = "";
		var COMMODITY_LIST = data.seckillList['COMMODITY_LIST'];
		if (COMMODITY_LIST) {
			$(".nmiaosha,.nmiaosha_nhr").css("display", "block");
			for (var k = 0; k < COMMODITY_LIST.length; k++) {
				var PRICE = String(COMMODITY_LIST[k]['GOODS_PRICE'].toString());
				var q = Math.floor(PRICE);
				var h = (PRICE).slice(-2);
				COMMODITY_LIST_html += "<a href='javascript:;' data-GOODS_IMG='" + COMMODITY_LIST[k]['GOODS_NAME'] + "'  data-GOODS_PRICE='" + COMMODITY_LIST[k]['GOODS_PRICE'] + "' data-PRICE='" + COMMODITY_LIST[k]['PRICE'] + "' data-GOODS_NAME='" + COMMODITY_LIST[k]['GOODS_NAME'] + "' data-STORE_ID='" + COMMODITY_LIST[k]['STORE_ID'] + "' data-GOODS_NO='" + COMMODITY_LIST[k]['GOODS_NO'] + "' data-GOODS_ID='" + COMMODITY_LIST[k]['GOODS_ID'] + "' data-DISCOUNT_TYPE='" + COMMODITY_LIST[k]['DISCOUNT_TYPE'] + "' data-DISCOUNT='" + COMMODITY_LIST[k]['DISCOUNT'] + "' data-NUM='" + COMMODITY_LIST[k]['NUM'] + "'>";
				COMMODITY_LIST_html += "<img class='lazyload' data-original=" + URLS.IMAGE_URL + COMMODITY_LIST[k]['GOODS_IMG'] + " >";
				COMMODITY_LIST_html += "<title>" + COMMODITY_LIST[k]['GOODS_NAME'] + "</title>";
				COMMODITY_LIST_html += "<span>￥" + q +".<em>"+ h +"</em>" + "</span>";
				/*if(COMMODITY_LIST[k]['DISCOUNT_TYPE']==1&&COMMODITY_LIST[k]['DISCOUNT']!==10){
				COMMODITY_LIST_html += "<i>" +  COMMODITY_LIST[k]['DISCOUNT'] + "折</i>";
				}*/
				
				COMMODITY_LIST_html += "<del>￥" +  COMMODITY_LIST[k]['ORIGINAL_PRICE'] + "</del>";
				
				COMMODITY_LIST_html += "</a>";
			}

			$("#ajax_seckillList").empty().append(COMMODITY_LIST_html);
			lazyload();


		} 
		
		}else {
			$(".nmiaosha,.nmiaosha_nhr").css("display", "none");
		}

		//加载首页广告列表
		var html = "";
		var hotRecommendation = data.hotRecommendation;
		
		if(hotRecommendation && hotRecommendation.length>0){
			for (var k = 0; k < hotRecommendation.length; k++) {
				if(hotRecommendation[k]['TEMPLATE']==1){
					html += "<div class='nindex_ad_one'><a href='javascript:;'  data-IMG_URL='" + hotRecommendation[k]['goods'][0].IMG_URL + "'  data-GOODS_ID='" + hotRecommendation[k]['goods'][0].GOODS_ID + "' data-ID='" + hotRecommendation[k]['ID'] + "'  data-TEMPLATE='" + hotRecommendation[k]['TEMPLATE'] + "'>";
					html += "<img  class='lazyload' src=" + URLS.IMAGE_URL + hotRecommendation[k]['goods'][0].IMG_URL + " >";
					html += "</a></div>";
				}
				if(hotRecommendation[k]['TEMPLATE']==2){
					html += "<div class='nindex_ad_two'>";
					for (var i = 0; i < hotRecommendation[k]['goods'].length; i++) {
					html += "<a href='javascript:;'  data-IMG_URL='" + hotRecommendation[k]['goods'][i].IMG_URL + "'  data-GOODS_ID='" + hotRecommendation[k]['goods'][i].GOODS_ID + "' data-ID='" + hotRecommendation[k]['ID'] + "'  data-TEMPLATE='" + hotRecommendation[k]['TEMPLATE'] + "'>";
					html += "<img  class='lazyload' src=" + URLS.IMAGE_URL +hotRecommendation[k]['goods'][i].IMG_URL + " >";
					html += "</a>";
					}
					html += "</div>";
				}
				if(hotRecommendation[k]['TEMPLATE']==3){
					html += "<div class='nindex_ad_three'>";
					for (var i = 0; i < hotRecommendation[k]['goods'].length; i++) {
					html += "<a href='javascript:;'  data-IMG_URL='" + hotRecommendation[k]['goods'][i].IMG_URL + "'  data-GOODS_ID='" + hotRecommendation[k]['goods'][i].GOODS_ID + "' data-ID='" + hotRecommendation[k]['ID'] + "'  data-TEMPLATE='" + hotRecommendation[k]['TEMPLATE'] + "'>";
					html += "<img  class='lazyload' src=" + URLS.IMAGE_URL +hotRecommendation[k]['goods'][i].IMG_URL + " >";
					html += "</a>";
					}
					html += "</div>";
				}
			}
			localStorage.removeItem("html03");
			localStorage.html03 = html; 
			$("#ajax_hotRecommendation").empty().append(html);
			lazyload();
		}


		$(".nindex_ad a").click(function() {
			var IMG_URL = $(this).attr("data-IMG_URL");
			var GOODS_ID = $(this).attr("data-GOODS_ID");
			var ID = $(this).attr("data-ID");
			var TEMPLATE = $(this).attr("data-TEMPLATE");
			var jsonParams = {
				'funName': 'hot_recommendation_fun',
				'params': {
					'IMG_URL': IMG_URL,
					'GOODS_ID': GOODS_ID,
					'ID': ID,
					'TEMPLATE': TEMPLATE
				}
			};
			native.nativeFun(jsonParams);
		})



		//加载_楼层
		var html = "";
		var prommotionLayout = data.prommotionLayout;
		//console.log(prommotionLayout);
		for (var k = 0; k < prommotionLayout.length; k++) {
			html += "<div class='ntuijian'><div class='ntuijian_top'><span><em>" + prommotionLayout[k]['PROMOTION_NAME'] + "</em></span></div>";

			html += "<div class='ntuijian_ad'><a href='javascript:;' data-id='" + prommotionLayout[k]['ID'] + "'   data-promotion_name='" + prommotionLayout[k]['PROMOTION_NAME'] + "'   data-detail_layout='" + prommotionLayout[k]['DETAIL_LAYOUT'] + "' class='prommotionLayout_ad'><img class='lazyload' data-original=" + URLS.IMAGE_URL + prommotionLayout[k]['PROMOTION_BANNER'] + "></a></div>";

			html += "<div class='ntuijian_main'><div class='swiper-container' style=''><div class='swiper-wrapper'>";

			var prommotionLayout_detail = data.prommotionLayout[k]['goodsList'];

			for (var i = 0; i < prommotionLayout_detail.length; i++) {
				//var a= i+1;
				var PRICE = String(prommotionLayout_detail[i]['GOODS_PRICE'].toString());
				var q = Math.floor(PRICE);
				var h = (PRICE).slice(-2);


				html += "<a href='javascript:;'  data-GOODS_PRICE='" + prommotionLayout_detail[i]['GOODS_PRICE'] + "' data-GOODS_NAME='" + prommotionLayout_detail[i]['GOODS_NAME'] + "' data-STORE_ID='" + prommotionLayout_detail[i]['STORE_ID'] + "' data-GOODS_NO='" + prommotionLayout_detail[i]['GOODS_NO'] + "' data-GOODS_ID='" + prommotionLayout_detail[i]['ID'] + "' data-NUM='" + prommotionLayout_detail[i]['NUM'] + "' class='swiper-slide prommotionLayout_detail'>";
				html += "<img class='lazyload' data-original=" + URLS.IMAGE_URL + prommotionLayout_detail[i]['GOODS_IMG'] + " >";
				html += "<title>" + prommotionLayout_detail[i]['GOODS_NAME'] + "</title>";
				html += "<span>￥" + q+".<i>"+ h+"</i>"+ "</span>";
				html += "</a>";



			}
			html += "<a href='javascript:;' data-id='" + prommotionLayout[k]['ID'] + "' data-promotion_name='" + prommotionLayout[k]['PROMOTION_NAME'] + "'   data-detail_layout='" + prommotionLayout[k]['DETAIL_LAYOUT'] + "' class='swiper-slide prommotionLayout_detail_more'><img class='lazyload' data-original='images/more.jpg'></a></div></div></div>";


			html += "</div><div class='nhr'></div>";
		}

		$("#ajax_prommotionLayout").empty().append(html);

		lazyload();

		prommotionLayout_swiper();



		$(".prommotionLayout_ad,.prommotionLayout_detail_more").click(function() {
			var id = $(this).attr("data-id");
			var promotion_name = $(this).attr("data-promotion_name");
			var detail_layout = $(this).attr("data-detail_layout");
			var jsonParams = {
				'funName': 'promotion_more_fun',
				'params': {
					'id': id,
					'promotion_name': promotion_name,
					'detail_layout': detail_layout
				}
			};
			native.nativeFun(jsonParams);
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

		setTimeout(
		//发现

		function() {
			var html = "";
			var showList = data.showList;
			$(".nfaxian_top").empty();
			if(showList && showList.length > 0 ){
				$(".ajax_nfaxian_top").prepend('<div class="nfaxian_top"><span><em>发现</em></span></div>');
			}
	
				//console.log(URLS.SERVER_URL + URLS.appNewIndexFirst);
				
				//console.log(prommotionLayout);
				for (var k = 0; k < showList.length; k++) {
					var type = showList[k]['TYPE'];
					if (type == 3) {
						html += "<div class=' nshow_list_video' data-id='" + showList[k]['ID'] + "' data-SHOW_FILE='" + showList[k]['SHOW_FILE'] + "' data-SHOW_GOODS_IDS='" + showList[k]['SHOW_GOODS_IDS'] + "' data-FACE_IMAGE_PATH='" + showList[k]['FACE_IMAGE_PATH'] + "' data-USER_ID='" + showList[k]['USER_ID'] + "' data-CREATE_TIME='" + showList[k]['CREATE_TIME'] + "' data-SHOW_IMG='" + showList[k]['SHOW_IMG'] + "' data-PHONE='" + showList[k]['PHONE'] + "' data-SPOTLIGHT_CIRCLE_ID='" + showList[k]['SPOTLIGHT_CIRCLE_ID'] + "' data-CIRCLE_NAME='" + showList[k]['CIRCLE_NAME'] + "' data-VIDEO_IMG='" + showList[k]['VIDEO_IMG'] + "' data-LIKENUM='" + showList[k]['LIKENUM'] + "' data-CONTENT='" + showList[k]['CONTENT'] + "' data-USER_NAME='" + showList[k]['USER_NAME'] + "' data-NUM='" + showList[k]['NUM'] + "' data-APPRAISENUM='" + showList[k]['APPRAISENUM'] + "' data-TYPE='" + showList[k]['TYPE'] + "'  data-TITLE='" + showList[k]['TITLE'] + "'>";
						html += "<div class=' nshow_listbox_video'><video class='myVideo' src=" + URLS.IMAGE_URL + showList[k]['SHOW_FILE'] + " controls poster=" + URLS.IMAGE_URL + showList[k]['VIDEO_IMG'] + "></video></div>"

					} else {


						html += "<div class='nshow_listbox' data-id='" + showList[k]['ID'] + "' data-SHOW_FILE='" + showList[k]['SHOW_FILE'] + "' data-SHOW_GOODS_IDS='" + showList[k]['SHOW_GOODS_IDS'] + "' data-FACE_IMAGE_PATH='" + showList[k]['FACE_IMAGE_PATH'] + "' data-USER_ID='" + showList[k]['USER_ID'] + "' data-CREATE_TIME='" + showList[k]['CREATE_TIME'] + "' data-SHOW_IMG='" + showList[k]['SHOW_IMG'].split(',')[0] + "' data-PHONE='" + showList[k]['PHONE'] + "' data-SPOTLIGHT_CIRCLE_ID='" + showList[k]['SPOTLIGHT_CIRCLE_ID'] + "' data-CIRCLE_NAME='" + showList[k]['CIRCLE_NAME'] + "' data-VIDEO_IMG='" + showList[k]['VIDEO_IMG'] + "' data-LIKENUM='" + showList[k]['LIKENUM'] + "' data-CONTENT='" + showList[k]['CONTENT'] + "' data-USER_NAME='" + showList[k]['USER_NAME'] + "' data-NUM='" + showList[k]['NUM'] + "' data-APPRAISENUM='" + showList[k]['APPRAISENUM'] + "' data-TYPE='" + showList[k]['TYPE'] + "'  data-TITLE='" + showList[k]['TITLE'] + "'>";
						html += "<a href='javascript:;' class='nshow_listbox_img'><img class='lazyload' data-original=" + URLS.IMAGE_URL + showList[k]['SHOW_IMG'].split(',')[0] + "></a>"
					}



					html += "<div class='nshow_listbox_title ell'>" + showList[k]['TITLE'] + "</div>"


					if (showList[k]['FACE_IMAGE_PATH']) {
						html += "<div class='nshow_listmsg'><a class=''><img class='lazyload' data-original=" + URLS.IMAGE_URL + showList[k]['FACE_IMAGE_PATH'] + "><span class='nshow_listmsg_name ell'>" + showList[k]['USER_NAME'] + "</span><span class='nshow_listmsg_time'>" + showList[k]['TIME'] + "发布于："+"<b>"+showList[k]['CIRCLE_NAME']+"</b>"+"</span>"
					} else {
						html += "<div class='nshow_listmsg'><a  class=''><img class='lazyload' data-original='images/Shortcut_114_114.png'><span class='nshow_listmsg_name ell'>" + showList[k]['USER_NAME'] + "</span><span class='nshow_listmsg_time'>" + showList[k]['TIME'] + "发布于："+"<b>"+showList[k]['CIRCLE_NAME']+"</b>"+"</span>"
					}



					html += "<div class='nshow_listmsg_zh'><i class='nshow_iconfont'>&#xe601;</i><span>" + showList[k]['LIKENUM'] + "</span></div>"
					html += "<div class='nshow_listmsg_pl'><i class='nshow_iconfont'>&#xe600;</i><span>" + showList[k]['APPRAISENUM'] + "</span></div>"
					html += "</a></div></div>";
				}

				$("#ajax_showList").empty().append(html);

				lazyload();

				$(".nshow_listbox").click(function() {
					var id = $(this).attr("data-id");
					var SHOW_FILE = $(this).attr("data-SHOW_FILE");
					var SHOW_GOODS_IDS = $(this).attr("data-SHOW_GOODS_IDS");
					var FACE_IMAGE_PATH = $(this).attr("data-FACE_IMAGE_PATH");
					var USER_ID = $(this).attr("data-USER_ID");
					var CREATE_TIME = $(this).attr("data-CREATE_TIME");
					var SHOW_IMG = $(this).attr("data-SHOW_IMG");
					var PHONE = $(this).attr("data-PHONE");
					var SPOTLIGHT_CIRCLE_ID = $(this).attr("data-SPOTLIGHT_CIRCLE_ID");
					var CIRCLE_NAME = $(this).attr("data-CIRCLE_NAME");
					var VIDEO_IMG = $(this).attr("data-VIDEO_IMG");
					var LIKENUM = $(this).attr("data-LIKENUM");
					var CONTENT = $(this).attr("data-CONTENT");
					var USER_NAME = $(this).attr("data-USER_NAME");
					var NUM = $(this).attr("data-NUM");
					var APPRAISENUM = $(this).attr("data-APPRAISENUM");
					var TYPE = $(this).attr("data-TYPE");
					var TITLE = $(this).attr("data-TITLE");
					var jsonParams = {
						'funName': 'show_detail_fun',
						'params': {
							'ID': id,
							'SHOW_FILE': SHOW_FILE,
							'SHOW_GOODS_IDS': SHOW_GOODS_IDS,
							'FACE_IMAGE_PATH': FACE_IMAGE_PATH,
							'USER_ID': USER_ID,
							'CREATE_TIME': CREATE_TIME,
							'SHOW_IMG': SHOW_IMG,
							'PHONE': PHONE,
							'SPOTLIGHT_CIRCLE_ID': SPOTLIGHT_CIRCLE_ID,
							'CIRCLE_NAME': CIRCLE_NAME,
							'VIDEO_IMG': VIDEO_IMG,
							'LIKENUM': LIKENUM,
							'CONTENT': CONTENT,
							'USER_NAME': USER_NAME,
							'NUM': NUM,
							'APPRAISENUM': APPRAISENUM,
							'TYPE': TYPE,
							'TITLE': TITLE,
							'jsonParams': jsonParams
						}
					};
					native.nativeFun(jsonParams);
				})


				$(".nshow_list_video .nshow_listbox_title,.nshow_list_video .nshow_listmsg").click(function() {
					var id = $(this).parent().attr("data-id");
					var SHOW_FILE = $(this).parent().attr("data-SHOW_FILE");
					var SHOW_GOODS_IDS = $(this).parent().attr("data-SHOW_GOODS_IDS");
					var FACE_IMAGE_PATH = $(this).parent().attr("data-FACE_IMAGE_PATH");
					var USER_ID = $(this).parent().attr("data-USER_ID");
					var CREATE_TIME = $(this).parent().attr("data-CREATE_TIME");
					var SHOW_IMG = $(this).parent().attr("data-SHOW_IMG");
					var PHONE = $(this).parent().attr("data-PHONE");
					var SPOTLIGHT_CIRCLE_ID = $(this).parent().attr("data-SPOTLIGHT_CIRCLE_ID");
					var CIRCLE_NAME = $(this).parent().attr("data-CIRCLE_NAME");
					var VIDEO_IMG = $(this).parent().attr("data-VIDEO_IMG");
					var LIKENUM = $(this).parent().attr("data-LIKENUM");
					var CONTENT = $(this).parent().attr("data-CONTENT");
					var USER_NAME = $(this).parent().attr("data-USER_NAME");
					var NUM = $(this).parent().attr("data-NUM");
					var APPRAISENUM = $(this).parent().attr("data-APPRAISENUM");
					var TYPE = $(this).parent().attr("data-TYPE");
					var TITLE = $(this).parent().attr("data-TITLE");
					var jsonParams = {
						'funName': 'show_detail_fun',
						'params': {
							'ID': id,
							'SHOW_FILE': SHOW_FILE,
							'SHOW_GOODS_IDS': SHOW_GOODS_IDS,
							'FACE_IMAGE_PATH': FACE_IMAGE_PATH,
							'USER_ID': USER_ID,
							'CREATE_TIME': CREATE_TIME,
							'SHOW_IMG': SHOW_IMG,
							'PHONE': PHONE,
							'SPOTLIGHT_CIRCLE_ID': SPOTLIGHT_CIRCLE_ID,
							'CIRCLE_NAME': CIRCLE_NAME,
							'VIDEO_IMG': VIDEO_IMG,
							'LIKENUM': LIKENUM,
							'CONTENT': CONTENT,
							'USER_NAME': USER_NAME,
							'NUM': NUM,
							'APPRAISENUM': APPRAISENUM,
							'TYPE': TYPE,
							'TITLE': TITLE,
							'jsonParams': jsonParams
						}
					};
					native.nativeFun(jsonParams);
				})


		
		}, 1500);

		//加载_400电话
		var hotline = data.hotline;
		var jsonParams = {
			'funName': 'set_hotline_fun',
			'params': {
				'hotline': hotline
			}
		};
		native.nativeFun(jsonParams);

	};
	
	//失败回调函数
	var error = function (){
		$(".ajax_noload").show();
		//location.href ="404_index.html";
		
	};

	ajaxPost(url,data,success,error);
}



ajax();


//扫描
function scan_code_fun() {
	var jsonParams = {
		'funName': 'scan_code_fun',
		'params': {}
	};
	native.nativeFun(jsonParams);
};




//消息
function message_fun() {
	var jsonParams = {
		'funName': 'message_fun',
		'params': {}
	};
	native.nativeFun(jsonParams);
};

//搜索
function search_fun() {
	var jsonParams = {
		'funName': 'search_fun',
		'params': {}
	};
	native.nativeFun(jsonParams);
};


//秒杀更多
$(".nmiaosha_top a").click(function() {
	var title = $(this).attr("data-title");
	var url = $(this).attr("data-url");
	var jsonParams = {
		'funName': 'seckill_more_fun',
		'params': {}
	};
	native.nativeFun(jsonParams);
})









/*function connectWebViewJavascriptBridge(callback) {
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
		ajax();
		if (responseCallback) {
			var type = $("html").attr("data_type")
			responseCallback(type);
		}
	})

})*/

//返回顶部 
goBack2Top();

$(document).ready(function(e) {
    //顶部变色效果	
	$(window).scroll(function() {
        var s = $(window).scrollTop();
        if (s > 100) {
            $(".nheader_cover").animate({opacity:0.9});
			$(".nheader_cover").css({ 'border-bottom':'1px solid #d2d2d2'});
			$(".nindex_sousuo").animate({color:'#707070'});
			$(".nindex_sousuo").animate({background:'rgba(238,238,238,.9)'});
			$(".nindex_shaomiao").css({'background-image':'url(images/shaoyishao2.png)'});
			$(".nindex_sousuo em").css({'background-image':'url(images/soshuo2.png)'});
			$(".nindex_xiaoxi").css({'background-image':'url(images/xiaoxi2.png)'});
			
        } else {
            $(".nheader_cover").animate({opacity:0});
			$(".nheader_cover").css({ 'border-bottom':'0px solid #d2d2d2'});
			$(".nindex_sousuo").animate({color:'#a0a0a0'});
			$(".nindex_sousuo").animate({background:'rgba(255,255,255,.7)'});
			$(".nindex_shaomiao").css({'background-image':'url(images/shaoyishao.png)'});
			$(".nindex_sousuo em").css({'background-image':'url(images/soshuo.png)'});
			$(".nindex_xiaoxi").css({'background-image':'url(images/xiaoxi.png)'});
        };
	});
    //幻灯片
	/*var swiper = new Swiper('.nbanner .swiper-container', {
        pagination: '.nbanner .swiper-pagination',
        autoplay: 2000,
    });*/
	//倒计时
	/*$(".getting-started")
    .countdown("2016/07/01", function(event) {
      $(this).html(
        event.strftime('<em>%H</em>:<em>%M</em>:<em>%S</em>')
      );
    });*/			
});


			function CountDown(){ 
				if(juli>=0){
					console.log("juli:"+juli);
					hours= Math.floor(juli/3600); 
					minutes = Math.floor((juli%3600)/60); 
					seconds = Math.floor(juli%60);
					
					if(hours<10) hours = '0' + hours;
					if(minutes<10) minutes = '0' + minutes;
					if(seconds<10) seconds = '0' + seconds;
					
					$(".ajax_timetext").empty().append("距离开始");
					$(".getting-started").empty().append("<em>"+hours+"</em>:<em>"+minutes+"</em>:<em>"+seconds+"</em>");
					--juli; 
				} 
				else{
					hours= Math.floor(shengyu/3600); 
					minutes = Math.floor((shengyu%3600)/60); 
					seconds = Math.floor(shengyu%60);
					
					if(hours<10) hours = '0' + hours;
					if(minutes<10) minutes = '0' + minutes;
					if(seconds<10) seconds = '0' + seconds;
					
					$(".ajax_timetext").empty().append("剩余");
					$(".ajax_REMARK").css("display", "inline-block");
					$(".getting-started").empty().append("<em>"+hours+"</em>:<em>"+minutes+"</em>:<em>"+seconds+"</em>");
					--shengyu; 
				}
				
				if(shengyu<0){
					clearInterval(timer); 
					$(".nmiaosha,.nmiaosha_nhr").css("display", "none");
				}
			}
			
            timer = setInterval("CountDown()",1000); 


function getDateTime(date){
	if(date){
		return date.replace("-", "/").replace("-", "/")
	}
	
	return null;
}