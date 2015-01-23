(function () {
	'use strict';

	var app = angular.module('BlogApp', ['ngRoute']);

	app.config(['$routeProvider', function($routeProvider) {
	    $routeProvider.when('/', {
	        redirectTo: '/posts'})
	    .when('/posts/:param?', {
	        templateUrl: 'posts.html',
	        controller: 'PostsCtrl'})
	    .when('/post/:param?', {
	        templateUrl: 'post.html',
	        controller: 'PostCtrl'})
	    .when('/admin/:param?', {
	    	templateUrl: 'admin.html',
	    	controller: 'AdminCtrl'
	    });
	}]);

	app.controller('NavCtrl', ['$scope', 'navService', 'activeService',
		function($scope, navService, activeService) {

		var promise = navService.navElms;

		promise.then(function(result){
			$scope.data = result.data;
		});

		$scope.activate = function($index) {
			if ($index === activeService.data) {
				return 'active';
			}
			else {
				return '';
			}
		};
	}]);

	app.controller('PostsCtrl', ['$scope', 'postsService', 'activeService',
		function($scope, postsService, activeService) {

		var promise = postsService.getPosts;

		promise.then(function(result) {
			$scope.data = result.data;
			console.log($scope.data);
		});
		activeService.data = 0;
	}]);

	app.controller('PostCtrl', ['$scope', function($scope) {

	}]);

	app.controller('AdminCtrl', ['$scope', 'activeService', function($scope, activeService) {
		activeService.data = 1;
	}]);

	app.factory('postsService', ['$http', function($http) {
		var getPosts = $http.get('data/posts.json');

		return {
			getPosts: getPosts
		};
	}]);

	app.factory('navService', ['$http', function($http) {
	    var navElms = $http.get('data/nav.json');

	    return {
	    	navElms: navElms
	    };
	}]);

	app.factory('activeService', function() {
		return {
			data: null
		};
	});
}());