var app = angular.module('app');

app.controller('partyController', function ($scope, $location, gameService) {

    $scope.GetParty = function () {
        gameService.GetParty()
            .then(function success(data) {
                $scope.party = data;
            });
        //TODO: Handle service errors
    };

    $scope.GetParty();
});