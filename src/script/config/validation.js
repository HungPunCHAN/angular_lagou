"use strict";

/*Provider  就是对模块或者服务进行配置*/
angular.module('app').config(['$validationProvider',function($validationProvider){
    //校验规则
    var expression = {
        //手机号的校验规则
        phone:/^1[\d]{10}$/,
        //密码的校验规则
        password:function(value){
            var str = value + '';
            return str.length > 5;
        },
        //必填项的校验规则
        required:function(value){
            return !!value;
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
        },
        required:{
            success:'',
            error:'不能为空'
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
