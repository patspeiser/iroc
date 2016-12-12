angular.module('app')
	.factory('HomeService', function($http){
		var HomeService = function(){};

		HomeService.prototype.upload = function(imageUrl, name, bucket){
			return $http.post('/api/s3', { url: imageUrl, name: name, bucket: bucket })
				.then(function(result){
					return result.data;
				});
		};

		HomeService.prototype.getLabels = function(imageId){
			return $http.get('/api/labels/' + imageId)
				.then(function(result){
					return result.data;
				});
		};

		return HomeService; 
	});