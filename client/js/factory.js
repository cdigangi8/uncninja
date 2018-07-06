unc_app.factory('homeFactory', function($http) {
    //var urlBase = '/api/create_class';
    var _home = {};
    _home.save = function(params) {
        return $http.post(params.url, params);
    };
    return _home;
});