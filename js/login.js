(function checkBrownser(){
	var agent=navigator.appName 
	var version=navigator.appVersion.split(";");
	var trim_Version=version[1].replace(/[ ]/g,"");

	if(agent=="Microsoft Internet Explorer" && (trim_Version=="MSIE7.0" || trim_Version=="MSIE8.0")) { 
		$("#warning").css("display","block");
	}else{
		$("#warning").css("display","none");
	}
}());
