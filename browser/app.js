const app = angular.module('app', ['ui.router']);

angular.module('app')
	.config(function($stateProvider){
		$stateProvider
		.state('Home', {
			url: '/',
			templateUrl: './home/home.html',
			controller: 'HomeCtrl'
		});
});

angular.module('app').run(function($state){
	$state.go('Home');
});
