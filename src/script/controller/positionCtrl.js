'use strict';

/*职位详情页面控制器*/
angular.module('app').controller('positionCtrl',['cache','$q','$http','$state','$scope','$timeout',function(cache,$q,$http,$state,$scope,$timeout){
    $scope.isLogin=!!cache.get('name');
    $scope.message = $scope.isLogin?'投个简历':'去登录';
    //调用自定义服务的方法
    cache.put("top",'100');
    cache.remove('top');

    function getPosition(){
        var def=$q.defer();       //延迟加载对象               \\生成deferred异步对象
        $http.get('/data/position.json?id='+$state.params.id).then(function(resp){
            $scope.position = resp.data;
            if(resp.data.posted){
                $scope.message = "已投递";
            }
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

    //投简历按钮的事件
    $scope.go = function(){
        if($scope.message !== '已投递'){
            if($scope.isLogin){
                $http.post('data/handle.json',{         //如果登录了就发送简历
                    id:$scope.position.id
                }).success(function(resp){
                    console.log(resp.data);
                    $scope.message = '已投递';       //投递成功，改变按钮文字
                });
            }else{
                $state.go('login');        //没登录就跳转到登录页面
            }
        }
    }
}]);
