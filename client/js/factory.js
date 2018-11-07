unc_app.factory('homeFactory', function($http) {
    //var urlBase = '/api/create_class';
    var _home = {};
    _home.save = function(params) {
        return $http.post(params.url, params);
    };
    return _home;
});

unc_app.factory('contentFactory', function($http) {
    var _content = {};
    _content.save = function(params) {
        return $http.post(params.url, params);
    };
    return _content;
});

unc_app.factory('signInFactory', function($http) {
    var _signIn = {};
    _signIn.save = function(params) {
        return $http.post(params.url, params);
    };
    return _signIn;
});