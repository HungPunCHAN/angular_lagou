/**
 * Created by Administrator on 2017/4/27.
 */
    "use strict";          //严格模式
angular.module('app',['ui.router','ngCookies','validation','ngAnimate']);             //创建angular模块，并声明依赖,引入ui-route模块
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

'use strict';

/*公司职位页面控制器*/
angular.module('app').controller('companyCtrl',['$http','$state','$scope',function($http,$state,$scope){
    $http.get('/data/company.json?id='+$state.params.id).then(function(resp){
       $scope.company = resp.data;
        //向下广播一个事件
        //$scope.$broadcast('abc',{id:1});
    });
    $scope.$on('cba',function(event,data){
        console.log(event,data);
    });
}]);

'use strict';

angular.module('app').controller('favoriteCtrl',['$http','$scope',function($http,$scope){
    $http.get('data/myFavorite.json').then(function(resp){
        $scope.list = resp.data;
    });


}]);
'use strict';

angular.module('app').controller('loginCtrl',['cache','$http','$scope','$state',function(cache,$http,$scope,$state){
    $scope.submit = function(){
        $http.post('data/login.json',$scope.user).success(function(resp){
            cache.put('id',resp.data.id);
            cache.put('name',resp.data.name);
            cache.put('image',resp.data.image);
            $state.go('main');
        });
    };
}]);
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



'use strict';

angular.module('app').controller('meCtrl',['$http','$scope','$state','cache','$cookies',function($http,$scope,$state,cache,cookies){
    if(cache.get('name')){
        $scope.name = cache.get('name');
        $scope.image = cache.get('image');
    }


    $scope.logout = function(){
        cache.remove('id');
        cache.remove('name');
        cache.remove('image');
        $state.go('main');
    }
}]);
'use strict';

/*职位详情页面控制器*/
angular.module('app').controller('positionCtrl',['cache','$q','$http','$state','$scope','$timeout',function(cache,$q,$http,$state,$scope,$timeout){
    $scope.isLogin=!!cache.get('name');
    $scope.message = $scope.isLogin?'投个简历':'去登录';
    //调用自定义服务的方法
    cache.put("top",'100');
    cache.remove('top');

    function getPosition(){
        var def=$q.defer();       //延迟加载对象               \\生成deferred异步对象
        $http.get('/data/position.json?id='+$state.params.id).then(function(resp){
            $scope.position = resp.data;
            if(resp.data.posted){
                $scope.message = "已投递";
            }
            def.resolve(resp);   //执行到这里时，改变deferred状态为执行成功，返回resp为从后台取到的数据，可以继续执行then,done
        }).catch(function(err){
            def.reject(err);    //执行到这里时，改变deferred状态为执行失败，返回err为报错，可以继续执行fail
        });
        return def.promise;   //起到保护作用，不允许函数外部改变函数内的deferred状态
    }

    function getCompany(id){
        $http.get('/data/company.json?id='+id).then(function(resp){
            $scope.company = resp.data;
        });
    }

    getPosition().then(function(obj){     //then()方法里可以放两个函数，对应def.reslove（）和 def.reject()
        getCompany(obj.data.companyId);
    });

    //投简历按钮的事件
    $scope.go = function(){
        if($scope.message !== '已投递'){
            if($scope.isLogin){
                $http.post('data/handle.json',{         //如果登录了就发送简历
                    id:$scope.position.id
                }).success(function(resp){
                    console.log(resp.data);
                    $scope.message = '已投递';       //投递成功，改变按钮文字
                });
            }else{
                $state.go('login');        //没登录就跳转到登录页面
            }
        }
    }
}]);

'use strict';
/*投递页面控制器*/
angular.module('app').controller('postCtrl',['$http','$scope',function($http,$scope){
    $scope.tabList = [
        {
            id:'all',
            name:'全部'
        },{
            id:'pass',
            name:'面试邀请'
        },{
            id:'fail',
            name:'不合适'
        }
    ];

    //请求投递列表
    $http.get('data/myPost.json').then(function(resp){
        $scope.positionList=resp.data;
    });

    $scope.filterObj = {};
    $scope.tClick = function(id,name){
        switch (id){
            case 'all':
                delete $scope.filterObj.state;
                break;
            case  'pass':
                $scope.filterObj.state = '1';
                break;
            case 'fail':
                $scope.filterObj.state = '-1';
                break;
            default:
        }
    };
}]);
'use strict';

/*注册页面控制器*/
/*
$interval  定时器服务
 $interval.cancel()：清除定时器
*/
angular.module('app').controller('registerCtrl',['$interval','$http','$scope','$state',function($interval,$http,$scope,$state){

    //注册
    $scope.submit = function(){
        $http.post('data/regist.json',$scope.user).success(function(resp){
            $state.go('login');
        });
    };
//发送短信
    var count = 60;
    $scope.send = function(){
        $http.get('data/code.json').then(function(resp){
            if(1 === resp.data.state){
                $scope.time = '60s';
                count = 60;
                var interval = $interval(function(){
                    if(count <= 0){
                        $interval.cancel(interval);    //取消定时器
                        $scope.time='';
                        return;
                    }
                    count--;
                    $scope.time = count + 's';
                },1000);
            }
        })
    };

}]);
'use strict';

