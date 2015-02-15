/**
 * All posts controller.
 */
'use strict';

var app = angular.module('BlogApp');

app.controller('PostsCtrl', ['$scope', '$filter', '$location', '$route','$routeParams',
	'postsService', 'activeService', 'sanitizeService',
	function($scope, $filter, $location, $route, $routeParams, postsService, activeService, sanitizeService) {

	var promise = postsService.getPosts;

	/**
	 * Get posts data.
	 */
	promise.then(function(result) {
		$scope.data = result.data;

		if ($routeParams.param) {
			$scope.currentPage = Number($routeParams.param);
		} else {
			$scope.currentPage = 1;
		}

	});

	$scope.sanitize = sanitizeService.getUrl;

	activeService.data = 0;

	/**
	 * Get current filter query string.
	 */
	$scope.currentFilter = $location.url().split('?')[1] ? '?' + $location.url().split('?')[1] : '';

	/**
	 * Watch filter change event, redirect to posts/1.
	 */
	$scope.$watch(function(){ return $location.url().split('?')[1]; }, function(val, old){
		if ($location.url && (val !== old) && ($location.url().split('/')[1] === 'posts')) {
			$location.path('posts/1');
		}
	}, true);

	$scope.$on('$destroy', function(){
        activeService.data = null;
    });
}]);
