//使用get_range_value_percent(obj_id)方法获取range的value,该obj_Id为父亲的id;
//如果需要让某个元素的属性值等于range的value，可以在一个定时被调用的方法中将get_range_value_percent(obj_id)的返回值赋给给属性
//parent默认position属性已经为absolute了
//如果rage的宽>高，则为水平方向的
//如果range的高>宽，则为竖直方向的
/*example
 * make_range("the_range",
				"body",
				1.0,
				10,
				400,
				30);
 */
function make_range(range_id,//滑块整个id
					parent_id,//整个滑块父亲的id
					default_value_percent,//默认value的百分比值
					range_outer_width,//滑块长条的宽度
					range_outer_height,//滑块长条的高度
					range_inner_zhi_jing)//圆形滑块的直径
{
	var parent;
	
	var range=document.createElement("div");
	range.id=range_id;
	if(parent_id=="body")
	{
		parent=document.body;
	}
	else
	{
		parent=document.getElementById(parent_id);
	}
	parent.appendChild(range);
	var range_inner=document.createElement("div");
	range_inner.if_draging=0;
	range_inner.id=range_id+"_inner_div";
	range_inner.className="dbx_range_inner_div";
	range.className="dbx_range";
	range.appendChild(range_inner);
	
	var range_hidden=document.createElement("div");
	range_hidden.id=range_id+"_hidden_div";
	range.appendChild(range_hidden);
	if(range_outer_width>range_outer_height)
	{
		var min_left=-range_inner_zhi_jing/2;
		var max_left=range_outer_width+min_left;
		
		
		var default_left=range_outer_width*default_value_percent+min_left;
		
		$('#'+range_id)	
			.css("width",range_outer_width+"px")
			.css("height",range_outer_height+"px")
			.css("padding","0")
			.css("cursor","pointer")
			.css("margin","0")
			.css("position","absolute")
			.css("border-radius",range_outer_height/2+"px");
		
		var inner_div_top=-(range_inner_zhi_jing-range_outer_height)/2;
		var inner_div_border_radius=range_inner_zhi_jing/2;
		$('#'+range_id+'_inner_div')
			.css({
				position:"absolute",
				width:range_inner_zhi_jing+"px",
				height:range_inner_zhi_jing+"px",
				left:default_left+"px",
				zIndex:"100",
				top:inner_div_top+"px",
				borderRadius:inner_div_border_radius+"px"
			})
		$('#'+range_id+'_hidden_div')
			.css({
				position:"absolute",
				width:range_outer_width+"px",
				height:range_inner_zhi_jing+"px",
				zIndex:"100",
				top:inner_div_top+"px"
			})
		$('#'+range_id+'_hidden_div').click(function(e)
		{
			var parent=this.parentNode;
			
			var now_x=e.clientX+document.body.scrollLeft;
			document.getElementById(range_id+'_inner_div').style.left=now_x-get_abs_pos_x(parent)+min_left+"px";
			
			
		})
		document.getElementById(range_id).onmousedown=function()
		{
			range_inner.if_draging=1;
		}
		$('body')
		.mousemove(function(e)
		{
			if(range_inner.if_draging==1)
			{
				var obj=document.getElementById(range_id+'_inner_div');
				var parent=obj.parentNode;
				var now_x=e.clientX+document.body.scrollLeft;
				obj.style.left=now_x-get_abs_pos_x(parent)+min_left+"px";
				
				if(parseInt(obj.style.left)<min_left)
				{
					obj.style.left=min_left+"px";
				}
				if(parseInt(obj.style.left)>max_left)
				{
					obj.style.left=max_left+"px";
				}
				
			}
		})
		$('body').mouseup(function()
		{
			range_inner.if_draging=0;
		})
	}
	else if(range_outer_width<range_outer_height)
	{
		var max_top=range_outer_height-range_inner_zhi_jing/2;
		var min_top=-range_inner_zhi_jing/2;
		var default_top=range_outer_height*(1-default_value_percent)+min_top;
		
		$('#'+range_id)	
			.css("width",range_outer_width+"px")
			.css("height",range_outer_height+"px")
			.css("padding","0")
			.css("cursor","pointer")
			.css("margin","0")
			.css("position","absolute")
			.css("border-radius",range_outer_height/2+"px");
		
		var inner_div_left=-(range_inner_zhi_jing-range_outer_width)/2;
		var inner_div_border_radius=range_inner_zhi_jing/2;
		$('#'+range_id+'_inner_div')
			.css({
				position:"absolute",
				width:range_inner_zhi_jing+"px",
				height:range_inner_zhi_jing+"px",
				left:inner_div_left+"px",
				top:default_top+"px",
				borderRadius:inner_div_border_radius+"px"
			})
		$('#'+range_id+'_hidden_div')
			.css({
				position:"absolute",
				width:range_inner_zhi_jing+"px",
				height:range_outer_height+"px",
				left:inner_div_left+"px"
			})
		$('#'+range_id+'_hidden_div').click(function(e)
		{
			var parent=this.parentNode;
			var now_y=e.clientY+document.body.scrollTop;
			document.getElementById(range_id+'_inner_div').style.top=now_y-get_abs_pos_y(parent)+min_top+"px";
			
			
		})
		document.getElementById(range_id).onmousedown=function()
		{
			range_inner.if_draging=1;
		}
		$('body')
		.mousemove(function(e)
		{
			if(range_inner.if_draging==1)
			{
				var obj=document.getElementById(range_id+'_inner_div');
				var parent=obj.parentNode;
				var now_y=e.clientY+document.body.scrollTop;
				obj.style.top=now_y-get_abs_pos_y(parent)+min_top+"px";
				
				if(parseInt(obj.style.top)<min_top)
				{
					obj.style.top=min_top+"px";
				}
				if(parseInt(obj.style.top)>max_top)
				{
					obj.style.top=max_top+"px";
				}
				
			}
		})
		$('body').mouseup(function()
		{
			range_inner.if_draging=0;
		})
	}
	return range_inner;
}
function get_range_value_percent(obj_id_or_obj)
{
	var percent;
	var parent;
	if(typeof(obj_id_or_obj)=="string")
	{
		parent=document.getElementById(obj_id_or_obj);
	}
	else if(typeof(obj_id_or_obj)=="object")
	{
		parent=obj_id_or_obj;
	}
	var obj=parent.childNodes[0];
	var width=parseInt(parent.style.width);
	var height=parseInt(parent.style.height);
	if(width>height)
	{
		percent=(parseInt(obj.style.left)+parseInt(obj.style.width)/2)/width;
	}
	else
	{
		percent=1-(parseInt(obj.style.top)+parseInt(obj.style.height)/2)/height;
	}
	return percent;
}
function get_abs_pos_x(obj)
{
	
	var ol=obj.offsetLeft;
	if(obj.offsetParent!=null)
	{
		ol+=get_abs_pos_x(obj.offsetParent);
	}
	return ol;
}
function get_abs_pos_y(obj)
{
	var ot=obj.offsetTop;
	if(obj.offsetParent!=null)
	{
		ot+=get_abs_pos_y(obj.offsetParent);
	}
	return ot;
}