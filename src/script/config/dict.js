'use strict';
//angular.module('app').value()创建一个全局的变量，跟service（）有点像，只是它没有动态逻辑，只是一个值
angular.module('app').value('dict',{}).run(['dict','$http',function(dict,$http){
    //城市
    $http.get('data/city.json').then(function(resp){
        dict.city = resp.data;
    });
    //薪酬
    $http.get('data/salary.json').then(function(resp){
        dict.salary = resp.data;
    });
    //公司规模
    $http.get('data/scale.json').then(function(resp){
        dict.scale = resp.data;
        console.log(dict.scale);
    });
}]);