// JavaScript Document
	  
var ios_severUrl;
var ios_imgUrl;


    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }

    setupWebViewJavascriptBridge(function(bridge) {
		
		function log(message, data) {
    }

		bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {

                        
							   ios_severUrl=data.severUrl;
							   
	
							   ios_imgUrl=data.imgUrl;  
							   
							   URLS.SERVER_URL = ios_severUrl;
								URLS.IMAGE_URL = ios_imgUrl;
 
	

		})

		
	})
	  
var native = function() {
}




var ua = navigator.userAgent.toLowerCase();	
if (/iphone|ipad|ipod/.test(ua)) {
	  native.platfrom = "ios";
} else if (/android/.test(ua)) {
	  native.platfrom = "android";
}


if (native.platfrom === "android"){
	URLS.SERVER_URL = URLS.SERVER_URL;
	URLS.IMAGE_URL = URLS.IMAGE_URL;
	console.log(URLS.SERVER_URL,URLS.IMAGE_URL);
}
else if(native.platfrom == "ios") {

	
	} 
else {
	URLS.SERVER_URL = "http://192.168.19.22:8082/";
	URLS.IMAGE_URL = "http://lehumall.b0.upaiyun.com";
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




