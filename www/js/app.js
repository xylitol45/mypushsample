"use strict";

//通知受信
var onMyNotificationAPN = function(event) {
    if ( event.alert ) {
    	alert("my notification " + event.alert);
    }
};

angular.module('myApp', ['ionic','ngCordova','myApp.controllers'])

.factory('shared',['$http','$cordovaDevice',function($http,$cordovaDevice){
	var _o = {
	    // トークン取得、Parse.com登録
		notifyRegisetr:function(){
	    	if ($cordovaDevice.getPlatform() == 'iOS') {
	    		_o.notifyRegisterForiOS();
	    	}
		},
		// for iOS
    	notifyRegisterForiOS: function() {
    		var pushNotification = window.plugins.pushNotification;
    		//alert('notifyRegisterForiOS');
    		pushNotification.register(
				function(token){
					console.log("token:"+token);
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
					console.log("error:"+err);
				},
				{
					"badge":"true",
				    "sound":"true",
				    "alert":"true",
				    "ecb": "onMyNotificationAPN"
 				}
    		);
    	},
		// for iOS
    	sampleParsePost: function() {
    		
    		var Fetcher = window.plugins.backgroundFetch;

            // Your background-fetch handler.
            var fetchCallback = function() {
                // perform your ajax request to server here
				$http({
					'method':'POST',
					'url':'https://api.parse.com/1/classes/' + 'SampleData',
					'headers':{
						"X-Parse-Application-Id":"LJOIRb7zwGHn8Yo5dcObjntcvhvf09I8r5przK88",
						"X-Parse-REST-API-Key": "kBr69NSjAuLAO1qOIIMF0RLKgCcYoocXQhkHrkhR" 
					},
					'data':{
				        "name": "sample",
				        "time": time(),				      
				    }
				})
				.then(function(){
                    // <-- N.B. You MUST called #finish so that native-side can signal completion of the background-thread to the os.
                    Fetcher.finish();   					
				});
            }
            Fetcher.configure(fetchCallback);
    	}
	};
	return _o;
}])

.run(['shared','$cordovaStatusbar',function(shared,$cordovaStatusbar) {	
	ionic.Platform.ready(function(){
	    $cordovaStatusbar.overlaysWebView(true);

	    // トークン取得、Parse.com登録
    	shared.sampleParsePost();
 	 });
}])
;
