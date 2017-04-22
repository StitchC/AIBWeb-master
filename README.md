# AIBWeb
学校网站

login.html -------- 登陆页面

findpassword.html -------- 找回密码页

modifypwd.html -------- 修改密码页

register.html ------- 注册页

rootPage.html ------ 管理员页

departmentpage.html ----- 系别主页

personalpage.html ----- 个人信息主页


-----------  css 文件 -------------


css/normal.css ------- 统配样式

css/login.css -----登陆页样式

css/findpassword.css ----- 找回密码页样式

css/modifypwd.css ------- 修改密码页样式

css/register.css ------- 注册页样式

css/rootPage.css ------- 管理员页样式

css/selectdepartment.css ------ 系别选择页样式

css/personalpage.css ------- 个人信息页样式



---------  js 文件 ---------

js/require.min.js ------ require.js 模块化管理工具

js/jquery.min.js ------ jq库

js/cookies.js ---- 自定义cookie模块

js/overborwserEvent.js ----- 自定义跨浏览器事件绑定模块

js/checkInput.js -------- 自定义表单验证模块

js/registerMain.js ------ 注册页js 脚本

js/loginMain.js -------  登陆页js 脚本

js/rootpageMain.js  ------ 管理员页js 脚本

js/departmentMain.js ------ 系主页js 脚本


2017-04-10：

新增：管理员页 rootPage.html 但未设置任何样式及内容

修改：js/register.js   checkInput 函数和 itemChange 函数 将此两个函数的内部实现方法用jq 来做



2017-04-11：

新增：选择系别页面以及对应的css 样式表，用来为领导用户登录时选择查看哪个系主页用
      登陆页面的js 脚本,增加了判断浏览器函数 checkBrownser


2017-04-12：

修改：	修改后台管理页面，增加类：content-wrap（用作点击侧边栏跟据对应的index隐藏或出现），add-tag-wrap（增加标签模块包裹层），modify-tag-wrap（修改标签模块包裹曾）
	合并了侧边栏增加 和 删除标签，增加和删除导航的内容合并到一个表格
	修改后台管理页面样式

2017-04-13：

增加：departmentpage（系主页）以及样式 departmentpage.css

修改：rootpage（管理员页）样式以及部分结构

2017-4-15：

增加：个人信息主页(personalpage.html)用来显示用户的基本信息，以及个人信息主页的样式(personalpage.css)

修改：修改了系主页(departmentpage.html)的表格按钮样式以及表格的筛选选项，同时增加了发布信息的弹出层元素
	
      修改了管理员页(rootpage.html)的侧边栏样式


2017-4-22（重大变更）：

增加：require.js 模块管理插件，cookies.js 自定义cookies模块，checkInput.js 自定义表单验证模块，overborwserEvent.js 自定义跨浏览器模块；departmentpageMain.js 系主页脚本，rootpageMain.js 管理员页面脚本。

修改：login.js 变成 loginMain.js，register.js 变成 registerMain.js,加入模块管理元素

