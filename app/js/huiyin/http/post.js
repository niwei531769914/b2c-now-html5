
//获取url   http://192.168.19.22:8082/goodsInfo.do?userId=21950&areaId=220&shoppingIds=-1&goodsId=83350&storeId=531&goodsNo=989898
<!--URLS.SERVER_URL  = "http://192.168.200.175:8080/lehu-app-back/";-->

function GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(decodeURIComponent(r[2]));
    }
    return null;
}

var userId;


// 安卓获取userid
onPageShow = function()  {
	console.log('--onPageShow--');	
	if (native.platfrom === "android"){
		 userId=JSInterface.getUserId();
	}

}
	
onPageHide = function()  {
	console.log('--onPageHide--');	
}






native.getUserId().done(function(id) {
	userId = id;
	getGoodsDetailData();
});

//getGoodsDetailData();
function getGoodsDetailData() {
	
	var param={};



		if(userId){
			param["userId"] =userId;
			//alert(param["userId"]);
		}
		

		if(GetQueryString("shoppingIds")) {
			param["shoppingIds"] = GetQueryString("shoppingIds");	
		}
		

		if(GetQueryString("goodsId")) {
			param["goodsId"] = GetQueryString("goodsId");	
		}
		

		if(GetQueryString("storeId")) {
			param["storeId"] = GetQueryString("storeId");	
		}
		

		if(GetQueryString("goodsNo")) {
			param["goodsNo"] = GetQueryString("goodsNo");	
		}

			
	//加载商品信息
	
	var paramsStr = '';
			for(v in param) {
			  paramsStr = paramsStr + v + '=' + param[v] + '&';
			}
			console.log(URLS.SERVER_URL+URLS.goodsInfo + '?' + paramsStr.substr(0, paramsStr.length - 1));
			
	
	
			//URLS.SERVER_URL+URLS.goodsCategoryList
			$.post(URLS.SERVER_URL+URLS.goodsInfo, param, function(data) {
			
	
	
			console.log(data);
			
	
				
			var goodsDetail = data && data.goodsDetail;
			if(goodsDetail){
				
				var FLAG_ACTIVITY=goodsDetail.FLAG_ACTIVITY;
				
				if(FLAG_ACTIVITY=="3"){
					$(".npost_foot_go,.npost_foot_add").css("display","none");
					$(".npost_foot_kill").css("display","block");
				}
				
				//商品图片
				var GOODS_IMG_LIST = "";
				  for(var k=0;k<goodsDetail.GOODS_IMG_LIST.split(',').length;k++){
					GOODS_IMG_LIST += "<div class='swiper-slide'>";
					GOODS_IMG_LIST += "<img class='lazyload' data-original="+URLS.IMAGE_URL+goodsDetail.GOODS_IMG_LIST.split(',')[k]+" >";
					GOODS_IMG_LIST += "</div>";
				  }
				 $(".swiper-wrapper").append(GOODS_IMG_LIST);
					 lazyload();
					//幻灯片
					var swiper = new Swiper('.npost_top .swiper-container', {
						pagination: '.npost_top .swiper-pagination',
						autoplay: 2000,
						loop:true,
					}); 
					
				//商品名称
				$(".npost_title").append('<span>'+goodsDetail.GOODS_NAME+'</span>');
				
				
				if(goodsDetail.IS_CONSUMPTION_COUPON=="1"){
					$(".npost_title").append('<em>海外直邮</em>');
					$(".npost_xinxi_zhiyou").css("display","block");
				}
				
				if(goodsDetail.IS_CONSUMPTION_COUPON=="2"){
					$(".npost_title").append('<em>保税区发货</em>');
					$(".npost_xinxi_zhiyou").css("display","block");
				}
				
				
				
				
				$(".npost_jieshao").append(goodsDetail.AD);
				
				
				
				var PRICE=String(goodsDetail.GOODS_PRICE.toString());
				
				var q=Math.floor(PRICE);
				var h = (PRICE).slice(-2);
				
				var DISCOUNT_PRICE=goodsDetail.DISCOUNT_PRICE;
	
				var zhekou=(DISCOUNT_PRICE/PRICE * 10).toFixed(1);
		
		
				var npost_jiage="";
				if(DISCOUNT_PRICE!==undefined){var DISCOUNT_PRICEa=String(DISCOUNT_PRICE);var z_q=Math.floor(DISCOUNT_PRICEa);var z_h=(DISCOUNT_PRICEa).slice(-2);npost_jiage += "<span>￥"+z_q+".<i>"+z_h+"</i></span><em>促销价"+zhekou+"折</em><br/><b>乐虎价：￥"+PRICE+"</b>";}else{npost_jiage += "<span>￥"+q+".<i>"+h+"</i></span>";}
				
					  
				$(".npost_jiage").append(npost_jiage);
				
				
				$(".dianpu").append(goodsDetail.STORE_NAME);
				
				$(".REVIEW_NUMBER").append(goodsDetail.REVIEW_NUMBER);
				$(".REVIEW_PERCENT").append(Math.floor(goodsDetail.REVIEW_PERCENT));
				
				$(".npost_top_fenxiang").attr("data_goods_img",URLS.IMAGE_URL+goodsDetail.GOODS_IMG);
				$(".npost_top_fenxiang").attr("data_goods_url",'http://wap.lehumall.com/wapGoods.do?goods_id='+goodsDetail.ID);
				
				var wsc="";
				wsc +="<div class='focus-container'><div class='focus-icon'><i class='bottom-focus-icon focus-out'></i><i class='focus-scale focus-scale-show'></i></div><span class='focus-info'>收藏</span></div>";
				
				var sc="";
				sc +="<div class='focus-container'><div class='focus-icon'><i class='bottom-focus-icon focus-out click-focus-show'></i><i class='focus-scale' style='display: inline-block;'></i></div><span class='focus-info'>已收藏</span></div>";
				
				var FLAG_FOCUS_GOODS=goodsDetail.FLAG_FOCUS_GOODS;
	
				if(FLAG_FOCUS_GOODS=="0"){
					$(".npost_foot_shouchang").append(wsc);
				}
				else{
					$(".npost_foot_shouchang").append(sc);
				}
				
				
				
				if(goodsDetail.SHOPPING_CAR_NUM){
					var num="";
					num +="<i class='order-numbers'>";
					num +=goodsDetail.SHOPPING_CAR_NUM;
					num +="</i>";
					$(".order-numbers-cont").append(num);
				}
				
				
				if(data.canBuy==false){
					$(".npost_foot_add,.npost_foot_go,.npost_foot_kill").addClass("npost_foot_no");
				}
						

//获取地区 是否可以购买 包邮						
				$("html").attr("data_FREIGHT_TYPE",goodsDetail.FREIGHT_TYPE);
				$("html").attr("data_ID",goodsDetail.ID);
				$("html").attr("data_IS_GENERATION_OPERATION",goodsDetail.IS_GENERATION_OPERATION);
				$("html").attr("data_GOODS_NO",goodsDetail.GOODS_NO);
				$("html").attr("data_cityId","220");
				$("html").attr("data_FREIGHT",goodsDetail.FREIGHT);
				$("html").attr("data_PROMOTION_ID","-1");

					$(".provinceName,.ndz_nav01").append(GetQueryString("provinceName"));
					$(".cityName,.ndz_nav02").append(GetQueryString("cityName"));
						
						var data_FREIGHT_TYPE=$("html").attr("data_FREIGHT_TYPE");
						var data_ID=$("html").attr("data_ID");
						var data_IS_GENERATION_OPERATION=$("html").attr("data_IS_GENERATION_OPERATION");
						var data_GOODS_NO=$("html").attr("data_GOODS_NO");
						var data_cityId=$("html").attr("data_cityId");
						var data_FREIGHT=$("html").attr("data_FREIGHT");
						
						


						$.post(URLS.SERVER_URL+URLS.queryGoodsStock+"?freightType="+data_FREIGHT_TYPE+"&goodsId="+data_ID+"&is_generation_operation="+data_IS_GENERATION_OPERATION+"&goodsNo="+data_GOODS_NO+"&cityId="+data_cityId+"&freight="+data_FREIGHT, {}, function(data) {
								var postage = data && data.postage;
								if(postage){
									$(".postage").empty().append(postage);
								}
								
								if(data.canBuy==true){
									$("#npost_dizhi em").empty().append("有货");
								}else{
									$("#npost_dizhi em").css("color","#aaaaaa");
									$("#npost_dizhi em").empty().append("无货");
									$(".npost_foot_add,.npost_foot_go,.npost_foot_kill").addClass("npost_foot_no");
								}
					},"json");	
					
	
	
				
			}
			
		  },"json");	
		  
		  
	  
}


	


