"use strict";

var onNotificationSample = function(event) {
    if ( event.alert ) {
    	alert(event.alert);
    }
};

angular.module('myApp.controllers', [])
.controller('mainCtrl',function($scope,$cordovaDevice,$http){
	var _this=this;
//    document.addEventListener("deviceready", function() {
//    	_this.model = $cordovaDevice.getModel();
//    	$scope.$apply();
//      }, false);
	ionic.Platform.ready(function(){
    	var pushNotification = window.plugins.pushNotification;
    	if ($cordovaDevice.getPlatform() == 'iOS') {
    		alert('pushNotification');
    		pushNotification.register(
				function(token){
					alert("token:"+token);
					
					$http({
						'method':'POST',
						// 'url': 'http://f-spring.prv11.srp-tech.net/uAhd43rt/20151020/log.php',
						'url':'https://api.parse.com/1/installations',
						'headers':{
							"X-Parse-Application-Id":"cXj6zBUbKWhDVJtkzpT8Ay5O0bejaHaOE1a3V3lw",
							"X-Parse-REST-API-Key": "08dnnfXwTVVkVgeSGJ6gnLFezGBMhe9UY2B9tO9M" 
						},
						'data':{
					        "deviceType": "ios",
					        "deviceToken": token,
					        "channels": ["wanko"]
					      }
					}).then(function (res) {
					    alert(res);
						}, function (res) {
					    alert(res);
					  });
				},
				function(err){
					alert("error:"+err);
				},
				{
					"badge":"true",
				    "sound":"true",
				    "alert":"true",
				    "ecb": "onNotificationSample"
//				    function(event){
//				    	if(event.alert){
//				    		alert(event.alert);
//				    	}
//				    }
 				}
    		);
    	}
    	_this.model = $cordovaDevice.getPlatform();
    	$scope.$apply();

	 });

})
;
