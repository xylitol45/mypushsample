"use strict";

angular.module('myApp.controllers', ['ngCordova'])

.controller('mainCtrl',['$scope','$cordovaDevice','shared',function($scope,$cordovaDevice,shared){
	var _this=this;
	_this.onRight = function(){
		alert('hello');
	};
	ionic.Platform.ready(function(){
    	_this.model = $cordovaDevice.getPlatform();
    	$scope.$apply();
	});
}])
;
