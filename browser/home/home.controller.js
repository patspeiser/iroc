angular.module('app')
	.controller('HomeCtrl', function($scope, HomeService){
		var socket = io();
		var home = new HomeService();
		
		$scope.bucket = 'rekog-assets'; 
		$scope.ctrl = 'controller loaded';

		$scope.upload = function(){
			home.upload($scope.url, $scope.name, $scope.bucket)
				.then(function(image){
					$scope.imageUrl = image.image;
					$scope.image = image;
				})
				.catch(function(err){
					console.log(err);
				});
		};

		socket.on('rekogSuccess', function(payload){
			$scope.rekogs = payload.Labels;
			console.log($scope.rekogs);
			$scope.$apply();
		});

	});