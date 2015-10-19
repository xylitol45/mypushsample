"use strict";

var onNotification = function(event) {
	
};

angular.module('myApp.controllers', [])
.controller('mainCtrl',function($scope,$cordovaDevice){
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
    				},
    				function(err){
    					alert("error:"+err);
    				},
    				{
    					"badge":"true",
    				    "sound":"true",
    				    "alert":"true",
    				    "ecb":function(event){
    				        if ( event.alert ) {
    				        	alert(event.alert);
    				        }
    				    }
    				}
    		);
    	}
    	_this.model = $cordovaDevice.getPlatform();
    	$scope.$apply();

	 });

})
;
