//jquery 1.9.1模块不符合 AMD 格式所以需要自定义
require.config({
	shim:{
		'jquery.min':{
			exports: '$'
		}
	}

})
//login页 Main函数
require(["jquery.min","checkInput","overborwserEvent"],function main($,checkBy,EventUntil){
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

	//输入框失焦时执行的函数
	//通过传进来的元素id 执行具体操作
	function inputOnblurFilter(args){
		if (args.id == "confirmpwd") {
			checkBy.sibling(args,"password","span","#00C12B","#FB000D");
		}else if(args.id == "account") {

			checkBy.reg(args,"span","#00C12B","#FB000D");

			checkBy.ajax({
				elem: args,
				hintsContent: "span",
				errorColor: "#FB000D",
				url: "test.php",
				reqData: {accountVal: args.value},
				correctBool: "notExist",
				errorBool: "exist",
				result: "accountIsExist"
			});

		}else if(args.id == "mail") {

			checkBy.reg(args,"span","#00C12B","#FB000D");

			checkBy.ajax({
				elem: args,
				hintsContent: "span",
				errorColor: "#FB000D",
				url: "test.php",
				reqData: {mailVal: args.value},
				correctBool: "notExixt",
				errorBool: "exist",
				result: "mailIsExist"
			});
			

		}else if(args.id == "vtCode") {

			checkBy.reg(args,"span","#00C12B","#FB000D");

		}else {
			checkBy.reg(args,"span","#00C12B","#FB000D");
		}
	}




	//---------调用层----------



	//定义表单认证的提示内容以及正则表达式
	checkBy.init({
		tname:{hint:"请填写教师本人的姓名",correct:"输入正确",error:"输入不正确"
		,reg: /[\S\u4E00-\u9FA5\uF900-\uFA2D]{2,11}/},
		account:{hint:"必填，长度为4~16位数字或英文字符",correct:"输入正确",error:"输入不正确"
		,reg:/[\S\w\d]{8,16}/,ajaxError:"账号已被注册"},
		password:{hint:"必填，长度为4~16位字符,包含字母和数字",correct:"输入正确",error:"输入不正确"
		,reg:/[\d\w]{6,16}/},
		confirmpwd:{hint:"必须和密码一致",correct:"输入正确",error:"输入不正确"},
		mail:{hint:"请填写正确的邮箱地址",correct:"输入正确",error:"输入不正确"
		,reg:/^([\d\w]+[_|\_|\.]?)*[\d\w]+@([\d\w]+[_|\_|\.]?)*[\d\w]+\.[\w]{2,3}/,ajaxError:"邮箱已被注册"},
		vtCode:{reg:/\S/,ajaxError:"验证码错误",correct:"",error:"验证码不能为空"}

	});

	

	//input元素验证提示函数
	(function inputsOnCheck(allinput){
		var inputs = allinput;

		for (var i = 0; i < inputs.length; i++) {
			
			if (inputs[i].id != "vtCode") {

				EventUntil.addHandler(inputs[i],"focus",function(){
					checkBy.onFocus(this,"span","#408DD2");
				});
			}

		
			EventUntil.addHandler(inputs[i],"blur",function(){
				//因为失焦验证的元素有不同种类的验证方法
				//所以进行函数封装
				//做到具体元素具体实现
				inputOnblurFilter(this);
			});
		}
	}(ss(".input-wrap input")));


	//下拉框联动
	(function unionChange(selector1,selector2){
		//测试时由ajax给出数据
		
		var data = {
			商务系:["电子商务","国际商务","市场营销","旅游管理","酒店管理","连锁经营管理",
			"会展策划与管理","工商企业管理"],
			管理系:["物业管理","文秘专业","法律文秘","物流管理","社会工作","房地产经营管理"],
			财经系:["会计电算化专业","会计与审计专业","财务管理专业",
			"会计(涉外方向，税务方向)专业","资产评估与管理专业","投资与理财专业","国际金融专业","证券与期货专业"],
			计算机系:["动漫设计与制作","计算机网络技术专业","软件技术","计算机信息管理专业","计算机应用技术专业",
			"数字媒体专业","移动互联应用技术专业"]
		};
		// var args = {"getData":"getDepartmentData"}

		// $.get("", args, function(result) {
			
		// 		{
		// 			返回信息格式：

		// 			商务系:["电子商务","国际商务","市场营销","旅游管理","酒店管理","连锁经营管理",
		// 			"会展策划与管理","工商企业管理"],
		// 			管理系:["物业管理","文秘专业","法律文秘","物流管理","社会工作","房地产经营管理"],
		// 			财经系:["会计电算化专业","会计与审计专业","财务管理专业",
		// 			"会计(涉外方向，税务方向)专业","资产评估与管理专业","投资与理财专业","国际金融专业","证券与期货专业"],
		// 			计算机系:["动漫设计与制作","计算机网络技术专业","软件技术","计算机信息管理专业","计算机应用技术专业",
		// 			"数字媒体专业","移动互联应用技术专业"]
		// 		};
			 
		// 	 //赋初始值给部门和专业数据
		// 	 var data = result;
		// });

		//初始化下拉选择框
		var frag = document.createDocumentFragment();

		for(key in data){
			var option = document.createElement("option");
			option.innerText = key;
			option.value = key;
			frag.appendChild(option);
		}
		selector1.appendChild(frag);

		//获取此时第一个选择框的value
		var departmentVal = selector1.value;
		for (var i = 0; i < data[departmentVal].length; i++) {
			var option = document.createElement("option");
			option.innerText = data[departmentVal][i];
			option.value = data[departmentVal][i];
			frag.appendChild(option);
		}
		selector2.appendChild(frag);


		//选择框1 改变事件
		EventUntil.addHandler(selector1,"change",function(){
			//清空选择框2
			selector2.innerHTML = "";
			var curVal = this.value;

			for (var i = 0; i < data[curVal].length; i++) {
				var option = document.createElement("option");
				option.innerText = data[curVal][i];
				option.value = data[curVal][i];
				frag.appendChild(option);
			}
			selector2.appendChild(frag);
		

		})
	}(s("#department"),s("#special")));


	//提交按钮点击事件函数
	(function clickSubmit(elem){
		var submit = elem;
		var inputs = ss(".input-wrap input");
		var selectVal = ss(".input-wrap select");
		
		EventUntil.addHandler(submit,"click",function(event){
			event = EventUntil.getEvent(event);
			var count = 0;
			for (var i = 0; i < inputs.length; i++) {
				if (inputs[i].isCorrect == true) {
					count++;
				}
			}

			if (count == inputs.length) {

				alert("提交成功");
			}else{
				EventUntil.preventDefault(event);
				alert("提交失败");
			}
		});
	}(s("#complete-reg")));



	//切换验证码按钮点击事件
	EventUntil.addHandler(s("#change-vt-code"),"click",function(event){
		event = EventUntil.getEvent(event);
		EventUntil.preventDefault(event);

		var vtImg = s("#vt-img");
		var args = {"change":"changeVt"};
		$.get("", args, function(data) {
			/*
				返回格式为：
				{"imgSrc":"图片路径"}
			 */
			 //vtImg.src = data.imgSrc;
		});
	})

});