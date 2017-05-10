'use strict';

angular.module('app').directive('appPositionClass',[function(){
    return{
        restrict:'A',
        replace:true,
        scope:{
            com:'='        //定义接口
        },
        templateUrl:'view/template/positionClass.html',
        link:function($scope){
            $scope.showPositionList = function(idx){
                $scope.positionList = $scope.com.positionClass[idx].positionList;
                $scope.isActive = idx;
            };
            //$watch的主要作用监听$scope的属性，当属性发生变化时调用传入的函数，尽量少用$watch函数，会影响性能。
            $scope.$watch('com',function(newval){
                if(newval) {
                    $scope.showPositionList(0);
                }
            });
        }
    };
}]);