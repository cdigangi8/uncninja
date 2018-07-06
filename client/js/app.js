unc_app = angular.module('unc_app', ['ngRoute', 'ngMaterial'])
  .config(function($routeProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: '/partials/home.html',
        controller: 'homeCtrl'
      })
        .otherwise({
        redirectTo: '/home'
      });
  })
.controller('newController', function($rootScope, $scope, $timeout, $mdSidenav, $location){
    
    $scope.goTo = function(_url){
        $location.url('/' + _url);
    }
    console.log($scope);
});

