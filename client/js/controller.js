unc_app.controller('homeCtrl', function($rootScope, $scope, homeFactory, $location) {
   
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