"use strict";

angular.module('myApp', ['ionic','ngCordova','myApp.controllers'])

.run(function($ionicPlatform, $cordovaStatusbar) {	
	// どうもうまく動作しない
//  $ionicPlatform.ready(function() {
//  });

//	document.addEventListener("deviceready", function() {
//      $cordovaStatusbar.overlaysWebView(true);
//   }, false);

	ionic.Platform.ready(function(){
	    $cordovaStatusbar.overlaysWebView(true);
	 });
})
;

