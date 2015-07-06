// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'forecast.htm',
        controller: 'forecastController'
    })
    
});
// services
weatherApp.service('cityService',function()
{
	this.city="Melbourne,AU";
});



// CONTROLLERS
weatherApp.controller('homeController', ['$scope','cityService',function($scope,cityService) {
    $scope.city=cityService.city;
	$scope.$watch('city',function()
	{
		cityService.city=$scope.city;
       
        
	});
}]);

weatherApp.controller('forecastController', ['$scope','$resource','cityService', function($scope,$resource,cityService) {
    $scope.city=cityService.city;
    $scope.weatherAPI=$resource("http://api.openweathermap.org/data/2.5/forecast/daily",{  
    callback:"JSON_CALLBACK"}, {get:{method:"JSONP"}});  
    $scope.weatherResult=$scope.weatherAPI.get({q:$scope.city, cnt:7});
   $scope.convertToCelsius=function(degC){
       return Math.round((degC-273.15));
   }
    $scope.convertTodate=function(date){
       return new Date(date*1000);
   }
}]);