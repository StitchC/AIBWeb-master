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
	var inputs = allinputs;
	var completeBtn = Btn;
	
	


	//为input元素添加事件
	for (var i = 0; i < inputs.length; i++) {
		//为所有input 标签添加是否正确属性
		inputs[i].isCorrect = false;
		inputs[i].onfocus = function(){
			//获取父元素以及提示框
			var father = this.parentNode;
			var hintContent = father.getElementsByTagName('span')[0];
			
			hintContent.innerHTML = hints[this.id]["hint"];
			hintContent.style.color = "blue";
			hintContent.style.visibility = "visible";
		};

		inputs[i].onblur = function(){
			//获取父元素及提示框
			var father = this.parentNode;
			var hintContent = father.getElementsByTagName('span')[0];
			//获取失焦时输入框的内容
			var curVal = this.value;

			if (this.id == "confirmpwd") {
				if (curVal != (document.getElementById('password')).value || curVal == "") {
					hintContent.innerHTML = hints[this.id]["error"];
					hintContent.style.color = "red";
					hintContent.style.visibility = "visible";
					this.isCorrect = false;
				}else{
					hintContent.innerHTML = hints[this.id]["correct"];
					hintContent.style.color = "green";
					hintContent.style.visibility = "visible";
					this.isCorrect = true;
				}
			}else{
				if (!hints[this.id]["reg"].test(curVal)) {
					hintContent.innerHTML = hints[this.id]["error"];
					hintContent.style.color = "red";
					hintContent.style.visibility = "visible";
					this.isCorrect = false;
				}else{
					hintContent.innerHTML = hints[this.id]["correct"];
					hintContent.style.color = "green";
					hintContent.style.visibility = "visible";
					this.isCorrect = true;
				}
			}
			
			

		};

	}

	//提交按钮点击事件
	completeBtn.onclick = function(){
		var count = 0;
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].isCorrect == true) {
				count++;
			}
		}

		if (count == inputs.length) {
			//之后由ajax传递给后台信息
			alert("提交成功");
		}else{
			alert("提交失败");
		}
	}
}($("#all-input input"),document.getElementById('complete-reg')));