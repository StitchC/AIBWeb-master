define(["jquery.min"],function($){
	//封装表单验证类
	var checkBy = {
		//提示信息数据,包含正则表达式及各种情况下的提示信息
		hintsData: null,

		//初始化提示对象内信息对象
		init: function(obj){
			this.hintsData = obj;
		},

		//找出提示信息元素方法
		findHintsContain: function(elem,hintsContent){
			//获取当前元素的父元素
			var father = elem.parentNode;
			//获取当前的提示框元素
			var hintsContain;
			if (hintsContent.indexOf(".") == 0) {
				return hintsContain = father.querySelectorAll(hintsContent)[0];

			}else if (hintsContent.indexOf("#") == 0) {
				return hintsContain = father.querySelector(hintsContent);

			}else{
				return hintsContain = father.querySelectorAll(hintsContent)[0];
			}
		},

		//input聚焦时执行验证
		onFocus: function(elem,hintsContent,hintcolor){
			//获取当前元素的id 匹配提示内容的键
			var id = elem.id;
			//获取提示信息元素
			var hintsContain = this.findHintsContain(elem,hintsContent);

			//提示框元素载入对应元素id 键的提示信息
			hintsContain.innerText = this.hintsData[id]["hint"];
			hintsContain.style.color = hintcolor;
			hintsContain.style.visibility = 'visible';
		},

		reg: function(elem,hintsContent,correctColor,errorColor){
			//获取当前元素的id 匹配提示内容的键
			var id = elem.id;
			elem.isCorrect = false;
			var hintsContain = this.findHintsContain(elem,hintsContent);

			if (this.hintsData[id]["reg"].test(elem.value)) {
				hintsContain.innerText = this.hintsData[id]["correct"];
				hintsContain.style.color = correctColor;
				hintsContain.style.visibility = 'visible';
				elem.isCorrect = true;
			}else{
				hintsContain.innerText = this.hintsData[id]["error"];
				hintsContain.style.color = errorColor;
				hintsContain.style.visibility = 'visible';
				elem.isCorrect = false;
			}
		},

		ajax: function(){},

		sibling: function(elem,siblingId,hintsContent,correctColor,errorColor){
			//获取当前元素的id 匹配提示内容的键
			var id = elem.id;
			elem.isCorrect = false;
			var hintsContain = this.findHintsContain(elem,hintsContent);
			var sibling = document.querySelector("#" + siblingId);

			if (elem.value == sibling.value && elem.value != "") {
				hintsContain.innerText = this.hintsData[id]["correct"];
				hintsContain.style.color = correctColor;
				hintsContain.style.visibility = 'visible';
				elem.isCorrect = true;
			}else{
				hintsContain.innerText = this.hintsData[id]["error"];
				hintsContain.style.color = errorColor;
				hintsContain.style.visibility = 'visible';
				elem.isCorrect = false;
			}
		}
	};

	return checkBy;

})