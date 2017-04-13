# AIBWeb
学校网站

login.html -------- 登陆页面

findpassword.html -------- 找回密码页

modifypwd.html -------- 修改密码页

register.html ------- 注册页

rootPage.html ------ 管理员页

css/normal.css ------- 统配样式

css/login.css -----登陆页样式

css/findpassword.css ----- 找回密码页样式

css/modifypwd.css ------- 修改密码页样式

css/register.css ------- 注册页样式

css/rootPage.css ------- 管理员页样式

css/selectdepartment.css ------ 系别选择页样式

js/register.js ------ 注册页js 脚本

js/login.js -------登陆页js 脚本



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
