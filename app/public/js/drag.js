//该插件有一个附加的方法，就是双击全屏和退出全屏
var mouse_pos_x=0,//任意时刻鼠标的横坐标
mouse_pos_y=0,//任意时刻鼠标的纵坐标
drag_start_mouse_pos_x,//开始拖放瞬间鼠标横坐标
drag_start_mouse_pos_y,//开始拖放瞬间鼠标纵坐标
tuo_fang_if_dragging=0,//表示拖放是否正在进行
obj_drag_start_offsetLeft,//拖放瞬间被拖放元素的绝对横坐标
obj_drag_start_offsetTop,//拖放瞬间被拖放元素的绝对纵坐标
cur_tuo_fang_obj_id;//当前拖放对象的id
//allow_bubble_num:允许冒泡的层数（2代表父亲元素及其直接子元素可响应双击事件，3多包含了一个孙子元素）
var make_it_dcfs=function($obj,border_radius,allow_bubble_num,fun1,fun2)
{
	var thi=$(this).get(0);
	$obj.one("dblclick",function()
		{
			if($obj.css("display")=="block")
			{
				use_msg_re_canvas("已进入全屏模式，按Esc或者双击退出全屏");
			}
			
		})
	var default_zIndex=$obj.css("z-index");
	var border_width=($obj.outerWidth()-$obj.innerWidth())/2;
	thi.is_full_screen=0;
	$obj.reset_config=function()
	{
		$obj.config={
			dbx_width:$obj.css("width"),
			dbx_height:$obj.css("height"),
			dbx_left:$obj.css("left"),
			dbx_top:$obj.css("top")
		}
		return $obj;
	}
	$obj.reset_config();
	$obj.dblclick(function(e)
	{
		var e=e?e:window.event;
		var tar=e.srcElement||e.target;
		if(($(tar).attr("id")==$obj.attr("id"))
			||($(tar).parent().attr("id")==$obj.attr("id")&&allow_bubble_num>=2)
			||($(tar).parent().parent().attr("id")==$obj.attr("id")&&allow_bubble_num>=3)
			)
		{
			thi.is_full_screen?$obj.quit_full_screen():$obj.enter_full_screen();
		}
	})
	$obj.keep_full_screen=function()
	{
		$obj.css({
				width:screen.width+"px",
				height:screen.height+"px",
				left:-border_width+"px",
				top:-border_width+"px",
				borderRadius:0
			});
			return $obj;
	}
	$obj.enter_full_screen=function()
	{
		
		$obj.reset_config().css("z-index","20000").keep_full_screen();
		thi.is_full_screen=1;	
			$('body').keydown(function(e)
			{
				var e=e?e:window.event;
				if(e.keyCode==27&&thi.is_full_screen==1&&!e.shiftKey)
				{
					$obj.dblclick();
				}
			})
			fun1();
	}
	$obj.quit_full_screen=function()
	{
		
		$obj.css({
			width:$obj.config.dbx_width,
			height:$obj.config.dbx_height,
			left:$obj.config.dbx_left,
			top:$obj.config.dbx_top,
			zIndex:default_zIndex,
			borderRadius:border_radius
		});
		thi.is_full_screen=0;
		fun2();
	}
}
function make_it_draggable(obj_id)
{
	var parent=document.getElementById(obj_id);
	document.body.onmousemove=function(e)
	{
		
		var ee=window.event||e;
		mouse_pos_x=ee.clientX;
		mouse_pos_y=ee.clientY;
		if(tuo_fang_if_dragging==1)
		{
			
			var obj=document.getElementById(cur_tuo_fang_obj_id);
			obj.style.cursor="move";
			obj.style.left=mouse_pos_x-(drag_start_mouse_pos_x-obj_drag_start_offsetLeft)+"px";
			obj.style.top=mouse_pos_y-(drag_start_mouse_pos_y-obj_drag_start_offsetTop)+"px";
		}
	}
	$(parent).mousedown(function(e)
	{
		var e=e?e:window.event;
        if(e.button!=0){
			return false;
		}
		var tar=e.srcElement||e.target;
		var tar_class=$(tar).attr("class")
		var tar_id=$(tar).attr("id");
		if(
			(tar_class==undefined&&tar_id.indexOf("range")==-1)
			||(tar_class!=undefined&&tar_class.indexOf("resizeable_control_hidden")==-1&&tar_id.indexOf("range")==-1)
		)
		{
			drag_start_mouse_pos_x=e.clientX+document.body.scrollLeft;
			drag_start_mouse_pos_y=e.clientY+document.body.scrollTop;
			tuo_fang_if_dragging=1;
			cur_tuo_fang_obj_id=parent.id;
			obj_drag_start_offsetLeft=parent.offsetLeft;
			obj_drag_start_offsetTop=parent.offsetTop;
		}
			
		
	}).mouseup(function(e)
	{
		
		tuo_fang_if_dragging=0;
		this.style.cursor="default";
	})
	
}
