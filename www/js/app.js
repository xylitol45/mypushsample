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
		appId : "dXj6zBUbKWhDVJtkzpT8Ay5O0bejaHaOE1a3V3lw",
		apiKey : "18dnnfXwTVVkVgeSGJ6gnLFezGBMhe9UY2B9tO9M",
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
							"X-Parse-Application-Id": _o.appId,
							"X-Parse-REST-API-Key": _o.apiKey,
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
			$http({
				'method':'POST',
				'url':'https://api.parse.com/1/classes/' + 'SampleData',
				'headers':{
					"X-Parse-Application-Id": _o.appId,
					"X-Parse-REST-API-Key": _o.apiKey,
				},
				'data':{
			        "name": "sample dayo",
			        "time": (+new Date()),				      
			    }
			}).then(
				function(res){alert(res);},
				function(err){alert(err);}
			);
    	},
		// for iOS
    	sampleParsePostFetch: function() {
    		
    		var Fetcher = window.plugins.backgroundFetch,
    		_str = (new Date()).toString();

            // Your background-fetch handler.
            var fetchCallback = function() {
                // perform your ajax request to server here
				$http({
					'method':'POST',
					'url':'https://api.parse.com/1/classes/' + 'SampleData2',
					'headers':{
						"X-Parse-Application-Id": _o.appId,
						"X-Parse-REST-API-Key": _o.apiKey,
					},
					'data':{
				        "name": "sample go",
				        "time": (+new Date()),	
				        "time2": _str,
				    }
				})
				.then(function(){
                    // <-- N.B. You MUST called #finish so that native-side can signal completion of the background-thread to the os.
                    Fetcher.finish();   					
				});
            }
            Fetcher.configure(fetchCallback);
            
            alert('OK');
    	},
	};
	return _o;
}])

.run(['shared','$cordovaStatusbar',function(shared,$cordovaStatusbar) {	
	ionic.Platform.ready(function(){
	    $cordovaStatusbar.overlaysWebView(true);

	    // トークン取得、Parse.com登録
    	shared.sampleParsePostFetch();
 	 });
}])
;
