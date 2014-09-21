angular.module('untitled').directive('packeryWallDir', function() {
    return {
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function($scope, $element, $attrs){

                var itemSelector,
                    packeryOptions;

                itemSelector = $attrs.packeryWallDir;

                //this element will contain the packery
                this.wallContainer = $element;

                //we have some default options
                //then overwrite with passed in options
                //then overwrite with the necessary options
                this.packeryOptions = _.assign(
                    {},
                    $scope.$eval($attrs.packeryWallOptions),
                    {
                        itemSelector: itemSelector,
                    }
                );

                //place holder for packery to be setup and shared across all ng-repeat directive scopes
                this.packery = new Packery(
                    this.wallContainer[0],
                    this.packeryOptions
                );

                this.packery.bindResize();
                //this.packery.fit(element, x, y);

                var draggable1 = new Draggabilly(element[0]);
                this.packery.bindDraggabillyEvents(draggable1);



                $scope.alert = function(id){
                    //alert("hej")
                    var currentSize = $scope.bricks[id].size;
                    //alert($scope.bricks[id].size);
                    switch(currentSize){
                            case 'normal':
                                $scope.bricks[id].size = 'wide';
                                break;
                            case 'wide':
                                $scope.bricks[id].size = 'xwide';
                                break;
                            case 'xwide':
                                $scope.bricks[id].size = 'normal';
                                break;
                    }
                    //$scope.bricks[id].size =='wide'?'normal':'wide';
                    //var target = document.getElementById('id0');
                    //alert(target);
                    this.$broadcast('resize');
                    //this.$broadcast('resize',{element:target});
                    //alert(this)
                    //self.packery.fit();
                };



                var self = this;
                this.debouncedReload = _.debounce(function(temp){
                    console.log('I am only ran once after all the destroys are done!');
                    console.log('item is being destroyed');
                    //alert(temp)
                    self.packery.reloadItems();
                    self.packery.layout();
                    //self.packery.fit(temp, 0,0);
                }, 100);
                this.fitMe = _.debounce(function(event){
                    console.log('I am run!');
                    //self.packery.reloadItems();
                    self.packery.layout();
                    //self.packery.fit(event.target);
                },100);

            }
        ]
    };
}).directive('packeryItemDir',
    function(){
        return {
            scope: true,
            require: '^packeryWallDir',
            link: function(scope, element, attributes, packeryWallDirCtrl){

                console.log('item is repeated');

                imagesLoaded(element, function(){
                    if(scope.$first){
                        console.log('I get prepended');
                        packeryWallDirCtrl.packery.prepended(element);
                    }else{
                        console.log('I get appended');
                        packeryWallDirCtrl.packery.appended(element);
                    }
                });

                scope.$on('$destroy', packeryWallDirCtrl.debouncedReload);
                //scope.$on('resize', packeryWallDirCtrl.debouncedReload);
                //scope.$on('resize', packeryWallDirCtrl.fitMe);
                scope.$on('resize', function(event, args){
                    //var myvalue = args.element;
                    //var el = angular.element(document.getElementById('id1'));
                    //alert(myvalue);
                    packeryWallDirCtrl.debouncedReload();
                    //packeryWallDirCtrl.debouncedReload(myvalue);
                    //packeryWallDirCtrl.packery.fit(myvalue);
                    //packeryWallDirCtrl.packery.layout();
                });
                //scope.$on('resize', packeryWallDirCtrl.packery.fit(element));
                //scope.$on('resize', packeryWallDirCtrl.packery.layout());

            }
        };
    }
);