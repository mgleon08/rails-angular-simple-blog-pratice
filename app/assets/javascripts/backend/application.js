// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require ui-router
//= require codemirror
//= require codemirror/modes/markdown
//= require angular-ui-codemirror
//= require_self
//= require_tree .

// angular.module('blog',[])
// .controller('test',
// ['$scope', function($scope){
//   $scope.text = 'hello world'
// }]);

angular
.module('blog',[
  'ui.router',
  'ngResource',
  'ui.codemirror'
  ])
.constant('Path', {
    template:'/templates?t=backend'
})
.config(['$httpProvider', function($httpProvider){
  $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content');
  // var headers = $httpProvider.defaults.headers.common;
  // token_tag = document.querySelector("meta[name=csrf-token]");
  // if( token_tag ){ headers['X-CSRF-TOKEN'] = token_tag.content; };
  // headers['X-Requested-With'] = 'XMLHttpRequest';
}])
.config(
  [      '$stateProvider', '$urlRouterProvider', 'Path',
  function($stateProvider,  $urlRouterProvider,   Path) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/posts/list");
  //
  // Now set up the states
  $stateProvider
    .state('posts', {
      abstract: true,
      url:"/posts",
      template: "<ui-view></ui-view>",
    })
    .state('posts.list', {
      url: "/list",
      templateUrl: Path.template + "/posts/list.html",
      controller: 'PostListCrtl'
    })
    .state('posts.show', {
      url: "/show/:id",
      templateUrl: Path.template + "/posts/show.html",
      controller: 'PostShowCrtl'
    })
    .state('posts.edit', {
      url: "/edit/:id",
      templateUrl: Path.template + "/posts/edit.html",
      controller: 'PostEditCrtl',
      resolve   : {
         POST : ['POSTS', '$stateParams', function(POSTS, $stateParams){
             var id = $stateParams.id;
             return POSTS.get({postId:id});
         }]
     }
    })
    .state('posts.new', {
    url: "/new",
    controller: 'PostNewCrtl'
    })
}])
