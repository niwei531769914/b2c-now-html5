//加载视频
	$.post(URLS.SERVER_URL + URLS.appNewIndexFirst, {}, function(data) {
	console.log(URLS.SERVER_URL + URLS.appNewIndexFirst);
    var html = "";
	var viedoThumbnail = data.viedoThumbnail;
	var video = data.screensaverViedo;
	var vList = video.split(',');// 初始化播放列表
	var html = "";


	
	$("#video").attr("poster",URLS.IMAGE_URL+viedoThumbnail);





						var vLen = vList.length; // 播放列表的长度
						var curr = 0; // 当前播放的视频
						
						var video = document.getElementById("video");
						video.addEventListener('ended', play);
						play();
						function play(e) {
							video.src = URLS.IMAGE_URL + vList[curr];
							video.load(); 
							video.play();
							curr++;
							if(curr >= vLen){
								curr = 0; // 播放完了，重新播放
							}
						
						}
				
	
   },"json");
  
  

//加载banner列表
	$.post(URLS.SERVER_URL + URLS.appNewIndexFirst, {}, function(data) {
    var html = "";
	var appCode = data.appCode;
	
	
	html += "<div class='swiper-slide'>";
	
	html += "<img src="+URLS.IMAGE_URL+appCode+" >";
	html += "</div>";
   	   
	   var bannerList = data.bannerList;
		
   	  for(var k=0;k<bannerList.length;k++){
		  html += "<div class='swiper-slide banner_bt' data-SORT='"+bannerList[k]['SORT']+"'  data-BANNER_JUMP_ID='"+bannerList[k]['BANNER_JUMP_ID']+"'  data-ID='"+bannerList[k]['ID']+"'  data-BANNER_LAYOUT='"+bannerList[k]['BANNER_LAYOUT']+"'  data-BANNER_JUMP_FLAG='"+bannerList[k]['BANNER_JUMP_FLAG']+"'  data-STATUS='"+bannerList[k]['STATUS']+"'  data-NUM='"+bannerList[k]['NUM']+"'  data-BANNER_NAME='"+bannerList[k]['BANNER_NAME']+"'>";
			html += "<img src="+URLS.IMAGE_URL+bannerList[k]['BANNER_IMG']+" >";
			html += "</div>";
   	  }

   	$("#ajax_banner").empty().append(html);
	
	
	//幻灯片
	var swiper = new Swiper('.nindex_banner02 .swiper-container', {
        pagination: '.nindex_banner02 .swiper-pagination',
        autoplay: 3000,
		speed:1000,
		loop : true,
    });

	//banner
	$(".banner_bt").click(function(){
				var SORT=$(this).attr("data-SORT");
				var BANNER_JUMP_ID=$(this).attr("data-BANNER_JUMP_ID");
				var ID=$(this).attr("data-ID");
				var BANNER_LAYOUT=$(this).attr("data-BANNER_LAYOUT");
				var BANNER_JUMP_FLAG=$(this).attr("data-BANNER_JUMP_FLAG");
				var STATUS=$(this).attr("data-STATUS");
				var NUM=$(this).attr("data-NUM");
				var BANNER_NAME=$(this).attr("data-BANNER_NAME");
				
				var jsonParams = {'funName':'banner_item_fun', 'params':{'SORT':SORT,'BANNER_JUMP_ID':BANNER_JUMP_ID,'ID':ID,'BANNER_LAYOUT':BANNER_LAYOUT,'BANNER_JUMP_FLAG':BANNER_JUMP_FLAG,'STATUS':STATUS,'NUM':NUM,'BANNER_NAME':BANNER_NAME}};
				native.nativeFun(jsonParams);
	
	})

  },"json");
  
  
  
  //加载banner列表
	$.post(URLS.SERVER_URL + URLS.appNewIndexFirst, {}, function(data) {
    var html = "";

   	   
	   var fastList = data.fastList;
		
   	  for(var k=0;k<fastList.length;k++){
		  html += "<div class='shortcut_fun' data-id='"+fastList[k]['ID']+"'>";
			html += "<img src="+URLS.IMAGE_URL+fastList[k]['FAST_IMG']+" >";
			html += fastList[k]['FAST_NAME'];
			html += "</div>";
   	  }

   	$(".sdm").empty().append(html);
	


$(".shortcut_fun").click(function(){
			var id=$(this).attr("data-id");
			var jsonParams = {'funName':'shortcut_fun', 'params':{'id':id,}};
			native.nativeFun(jsonParams);
})
	
	

  },"json");
  

<!--秒杀更多-->
$(".shopping_fun").click(function(){
			var jsonParams = {'funName':'shopping_fun', 'params':{}};
			native.nativeFun(jsonParams);
})




$(".service_card_fun").click(function(){
			var jsonParams = {'funName':'service_card_fun', 'params':{}};
			native.nativeFun(jsonParams);
})

$(".category_fun").click(function(){
			 var id=$(this).attr("data-id");
			 var tid=$(this).attr("data-tid");
			 var category_floor=$(this).attr("category_floor");
			 var jsonParams = {'funName':'category_fun', 'params':{'ONE-ID':id,'TWO-ID':tid,'category_floor':category_floor}};
			 native.nativeFun(jsonParams);
})

$(".category_funo").click(function(){
			 var id=$(this).attr("data-id");
			 var category_floor=$(this).attr("category_floor");
			 var jsonParams = {'funName':'category_fun', 'params':{'ONE-ID':id,'category_floor':category_floor}};
			 native.nativeFun(jsonParams);
})



