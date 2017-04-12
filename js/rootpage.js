(function initPage(){
	$("#tag-manage").siblings('ul').css("display","block");
	$(".content-wrap").eq(0).css("display","block").siblings('.content-wrap').hide();
	$(".child-list-content").eq(0).addClass('item-onfocus');
}())
//设置导航栏管理标签点击事件
$("#tag-manage").click(function() {
	$(this).siblings('ul').toggle(200);
});

//设置用户管理标签点击事件
$("#user-manage").click(function() {
	$(this).siblings('ul').toggle(200);
});

//设置子栏目点击事件
$(".child-list-content").click(function() {
	var index = $(this).index('.child-list-content');
	$('.child-list-content').removeClass('item-onfocus');
	$(this).addClass('item-onfocus');
	$(".content-wrap").eq(index).show().siblings('.content-wrap').hide();
});