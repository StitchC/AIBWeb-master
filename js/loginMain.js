//jquery 1.9.1模块不符合 AMD 格式所以需要自定义
require.config({
	shim:{
		'jquery.min':{
			exports: '$'
		}

	}

})

//login页 Main函数
require(["jquery.min","cookies","overborwserEvent"],function main($,cookies,EventUntil){
	var loginBtn = document.querySelector("#hand-in");
	var account = document.querySelector("#account");

	

	//登陆按钮点击事件
	EventUntil.addHandler(loginBtn,"click",loginClick);

	//cookie自动输入方法
	EventUntil.addHandler(account,"focus",function(){
		var account = document.querySelector("#account");
		var pwd = document.querySelector("#pwd");
		account.value = cookies.getCookie("account");
		pwd.value = cookies.getCookie("pwd");
	});
	account.focus();




	//点击事件执行事件回调函数
	function loginClick(){
		saveCookie();
	}

	function saveCookie(){
		var account = document.querySelector("#account");
		var pwd = document.querySelector("#pwd");
		var rm = document.querySelector("#remember-me");

		if (rm.checked == true) {
			cookies.setCookie("account",account.value,3);
			cookies.setCookie("pwd",pwd.value,3);
		}
	}
	
	
	
})