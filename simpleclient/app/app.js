var app = angular.module('app', ['ngRoute', 'ui.bootstrap', 'ngCookies']);

app.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.hashPrefix('');

    $httpProvider.defaults.useXDomain = true;
    //$httpProvider.interceptors.push('authInterceptor');

    $routeProvider
        .when("/", {
            templateUrl: "app/views/main.html",
            controller: "mainController"//,
            //resolve: {
            //    loggedIn: verifyLogin
            //}
        })
        .when("/party", {
            templateUrl: "app/views/party.html",
            controller: "partyController"//,
            //resolve: {
            //    loggedIn: verifyLogin
            //}
        })
        .when("/monsters", {
            templateUrl: "app/views/monsters.html",
            controller: "monstersController"//,
            //resolve: {
            //    loggedIn: verifyLogin
            //}
        })
        .when("/battle", {
            templateUrl: "app/views/battle.html",
            controller: "battleController"//,
            //resolve: {
            //    loggedIn: verifyLogin
            //}
        })
        .when("/user", {
            templateUrl: "app/views/user.html",
            controller: "userController"//,
            //resolve: {
            //    loggedIn: verifyLogin
            //}
        })
        .when("/battle", {
            templateUrl: "app/views/battle.html",
            controller: "battleController"//,
            //resolve: {
            //      loggedIn: verifyLogin
            //}
        })
        .when("/login", {
            templateUrl: "app/views/login.html",
            controller: "loginController"
        });
});

app.factory('authInterceptor', function ($rootScope, $q, $cookies) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($cookies.get("token")) {
                config.headers.access_token = $cookies.get("token");
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                // handle the case where the user is not authenticated
                alert('you are not authorized');
            }
            return response || $q.when(response);
        }
    };
});

var verifyLogin = function ($location, $q, $cookies) {
    var deferred = $q.defer();

    if ($cookies.get("token")) {
        deferred.resolve();
    }
    else {
        deferred.reject();
        $location.url('/login');
    }

    return deferred.promise;
};