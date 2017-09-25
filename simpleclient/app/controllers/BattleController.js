var app = angular.module('app');

app.controller('battleController', function ($scope, $location, gameService) {

    $scope.actionMessage = null;
    $scope.isPlayerTurn = false;
    $scope.party = null;
    $scope.enemies = null;
    $scope.currentMonster = null;

    $scope.GetBattle = function () {
        gameService.GetBattle()
            .then(function success(data) {
                $scope.battle = data;
                $scope.party = $scope.battle.user.party.monsters;
                $scope.enemies = $scope.battle.enemies;
                $scope.info = JSON.stringify(data);

                PlayActions();
            });
        //TODO: Handle service errors
    };

    $scope.IsCurrentMonster = function (monster) {
        return $scope.currentMonster == monster;
    };

    $scope.SelectMonster = function(monster) {
        if ($scope.isPlayerTurn) {
            $scope.currentMonster = monster;
        }
    }

    $scope.HpToProgressType = function(hp, max)
    {
        if (hp > (max / 2))
            return "success";
        else if (hp > (max / 4)) {
            return "warning";
        }
        return "alert";
    }

    function PlayActions() {
        if ($scope.battle.actions) {
            // play out actions
        }
        // check if we lost
        // go to next round
        NextRound();
    }

    function NextRound() {
        // TODO: Make it pick first alive monster, instead of just first
        $scope.currentMonster = $scope.party[0];
        $scope.isPlayerTurn = true;
    }

    $scope.GetBattle();
    
});