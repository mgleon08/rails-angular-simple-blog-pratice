angular
.module('blog')
.controller('PostEditCrtl',
  [       '$scope', 'POSTS',
  function($scope, POSTS){
    $scope.post = POSTS.get({postId:1});
}])
