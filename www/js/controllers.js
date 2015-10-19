"use strict";

angular.module('myApp.controllers', [])
.controller('mainCtrl',function($scope,$cordovaDevice){
	var _this=this;
//    document.addEventListener("deviceready", function() {
//    	_this.model = $cordovaDevice.getModel();
//    	$scope.$apply();
//      }, false);
	ionic.Platform.ready(function(){
    	_this.model = $cordovaDevice.getModel();
    	$scope.$apply();
	 });

})
;
