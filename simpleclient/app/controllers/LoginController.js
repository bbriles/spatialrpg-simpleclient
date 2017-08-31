var app = angular.module('app');

app.controller('loginController', function ($scope, $http, $cookies, $location) {

    $scope.login = function () {

        var user = { name: $scope.name, password: $scope.password };

        $http.post('api/users/authenticate', user)
            .then(function successCallBack(response) {
                if (response.data.status = "success") {
                    $cookies.put("token", response.data.token);
                    $location.url('/');
                }
                else {
                    $scope.message = response.data.message;
                }

            }, function errorCallBack(response) {
                $scope.message = response.data.message;
            });
    }
});