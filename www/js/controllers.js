angular.module('app')


.controller(
    'TabsCtrl',
    function($scope, TwitterUser) {
        'use strict';

        TwitterUser.getUser().then(
            function(user){
                $scope.user = user;
            }
        );
    }
)
.controller(
    'TweetsCtrl',
    function($scope, Twitter, $ionicModal, $ionicPopover) {
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

        var newTweetModal = null;
        $ionicModal.fromTemplateUrl(
            'views/partials/new-tweet-modal.html',
            {
                scope: $scope,
                animation: 'slide-in-up'
            }
        ).then(
            function(modal) {
                newTweetModal = modal;
            }
        );

        $scope.writeTweet = function() {
            newTweetModal.show();
        };

        $scope.cancelWriteTweet = function() {
            newTweetModal.hide();
        };

        $scope.sendTweet = function(tweet) {
            newTweetModal.hide();
            Twitter.sendTweet(tweet).then(
                function(newTweet) {
                    $scope.tweets.unshift(newTweet);
                    tweet.content = '';
                }
            );
        };

        //Cleanup the modal when we're done with it!
        $scope.$on(
            '$destroy',
            function() {
                newTweetModal.remove();
            }
        );

        $ionicPopover.fromTemplateUrl(
            'views/partials/menu-popover.html',
            {
                scope: $scope,
            }
        ).then(
            function(popover) {
                $scope.popover = popover;
            }
        );
    }
)
.controller(
    'NotificationsCtrl',
    function($scope) {
        'use strict';
    }
)
.controller(
    'ProfilCtrl',
    function($scope) {
        'use strict';
    }
)
;
