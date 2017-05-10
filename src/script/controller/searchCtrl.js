'use strict';

angular.module('app').controller('searchCtrl',['dict','$http','$scope',function(dict,$http,$scope){
    $scope.name='';
    $scope.search = function(){
        $http.get('/data/positionList.json?name='+$scope.name).then(function(resp){
            $scope.list = resp.data;
        });
    };
    $scope.search();
    $scope.sheet = {};

    $scope.tabList=[
        {
            id:'city',
            name:'城市'
        },{
            id:'salary',
            name:'薪酬'
        },{
            id:'scale',
            name:'公司规模'
        }
    ];

    $scope.filterObj={};

    var tabId = '';
    $scope.tClick=function(id,name){
        tabId = id;
                            //调用dict全局变量的属性
        $scope.sheet.list = dict[id];
        $scope.sheet.visible = true;
    };

    $scope.sClick =function(id,name){
        if(id){
            // angular.forEach()  循环遍历的方法
            angular.forEach($scope.tabList,function(item){
                if(item.id === tabId){
                    item.name = name;
                }
            });
            $scope.filterObj[tabId + 'Id'] = id;
        }else{
            delete $scope.filterObj[tabId + 'Id'];
            angular.forEach($scope.tabList,function(item){
                if(item.id === tabId){
                    switch (item.id){
                        case 'city':
                            item.name='城市';
                            break;
                        case 'salary':
                            item.name='薪酬';
                            break;
                        case 'scale':
                            item.name='公司规模';
                            break;
                        default:
                    }
                }
            });
        }
    };


}]);