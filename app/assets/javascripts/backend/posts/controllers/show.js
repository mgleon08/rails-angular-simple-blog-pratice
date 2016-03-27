angular
.module('blog')
.controller('PostShowCrtl',
  [       '$scope', 'POSTS','$stateParams',
  function($scope, POSTS, $stateParams){
    var id = $stateParams.id;
    $scope.post = POSTS.get({postId:id});
}])
