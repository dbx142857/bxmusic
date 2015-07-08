
//滚动标题栏
var scroll_title_bar_str,scroll_title_bar_str_clone;
var scroll_title_bar_clock;
function scroll_title_bar(str)
{
	scroll_title_bar_str=str;
	scroll_title_bar_str_clone=scroll_title_bar_str;
	setInterval(function()
	{
		scroll_title_bar_str=scroll_title_bar_str.substring(1,scroll_title_bar_str.length)+scroll_title_bar_str.substring(0,1);
		document.title=scroll_title_bar_str;
		if(scroll_title_bar_str.length>20)
		{
			scroll_title_bar_str=scroll_title_bar_str_clone;
		}
	},300);
}
//----------------------------------------------------------------------------------------------------------
//使用canvas进行信息提示
var big_canvas,
	big_context,
	big_gradient,
	hidden_big_canvas_clock;
function use_msg_re_canvas(text,fontSize)
{
	if(!big_canvas)
	{
		big_canvas=document.createElement("canvas");
		document.body.appendChild(big_canvas);
		big_canvas.width=screen.width;
		big_canvas.height=160;
		$(big_canvas).css({
			position:"absolute",
			zIndex:"-20"
		})
	    big_context=big_canvas.getContext('2d'); 
	    big_context.globalAlpha=0;
	    big_context.textAlign="center";
	}
	if(fontSize==undefined)
    {
    	size=screen.width/text.length;
    	if(size>100)
    	{
    		size=100;
    	}
    }
    else
    {
    	size=fontSize;
    }
    var width=text.length*size>screen.width?screen.width:text.length*size;
	$(big_canvas).css({
		zIndex:"100000",
		width:width+"px",
		left:(screen.width-width)/2+"px"
		})
	big_canvas.style.top=(screen.height-big_canvas.offsetHeight)/2+"px";
	big_gradient=big_context.createRadialGradient(big_canvas.width/2,big_canvas.height,0,big_canvas.width/2,0,screen.height);
    big_gradient.addColorStop(0,'blue');
    big_gradient.addColorStop(0.1,'orange');
    big_gradient.addColorStop(0.2,'green');
    big_gradient.addColorStop(0.3,'cyan');
    big_gradient.addColorStop(0.4,'purple');
    big_gradient.addColorStop(0.5,'pink'); 
    big_gradient.addColorStop(0.6,'white');
    big_gradient.addColorStop(0.7,'purple');
    big_gradient.addColorStop(0.8,'red');
    big_gradient.addColorStop(0.9,'yellow');
    big_context.fillStyle=big_gradient;
    big_context.font=size+"px 微软雅黑";
	big_context.globalAlpha=1;
	big_context.clearRect(0,0,big_canvas.width,big_canvas.height);
	big_context.fillText(text,big_canvas.width/2,big_canvas.height/2);
	hidden_big_canvas_clock=clearTimeout(hidden_big_canvas_clock);
	//两秒后隐藏提示内容
	hidden_big_canvas_clock=setTimeout(function()
	{
		big_context.globalAlpha=0;
		big_canvas.style.zIndex="-100";
		big_context.clearRect(0,0,big_canvas.width,big_canvas.height);
	},1000);
}

//---------------------------------------------------------------------------------------------
//使绝对定位的元素水平和垂直都居中显示
function show_in_center(obj)
{
	
	var parent=obj.parentNode;
	var w=($(parent).outerWidth()-$(obj).outerWidth())/2;
	var h=($(parent).outerHeight()-$(obj).outerHeight())/2;
	$(obj).css({
		position:"absolute",
		left:w+"px",
		top:h+"px"
	})
}
//-------------------------------------------------------------------------------------------------------------------
//从路径中获取base——name
function base_name(path)
{
	var pos;
	for(var i=path.length-1;i>=0;i--)
	{
		if(path[i]=="/")
		{
			pos=i+1;
			break;
		}
	}
	return path.substring(pos);
}
//--------------------------------------------------------------------------------------------------------------------------
//判断是否为图片
function is_img(name)
{
	var type=name.substring(name.length-4);
	if(type==".jpg"||type=="jpeg"||type==".bmp"||type==".png"||type==".gif")
	{
		return 1;
	}
	else
	{
		return 0;
	}
}
//生产箭头
function make_arraw(width,
					arraw_direction,
					id_of_the_arraw,
					color_of_the_arraw,
					parent)
{
	var oo=document.createElement("div");
	oo.id=id_of_the_arraw;
	oo.className="dbx_arraw";
	oo.style.width="0";
	oo.style.height="0";
	oo.style.borderStyle="solid";
	oo.style.cursor="pointer";
	oo.style.borderColor=color_of_the_arraw;
	oo.style.borderWidth=width+"px";
	if(arraw_direction=="right")
	{
		oo.style.borderColor="transparent transparent transparent "+color_of_the_arraw;
	}
	else if(arraw_direction=="up")
	{
		oo.style.borderColor="transparent transparent "+color_of_the_arraw+" transparent";
	}
	else if(arraw_direction=="left")
	{
		oo.style.borderColor="transparent "+color_of_the_arraw+" transparent transparent";
	}
	else if(arraw_direction=="down")
	{
		oo.style.borderColor=color_of_the_arraw+" transparent transparent transparent";
	}
	if(typeof(parent)=="string")
	{
		if(parent=="body")
		{
			document.body.appendChild(oo);
		}
		else if(parent!="body")
		{
			document.getElementById(parent).appendChild(oo);
		}
	}
	else if(typeof(parent)=="object")
	{
		parent.appendChild(oo);
	}
	return $(oo);
}
//---------------------------------------------------------------------------------------
//获取元素绝对坐标
//（绝对X坐标）
function get_abs_pos_x(obj)
{
	var ol=obj.offsetLeft;
	if(obj.offsetParent!=null)
	{
		ol+=get_abs_pos_x(obj.offsetParent);
	}
	return ol;
}
//（绝对y坐标）
function get_abs_pos_y(obj)
{
	var ot=obj.offsetTop;
	if(obj.offsetParent!=null)
	{
		ot+=get_abs_pos_y(obj.offsetParent);
	}
	return ot;
}