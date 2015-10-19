"use strict";

angular.module('myApp.controllers', [])
.controller('mainCtrl',function($scope,$cordovaDevice){
	var _this=this;
//    document.addEventListener("deviceready", function() {
//    	_this.model = $cordovaDevice.getModel();
//    	$scope.$apply();
//      }, false);
	ionic.Platform.ready(function(){
    	
    	var pushNotification = window.plugins.pushNotification;
    	if (device.platform == 'ios') {
    		pushNotification.register(
    				function(token){
    					alert("token:"+token);
    				},
    				function(err){
    					alet("error:"+err);
    				},
    				{
    					"badge":"true",
    				    "sound":"true",
    				    "alert":"true",
    				    "ecb":function(event){
    				    	
    				    }
    				}
    		);
        	_this.model = $cordovaDevice.getModel();
        	$scope.$apply();

    	}
	 });

})
;
