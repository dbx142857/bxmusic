//插件里的min_windth和min_height规定可以北拖拽的对象的最小宽度和最小高度
var resizeable_mouse_pos_x=0,//任意时刻鼠标的横坐标
resizeable_mouse_pos_y=0,//任意时刻鼠标的纵坐标
which_tuo_zhuai_direction=0,//生命当前哪一个拖拽方向,0代表没有拖动，1-8代表西北，东北，西南，东南，北，西，东，南
obj_drag_start_left_distance,//拖拽瞬间被拖拽元素的绝对横坐标
obj_drag_start_top_distance,//拖拽瞬间被拖拽元素的绝对纵坐标
obj_drag_start_offsetWidth,//拖拽瞬间目标宽度
obj_drag_start_offsetHeight,//拖拽瞬间目标高度
cur_tuo_zhuai_obj_id;//当前被拖拽对象的id
function make_it_resizeable(obj_id,obj_border_width)
{
	var min_width=100;
	var min_height=50;
	var obj=document.getElementById(obj_id);
	var north_west=document.createElement("div");
	north_west.className="resizeable_control_hidden use_for_resize_corner_div";
	north_west.id=obj_id+"_north_west";
	var north_east=document.createElement("div");
	north_east.id=obj_id+"_north_east";
	north_east.className="resizeable_control_hidden use_for_resize_corner_div";
	var south_west=document.createElement("div");
	south_west.id=obj_id+"_south_west";
	south_west.className="resizeable_control_hidden use_for_resize_corner_div";
	var south_east=document.createElement("div");
	south_east.id=obj_id+"_south_eath";
	south_east.className="resizeable_control_hidden use_for_resize_corner_div";
	obj.appendChild(north_west);
	obj.appendChild(north_east);
	obj.appendChild(south_west);
	obj.appendChild(south_east);
	
	var north=document.createElement("div");
	north.id=obj_id+"_north";
	north.className="resizeable_control_hidden";
	obj.appendChild(north);
	$(north)
		.css({
			width:"100%",
			height:"10px",
			position:"absolute",
			top:-obj_border_width-5+"px",
			cursor:"n-resize"
		})
	var west=document.createElement("div");
	west.id=obj_id+"_west";
	west.className="resizeable_control_hidden";
	obj.appendChild(west);
	$(west)
		.css({
			width:"10px",
			height:"100%",
			position:"absolute",
			left:-obj_border_width-5+"px",
			cursor:"e-resize"
		})
	var east=document.createElement("div");
	east.className="resizeable_control_hidden";
	west.id=obj_id+"_east";
	obj.appendChild(east);
	$(east)
		.css({
			width:"10px",
			height:"100%",
			position:"absolute",
			right:-obj_border_width-5+"px",
			cursor:"e-resize"
		})
	var south=document.createElement("div");
	south.id=obj_id+"_south";
	south.className="resizeable_control_hidden";
	obj.appendChild(south);
	$(south)
		.css({
			width:"100%",
			height:"10px",
			position:"absolute",
			bottom:-obj_border_width-5+"px",
			cursor:"n-resize"
		})
	$('.use_for_resize_corner_div')
		.css({
			width:"10px",
			height:"10px",
			position:"absolute",
			zIndex:"10"
		})
	$(north_west)
		.css({
			cursor:"nw-resize",
			left:-obj_border_width-5+"px",
			top:-obj_border_width-5+"px"
		});
	$(north_east)
		.css({
			right:-obj_border_width-5+"px",
			top:-obj_border_width-5+"px",
			cursor:"ne-resize"
		});
	$(south_west)
		.css({
			left:-obj_border_width-5+"px",
			bottom:-obj_border_width-5+"px",
			cursor:"ne-resize"
		});
	$(south_east)
		.css({
			cursor:"nw-resize",
			right:-obj_border_width-5+"px",
			bottom:-obj_border_width-5+"px"
		});
	$('.resizeable_control_hidden').css("background","rgba(111,111,111,0)");
	$('.use_for_resize_corner_div').mousedown(function()
	{
		ready_to_drag(this);
	})
	$(north_west).mousedown(function()
	{
		which_tuo_zhuai_direction=1;
	})
	$(north_east).mousedown(function()
	{
		which_tuo_zhuai_direction=2;
	})
	$(south_west).mousedown(function()
	{
		which_tuo_zhuai_direction=3;
	})
	$(south_east).mousedown(function()
	{
		which_tuo_zhuai_direction=4;
	})
	$(north).mousedown(function()
	{
		which_tuo_zhuai_direction=5;
		ready_to_drag(this);
	})
	$(west).mousedown(function()
	{
		which_tuo_zhuai_direction=6;
		ready_to_drag(this);
	})
	$(east).mousedown(function()
	{
		which_tuo_zhuai_direction=7;
		ready_to_drag(this);
	})
	$(south).mousedown(function()
	{
		which_tuo_zhuai_direction=8;
		ready_to_drag(this);
	})
	document.onmousemove=function(e)
	{
		
		var ee=window.event||e;
		resizeable_mouse_pos_x=ee.clientX;
		resizeable_mouse_pos_y=ee.clientY;
		var obj=document.getElementById(cur_tuo_zhuai_obj_id);
		if(which_tuo_zhuai_direction==1)
		{
			if(resizeable_mouse_pos_x<obj_drag_start_offsetWidth+obj_drag_start_left_distance-min_width)
			{
				obj.style.left=resizeable_mouse_pos_x+document.body.scrollLeft+"px";
				obj.style.width=obj_drag_start_left_distance-resizeable_mouse_pos_x+obj_drag_start_offsetWidth-obj_border_width*2+"px";
			}
			if(resizeable_mouse_pos_y<obj_drag_start_offsetHeight+obj_drag_start_top_distance-min_height)
			{
				obj.style.top=resizeable_mouse_pos_y+document.body.scrollTop+"px";
				obj.style.height=obj_drag_start_top_distance-resizeable_mouse_pos_y+obj_drag_start_offsetHeight-obj_border_width*2+"px";
			}
			
		}
		if(which_tuo_zhuai_direction==2)
		{
			if(resizeable_mouse_pos_x>obj_drag_start_left_distance+min_width)
			{
				obj.style.width=resizeable_mouse_pos_x-obj_drag_start_left_distance-obj_border_width*2+"px";
			}
			if(resizeable_mouse_pos_y<obj_drag_start_offsetHeight+obj_drag_start_top_distance-min_height)
			{
				obj.style.height=obj_drag_start_offsetHeight+obj_drag_start_top_distance-resizeable_mouse_pos_y-obj_border_width*2+"px";
				obj.style.top=resizeable_mouse_pos_y+document.body.scrollLeft+"px";
			}
			
		}
		if(which_tuo_zhuai_direction==3)
		{
			if(resizeable_mouse_pos_x<obj_drag_start_offsetWidth+obj_drag_start_left_distance-min_width)
			{
				obj.style.left=resizeable_mouse_pos_x+document.body.scrollLeft+"px";
				obj.style.width=obj_drag_start_left_distance-resizeable_mouse_pos_x+obj_drag_start_offsetWidth-obj_border_width*2+"px";
			}
			if(resizeable_mouse_pos_y>obj_drag_start_top_distance+min_height)
			{
				obj.style.height=resizeable_mouse_pos_y-obj_drag_start_top_distance-obj_border_width*2+"px";
			}
			
		}
		if(which_tuo_zhuai_direction==4)
		{
			if(resizeable_mouse_pos_x>obj_drag_start_left_distance+min_width)
			{
				obj.style.width=resizeable_mouse_pos_x-obj_drag_start_left_distance-obj_border_width*2+"px";
			}
			if(resizeable_mouse_pos_y>obj_drag_start_top_distance+min_height)
			{
				obj.style.height=resizeable_mouse_pos_y-obj_drag_start_top_distance-obj_border_width*2+"px";
			}
			
		}
		if(which_tuo_zhuai_direction==5)
		{
			if(resizeable_mouse_pos_y<obj_drag_start_offsetHeight+obj_drag_start_top_distance-min_height)
			{
				obj.style.top=resizeable_mouse_pos_y+document.body.scrollTop+"px";
				obj.style.height=obj_drag_start_top_distance-resizeable_mouse_pos_y+obj_drag_start_offsetHeight-obj_border_width*2+"px";
			}
		}
		if(which_tuo_zhuai_direction==6)
		{
			if(resizeable_mouse_pos_x<obj_drag_start_offsetWidth+obj_drag_start_left_distance-min_width)
			{
				obj.style.left=resizeable_mouse_pos_x+document.body.scrollLeft+"px";
				obj.style.width=obj_drag_start_left_distance-resizeable_mouse_pos_x+obj_drag_start_offsetWidth-obj_border_width*2+"px";
			}
		}
		if(which_tuo_zhuai_direction==7)
		{
			if(resizeable_mouse_pos_x>obj_drag_start_left_distance+min_width)
			{
				obj.style.width=resizeable_mouse_pos_x-obj_drag_start_left_distance-obj_border_width*2+"px";
			}
		}
		if(which_tuo_zhuai_direction==8)
		{
			if(resizeable_mouse_pos_y>obj_drag_start_top_distance+min_height)
			{
				obj.style.height=resizeable_mouse_pos_y-obj_drag_start_top_distance-obj_border_width*2+"px";
			}
		}
	}
	$('body').mouseup(function()
	{
		which_tuo_zhuai_direction=0;
	})
	
	$(north_west).mousedown();
	$(north_west).mouseup();
}
function ready_to_drag(o)
{
	var obj=o.parentNode;
		cur_tuo_zhuai_obj_id=obj.id;
		obj_drag_start_offsetWidth=obj.offsetWidth;
		obj_drag_start_offsetHeight=obj.offsetHeight;
		obj_drag_start_left_distance=obj.offsetLeft-document.body.scrollLeft;
		obj_drag_start_top_distance=obj.offsetTop-document.body.scrollTop;
}
