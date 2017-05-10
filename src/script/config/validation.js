"use strict";

angular.module('app').config(['$validationProvider',function($validationProvider){
    //校验规则
    var expression = {
        phone:/^1[\d]{10}/,
        password:function(value){
            return value > 5;
        }
    };

    //错误提示
    var defaultMsg = {
        phone:{
            success:'',
            error:'必须是11位数字'
        },
        password:{
            success:'',
            error:'长度至少六位'
        }
    };
    //$validationProvider先配置校验规则，然后在配置提示语
    $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);
/*
'use strict';

angular.module('app').config(['$validationProvider',function($validationProvider){
    //校验规则
    var expression = {
        phone:/^1[\d]{10}/,
        password:function(value){
            return value > 5;
        }
    };

    //错误提示
    var defaultMsg = {
        phone:{
            success:'',
            error:'必须是11位数字'
        },
        password:{
            success:'',
            error:'长度至少六位'
        }
    };
    //$validationProvider先配置校验规则，然后在配置提示语
    $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);*/
