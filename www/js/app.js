"use strict";

angular.module('myApp', ['ionic','ngCordova','myApp.services','myApp.controllers'])

.run(function($cordovaDevice, $cordovaStatusbar) {	
	ionic.Platform.ready(function(){
	    $cordovaStatusbar.overlaysWebView(true);

	    // トークン取得、Parse.com登録
	    myNotify.registerForiOS();
	 });
})
;

// 通知受信
var onMyNotificationAPN = function(event) {
    if ( event.alert ) {
    	alert("my notification " + event.alert);
    }
};

angular.module('myApp.services', ['ngCordova'])
.factory('myNotify',function($cordovaDevice,$http){
	var _o = {
		// for iOS
    	registerForiOS: function() {
    		var pushNotification = window.plugins.pushNotification;
    		alert('pushNotification');
    		pushNotification.register(
				function(token){
					alert("token:"+token);
					// Parse.com へのトークン登録
					$http({
						'method':'POST',
						'url':'https://api.parse.com/1/installations',
						'headers':{
							"X-Parse-Application-Id":"cXj6zBUbKWhDVJtkzpT8Ay5O0bejaHaOE1a3V3lw",
							"X-Parse-REST-API-Key": "08dnnfXwTVVkVgeSGJ6gnLFezGBMhe9UY2B9tO9M" 
						},
						'data':{
					        "deviceType": "ios",
					        "deviceToken": token,
					        "channels": [""]
					      }
					});
				},
				function(err){
					// トークン取得失敗
					alert("error:"+err);
				},
				{
					"badge":"true",
				    "sound":"true",
				    "alert":"true",
				    "ecb": "onMyNotificationAPN"
 				}
    		);
    	}
	};
	return _o;
})
;
