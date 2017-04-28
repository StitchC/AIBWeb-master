require.config({
	shim:{
		'jquery.min':{
			exports: '$'
		}

	}

})

//管理页主函数
require(["jquery.min","checkInput","overborwserEvent"],function main($,checkInput,EventUntil){
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

	//定义移除类名方法
	function removeClass(elem,classname){
		var allClass = elem.className.split(" ");
		var targetIndex = allClass.indexOf(classname);
		allClass.splice(targetIndex,1);
		elem.className = allClass.join(" ");
	}

	//定义获取行内信息方法
	function getDetailInfo(elem){
		//获取按钮所在行
		var infoArr = [];
		var tr = elem.parentNode.parentNode;
		var td = tr.querySelectorAll("td");

		for (var i = 0; i < td.length - 1; i++) {
			infoArr.push(td[i].innerText);
		}

		return infoArr;
		
	}

	//定义弹出层填写内容方法
	function setFloorInfo(elemList,infoList){
		for (var i = 0; i < elemList.length; i++) {
			elemList[i].value = infoList[i];
		}
	}


	//修改导航栏模块按钮点击事件
	//真正调用此函数是当数据完全获取完毕后调用
	function modifyModuleBtn(){
		var btns = ss("#all-tag-list tbody tr td button");
		for (var i = 0; i < btns.length; i++) {
			EventUntil.addHandler(btns[i],"click",function(){
				//如果点击的按钮类名为 modify-tag
				//执行自定义的 getDetailInfo 方法
				//获取到所有信息后再将所有信息填入弹出层对应的输入框中
				if (this.className.indexOf("modify-tag") != -1) {
					//获取点击按钮对应的信息
					var infoList = getDetailInfo(this);
					//获取弹出层
					var floor = s("#floor");
					//执行自定义信息输入函数
					setFloorInfo(ss("#floor input"),infoList);

					floor.style.visibility = "visible";

				}else if(this.className.indexOf("delete-tag") != -1){
					//如果按钮的类名为 delete-tag
					//....执行ajax操作
					//同时再重新获取数据库数据生成dom 元素
				}
			})
		}

	}



	//--------------定义层结束-------------





	//侧边栏多个tag 点击事件
	(function tagsClick(){
		var tags = ss(".child-tag");
		var contents = ss(".content-wrap");
		for (var i = 0; i < tags.length; i++) {
			tags[i].index = i;
			contents.index = i;

			EventUntil.addHandler(tags[i],"click",function(){
				var index = this.index;
				for (var i = 0; i < contents.length; i++) {
					if (tags[i].className.indexOf("sidebar-tag-active") != -1) {
						//调用自定义 removeClass 方法
						removeClass(tags[i],"sidebar-tag-active");
					}
					contents[i].style.display = "none";
				}
				this.className += " sidebar-tag-active";
				contents[index].style.display = "block";
			});
		}
	}());
	

	//初始化子导航栏提示信息
	checkInput.init({
		childTagContent: {hint:"多个子导航请用逗号分隔"}
	})

	//子导航选择框点击事件
	EventUntil.addHandler(s("#has-child-tag"),"click",function(){
		if (this.checked == true) {
			s("#child-tag-wrap").style.display = "block";
		}else{
			s("#child-tag-wrap").style.display = "none";
		}
	})

	//子导航输入框聚焦事件
	EventUntil.addHandler(s("#childTagContent"),"focus",function(){
		checkInput.onFocus(this,"span","#408DD2");
	})

	EventUntil.addHandler(s("#childTagContent"),"blur",function(){
		var parent = this.parentNode;
		var hintContent = parent.querySelectorAll("span")[0];
		hintContent.innerText = "";
	})

	//弹出层关闭按钮点击事件
	EventUntil.addHandler(s("#close-btn"),"click",function(){
		s("#floor").style.visibility = "hidden";
	})

	
	modifyModuleBtn();

})