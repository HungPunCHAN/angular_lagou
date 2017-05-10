'use strict';

/*公司职位页面控制器*/
angular.module('app').controller('companyCtrl',['$http','$state','$scope',function($http,$state,$scope){
    $http.get('/data/company.json?id='+$state.params.id).then(function(resp){
       $scope.company = resp.data;
        //向下广播一个事件
        //$scope.$broadcast('abc',{id:1});
    });
    $scope.$on('cba',function(event,data){
        console.log(event,data);
    });
}]);
