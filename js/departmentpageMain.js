//jquery 1.9.1模块不符合 AMD 格式所以需要自定义
require.config({
	shim:{
		'jquery.min':{
			exports: '$'
		}

	}

})

//departmentpage 脚本main函数
require(["jquery.min","overborwserEvent"],function main($,EventUntil){

	//封装选择器函数
	function s(name){
		if (name.substring(0, 1) == "#") {
			return document.querySelector(name);
		}else if (name.substring(0, 1) == ".") {
			return document.querySelectorAll(name);
		}else{
			return document.querySelectorAll(name);
		}
	}
	
	//用户名栏鼠标移入事件
	EventUntil.addHandler(s("#user-name"),"mouseover",function(event){
		event = EventUntil.getEvent(event);
		var target = EventUntil.getTarget(event);
		var floor = document.querySelector("#user-operate");
		var top = getComputedStyle(s(".header")[0], null)["height"];
		floor.style.left = (target.offsetLeft - 50) + "px";
		floor.style.top = top;
		floor.style.visibility = "visible";
		
	})

	//用户操作下拉框鼠标移入事件
	EventUntil.addHandler(s("#user-operate"),"mouseover",function(){
		this.style.visibility = "visible";
	})

	//用户名栏鼠标移出事件
	EventUntil.addHandler(s("#user-name"),"mouseout",function(){
		s("#user-operate").style.visibility = "hidden";
	})

	//用户操作下拉框栏鼠标移出事件
	EventUntil.addHandler(s("#user-operate"),"mouseout",function(){
		event = EventUntil.getEvent(event);
		var relatedTarget = EventUntil.getRelatedTarget(event);
		var tagName = relatedTarget.tagName.toLowerCase();
		this.style.visibility = "hidden";
	})

	//发布信息按钮点击事件
	EventUntil.addHandler(s("#release-msg"),"click",function(){
		s("#release-msg-content").style.visibility = "visible";
	})

	//发布信息弹窗关闭按钮点击事件
	EventUntil.addHandler(s("#close-btn"),"click",function(){
		s("#release-msg-content").style.visibility = "hidden";
	
	})

	


	

	
})