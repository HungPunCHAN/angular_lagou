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
