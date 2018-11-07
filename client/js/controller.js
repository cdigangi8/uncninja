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
    
    $scope.goTo = function(_url){
        $location.url('/' + _url);
    }
    
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
                  {name: "Vertiquest Gym", address: "1 Easy St, Bound Brook, NJ 08805", state: 'NJ', lat: '40.5727154', lon: '-74.5632548'},
                  {name: "Pinnacle Parkour Acedmeny, Cherry Hill", address: "1205 Warren Ave, Cherry Hill, NJ 08002", state: 'NJ', lat: '39.9186971', lon: '-75.0303644'},
                  {name: "Centercourt Club & Sports - Lawrence", address: "1080 Spruce St, Lawrence Township, NJ 08648", state: 'NJ', lat: '40.2484491', lon: '-74.7564687'},
                     {name: "Ultimate Ninjas Chicago", address: "2915 W Montrose Ave, Chicago, IL 60618", state: 'IL', lat: '41.960885', lon: '-87.701721'},
                     {name: "Ultimate Ninjas Naperville", address: "2012 Corporate Ln Ste 120, Naperville, IL 60563", state: 'IL', lat: '41.808653', lon: '-88.1912917'},
                     {name: "Ultimate Ninjas Libertyville", address: "732 E Park Ave, Libertyville, IL 60048", state: 'IL', lat: '42.2841374', lon: '-87.9464904'},
                     {name: "Ultimate Ninjas St. Louis", address: "140 Long Road, Suite 130, Chesterfield, MO 63005", state: 'MO', lat: '38.6661931', lon: '-90.6185342'}];
    
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
    var width = 700;
    var height = 500;
    var centered;
    
    svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);
    
// D3 Projection
var projection = d3.geoAlbersUsa()
  //.translate([width / 2, height / 2]) // translate to center of screen
  .scale(1000); // scale things down so see entire US

// Define path generator
var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
  .projection(projection); // tell path generator to use albersUsa projection

    var div = d3.select("#tooltip")
		    .append("div")   
    		.attr("class", "tooltip")               
    		.style("opacity", 0);
    
var g = svg.append("g");
    
d3.json("https://s3-us-west-2.amazonaws.com/vida-public/geo/us.json", function(error, us) {
  if (error) throw error;

  g.append("g")
    .attr("id", "states")  
    //.attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("d", path)
    .on('click', clicked);

  g.append("path")
    .attr("id", "state-borders")
    .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
    .attr('d', path);
      //.attr("class", "state-borders")
      //.attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
    
    // add circles to svg
    
    g.selectAll("circle")
		.data($scope.gymsArr).enter()
		.append("circle")
		.attr("cx", function (d) { console.log(projection(d)); return projection([d.lon, d.lat])[0]; })
		.attr("cy", function (d) { return projection([d.lon,d.lat])[1]; })
		.attr("r", "4px")
		.attr("fill", "blue")
        .attr('opacity', '0.5')
        .on("mouseover", function(d) {      
    	div.transition()        
      	   .duration(200)      
           .style("opacity", .9);      
           div.text(d.name)
           .style("left", (d3.event.pageX+20) + "px")     
           .style("top", (d3.event.pageY-150) + "px");    
	})   

    // fade out tooltip on mouse out               
    .on("mouseout", function(d) {       
        div.transition()        
           .duration(500)      
           .style("opacity", 0);   
    });
    
});
    
    function clicked(d) {
        console.log('clicked');
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 3;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}
    
    //end d3 expiriment
    
    console.log($scope);
});

