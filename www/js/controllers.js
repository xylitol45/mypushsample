"use strict";

angular.module('myApp.controllers', ['ngCordova'])

.controller('mainCtrl',['$scope','$ionicPlatform','$cordovaDevice',function($ionicPlatform,$scope,$cordovaDevice){
	var _this=this;
	$ionicPlatform.ready(function(){
    	_this.model = $cordovaDevice.getPlatform();
    	$scope.$apply();
	});
}])
;
