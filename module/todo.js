(function () {
	var app = angular.module("todo", []);
	app.directive("addTodo", function () {
		return {
			template: '<h1>{{title}}</h1>' +
				'<div class="c addbox">' +
				'<input type="text" ng-model="addItem" placeholder="输入需要添加的文字">' +
				'<button ng-click="add()">添加</button>' +
				'</div>'
		}
	});
	app.directive("itemsTodo", function () {
		return {
			template: '<div class="c oh listbox"><ul>' +
				'<li ng-repeat="x in list">' +
				'<input type="checkbox" ng-checked="x.selected" ng-click="choose($index)" class="l db"/>' +
				'<input ng-show="x.update" ng-model="x.value" type="text" value="{{x.value}}" class="l db" />' +
				'<span ng-hide="x.update" class="db l ellipsis" ng-dblclick="edit($index)">{{x.value}}</span>' +
				'<div class="operate r">' +
				'<button ng-show="x.selected" ng-click="del($index)">删除</button>' +
				'<button ng-show="x.update" ng-click="update($index,this)">修改</button>' +
				'<button ng-show="x.update" ng-click="cancel($index)">取消</button>' +
				'</div></li>' +
				'</ul></div>'
		}
	});
	app.directive("delTodo",function(){
		return {
			template: '<button class="del r" ng-show="delChoose.length" ng-click="delAll()">删除选中项</button>'
		}
	});
	app.controller("todoCtl", function ($scope) {
		$scope.title = "Angular Todo";
		$scope.addItem = "";
		$scope.list = [];
		$scope.delChoose = [];
		$scope.add = function () {
			if(!$scope.addItem) return;
			$scope.list.push({
				id: $scope.list.length,
				value: $scope.addItem,
				selected: false,
				update: false
			});
			$scope.addItem = "";
		}
		$scope.edit = function (i) {
			$scope.list[i].update = true;
			$scope.list[i].selected = false;
		}
		$scope.choose = function (i) {
			$scope.list[i].update = false;
			$scope.list[i].selected = !$scope.list[i].selected;
			delAll(i,$scope.list[i].selected);
		}
		$scope.del = function (i) {
			$scope.list.splice(i, 1);
		}
		$scope.cancel = function (i) {
			$scope.list[i].update = false;
		}
		$scope.update = function (i, t) {
			$scope.list[i].update = false;
			$scope.list[i].value = t.x.value;
		}
		$scope.delAll = function () {
			$scope.list.forEach(function(v,i){
				if(v.selected) $scope.list.splice(i, 1);
			});
		}
		var delAll = function(i,b){
			(b)?$scope.delChoose.push(i):$scope.delChoose.splice(i,1);
		}
	});


	window.app = app;
})()