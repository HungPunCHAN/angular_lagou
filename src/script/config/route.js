"use strict";

/*
config():用来配置路由   有显示声明和隐式声明的方式，下面用的是显示声明的方式
 Provider：对前面的服务进行配置的入口
 $stateProvider：用来配置路由   $stateProvider的state（）方法有两个参数：唯一标识的路径，对象
*/
angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider.state('main',{
        url: '/main',                      //路径，哈希值
        templateUrl: 'view/main.html',   //页面
        controller: 'mainCtrl'            //页面的逻辑，控制器
    }).state('position',{
    	url:'/position/:id',
    	templateUrl:'view/position.html',
    	controller:'positionCtrl'
    }).state('company',{
        url:'/company:id',
        templateUrl:'view/company.html',
        controller:'companyCtrl'
    }).state('search',{
        url:'/search',
        templateUrl:'view/search.html',
        controller:'searchCtrl'
    }).state('login',{
        url:'/login',
        templateUrl:'view/login.html',
        controller:'loginCtrl'
    }).state('me',{
        url:'/me',
        templateUrl:'view/me.html',
        controller:'meCtrl'
    }).state('post',{
        url:'/post',
        templateUrl:'view/post.html',
        controller:'postCtrl'
    }).state('favorite',{
        url:'/favorite',
        templateUrl:'view/favorite.html',
        controller:'favoriteCtrl'
    }).state('register',{
        url:'/register',
        templateUrl:'view/register.html',
        controller:'registerCtrl'
    });
    $urlRouterProvider.otherwise('main');   //设置一个默认的跳转
}]);







