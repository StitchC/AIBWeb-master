define(function(){
	var EventUntil = {
		//创建添加事件方法
		addHandler:function(elem,type,handler,bool){
			if (bool == undefined) {
				bool = true;
			};
			if (elem.addEventListener) {
				//如果可以用dom2 的方法
				elem.addEventListener(type,handler,bool);
			}else if(elem.attachEvent){
				//如果可以用ie 的方法
				elem.attachEvent("on" + type,handler);
			}else{
				elem["on" + type] = handler;
			}
		},

		//获取事件对象
		getEvent: function(type){
			return type? event:window.event;
		},
    	//获取事件的实际目标
		getTarget: function(event){
			return event.target || event.srcElement;
		},
		//阻止默认事件发生
		preventDefault: function(event){
			if (event.preventDefault) {
				event.preventDefault();
			}else{
				event.returnValue = false;
			}
		},

        //创建移出事件方法
		removeHandler:function(elem,type,handler){
			if (elem.removeEventListener) {
				elem.removeEventListener(type,handler,false);
			}else if(elem.detachEvent){
				elem.detachEvent("on" + type,handler);
			}else{
				elem["on" + type] = null;
			}
		},

		//阻止冒泡过程
		stopPropagation: function(event){
			if (event.stopPropagation) {
				event.stopPropagation();
			}else{
				event.cancelBubble = true;
			}
		},

		//跨平台获得mouseover 和 mouseout 事件触发时的相关元素
		getRelatedTarget: function(event){

			if (event.relatedTarget) {
				//如果浏览器能够运行DOM中的属性返回relatedTarget
				return event.relatedTarget;

			}else if(event.toElement){
				//如果浏览器是 ie8及一下版本的浏览器返回toElement
				return event.toElement;

			}else if(event.fromElement){
				//如果浏览器是 ie8及一下版本的浏览器返回fromElement
				return event.fromElement;

			}else{
				//全都没有返回null
				return null;
			}
		},

		getCharCode: function(event){
			if (typeof event.charCode == "number") {
				return event.charCode;
			}else{
				return event.keyCode;
			}
		},

		//跨浏览器获取鼠标按下的是哪个键
		getButton: function(event){
			//先判断浏览器是否支持DOM2.0
			if (document.implementation.hasFeature("MouseEvents","2.0")) {
				//如果支持直接返回button属性
				return event.button;
			}else{
				//若不支持，把ie event.button 返回的值以DOM 模型下的近似值返回
				switch(event.button){
					case 0:
					case 1:
					case 3:
					case 5:
					case 7:
						return 0;//ie中0 1 3 5 7 都表示按下鼠标左键及其他键
					case 2:
					case 6:
						return 2;//ie中2 6 都表示按下鼠标右键及其他键
					case 4:
						return 1;//ie中 4 表示按下了鼠标中键及其他键
				}
			}
		},

		//跨浏览器获取鼠标滚轮的度数
		getWheelDelta: function(event){
			if (event.wheelDelta) {
				//如果是除firefox之外的浏览器
				return (client.engine.opera && client.engine.opera < 9.5 ?
						-event.wheelDelta : event.wheelDelta);
				//如果是opera的旧版本 返回一个与它相反的值 如果不是就返回现代浏览器的正常值
				
			}else{
				//如果是firefox浏览器的话返回与正常浏览器倍数的值并取相反值
				return -event.detail * 40;
			}
		},

		//跨浏览器获取剪贴板内容
		getClipboardText: function(event){
			var clipboardData = (event.clipboardData || window.clipboardData);
			return clipboardData.getData("text");
		},


		//跨浏览器设置剪贴板内容
		setClipboardText: function(event,value){
			if (event.clipboardData) {
				return event.clipboardData.setData("text/plain",value);
			}else if (window.clipboardData) {
				return window.clipboardData.setData("text",value);
			}
		}

		
	}

	return EventUntil;
})