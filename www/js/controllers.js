"use strict";

angular.module('myApp.controllers', ['ionic','ngCordova'])

.controller('mainCtrl',['$scope','$ioicPlatform','$cordovaDevice',
                        function($scope,$ioicPlatform,$cordovaDevice){
	var _this=this;
	$ioicPlatform.ready(function(){
    	_this.model = $cordovaDevice.getPlatform();
    	$scope.$apply();
	});
}])
;
