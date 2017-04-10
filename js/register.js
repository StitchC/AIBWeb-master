//定义输入框元素输入提示
(function checkInput(allinputs,Btn){
	//定义私有变量 储存验证提示信息
	//键名和元素id 关联
	var hints = {
		tname:{hint:"请填写教师本人的姓名",correct:"输入正确",error:"输入不正确",reg:/[\S\u4E00-\u9FA5\uF900-\uFA2D]{2,5}/},
		account:{hint:"必填，长度为4~16位字符",correct:"输入正确",error:"输入不正确",
		reg:/[\S\w\d]{4,16}/},
		password:{hint:"必填，长度为4~16位字符,包含字母和数字",correct:"输入正确",error:"输入不正确",
		reg:/[\d\w]{4,16}/},
		confirmpwd:{hint:"必须和密码一致",correct:"输入正确",error:"输入不正确"},
		mail:{hint:"请填写正确的邮箱地址",correct:"输入正确",error:"输入不正确",reg:/^([\d\w]+[_|\_|\.]?)*[\d\w]+@([\d\w]+[_|\_|\.]?)*[\d\w]+\.[\w]{2,3}/}

	};
	//获取全部输入框以及提交按钮
	var inputs = allinputs
	var completeBtn = Btn;
	
	//遍历每一个input元素 设置是否正确属性
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].isCorrect = false;
	}

	//输入框聚焦事件
	inputs.focus(function(){
		//获取父元素以及提示框
		var curId = $(this).attr('id');
		var father = $(this).parent();
		var hintContent = father.children('span');
		
		hintContent.text(hints[curId]["hint"]);
		hintContent.css({"color":"blue","visibility":"visible"});
	});

	//输入框失焦事件
	inputs.blur(function() {
		var curId = $(this).attr('id');
		var curVal = $(this).val();
		var father = $(this).parent();
		var hintContent = father.children('span');

		if (curId == "confirmpwd") {
			if (curVal != $("#password").val() || curVal == "") {
 				hintContent.text(hints[curId]["error"]);
				hintContent.css({"color":"red","visibility":"visible"});
				$(this).isCorrect = false;
			}else{
				hintContent.text(hints[curId]["error"]);
				hintContent.css({"color":"green","visibility":"visible"});
				$(this).isCorrect = true;
 			}
		}else{
			if (!hints[curId]["reg"].test(curVal)) {
				hintContent.text(hints[curId]["error"]);
				hintContent.css({"color":"red","visibility":"visible"});
				this.isCorrect = false;
			}else{
				hintContent.text(hints[curId]["error"]);
				hintContent.css({"color":"green","visibility":"visible"});
				this.isCorrect = true;
			}
		}
	});

	
	//提交按钮点击事件
	completeBtn.click(function(){
		var count = 0;
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].isCorrect == true) {
				count++;
			}
		}

		if (count == inputs.length) {
			alert("提交成功！");
		}else{
			alert("提交失败");
		}
	})
}($("#all-input input"),$('#complete-reg')));



//联动
(function itemChange(selector1,selector2){
	var data = {
		商务系:["电子商务","国际商务","市场营销","旅游管理","酒店管理","连锁经营管理",
		"会展策划与管理","工商企业管理"],
		管理系:["物业管理","文秘专业","法律文秘","物流管理","社会工作","房地产经营管理"],
		财经系:["会计电算化专业","会计与审计专业","财务管理专业",
		"会计(涉外方向，税务方向)专业","资产评估与管理专业","投资与理财专业","国际金融专业","证券与期货专业"],
		计算机系:["动漫设计与制作","计算机网络技术专业","软件技术","计算机信息管理专业","计算机应用技术专业",
		"数字媒体专业","移动互联应用技术专业"]
	};


	//初始化下拉选择框
	var frag = document.createDocumentFragment();

	for(key in data){
		var option = document.createElement("option");
		option.innerText = key;
		option.value = key;
		frag.appendChild(option);
	}
	selector1.append(frag);

	//获取此时第一个选择框的value
	var departmentVal = selector1.val();
	for (var i = 0; i < data[departmentVal].length; i++) {
		var option = document.createElement("option");
		option.innerText = data[departmentVal][i];
		option.value = data[departmentVal][i];
		frag.appendChild(option);
	}
	selector2.append(frag);


	//选择框1 改变事件
	selector1.change(function(){
		selector2.children('option').remove();
		var curVal = $(this).val();

		for (var i = 0; i < data[curVal].length; i++) {
			var option = document.createElement("option");
			option.innerText = data[curVal][i];
			option.value = data[curVal][i];
			frag.appendChild(option);
		}
		selector2.append(frag);
	})

}($("#department"),$("#special")))