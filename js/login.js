(function checkBrownser(){
	var agent=navigator.appName //获取浏览器名字
	var version=navigator.appVersion.split(";"); //获取浏览器详细信息
	var trim_Version=version[1].replace(/[ ]/g,"");//获取浏览器版本号

	if(agent=="Microsoft Internet Explorer" && (trim_Version=="MSIE7.0" || trim_Version=="MSIE8.0")) { 
		$("#warning").css("display","block");
	}else{
		$("#warning").css("display","none");
	}
}());
