'use strict';

/*职位详情页面控制器*/
angular.module('app').controller('positionCtrl',['$q','$http','$state','$scope','cache',function($q,$http,$state,$scope,cache){
    $scope.isLogin=true;
    //调用自定义服务的方法
    cache.put("top",'100');
    cache.remove('top');

    function getPosition(){
        var def=$q.defer();       //延迟加载对象               \\生成deferred异步对象
        $http.get('/data/position.json?id='+$state.params.id).then(function(resp){
            $scope.position = resp.data;
            def.resolve(resp);   //执行到这里时，改变deferred状态为执行成功，返回resp为从后台取到的数据，可以继续执行then,done
        }).catch(function(err){
            def.reject(err);    //执行到这里时，改变deferred状态为执行失败，返回err为报错，可以继续执行fail
        });
        return def.promise;   //起到保护作用，不允许函数外部改变函数内的deferred状态
    }

    function getCompany(id){
        $http.get('/data/company.json?id='+id).then(function(resp){
            $scope.company = resp.data;
        });
    }

    getPosition().then(function(obj){     //then()方法里可以放两个函数，对应def.reslove（）和 def.reject()
        getCompany(obj.data.companyId);
    });
}]);
