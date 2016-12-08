const app = angular.module('app', ['ui.router']);

angular.module('app')
	.config(function($stateProvider){
		$stateProvider
		.state('Home', {
			url: '/',
			templateUrl: './home/home.html',
		});
});

angular.module('app').run(function($state){
	$state.go('Home');
});
