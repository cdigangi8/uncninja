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
    console.log('test');
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
    
    $scope.selectedState = '';
    $scope.stateArr = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
    $scope.selectedGyms = [];
    
    $scope.gymsArr = [{name: "Movement Lab NJ", address: "710 Park Ave, Hainesport, NJ 08036", state: 'NJ', lat: '39.9801189', lon: '-74.8421448'},
                  {name: "Vertiquest Gym", address: "1 Easy St, Bound Brook, NJ 08805", state: 'NJ', lat: '39.9801189', lon: '-74.8421448'},
                  {name: "Pinnacle Parkour Acedmeny, Cherry Hill", address: "1205 Warren Ave, Cherry Hill, NJ 08002", state: 'NJ', lat: '39.9801189', lon: '-74.8421448'},
                  {name: "Centercourt Club & Sports - Lawrence", address: "1080 Spruce St, Lawrence Township, NJ 08648", state: 'NJ', lat: '39.9801189', lon: '-74.8421448'}];
    
    $scope.stateSelection = function(state){
        $scope.selectedState = state;
        $scope.selectedGyms = [];
        for(var i=0; i<$scope.gymsArr.length; i++){
            if($scope.gymsArr[i].state == state){
                $scope.selectedGyms.push($scope.gymsArr[i]);
            }
        }
    }

   //d3 expiriment
    

var svg = d3.select("svg");
    var width = 960;
    var height = 600;
    
    var projection = d3.geoAlbersUsa();

var path = d3.geoPath();

d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
  if (error) throw error;

  svg.append("g")
      .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("d", path);

  svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
});
    
    //end d3 expiriment
    
    console.log($scope);
});