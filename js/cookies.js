define(function(){
	var cookies = {
		setCookie: function (name,value,days) {//keys名，kesy值，存储天数，路径(可以用斜杠)
		    var timestr;
		    var contentStr;
		    var curtime = new Date();
		    contentStr = name + "=" + value + ";";
		    curtime.setTime(curtime.getTime() + parseInt(days)*1000*60*60*24);
		    timestr = curtime.toUTCString();

		    document.cookie = contentStr + "expires=" + timestr;
		},

		getCookie: function (name){
			var list = document.cookie;
			console.log('cookie 字符串：' + list);
			var target = name + "=";
			var pos = list.indexOf(target);//获取字符的起始位置
			console.log("当前字符的索引：" + pos);
			if (list.indexOf(target) != -1) {
				//如果存入值存在
				var startPos = pos + target.length - 1;
				var endPos = list.indexOf(";", startPos);
				//如果获取不了 ; 则表示已经取到cookie字符串的尽头了
				//所以将终点位置取cookie 字符串的末尾
				if (endPos == -1) {
					endPos = list.length;
				}
				var val = list.substring(startPos + 1, endPos);
				return val;
			}else{
				return "";
			}
			
			
		} 
	};

	return cookies;
})