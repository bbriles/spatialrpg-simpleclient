var app = angular.module('app');

app.controller('battleController', function ($scope, $location, gameService) {

    $scope.actionMessage = null;
    $scope.isPlayerTurn = false;
    $scope.selectingTarget = false;
    $scope.party = null;
    $scope.enemies = null;
    $scope.currentMonster = null;
    $scope.readyToSend = false;
    $scope.showInfo = false;
    $scope.log = "";

    $scope.GetBattle = function () {
        gameService.GetBattle()
            .then(function success(data) {
                $scope.battle = data;
                $scope.party = $scope.battle.user.party.monsters;
                $scope.enemies = $scope.battle.enemies;
                $scope.info = JSON.stringify(data);

                NextRound();
            });
        //TODO: Handle service errors
    };

    $scope.IsCurrentMonster = function (monster) {
        return $scope.currentMonster === monster;
    };

    $scope.SelectMonster = function (monster) {
        if ($scope.isPlayerTurn) {
            $scope.currentMonster = monster;
        }
    };

    $scope.HpToProgressType = function (hp, max) {
        if (hp > max / 2)
            return "success";
        else if (hp > max / 4) {
            return "warning";
        }
        return "alert";
    };

    $scope.ClickSkill = function (skill) {
        if ($scope.currentMonster) {

            $scope.selectingTarget = true;
            $scope.actionMessage = "Select Target";
            $scope.currentMonster.currentSkill = skill;
            // TODO: Handle self-targeting skills
        }
    };

    $scope.ClickEnemy = function (enemy) {
        if ($scope.selectingTarget) {

            var battleAction = new BattleAction($scope.currentMonster.battleId, $scope.currentMonster.currentSkill.id, enemy.battleId, null);

            $scope.currentMonster.action = battleAction;

            $scope.actionMessage = null;
            $scope.selectingTarget = false;

            LogAction($scope.battle.user.username, $scope.currentMonster, enemy, $scope.currentMonster.currentSkill);
            FinishAction(battleAction);
        }
    };

    $scope.SendActions = function () {

        var actions = [];

        for (var i = 0; i < $scope.party.length; i++) {
            var monster = $scope.party[i];
            if (monster.action) {
                actions.push(monster.action);
            }
        }

        $scope.currentMonster = null;
        $scope.isPlayerTurn = false;
        $scope.readyToSend = false;

        LogMessage("Go!");

        $scope.info = JSON.stringify(actions);

        gameService.SendBattleUpdate($scope.battle.id, actions)
            .then(function success(data) {
                
            });
    };

    function FinishAction(action) {

        var index = $scope.party.indexOf($scope.currentMonster);
        if ($scope.party.length > index + 1) {
            $scope.currentMonster = $scope.party[index + 1];
        }

        if (AreAllActionsSelected()) {
            $scope.readyToSend = true;
            $scope.currentMonster = null;
        }
    }

    function AreAllActionsSelected() {
        for (var i = 0; i < $scope.party.length; i++) {
            var monster = $scope.party[i];
            if (!monster.action) {
                return false;
            }
        }
        return true;
    }

    function PlayRoundResult(battleRound) {

        if (battleRound) {
            
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

    function LogAction(ownerName, monster, target, skill) {
        let name = ownerName !== null ? ownerName + "'s " : "";

        $scope.log += name + monster.type.name + " targets " + target.type.name + " with " + skill.name + "\n";
    }

    function LogMessage(message) {
        $scope.log += message + "\n";
    }

    $scope.GetBattle();

});