angular.module('app').controller('searchCtrl',['dict','$http','$scope',function(dict,$http,$scope){
    $scope.name='';
    $scope.search = function(){
        $http.get('/data/positionList.json?name='+$scope.name).then(function(resp){
            $scope.list = resp.data;
        });
    };
    $scope.search();
    $scope.sheet = {};

    $scope.tabList=[
        {
            id:'city',
            name:'城市'
        },{
            id:'salary',
            name:'薪酬'
        },{
            id:'scale',
            name:'公司规模'
        }
    ];

    $scope.filterObj={};

    var tabId = '';
    $scope.tClick=function(id,name){
        tabId = id;
                            //调用dict全局变量的属性
        $scope.sheet.list = dict[id];
        $scope.sheet.visible = true;
    };

    $scope.sClick =function(id,name){
        if(id){
            // angular.forEach()  循环遍历的方法
            angular.forEach($scope.tabList,function(item){
                if(item.id === tabId){
                    item.name = name;
                }
            });
            $scope.filterObj[tabId + 'Id'] = id;
        }else{
            delete $scope.filterObj[tabId + 'Id'];
            angular.forEach($scope.tabList,function(item){
                if(item.id === tabId){
                    switch (item.id){
                        case 'city':
                            item.name='城市';
                            break;
                        case 'salary':
                            item.name='薪酬';
                            break;
                        case 'scale':
                            item.name='公司规模';
                            break;
                        default:
                    }
                }
            });
        }
    };


}]);
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

'use strict';

angular.module('app').directive('appFoot',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/foot.html'
    };
}]);

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

angular.module('app').directive('appHead',['cache',function(cache){
    return{
        restrict:'A',                    
        replace:true,                   
        templateUrl:'view/template/head.html',
        link:function($scope){
            $scope.name = cache.get('name') || '';
        }
    };
}]);


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
'use strict';

angular.module('app').directive('appPositionClass',[function(){
    return{
        restrict:'A',
        replace:true,
        scope:{
            com:'='        //定义接口
        },
        templateUrl:'view/template/positionClass.html',
        link:function($scope){
            $scope.showPositionList = function(idx){
                $scope.positionList = $scope.com.positionClass[idx].positionList;
                $scope.isActive = idx;
            };
            //$watch的主要作用监听$scope的属性，当属性发生变化时调用传入的函数，尽量少用$watch函数，会影响性能。
            $scope.$watch('com',function(newval){
                if(newval) {
                    $scope.showPositionList(0);
                }
            });
        }
    };
}]);
'use strict';

angular.module('app').directive('appPositionInfo',['$http',function($http){
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionInfo.html',
        scope:{
            isActive:'=',
            isLogin:'=',
            pos:'='
        },
        link:function($scope){
            $scope.$watch('pos',function(newVal){
                if(newVal){
                    $scope.pos.select = $scope.pos.select || false;    //select,默认值
                    $scope.imagePath = $scope.isActive ? 'image/star-active.png' : 'image/star.png';
                }
            });
            $scope.favorite = function(){
                $http.post('data/favorite.json',{
                    id:$scope.pos.id,
                    select: !$scope.pos.select
                }).success(function(resp){
                    $scope.pos.select = !$scope.pos.select;
                    $scope.imagePath = $scope.pos.select ? 'image/star-active.png' : 'image/star.png';
                });
            }
        }
    }
}]);
'use strict';

angular.module('app').directive('appPositionList',['cache','$http',function(cache,$http){
	return{
		restrict:'A',                            //调用方式
		replace:true,                            //替换父元素
		templateUrl:'view/template/positionList.html',        //模板
		scope:{                                  //接口
			data:'=',                            //指令中会创建一个作用域，控制器也有一个作用域，指令相当于是控制器的子元素，
 			filterObj:'=',								// "="表示两者的scope共享，是同一个scope，声明的属性共享,相当于暴露一个data的接口
			isFavorite:'='
		},
		link:function($scope){
			$scope.select = function(item){
				$http.post('data/favorite.json',{
					id:item.id,
					select:!item.select
				}).success(function(resp){
					item.select = !item.select;
				});
			}
		}
	};
}]);

'use strict';

angular.module('app').directive('appSheet',function(){
    return{
        restrict:'A',
        replace:true,
        scope:{
            list:'=',
            visible:'=',
            select:"&"
        },
        templateUrl:'view/template/sheet.html'
    }
});
'use strict';

/*tab指令*/
angular.module('app').directive('appTab',function(){
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/tab.html',
        scope:{
            list:'=',
            tabClick:'&'
        },
        link:function($scope){
            $scope.click=function(tab){
                $scope.selectId = tab.id;
                $scope.tabClick(tab);
            }
        }
    }
});

'use strict';
//angular.module('app').filter()创建自定义过滤器
angular.module('app').filter('filterByObj',[function(){
    return function(list, obj) {
        var result = [];
        angular.forEach(list, function(item){
            var isEqual = true;
            for(var e in obj){
                if(item[e]!==obj[e]) {
                    isEqual = false;
                }
            }
            if(isEqual) {
                result.push(item);
            }
        });
        return result;
    };
}]);


'use strict';
//自定义服务
/*
service(）和facotry()的区别：facotry()在return之前可以定义一些私有属性、私有对象
*/
angular.module('app')
   //angular通过service（）方法定义服务
    .service('cache',['$cookieStore',function($cookies){
        this.put = function(key,value){
            $cookies.put(key,value);
        };
        this.get=function(key){
            return $cookies.get(key);
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
