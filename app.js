// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// rourtes
weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'home.htm',
        controller: 'homectrl' // routed when '/' is encountered
    })
    
    .when('/forecast', {
        templateUrl: 'forecast.htm',  // routed when '/forecast is encountered
        controller: 'forecastctrl'
    })
    
});
// customed services
weatherApp.service('cityService',function()
{
	this.city="Melbourne,AU";
});


// controllers
weatherApp.controller('homectrl', ['$scope','cityService',function($scope,cityService) {
    $scope.city=cityService.city;
	$scope.$watch('city',function()
	{
		cityService.city=$scope.city;
       
        
	});
}]);

weatherApp.controller('forecastctrl', ['$scope','$resource','cityService', function($scope,$resource,cityService) {
    $scope.city=cityService.city;
    // fetching data from api openweatherapp
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