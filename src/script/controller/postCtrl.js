'use strict';
/*投递页面控制器*/
angular.module('app').controller('postCtrl',['$http','$scope',function($http,$scope){
    $scope.tabList = [
        {
            id:'all',
            name:'全部'
        },{
            id:'pass',
            name:'面试邀请'
        },{
            id:'fail',
            name:'不合适'
        }
    ];

    //请求投递列表
    $http.get('data/myPost.json').then(function(resp){
        $scope.positionList=resp.data;
    });

    $scope.filterObj = {};
    $scope.tClick = function(id,name){
        switch (id){
            case 'all':
                delete $scope.filterObj.state;
                break;
            case  'pass':
                $scope.filterObj.state = '1';
                break;
            case 'fail':
                $scope.filterObj.state = '-1';
                break;
            default:
        }
    };
}]);