'use strict';
/*首页控制器*/
/*
  新版本的AngularJs中取消了success和error，用promise规则。
  以下代码中success和error方法会失效
  $http.get(url).success(function(data){
      console.log(data);
  }).error(function(data){
      console.log(data);
  })
 promise规则写法：
 $http.get('/data/positionList.json')
   .then(function(data){         //正确请求成功时处理
     console.log(data);
   }).catch(function(data){     //捕捉错误处理
     console.log(data);
   });

 */
angular.module('app').controller('mainCtrl', ['$scope','$http', function( $scope,$http){
  $http.get('/data/positionList.json').then(function(resp){    //请求成功获得的数据
    $scope.list = resp.data;
    console.log(resp);
  })
}]);


