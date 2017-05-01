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

	//封装选择多个dom元素 选择器
	function ss(name){
		return document.querySelectorAll(name);
	}

	//获取浏览器最终样式的函数
	function getCurStyle(elem,pusedo,targetProperty){
		if (elem.currentStyle != undefined) {
			return elem.currentStyle[targetProperty];
			
		}else{
			return window.getComputedStyle(elem,pusedo)[targetProperty];
			
		}
	}

	//一级导航点击事件执行函数
	function firstNavClick(){
		var text = this.innerText;
		var elem = document.createElement("span");
		var container = s("#bread-crumb-nav");
		elem.innerText = text + " >";
		//点击完一级导航栏之后先清空面包屑里面的内容
		container.innerHTML = "";
		container.appendChild(elem);
	}

	//二级导航点击事件执行函数
	function secondNavClick(){
		var text = this.innerText;
		var elem = document.createElement("span");
		var container = s("#bread-crumb-nav");
	
		elem.innerText = text;
		//点击完二级导航栏之后先判断包裹层的第二个a 元素存不存在
		//如果不存在就直接添加 存在就直接更改里面的文字

		//不存在第二个a 标签
		if (container.querySelectorAll("span")[1] == undefined) {
			container.appendChild(elem);
		}else{
			//存在第二个a 标签
			container.querySelectorAll("span")[1].innerText = text;
		}
	}

	//定义导航标签点击事件 添加面包屑路径
	function navTagClick(navlist){
		//遍历所有导航集 添加点击事件
		for (var i = 0; i < navlist.length; i++) {
			if (navlist[i].className.indexOf("first-nav") != -1) {
				EventUntil.addHandler(navlist[i],"click",firstNavClick);
			}else if (navlist[i].className.indexOf("second-nav") != -1) {
				EventUntil.addHandler(navlist[i],"click",secondNavClick);
			}
		}
	}

	//控制导航显示方法
	function controlNavNums(navWrap,childnode,moreNavContain,icon){
		//获取父元素的宽度
		var parentWidth = parseInt(getCurStyle(navWrap,null,"width"));
		var parentHeight = getCurStyle(navWrap,null,"height");

		//获取全部子元素的宽度
		var childWidthTotal = 0;
		for (var i = 0; i < childnode.length; i++) {

			childWidthTotal += parseInt(getCurStyle(childnode[i],null,"width"));
			if (childWidthTotal >= parentWidth) {
				
				moreNavContain.appendChild(childnode[i]);
			};

			if (moreNavContain.childNodes.length != 0) {
				icon.style.visibility = "visible";
			}
		
		};


		EventUntil.addHandler(document,"click",function(event){
			event = EventUntil.getEvent(event);
			var target = EventUntil.getTarget(event);

			if (target.id == "show-more-btn") {
				if (moreNavContain.style.visibility == "visible") {

					moreNavContain.style.visibility = "hidden";

				}else{
					moreNavContain.style.top = parentHeight;
					moreNavContain.style.left = (target.offsetLeft - 215) + "px";
					moreNavContain.style.visibility = "visible";
				}
			}else{
				moreNavContain.style.visibility = "hidden";

			}
			
		})
		

	}

	//面包屑导航点击事件调用函数
	//...code
	


	



	//------------- 调用层 ----------------

	//用户名栏鼠标移入事件
	EventUntil.addHandler(s("#user-name"),"mouseover",function(event){
		event = EventUntil.getEvent(event);
		var target = EventUntil.getTarget(event);
		var floor = document.querySelector("#user-operate");
		var top = getComputedStyle(s(".header")[0], null)["height"];
		floor.style.left = (target.offsetLeft - 50) + "px";
		floor.style.top = top;
		floor.style.visibility = "visible";
		
	});

	//用户操作下拉框鼠标移入事件
	EventUntil.addHandler(s("#user-operate"),"mouseover",function(){
		this.style.visibility = "visible";
	});

	//用户名栏鼠标移出事件
	EventUntil.addHandler(s("#user-name"),"mouseout",function(){
		s("#user-operate").style.visibility = "hidden";
	});

	//用户操作下拉框栏鼠标移出事件
	EventUntil.addHandler(s("#user-operate"),"mouseout",function(){
		event = EventUntil.getEvent(event);
		var relatedTarget = EventUntil.getRelatedTarget(event);
		var tagName = relatedTarget.tagName.toLowerCase();
		this.style.visibility = "hidden";
	});

	//发布信息按钮点击事件
	EventUntil.addHandler(s("#release-msg"),"click",function(){
		s("#release-msg-content").style.visibility = "visible";
	});

	//发布信息弹窗关闭按钮点击事件
	EventUntil.addHandler(s("#close-btn"),"click",function(){
		s("#release-msg-content").style.visibility = "hidden";
	
	});

	//一二级导航栏点击事件添加面包屑导航调用方法
	navTagClick(ss(".first-nav"));
	navTagClick(ss(".second-nav"));

	//导航栏数量限制输出以及查看隐藏导航栏按钮点击事件方法
	controlNavNums(s("#head-nav-content"),ss(".first-nav"),
		s("#nav-overflow-contain"),s("#show-more-btn"));


	

	
})