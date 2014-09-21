angular.module('untitled').directive('packeryWallDir', ['$rootScope', '$timeout',
    function($rootScope, $timeout) {
        return {
            restrict: 'A',
            scope: true,
            link: function(scope, element, attrs) {
                //console.log("link called on", element[0]);
                scope.element = element;
                if (!$rootScope.packery) {
                    $rootScope.packery = new Packery(element[0].parentElement, {
                        gutter: 0,
                        rowHeight: '.module-sizer',
                        itemSelector: '.module',
                        columnWidth: '.module-sizer'
                    });

                    var draggable1 = new Draggabilly(element[0]);
                    $rootScope.packery.bindDraggabillyEvents(draggable1);

                    var orderItems = function() {
                        var itemElems = $rootScope.packery.getItemElements();
                        $(itemElems).each(function(i, itemElem) {
                            //$(itemElem).text(i + 1);
                        });
                    };

                    $rootScope.packery.on('layoutComplete', orderItems);
                    $rootScope.packery.on('dragItemPositioned', orderItems);


                } else {
                    // console.log("else", element[0]);
                    $timeout(function() {
                        $rootScope.packery.appended(element[0])
                    });
                    var draggable2 = new Draggabilly(element[0]);
                    $rootScope.packery.bindDraggabillyEvents(draggable2);


                }
                $timeout(function() {
                    $rootScope.packery.layout();
                });


                // watch for destroying an item
                scope.$on('$destroy', function() {
                    $rootScope.packery.remove(scope.element[0]);
                    scope.packery.layout();
                });

                scope.resize = function(id){
                    var currentSize = scope.windowItems[id].size;
                    switch(currentSize){
                        case 'normal':
                            scope.windowItems[id].size = 'wide';
                            break;
                        case 'wide':
                            scope.windowItems[id].size = 'full';
                            break;
                        case 'full':
                            scope.windowItems[id].size = 'normal';
                            break;
                    }
                    //scope.windowItems[id].size = scope.windowItems[id].size == 'wide'?'normal':'wide';
                    scope.$broadcast('resize');

                };
                scope.$on('resize', function(){
                    $timeout(function() {scope.packery.fit(element[0])});
                });

            }
        };

    }
]);