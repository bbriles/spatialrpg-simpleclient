app.controller('userController', function ($scope, $location, gameService) {

    $scope.GetUser = function () {
        gameService.GetUser()
            .then(function success(data) {
                $scope.user = data;
            });
        //TODO: Handle service errors
    };

    $scope.GetUser();
});