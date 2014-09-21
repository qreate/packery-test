angular.module('untitled').controller('PackeryCtrl', ['$scope', '$rootScope', '$timeout',
    function($scope, $rootScope, $timeout) {

        function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        $scope.windowItems = [
            { color: 'green', size: 'normal' },
            { color: 'grey', size: 'normal' },
            { color: 'lightgrey', size: 'normal' },
            { color: 'lightgrey', size: 'normal' },
            { color: 'lightgrey', size: 'normal' },
            { color: 'lightgrey', size: 'normal' }
        ];

        $scope.add = function() {
            $scope.windowItems.push({
                color: getRandomColor()
            });
        };

        $scope.remove = function() {
            $scope.windowItems.pop();
        };

    }
]);