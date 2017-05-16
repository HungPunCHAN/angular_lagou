'use strict';

/*注册页面控制器*/
/*
$interval  定时器服务
 $interval.cancel()：清除定时器
*/
angular.module('app').controller('registerCtrl',['$interval','$http','$scope','$state',function($interval,$http,$scope,$state){

    //注册
    $scope.submit = function(){
        $http.post('data/regist.json',$scope.user).success(function(resp){
            $state.go('login');
        });
    };
//发送短信
    var count = 60;
    $scope.send = function(){
        $http.get('data/code.json').then(function(resp){
            if(1 === resp.data.state){
                $scope.time = '60s';
                count = 60;
                var interval = $interval(function(){
                    if(count <= 0){
                        $interval.cancel(interval);    //取消定时器
                        $scope.time='';
                        return;
                    }
                    count--;
                    $scope.time = count + 's';
                },1000);
            }
        })
    };

}]);