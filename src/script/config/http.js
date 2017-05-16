'use strict';
/*对$http服务post方法的修改    $provide.decorator()*/
angular.module('app').config(['$provide',function($provide){
    $provide.decorator('$http',['$delegate','$q',function($delegate,$q){
        $delegate.post = function(url,data,config){
            var def = $q.defer();    //异步请求，创建延迟加载对象
            $delegate.get(url).then(function(resp){
                def.resolve(resp);
            }).catch(function(err){
                def.reject(err);
            });
            return {
                success:function(cb){
                    def.promise.then(cb);
                },
                error:function(cb){
                    def.promise.then(null,cb);
                }
            }
        };
        return $delegate;
    }]);
}]);