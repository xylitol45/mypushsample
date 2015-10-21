"use strict";

angular.module('myApp.controllers', ['ngCordova'])
.controller('mainCtrl',['$scope','$cordovaDevice',function($scope,$cordovaDevice){
	var _this=this;
	ionic.Platform.ready(function(){
    	_this.model = $cordovaDevice.getPlatform();
    	$scope.$apply();
	}]);
})
;
