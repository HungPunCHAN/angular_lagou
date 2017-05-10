'use strict';

/*公司信息模块指令*/
angular.module('app').directive('appCompany',[function(){
    return{
        restrict:'A',
        replace:true,
        scope:{
          com:'='
        },
        templateUrl:'view/template/company.html'
    }
}]);
