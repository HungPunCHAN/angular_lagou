'use strict';

//自定义指令
//通过定义指令插入页面内容，模块
/*angular.module('app').directive('appHead',['cache',function(cache){
    return{
        restrict:'A',       //指令作为属性使用
        replace:true,       //是否替换原标签       //替换dom元素
        templateUrl:'view/template/head.html',    //模版的位置
        link: function($scope){
            $scope.name = cache.get('name') || '';
        }
    };
}]);*/

angular.module('app').directive('appHead',function(){
    return{
        restrict:'A',                    
        replace:true,                   
        templateUrl:'view/template/head.html'
    };
})