unc_app.controller('contentCtrl', function($rootScope, $scope, contentFactory, $location, $timeout, $mdDialog) {
    
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
    
    $scope.upcomingArr = [{title: "Live | Ultimate Ninjas NNL", releaseDate: "August 8, 2018", ninjas: "Labreck, Swanson, Silenzi"},
                         {title: "Ninja Freestyle | Ep 6", releaseDate: "August 12, 2018", ninjas: "DiGangi, Polizi, Mears"},
                         {title: "Live | Movement Lab Ohio NNL", releaseDate: "August 14, 2018", ninjas: "Yamauchi, Labreck"},
                         {title: "Live | Action Athletics NNL", releaseDate: "August 21, 2018", ninjas: "Torres, Swanson"}];
    
    $scope.conArr = [{title: "Ninja Freestlye | Ep 1", ninjas: "Swanson, Labreck, McCartney, DiGangi, Silenzi", img: "/images/ninja_freestyle.png", link: "ninja_freestyle"},
                         {title: "Tips and Tricks | Ep 1", ninjas: "Swanson, Silenzi", img: "/images/tips_and_tricks_3.png", link: "tips_and_tricks"},
                         {title: "Tips and Tricks | Ep 2", ninjas: "Swanson, Silenzi", img: "/images/tips_and_tricks_2.png", link: "tips_and_tricks"},
                         {title: "Pineapple Pack | Ep 1", ninjas: "McCartney, Yamauchi", img: "/images/grant_lift_tyler.jpg", link: "pineapple_pack"}];
    
    $scope.liveArr = [{title: "Live | Movement Lab NNL", ninjas: "DiGangi, Labreck, Swanson", img: "/images/swanson_pic.jpg", link: "live_replay"},
                         {title: "Live | Apex NorCal NNL", ninjas: "DiGangi, Labreck, Swanson", img: "/images/swanson_pic.jpg", link: "live_replay"},
                         {title: "Live | NinjaQuest NNL", ninjas: "DiGangi, Labreck, Swanson", img: "/images/swanson_pic.jpg", link: "live_replay"},
                         {title: "Live | The Edge NNL", ninjas: "DiGangi, Labreck, Swanson", img: "/images/swanson_pic.jpg", link: "live_replay"}];
    
    $scope.freestyleArr = [{title: "Ninja Freestlye | Ep 1", ninjas: "Swanson, Labreck, McCartney, DiGangi, Silenzi", img: "/images/ninja_freestyle.png", link: "ninja_freestyle"},
                         {title: "Ninja Freestlye | Ep 2", ninjas: "Swanson, Labreck, McCartney, DiGangi, Silenzi", img: "/images/ninja_freestyle.png", link: "ninja_freestyle"},
                         {title: "Ninja Freestlye | Ep 3", ninjas: "Swanson, Labreck, McCartney, DiGangi, Silenzi", img: "/images/ninja_freestyle.png", link: "ninja_freestyle"},
                         {title: "Ninja Freestlye | Ep 4", ninjas: "Swanson, Labreck, McCartney, DiGangi, Silenzi", img: "/images/ninja_freestyle.png", link: "ninja_freestyle"}];
    
    $scope.tipsArr = [{title: "Tips and Tricks | Ep 1", ninjas: "Swanson, Silenzi", img: "/images/tips_and_tricks_3.png", link: "tips_and_tricks"},
                         {title: "Tips and Tricks | Ep 2", ninjas: "Swanson, Silenzi", img: "/images/tips_and_tricks_3.png", link: "tips_and_tricks"},
                         {title: "Tips and Tricks | Ep 3", ninjas: "Swanson, Silenzi", img: "/images/tips_and_tricks_3.png", link: "tips_and_tricks"},
                         {title: "Tips and Tricks | Ep 4", ninjas: "Swanson, Silenzi", img: "/images/tips_and_tricks_3.png", link: "tips_and_tricks"}];
    
     $scope.pineappleArr = [{title: "Pineapple Pack | Ep 1", ninjas: "McCartney, Yamauchi", img: "/images/grant_lift_tyler.jpg", link: "pineapple_pack"},
                         {title: "Pineapple Pack | Ep 2", ninjas: "McCartney, Yamauchi", img: "/images/grant_lift_tyler.jpg", link: "pineapple_pack"},
                         {title: "Pineapple Pack | Ep 3", ninjas: "McCartney, Yamauchi", img: "/images/grant_lift_tyler.jpg", link: "pineapple_pack"},
                         {title: "Pineapple Pack | Ep 4", ninjas: "McCartney, Yamauchi", img: "/images/grant_lift_tyler.jpg", link: "pineapple_pack"}];
    
    $scope.goTo = function(_url){
        $location.url('/' + _url);
    }
    
    $scope.scrollProp = 0;
    $scope.scrollWidth = $('#channelScroll').width()+150;
    console.log($scope.scrollWidth);
    
    $scope.scrollToRight = function(dir){
        $scope.scrollWidth = $('#channelScroll').width() +150;
        console.log($scope.scrollProp);
        console.log($('#channelScroll').width());
        var int = 250;
            for(var s=0; s<=int; s++){
                if(dir == 'right' && $scope.scrollProp < $scope.scrollWidth){
                    $scope.scrollProp += 1;
                }else if(dir == 'left' && $scope.scrollProp > 0){
                    $scope.scrollProp -= 1;
                }else{
                    break;
                }
            }
        $('#channelScroll').animate({scrollLeft: $scope.scrollProp}, 700);
    }
    
    
    
    
$scope.screenHeight = window.innerHeight - 100;
});

unc_app.controller('videoCtrl', function($rootScope, $scope, $location, $timeout, $mdDialog) {
    var auth_exp = parseInt(localStorage.getItem('nn_auth_exp'),10);
    var authDate = new Date(auth_exp*1000);
    var nowDate = new Date();
    var timeDiff = authDate.getTime() - nowDate.getTime();
    
    $scope.showSessionDialog = function() {
    $mdDialog.show({
      contentElement: '#sessionDialog',
      parent: angular.element(document.body),
      clickOutsideToClose: false
    });
    }
    
    if(timeDiff<0){
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
});