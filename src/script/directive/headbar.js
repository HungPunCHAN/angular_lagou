'use strict';

angular.module('app').directive('appHeadBar',function(){
   return{
       restrict:'A',
       replace:true,
       templateUrl:'view/template/headbar.html',
       scope:{
           text:'@'
       },         //内在的作用域对象，元素，元素的属性 $scope,element,attr
       link:function($scope){
           $scope.back=function(){
               window.history.back();
           };
           //调用$on的函数接收一个广播的事件,$on('事件的名称'，处理事件的函数)
           $scope.$on('abc',function(event,data){
               console.log(event,data);
           });
           //向上广播一个事件
           $scope.$emit('cba',{name:2});
       }
   };
});