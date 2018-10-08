unc_app.controller('homeCtrl', function($rootScope, $scope, homeFactory, $location, $mdDialog, $timeout) {
   
    var auth_var = localStorage.getItem('nn_auth_exp');
    var auth_exp = parseInt(auth_var,10);
    //console.log(localStorage.getItem('nn_auth_exp'));
    var authDate = new Date(auth_exp*1000);
    var nowDate = new Date();
    var timeDiff = authDate.getTime() - nowDate.getTime();
    
    $scope.showSessionDialog = function() {
    $mdDialog.show({
      contentElement: '#sessionDialog',
      parent: angular.element(document.body),
      clickOutsideToClose: false
    });
  };
    
    if(auth_var == null || timeDiff<0){
        $scope.session = 'inactive';
        //$rootScope.rootSession = 'inactive';
        $rootScope.$broadcast('session_inactive');
        $scope.showSessionDialog();
        $timeout(function(){
            $location.url('/sign_in');
        }, 3000);
    }else{
        $scope.session = 'active';
        //$rootScope.rootSession = 'active';
        $rootScope.$broadcast('session_active');
    }
    
    $scope.posArr=[{pos: '1.', img: "/images/avatars/jesse_avatar.png", name: 'Jesse Labreck'},
                   {pos: '2.', img: "/images/avatars/ethan_avatar.png", name: 'Ethan Swanson'},
                   {pos: '3.', img: "/images/avatars/chris_avatar.png", name: 'Chris DiGangi'},
                   {pos: '4.', img: "/images/avatars/mikes_avatar.png", name: 'Mike Silenzi'},
                   {pos: '5.', img: "/images/avatars/miket_avatar.png", name: 'Michael Torres'}];
    
    $scope.standingsArr = [{pos: "1.", img: "/images/avatars/ethan_avatar.png", name: "Ethan Swanson", points: "25"},
                          {pos: "2.", img: "/images/avatars/chris_avatar.png", name: "Chris DiGangi", points: "24"},
                          {pos: "3.", img: "/images/avatars/jesse_avatar.png", name: "Jesse Labreck", points: "22"},
                          {pos: "4.", img: "/images/avatars/mikes_avatar.png", name: "Mike Silenzi", points: "18"},
                          {pos: "5.", img: "/images/avatars/miket_avatar.png", name: "Michael Torres", points: "15"},
                          {pos: "6.", img: "/images/avatars/dan_avatar.png", name: "Dan Polizi", points: "13"},
                          {pos: "7.", img: "/images/avatars/tyler_avatar.png", name: "Tyler Yamauchi", points: "9"},
                          {pos: "8.", img: "/images/avatars/grant_avatar.png", name: "Grant McCartney", points: "8"}];
    
    console.log($scope);
});

unc_app.controller('signInCtrl', function($rootScope, $scope, $location, $timeout, $mdDialog, $mdSidenav, $log, signInFactory){
    $scope.screenHeight = window.innerHeight - 100;
    $scope.data = {};
    $scope.errMsg = '';
    $scope.reqStatus = '';
    $scope.errCheck = false;
    $scope.submitBtn = function(){
        $scope.errMsg = '';
        $scope.reqStatus = '';
        $scope.errCheck = false;
        $scope.showloadingDialog();
        signInFactory.save({
            "url": '/api/user_sign_in',
          "username": $scope.username,
          "password": $scope.password
      }).then(function(resp) {
            console.log(resp);
            $scope.username = '';
            $scope.password = '';
            $scope.data.resp = resp.data.data;
            if(resp.data.status == 'success'){
                localStorage.setItem('nn_auth_exp', resp.data.jwt.accessToken.payload.exp);
                $location.url('/home');
            }else{
                $scope.reqStatus = resp.data.status;
                $scope.errMsg = resp.data.data.message;
                $scope.errCheck = true;
            }
      });
    }
    
    $scope.showloadingDialog = function() {
    $mdDialog.show({
      contentElement: '#loadingDialog',
      parent: angular.element(document.body),
      clickOutsideToClose: true
    });
  };
    
    $scope.closeDialog = function(){
        $mdDialog.hide();
    }
    
    console.log($scope);
});

unc_app.controller('gymsCtrl', function($rootScope, $scope, homeFactory, $location, $mdDialog, $timeout) {
   
    var auth_var = localStorage.getItem('nn_auth_exp');
    var auth_exp = parseInt(auth_var,10);
    //console.log(localStorage.getItem('nn_auth_exp'));
    var authDate = new Date(auth_exp*1000);
    var nowDate = new Date();
    var timeDiff = authDate.getTime() - nowDate.getTime();
    
    $scope.showSessionDialog = function() {
    $mdDialog.show({
      contentElement: '#sessionDialog',
      parent: angular.element(document.body),
      clickOutsideToClose: false
    });
  };
    
    if(auth_var == null || timeDiff<0){
        $scope.session = 'inactive';
        //$rootScope.rootSession = 'inactive';
        $rootScope.$broadcast('session_inactive');
        $scope.showSessionDialog();
        $timeout(function(){
            $location.url('/sign_in');
        }, 3000);
    }else{
        $scope.session = 'active';
        //$rootScope.rootSession = 'active';
        $rootScope.$broadcast('session_active');
    }
    

    
    console.log($scope);
});