'use strict';

angular.module('app').controller('meCtrl',['$http','$scope','$state','cache','$cookies',function($http,$scope,$state,cache,cookies){
    if(cache.get('name')){
        $scope.name = cache.get('name');
        $scope.image = cache.get('image');
    }


    $scope.logout = function(){
        cache.remove('id');
        cache.remove('name');
        cache.remove('image');
        $state.go('main');
    }
}]);