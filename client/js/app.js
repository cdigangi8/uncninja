unc_app = angular.module('unc_app', ['ngRoute', 'ngMaterial'])
  .config(function($routeProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: '/partials/home.html',
        controller: 'homeCtrl'
      })
    .when('/sign_in', {
        templateUrl: '/partials/sign_in.html',
        controller: 'signInCtrl'
      })
    .when('/gyms', {
        templateUrl: '/partials/gyms.html',
        controller: 'gymsCtrl'
      })
    .when('/content', {
        templateUrl: '/partials/content.html',
        controller: 'contentCtrl'
    })
    .when('/ninja_freestyle', {
        templateUrl: '/partials/ninja_freestyle.html',
    })
    .when('/live_replay', {
        templateUrl: '/partials/live_replay.html',
    })
    .when('/pineapple_pack', {
        templateUrl: '/partials/pineapple_pack.html',
    })
    .when('/tips_and_tricks', {
        templateUrl: '/partials/tips_and_tricks.html',
    })
        .otherwise({
        redirectTo: '/sign_in'
      });
  })
.controller('newController', function($rootScope, $scope, $timeout, $mdSidenav, $location){
    
    $scope.session = 'inactive';
    var auth_exp = parseInt(localStorage.getItem('nn_auth_exp'),10);
    var authDate = new Date(auth_exp*1000);
    var nowDate = new Date();
    var timeDiff = authDate.getTime() - nowDate.getTime();
    if(auth_exp == null || timeDiff<0){
        $scope.session = 'inactive';
        //$rootScope.rootSession = 'inactive';
    }else{
        $scope.session = 'active';
        //$rootScope.rootSession = 'active';
    }
    
    $scope.goTo = function(_url){
        $location.url('/' + _url);
    }
    
    $scope.$on('session_active', function(event, args) {
        $scope.session = 'active';
    });
    
    $scope.$on('session_inactive', function(event, args) {
        $scope.session = 'inactive';
    });
    console.log($scope);
});

