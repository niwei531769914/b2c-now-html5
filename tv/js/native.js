// JavaScript Document

var native = function() {
}

//connectWebViewJavascriptBridge();
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
		/* Init your app here */
		bridge.init(function(data, responseCallback) {
			
		alert(JSON.stringify(data));
		
		if (responseCallback) {
			responseCallback("Right back atcha!")
		}
	})
	

})


var ua = navigator.userAgent.toLowerCase();	
if (/iphone|ipad|ipod/.test(ua)) {
	  native.platfrom = "ios";
} else if (/android/.test(ua)) {
	  native.platfrom = "android";
}


if (native.platfrom === "android"){
	URLS.SERVER_URL = JSInterface.getServerUrl();
	URLS.IMAGE_URL = JSInterface.getImageUrl();
	console.log(URLS.SERVER_URL,URLS.IMAGE_URL);
}
else if(native.platfrom == "ios") {
	URLS.SERVER_URL = "http://app.lehumall.com/";
	URLS.IMAGE_URL = "http://lehumall.b0.upaiyun.com/";
} 
else {
	URLS.SERVER_URL = "http://app.lehumall.com/";
	URLS.IMAGE_URL = "http://lehumall.b0.upaiyun.com/";
}







native.nativeFun = function(params) {

	if(native.platfrom === "android") {
		params = JSON.stringify(params);
		//android
		JSInterface.nativeFunction(params);
	}
	else if(native.platfrom === "ios"){
		//ios
		WebViewJavascriptBridge.send(params)
	}
	
	
}

native.getUserId = function() {
	var userId;
	if(native.platfrom === "android") {
		//android
		userId = JSInterface.getUserId();
	}
	else if(native.platfrom === "ios"){
		//ios
		
	}
	
	return userId;
}




