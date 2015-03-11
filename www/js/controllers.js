angular.module('app')

.controller(
    'AppCtrl',
    function($scope, Twitter) {
        'use strict';

        Twitter.getTweets().then(
            function(tweets){
                $scope.tweets = tweets;
            }
        );

        $scope.doRefresh = function() {
            Twitter.getNewTweets().then(
                function(newTweets) {
                    $scope.tweets = newTweets.concat($scope.tweets);
                }
            ).finally(
                function() {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                }
            );
        };

        $scope.loadMore = function(){
            Twitter.getMoreTweets().then(
                function(olderTweets) {
                    $scope.tweets = $scope.tweets.concat(olderTweets);
                }
            ).finally(
                function() {
                    // Stop the ion-infinite-scroll from spinning
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            );
        };
    }
);