//评价
		$.post(URLS.SERVER_URL+URLS.queryGoodsReview+"?COMMDOITY_ID="+GetQueryString("goodsId")+"&pageSize=2&pageIndex=1&flag=0", {}, function(data) {

		console.log(data);
		var reviewList =data.reviewList;
		if(reviewList){
		var html = "";
		  for(var k=0;k<reviewList.length;k++){
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
	  },"json");
	  

//详情
		$.post(URLS.SERVER_URL+URLS.goodsContent+"?goodsId="+GetQueryString("goodsId"), {}, function(data) {
		console.log(data);	
		var goodsContent = data && data.goodsContent;
		if(goodsContent){
			$(".npost_xiangqing").append(data.goodsContent['info_content_map']);
		}
		
	  },"json");


		 
<!--返回-->
function back_fun(){
			var jsonParams = {'funName':'back_fun', 'params':{}};
			native.nativeFun(jsonParams);
};

<!--分享-->
function share_fun(){
			var title=$(".npost_title span").html();
			var type="1";
			var video_img="";
			var shareUrl=$(".npost_top_fenxiang").attr("data_goods_url");
			var shareImgUrl=$(".npost_top_fenxiang").attr("data_goods_img");
			var text=$(".npost_jieshao").html();
			var jsonParams = {'funName':'share_fun', 'params':{'title':title,'type':type,'video_img':video_img,'shareUrl':shareUrl,'shareImgUrl':shareImgUrl,'text':text}};
			native.nativeFun(jsonParams);
};


<!--客服-->
$(".npost_foot_kefu").click(function(){
		  var jsonParams = {'funName':'customer_service_fun', 'params':{}};
		  native.nativeFun(jsonParams);
})

<!--购物车-->
$(".npost_foot_cart").click(function(){
			var shopping_cart_numbers=$(".order-numbers").html();
		  var jsonParams = {'funName':'shopping_cart_fun', 'params':{'shopping_cart_numbers':shopping_cart_numbers}};
		  native.nativeFun(jsonParams);
})

<!--更多评价-->
$(".npost_pinglun_more").click(function(){
		  var jsonParams = {'funName':'goods_comment_fun', 'params':{'goodsId':GetQueryString("goodsId")}};
		  native.nativeFun(jsonParams);
})
	




$(document).ready(function(e) {

	
	//收藏按钮			
	$(".npost_foot_shouchang").click(function(){
		
		
			native.getUserId().done(function(id) {
				userId = id;
				 shouchang_bt();
			});
			function shouchang_bt(){
	


 				var param={};
				
				param["userId"] = userId;
				
				if(GetQueryString("goodsId")) {
					param["goodsId"] = GetQueryString("goodsId");	
				}
				
				if(GetQueryString("goodsId")) {
					param["storeId"] = GetQueryString("storeId");	
				}
				
				if(GetQueryString("goodsId")) {
					param["goodsNo"] = GetQueryString("goodsNo");	
				}
				
		if(userId){

		if($(".focus-out").hasClass("click-focus-show")){
				$.post(URLS.SERVER_URL+URLS.cancelFocus, param, function(data) {
						
							
								$(".focus-out").removeClass("click-focus-show");
								$(".focus-scale").css("display","none");
								$(".npost_foot_shouchang .focus-info").html("收藏");
								var defaults = {
											cls: "succee-icon",
											duration: 1000,
											message: "取消收藏",
											width: 180,
											height: 88
								};
								showMessage(defaults);
					
				},"json");
		}else{
				$.post(URLS.SERVER_URL+URLS.addFocus, param, function(data) {
					
							$(".focus-out").addClass("click-focus-show");
							$(".focus-scale").css("display","inline-block");
							$(".npost_foot_shouchang .focus-info").html("已收藏");
							var defaults = {
										cls: "succee-icon",
										duration: 1000,
										message: "收藏成功",
										width: 180,
										height: 88
							};
							showMessage(defaults);
					
					},"json");
			
		}
		
		}else{
			var no_login_fun = {'funName':'no_login_fun', 'params':{}};
		    native.nativeFun(no_login_fun);
		}
		
		}
		
		
	})
	
	
	
	
	//添加购物车   http://218.91.54.162:9006/addCart.do?userId=21950&areaId=220&goods_id=82319&goods_no=96863&shoppingType=-1&shoppingIds=-1&num=1&promotion_id=-1&mKey=ef5767dcc2a8bebcfcbc42c4ad3c7889&time=20160701143818
	
	$("#nadd_cart").click(function(){

		if(userId){

			if($(this).hasClass("npost_foot_no")){
			}else{
				var d = new Date()
				var vYear = d.getFullYear()
				var vMon = d.getMonth() + 1
				var vDay = d.getDate()
				var h = d.getHours(); 
				var m = d.getMinutes(); 
				var se = d.getSeconds(); 
				s=vYear+(vMon<10 ? "0" + vMon : vMon)+(vDay<10 ? "0"+ vDay : vDay)+(h<10 ? "0"+ h : h)+(m<10 ? "0" + m : m)+(se<10 ? "0" +se : se);

				var param={};
				
				param["userId"] = userId;
				
			
				
					param["areaId"] = "220";	
				
				
	
					param["goods_id"] = $("html").attr("data_ID");
	
				
	
					param["goods_no"] =$("html").attr("data_GOODS_NO");

				

					param["shoppingType"] = "-1";	

				

					param["shoppingIds"] = "-1";
					
					
					
					param["num"] =$(".ncs_sl input").val();	

				
					param["promotion_id"] = $("html").attr("data_PROMOTION_ID");	



				
					

					$.post(URLS.SERVER_URL+URLS.getKey, param, function(data) {
						
						var paramsStr = '';
						for(v in param) {
						  paramsStr = paramsStr + v + '=' + param[v] + '&';
						}
						console.log(URLS.SERVER_URL+URLS.getKey + '?' + paramsStr.substr(0, paramsStr.length - 1));
		

						
						param["mKey"] = data.mKey;
						
						//URLS.SERVER_URL  = "http://192.168.200.70:8088/lehu-app-back/";
						
						$.post(URLS.SERVER_URL+URLS.addCart, param, function(data) {
							
										var paramsStr = '';
										for(v in param) {
										  paramsStr = paramsStr + v + '=' + param[v] + '&';
										}
										console.log(URLS.SERVER_URL+URLS.addCart + '?' + paramsStr.substr(0, paramsStr.length - 1));
										
										console.log(data);
										
									if(data.msg=="加入购物车成功"){
										var ordernumbers=parseInt($(".order-numbers").html());
										var cartNum=parseInt(ordernumbers+1);
										$(".order-numbers").text(cartNum);
										
										var defaults = {
													cls: "succee-icon",
													duration: 1000,
													message: "加入购物车成功",
													width: 180,
													height: 88
										};
										showMessage(defaults);
									}
										
						},"json");
						
						

					},"json");
					
	
				
				
			}
			
			
			
			
		}else{
			var no_login_fun = {'funName':'no_login_fun', 'params':{}};
		    native.nativeFun(no_login_fun);
		}

	});
	
	//返回顶部
	goBack2Top();
	
	//商品属性弹出框
	$("#npost_container").click(function(){
			$("body").append("<div class='cover-decision'></div>");
			$(".mui-cover").addClass("show");
			$(".mui-cover").css("display","block");
			
			$(".cover-decision,.ncs_top_close").click(function(){
				console.log("1");
				$(".cover-decision").remove();
				$(".mui-cover").removeClass("show");
				$(".mui-cover").css("display","none");
			});
	});
	
	//商品属性
	$(".ncs_main_changshu span").click(function(){
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
	});
	
	//商品属性
	$(".ndz_nav_li span").click(function(){
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
	});
	
	
	
	//商品数量
	var num= parseInt($(".ncs_sl input").val());

	$(".ncs_sl_jia").click(function(){
		num=num+1;
		$(".ncs_sl_jian").removeClass("no");
		$(".ncs_sl input").val(num);
	});
	
	$(".ncs_sl_jian").click(function(){
		if($(this).hasClass("no")){}else{
		num=num-1;
		$(".ncs_sl input").val(num);
		}
		if(num == 1)
		{$(".ncs_sl_jian").addClass("no");}
	});
	
	var provinceId=GetQueryString("provinceId");
	var cityId=GetQueryString("cityId");
	//地区选择弹出框
	$("#npost_dizhi").click(function(){
			$("body").append("<div class='cover-decision'></div>");
			$(".mui-dizhi").addClass("show");
			$(".mui-dizhi").css("display","block");
			
			ndz_nav01();
			
			$(".ndz_nav01").click(function(){
				ndz_nav01();
			});
			
			$(".ndz_nav02").click(function(){
				ndz_nav02();
			});
			
			function ndz_nav01(){
				$(".ndz_nav02").removeClass("active");
				$(".ndz_nav01").addClass("active");
				$.post(URLS.SERVER_URL + URLS.queryFilteredRegion+"?type=1", {}, function(data) {
				var html = "";
				var queryFilteredRegion = data;
				  for(var k=0;k<queryFilteredRegion.length;k++){
					if(provinceId==queryFilteredRegion[k].ID){
						html += "<span class='active'  data-provinceId='"+queryFilteredRegion[k].ID+"' >";
					}
					else{
						html += "<span data-provinceId='"+queryFilteredRegion[k].ID+"'>";
					}
					html += queryFilteredRegion[k].REGIONNAME;
					html += "</span>";
				  }
				$(".ndz_nav_li").empty().append(html);
				
				$(".ndz_nav_li span").click(function(){
					$(".ndz_nav_li span").removeClass("active");
					$(this).addClass("active");
					$(".ndz_nav01,.provinceName").empty().append($(this).html());
					provinceId=$(this).attr("data-provinceId");
					ndz_nav02();
				});
			
			
				},"json");
			}
			
			function ndz_nav02(){
				
				$(".ndz_nav01").removeClass("active");
				$(".ndz_nav02").addClass("active");
				
				$.post(URLS.SERVER_URL + URLS.queryFilteredRegion+"?type=2"+"&parent_id="+provinceId, {}, function(data) {
					$(".ndz_nav02,.cityName").empty().append(data[0].REGIONNAME);
					
					
					
				var html = "";
				var queryFilteredRegion = data;
				  for(var k=0;k<queryFilteredRegion.length;k++){
					if(cityId==queryFilteredRegion[k].ID){
						html += "<span class='active' data-cityId='"+queryFilteredRegion[k].ID+"' >";
					}
					else{
						html += "<span data-cityId='"+queryFilteredRegion[k].ID+"' >";
					}
					html += queryFilteredRegion[k].REGIONNAME;
					html += "</span>";
				  }
				 $(".ndz_nav_li").empty().append(html);
				 
				 $(".ndz_nav_li span").click(function(){
					$(".ndz_nav_li span").removeClass("active");
					$(this).addClass("active");
					$(".ndz_nav02,.cityName").empty().append($(this).html());
					cityId=$(this).attr("data-cityId");
					
					
						var data_FREIGHT_TYPE=$("html").attr("data_FREIGHT_TYPE");
						var data_ID=$("html").attr("data_ID");
						var data_IS_GENERATION_OPERATION=$("html").attr("data_IS_GENERATION_OPERATION");
						var data_GOODS_NO=$("html").attr("data_GOODS_NO");
						var data_cityId=cityId;
						var data_FREIGHT=$("html").attr("data_FREIGHT");


						$.post(URLS.SERVER_URL+URLS.queryGoodsStock+"?freightType="+data_FREIGHT_TYPE+"&goodsId="+data_ID+"&is_generation_operation="+data_IS_GENERATION_OPERATION+"&goodsNo="+data_GOODS_NO+"&cityId="+data_cityId+"&freight="+data_FREIGHT, {}, function(data) {
								
								console.log("是否有货"+data);
		
								var postage = data && data.postage;
								if(postage){
									$(".postage").empty().append(postage);
								}
								
								if(data.canBuy==true){
									$("#npost_dizhi em").empty().append("有货");
								}else{
									$("#npost_dizhi em").css("color","#aaaaaa");
									$("#npost_dizhi em").empty().append("无货");
									$(".npost_foot_add,.npost_foot_go,.npost_foot_kill").addClass("npost_foot_no");
								}
					},"json");	
					

				});
		
			
				},"json");
			}
			
			
			
			

				
	
	

			$(".cover-decision,.ndz_top_close").click(function(){
				console.log("1");
				$(".cover-decision").remove();
				$(".mui-dizhi").removeClass("show");
				$(".mui-dizhi").css("display","none");
			});
	});
	
	
	//分享弹出框
	/*$(".npost_top_fenxiang").click(function(){
			$("body").append("<div class='cover-decision'></div>");
			$(".mui-share").addClass("show");
			$(".mui-share").css("display","block");

			$(".cover-decision,.nshare_close").click(function(){
				console.log("1");
				$(".cover-decision").remove();
				$(".mui-share").removeClass("show");
				$(".mui-share").css("display","none");
			});
	});*/
	
	lazyload()
	
			
	
	
});



//返回顶部
	goBack2Top();

