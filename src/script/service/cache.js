'use strict';
//自定义服务
/*
service(）和facotry()的区别：facotry()在return之前可以定义一些私有属性、私有对象
*/
angular.module('app')
   //angular通过service（）方法定义服务
    .service('cache',['$cookies',function($cookies){
        this.put = function(key,value){
            $cookies.put(key,value);
        };
        this.get = function(key){
            $cookies.get(key);
        };
        this.remove = function(key){
            $cookies.remove(key);
        };
    }]);
/*
    //通过facotry（）服务工厂方法定义服务
.facotry('cache',['$cookies',function(){
    return{
        put:function(key,value){
            $cookies.put(key,value);
        },
        get:function(key){
            $cookies.get(key);
        },
        remove:function(key){
            $cookies.remove(key);
        }
    }
}]);*/
