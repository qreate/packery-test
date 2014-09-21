angular.module('untitled').directive('masonryWallDir', function() {
    return {
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function($scope, $element, $attrs){

                var itemSelector,
                    masonryOptions;

                itemSelector = $attrs.masonryWallDir;

                //this element will contain the masonry
                this.wallContainer = $element;

                //we have some default options
                //then overwrite with passed in options
                //then overwrite with the necessary options
                this.masonryOptions = _.assign(
                    {},
                    $scope.$eval($attrs.masonryWallOptions),
                    {
                        itemSelector: itemSelector,
                    }
                );

                //place holder for masonry to be setup and shared across all ng-repeat directive scopes
                this.masonry = new Masonry(
                    this.wallContainer[0],
                    this.masonryOptions
                );

                this.masonry.bindResize();

                var self = this;
                this.debouncedReload = _.debounce(function(){
                    console.log('I am only ran once after all the destroys are done!');
                    console.log('item is being destroyed');
                    self.masonry.reloadItems();
                    self.masonry.layout();
                }, 100);

            }
        ]
    };
}).directive('masonryItemDir',
    function(){
        return {
            scope: true,
            require: '^masonryWallDir',
            link: function(scope, element, attributes, masonryWallDirCtrl){

                console.log('item is repeated');

                imagesLoaded(element, function(){
                    if(scope.$first){
                        console.log('I get prepended');
                        masonryWallDirCtrl.masonry.prepended(element);
                    }else{
                        console.log('I get appended');
                        masonryWallDirCtrl.masonry.appended(element);
                    }
                });

                scope.$on('$destroy', masonryWallDirCtrl.debouncedReload);
                scope.$on('resize', masonryWallDirCtrl.debouncedReload);

            }
        };
    }
);