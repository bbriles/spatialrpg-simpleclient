var app = angular.module('app');

app.controller('partyController', function ($scope, $http, $location, gameService) {

    $scope.GetParty = function () {
        gameService.GetParty()
            .then(function success(data) {
                $scope.party = data;
            });
        //TODO: Handle service errors
    };

    $scope.GetParty();
});