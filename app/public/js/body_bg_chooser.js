//本插件在body已经有背景的情况下才能使用哦，引入插件后需要制定一个弹出背景选择器的事件监听器
var cur_page_bg_index;
function initial_bg_chooser()
{
	var bgs=new Array("radial-gradient(circle at 0% 50%, rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px) 0px 10px,radial-gradient(at 100% 100%,     rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px),#8a3"
					 ,"linear-gradient(63deg, #999 23%, transparent 23%) 7px 0,linear-gradient(63deg, transparent 74%, #999 78%),linear-gradient(63deg, transparent 34%, #999 38%, #999 58%, transparent 62%),#444"
					 ,"linear-gradient(45deg, #92baac 45px, transparent 45px)64px 64px,linear-gradient(45deg, #92baac 45px, transparent 45px,transparent 91px, #e1ebbd 91px, #e1ebbd 135px, transparent 135px),linear-gradient(-45deg, #92baac 23px, transparent 23px, transparent 68px,#92baac 68px,#92baac 113px,transparent 113px,transparent 158px,#92baac 158px)"
					 ,"linear-gradient(135deg, #ECEDDC 25%, transparent 25%) -50px 0,linear-gradient(225deg, #ECEDDC 25%, transparent 25%) -50px 0,linear-gradient(315deg, #ECEDDC 25%, transparent 25%),linear-gradient(45deg, #ECEDDC 25%, transparent 25%)"
					 ,"radial-gradient(hsl(0, 100%, 27%) 4%, hsl(0, 100%, 18%) 9%, hsla(0, 100%, 20%, 0) 9%) 0 0,radial-gradient(hsl(0, 100%, 27%) 4%, hsl(0, 100%, 18%) 8%, hsla(0, 100%, 20%, 0) 10%) 50px 50px,radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 50px 0,radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 0 50px,radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%) 50px 0,radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%) 100px 50px,radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 0 0,radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 50px 50px,linear-gradient(45deg, hsla(0, 100%, 20%, 0) 49%, hsla(0, 100%, 0%, 1) 50%, hsla(0, 100%, 20%, 0) 70%) 0 0,linear-gradient(-45deg, hsla(0, 100%, 20%, 0) 49%, hsla(0, 100%, 0%, 1) 50%, hsla(0, 100%, 20%, 0) 70%) 0 0"
					 
					 
					 ,""	
					 ,"" 
					 ,"radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.15) 30%, rgba(255,255,255,.3) 32%, rgba(255,255,255,0) 33%) 0 0,radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.1) 11%, rgba(255,255,255,.3) 13%, rgba(255,255,255,0) 14%) 0 0,radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 17%, rgba(255,255,255,.43) 19%, rgba(255,255,255,0) 20%) 0 110px,radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 11%, rgba(255,255,255,.4) 13%, rgba(255,255,255,0) 14%) -130px -170px,radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 11%, rgba(255,255,255,.4) 13%, rgba(255,255,255,0) 14%) 130px 370px,radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.1) 11%, rgba(255,255,255,.2) 13%, rgba(255,255,255,0) 14%) 0 0,linear-gradient(45deg, #343702 0%, #184500 20%, #187546 30%, #006782 40%, #0b1284 50%, #760ea1 60%, #83096e 70%, #840b2a 80%, #b13e12 90%, #e27412 100%)"
					 ,"linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,linear-gradient(90deg, #1b1b1b 10px, transparent 10px),linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424)"
					 ,"radial-gradient(black 15%, transparent 16%) 0 0,radial-gradient(black 15%, transparent 16%) 8px 8px,radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px"
					
					
					 ,"radial-gradient(circle closest-side at 60% 43%, #b03 26%, rgba(187,0,51,0) 27%),radial-gradient(circle closest-side at 40% 43%, #b03 26%, rgba(187,0,51,0) 27%),radial-gradient(circle closest-side at 40% 22%, #d35 45%, rgba(221,51,85,0) 46%),radial-gradient(circle closest-side at 60% 22%, #d35 45%, rgba(221,51,85,0) 46%),radial-gradient(circle closest-side at 50% 35%, #d35 30%, rgba(221,51,85,0) 31%),radial-gradient(circle closest-side at 60% 43%, #b03 26%, rgba(187,0,51,0) 27%) 50px 50px,radial-gradient(circle closest-side at 40% 43%, #b03 26%, rgba(187,0,51,0) 27%) 50px 50px,radial-gradient(circle closest-side at 40% 22%, #d35 45%, rgba(221,51,85,0) 46%) 50px 50px,radial-gradient(circle closest-side at 60% 22%, #d35 45%, rgba(221,51,85,0) 46%) 50px 50px,radial-gradient(circle closest-side at 50% 35%, #d35 30%, rgba(221,51,85,0) 31%) 50px 50px"
					 ,""
					 ,""
					 ,""
					 ,"linear-gradient(324deg, #232927 4%,   transparent 4%) -70px 43px,linear-gradient( 36deg, #232927 4%,   transparent 4%) 30px 43px,linear-gradient( 72deg, #e3d7bf 8.5%, transparent 8.5%) 30px 43px,linear-gradient(288deg, #e3d7bf 8.5%, transparent 8.5%) -70px 43px,linear-gradient(216deg, #e3d7bf 7.5%, transparent 7.5%) -70px 23px,linear-gradient(144deg, #e3d7bf 7.5%, transparent 7.5%) 30px 23px,linear-gradient(324deg, #232927 4%,   transparent 4%) -20px 93px,linear-gradient( 36deg, #232927 4%,   transparent 4%) 80px 93px,linear-gradient( 72deg, #e3d7bf 8.5%, transparent 8.5%) 80px 93px,linear-gradient(288deg, #e3d7bf 8.5%, transparent 8.5%) -20px 93px,linear-gradient(216deg, #e3d7bf 7.5%, transparent 7.5%) -20px 73px,linear-gradient(144deg, #e3d7bf 7.5%, transparent 7.5%) 80px 73px"
					
					 
					 
					 
					 ,""
					 ,""
					 ,""
					 ,""
					 ,""
					 
					 
					 ,""
					 ,""
					 ,""
					 ,""
					 ,""
					  
					 
					 ,"radial-gradient(circle at 50% 59%, #D2CAAB 3%, #364E27 4%, #364E27 11%, rgba(54,78,39,0) 12%, rgba(54,78,39,0)) 50px 0,radial-gradient(circle at 50% 41%, #364E27 3%, #D2CAAB 4%, #D2CAAB 11%, rgba(210,202,171,0) 12%, rgba(210,202,171,0)) 50px 0,radial-gradient(circle at 50% 59%, #D2CAAB 3%, #364E27 4%, #364E27 11%, rgba(54,78,39,0) 12%, rgba(54,78,39,0)) 0 50px,radial-gradient(circle at 50% 41%, #364E27 3%, #D2CAAB 4%, #D2CAAB 11%, rgba(210,202,171,0) 12%, rgba(210,202,171,0)) 0 50px,radial-gradient(circle at 100% 50%, #D2CAAB 16%, rgba(210,202,171,0) 17%),radial-gradient(circle at 0% 50%, #364E27 16%, rgba(54,78,39,0) 17%),radial-gradient(circle at 100% 50%, #D2CAAB 16%, rgba(210,202,171,0) 17%) 50px 50px,radial-gradient(circle at 0% 50%, #364E27 16%, rgba(54,78,39,0) 17%) 50px 50px"
					 ,""
					 ,""
					 ,""
					 );
	var bg_imgs=new Array(""
						 ,""
						 ,""
						 ,""
						 ,""
						 
						 
						 ,"radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px),radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 30px)"
						 ,"radial-gradient(midnightblue 9px, transparent 10px),repeating-radial-gradient(midnightblue 0, midnightblue 4px, transparent 5px, transparent 20px, midnightblue 21px, midnightblue 25px, transparent 26px, transparent 50px)"
						 ,""
						 ,""
						 ,""
						 
						 
						 ,""
						 ,"radial-gradient( #555 0px, hsla(0,0%,0%,0) 2px, hsla(0,0%,0%,0) 24px),repeating-radial-gradient( white 0px, black 2px, black 48px)"
						 ,"linear-gradient(90deg, transparent 50%, #004c5a 50%)"
						 ,"repeating-radial-gradient( hsla(320,100%,60%,.6) 0px, hsla(220,100%,60%,0) 60%),repeating-radial-gradient( hsla(330,100%,40%,1) 12%, hsla(320,80%,60%,1) 24px)"
						 ,""
						
						 
						 ,"linear-gradient(30deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),linear-gradient(150deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),linear-gradient(30deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),linear-gradient(150deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),linear-gradient(60deg, #99a 25%, transparent 25.5%, transparent 75%, #99a 75%, #99a), linear-gradient(60deg, #99a 25%, transparent 25.5%, transparent 75%, #99a 75%, #99a)"
						 ,"radial-gradient(white 15%, transparent 16%),radial-gradient(white 15%, transparent 16%)"
						 ,"linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black), linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black)"
						 ,"repeating-linear-gradient(transparent, transparent 50px, rgba(0,0,0,.4) 50px, rgba(0,0,0,.4) 53px, transparent 53px, transparent 63px, rgba(0,0,0,.4) 63px, rgba(0,0,0,.4) 66px, transparent 66px, transparent 116px, rgba(0,0,0,.5) 116px, rgba(0,0,0,.5) 166px, rgba(255,255,255,.2) 166px, rgba(255,255,255,.2) 169px, rgba(0,0,0,.5) 169px, rgba(0,0,0,.5) 179px, rgba(255,255,255,.2) 179px, rgba(255,255,255,.2) 182px, rgba(0,0,0,.5) 182px, rgba(0,0,0,.5) 232px, transparent 232px),repeating-linear-gradient(270deg, transparent, transparent 50px, rgba(0,0,0,.4) 50px, rgba(0,0,0,.4) 53px, transparent 53px, transparent 63px, rgba(0,0,0,.4) 63px, rgba(0,0,0,.4) 66px, transparent 66px, transparent 116px, rgba(0,0,0,.5) 116px, rgba(0,0,0,.5) 166px, rgba(255,255,255,.2) 166px, rgba(255,255,255,.2) 169px, rgba(0,0,0,.5) 169px, rgba(0,0,0,.5) 179px, rgba(255,255,255,.2) 179px, rgba(255,255,255,.2) 182px, rgba(0,0,0,.5) 182px, rgba(0,0,0,.5) 232px, transparent 232px),repeating-linear-gradient(125deg, transparent, transparent 2px, rgba(0,0,0,.2) 2px, rgba(0,0,0,.2) 3px, transparent 3px, transparent 5px, rgba(0,0,0,.2) 5px)"
						 ,"repeating-radial-gradient( hsla(200,100%,80%,.8) 0px, hsla(200,100%,80%,.5) 4px, hsla(200,100%,80%,0) 50px), repeating-radial-gradient( hsla(260,100%, 0%, 0) 0px, hsla(260,100%,50%,.1) 2px, hsla(260,100%, 0%,0) 10px)"
						 
						 
						 ,"linear-gradient(90deg, rgba(200,0,0,.5) 50%, transparent 50%),linear-gradient(rgba(200,0,0,.5) 50%, transparent 50%)"
						 ,"repeating-radial-gradient( hsla(50,100%,100%,1) 0px, hsla(50,100%,90%, 1) 10px, hsla(50,100%,70%,.2)  12px, hsla(50,100%,70%,0) 130px),repeating-radial-gradient( hsla(20,100%, 50%,0) 20%, hsla(20,100%,50%,.4) 80%,  hsla(50,100%,70%, 1) 120px)"
						 ,"linear-gradient(90deg, rgba(255,255,255,.07) 50%, transparent 50%),linear-gradient(90deg, rgba(255,255,255,.13) 50%, transparent 50%),linear-gradient(90deg, transparent 50%, rgba(255,255,255,.17) 50%),linear-gradient(90deg, transparent 50%, rgba(255,255,255,.19) 50%)"
						 ,"linear-gradient(90deg, transparent 50%, rgba(255,255,255,.5) 50%)"
						 ,"linear-gradient(transparent 50%, rgba(255,255,255,.5) 50%)"
						  
						 
						 ,""
						 ,"radial-gradient(closest-side, transparent 0%, transparent 75%, #B6CC66 76%, #B6CC66 85%, #EDFFDB 86%, #EDFFDB 94%, #FFFFFF 95%, #FFFFFF 103%, #D9E6A7 104%, #D9E6A7 112%, #798B3C 113%, #798B3C 121%, #FFFFFF 122%, #FFFFFF 130%, #E0EAD7 131%, #E0EAD7 140%),radial-gradient(closest-side, transparent 0%, transparent 75%, #B6CC66 76%, #B6CC66 85%, #EDFFDB 86%, #EDFFDB 94%, #FFFFFF 95%, #FFFFFF 103%, #D9E6A7 104%, #D9E6A7 112%, #798B3C 113%, #798B3C 121%, #FFFFFF 122%, #FFFFFF 130%, #E0EAD7 131%, #E0EAD7 140%)"
						 ,"radial-gradient(closest-side, transparent 98%, rgba(0,0,0,.3) 99%),radial-gradient(closest-side, transparent 98%, rgba(0,0,0,.3) 99%)"
						 ,"linear-gradient(335deg, #b00 23px, transparent 23px),linear-gradient(155deg, #d00 23px, transparent 23px),linear-gradient(335deg, #b00 23px, transparent 23px),linear-gradient(155deg, #d00 23px, transparent 23px)"
						
						 );
	var bg_poss=new Array("none"
						 ,"none"
						 ,"none"
						 ,"none"
						 ,"none"
						 
						 
						 ,"0 0, 40px 60px, 130px 270px, 70px 100px"
						 ,"0 0"
						 ,"none"
						 ,"none"
						 ,"none"
						 
						 
						 ,"none"
						 ,"none"
						 ,"none"
						 ,"none"
						 ,"none"
						 
						 
						 
						 
						 ,"0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px"
						 ,"0 0, 30px 30px"
						 ,"0 0, 30px 30px"
						 ,"none"
						 ,"none"
						 
						 
						 ,"none"
						 ,"none"
						 ,"none"
						 ,"none"
						 ,"none"
						 
						 ,"none"
						 ,"0 0, 55px 55px"
						 ,"0 0, 40px 40px"
						 ,"0px 2px, 4px 35px, 29px 31px, 34px 6px"
						 
						 );
	var bg_colors=new Array("none"
						   ,"none"
						   ,"#e1ebbd"
						   ,"#EC173A"
						   ,"#300"
						   
						   
						   ,"black"
						   ,"white"
						   ,"#840b2a"
						   ,"#131313"
						   ,"#282828"
						   
						   
						   ,"#b03"
						   ,"#000"
						   ,"#004f5e"
						   ,"hsla(320,80%,60%,1)"
						   ,"#232927"
						   
						   
						   
						   
						   ,"#556"
						   ,"#001"
						   ,"#eee"
						   ,"hsl(2, 57%, 40%)"
						   ,"hsl(200,100%,50%)"
						   
						   
						   ,"white"
						   ,"none"
						   ,"#026873"
						   ,"gray"
						   ,"gray"
						   
						   
						   ,"#63773F"
						   ,"#C8D3A7"
						   ,"#def"
						   ,"silver"
						   );					 
	var bg_sizes=new Array("20px 20px"
						  ,"16px 48px"
						  ,"128px 128px"
						  ," 100px 100px"
						  ,"100px 100px"
						  
						  
						  ,"550px 550px, 350px 350px, 250px 250px, 150px 150px"
						  ,"30px 30px, 90px 90px"
						  ,"470px 470px, 970px 970px, 410px 410px, 610px 610px, 530px 530px, 730px 730px, 100% 100%"
						  ,"20px 20px"
						  ,"16px 16px"
						  
						  
						  ,"100px 100px"
						  ,"12px 12px"
						  ,"30px 30px"
						  ,"60px 60px"  
						  ,"100px 100px"
						 
						  
						  
						  
						  ,"80px 140px"
						  ,"60px 60px"
						  ,"60px 60px"
						  ,""
						  ,"66px 66px"
						  
						  
						  ,"50px 50px"
						  ,""
						  ,"13px, 29px, 37px, 53px"
						  ,"50px 50px"
						  ,"50px 50px"
						   
						  
						  ,"100px 100px"
						  ,"110px 110px"
						  ,"80px 80px"
						  ,"58px 58px"
						  );
	var bg=document.createElement("div");
	bg.id="the_background";
	document.body.appendChild(bg);
	var bg_layer_height=document.body.offsetHeight<screen.height?screen.height:document.body.offsetHeight;
	var bg_layer_width=document.body.offsetWidth<screen.width?screen.width:document.body.offsetWidth;
		$('#the_background')
			.css("width",bg_layer_width+"px")
			.css("height",bg_layer_height+"px")
			.css("position","absolute")
			.css("left","0")
			.css("z-index","-20")
			.css("top","0");
	var bg_chooser=document.createElement("div");
	bg_chooser.id="the_background_chooser";
	document.body.appendChild(bg_chooser);
	$('#the_background_chooser')
		.css("width","800px")
		.css("height","550px")
		.css("z-index","1000000")
		.css("padding","10px 0 10px 10px")
		.css("border-radius","20px")
		.css("position","absolute")
		.css("background","teal")
		.css("left","-810px")
		.css("top","-570px");
	var page_bg_chooser_sure=document.createElement("div");
	page_bg_chooser_sure.id="page_bg_chooser_sure";
	document.getElementById("the_background_chooser").appendChild(page_bg_chooser_sure);
	page_bg_chooser_sure.innerHTML="确定";
	$('#page_bg_chooser_sure')
		.css("position","absolute")
		.css("right","5px")
		.css("bottom","20px")
		.css("width","90px")
		.css("height","40px")
		.css("line-height","40px")
		.css("background","orange")
		.css("font-weight","bolder")
		.css("font-family","'微软雅黑'")
		.css("font-size","24px")
		.css("border-radius","10px")
		.css("text-align","center")
		.css("cursor","pointer");
	$('#page_bg_chooser_sure').hover(function()
	{
		$(this).css("background","purple");
	},function()
	{
		$(this).css("background","orange");
	})
	$('#page_bg_chooser_sure').click(function()
	{
		$('#the_background_chooser').stop().animate({"left":"-810px","top":"-570px"},500);
		if(body_bgs.length!=0&&if_use_body_bg==1)
		{
			$('.the_cloud').css("opacity","0");
			$('#the_background').css("background","none");
			$(".the_background_inner_div").css("display","block");
			if(body_bgs.length>1)
			{
				change_body_bg_clock=clearInterval(change_body_bg_clock);
				change_body_bg_clock=setInterval("change_body_bg()",2000);	
			}
			if(body_bg_change_and_stop_flag==0)
			{
				use_msg_re_canvas("壁纸更换已启用");
				body_bg_change_and_stop_flag=1;
			}
		}
		
	})
	make_range("tou_ming_du","the_background_chooser",1.0,90,10,20);
	$('#tou_ming_du')
		.css("right","10px")
		.css("bottom","100px")
		.css("background","lightpink")
		.attr({
			title:"亲，滑动调节页面背景透明度哦"
		})
	$('#tou_ming_du div:first-child').css("background","pink");
	$('#tou_ming_du').mousemove(function()
	{
		if(cur_page_bg_index==29)
		{
			$('.the_cloud,#the_background').css("opacity",get_range_value_percent("tou_ming_du"));
		}
		else
		{
			$('#the_background').css("opacity",get_range_value_percent("tou_ming_du"));
		}
	})
	for(var i=0;i<bgs.length;i++)
	{
		var o=document.createElement("div");
		o.id="page_bg_div"+i;  
		o.className="page_bg_div";
		o.style.position="relative";
		document.getElementById("the_background_chooser").appendChild(o);
		if(bg_imgs[i]=="")
		{
			$('#page_bg_div'+i)
			.css("background-color",bg_colors[i])
			.css("background",bgs[i])
			.css("background-size",bg_sizes[i])
			.css("background-position",bg_poss[i]);
		}
		else
		{
			$('#page_bg_div'+i)
				.css("background-color",bg_colors[i])
				.css("background-image",bg_imgs[i])
				.css("background-size",bg_sizes[i])
				.css("background-position",bg_poss[i]);
		}
	}
	for(var j=0;j<2;j++)
	{
		bgs.push($('body').css("background"));
		bg_colors.push($('body').css("background-color"));
		bg_imgs.push($('body').css("background-image"));
		bg_sizes.push($('body').css("background-size"));
		bg_poss.push($('body').css("background-position"));
	}
	$('#page_bg_div30').attr("title","亲，点击添加自定义图片作为背景哦");
	var default_page_bg_index=bgs.length-2;
	cur_page_bg_index=default_page_bg_index;
	$('#the_background')
				.css("background-color",bg_colors[default_page_bg_index])
				.css("background-size",bg_sizes[default_page_bg_index])
				.css("background-image",bg_imgs[default_page_bg_index]);
	for(var i=0;i<2;i++)
	{
		$("<img>")
			.appendTo($('#the_background'))
			.attr({
				class:"the_background_inner_div",
				id:"the_background_inner_div"+(i+1)
			})
	}
	$('.the_background_inner_div')
		.css({
			width:"100%",
			height:"100%",
			display:"none",
			position:"absolute",
			left:"0",
			top:"0",
			zIndex:"0",
			backgroundSize:"1366px 768px"
		})
	$('body').css("background","none").css("background","black");
	var o1=document.createElement("div");
		o1.id="page_bg_div"+(bgs.length-2);
		o1.className="page_bg_div";
		o1.style.position="relative";
		document.getElementById("the_background_chooser").appendChild(o1);
	var o2=document.createElement("div");
		o2.id="page_bg_div"+(bgs.length-1);
		o2.title="亲，点击可以选择自己的图片作为壁纸哦";
		o2.className="page_bg_div";
		o2.style.position="relative";
		document.getElementById("the_background_chooser").appendChild(o2);
	
	$(o1)
		.append("默认背景")
		.css("text-align","center")
		.css("font-family","'微软雅黑'")
		.css("font-weight","bolder")
		.css("font-size","16px")
		.css("color","pink")
		.css("background-color",bg_colors[bgs.length-2])
		.css("background-image",bg_imgs[bgs.length-2])
		.css("background-size","900%")
		.css("line-height","120px");
	$(o2)
		.append("本地壁纸")
		.css("text-align","center")
		.css("font-family","'微软雅黑'")
		.css("font-weight","bolder")
		.css("font-size","16px")
		.css("color","pink")
		.css("line-height","120px");
	$(o2).click(function()
	{
		$('#page_bg_chooser_input').click();
	})
	
	$('.page_bg_div')
		.css("float","left")
		.css("width","80px")
		.css("border-radius","10px")
		.css("border","solid 5px pink")
		.css("height","120px")
		.css("margin-bottom","10px")
		.css("margin-right","10px")
		.css("cursor","pointer");	
	$('.page_bg_div').hover(function()
	{
			var index=$('.page_bg_div').index($(this));
			if(index!=29)
			{
				
				$('.the_cloud').css("opacity","0");
			}
			else
			{
				$('.the_cloud').css("opacity",get_range_value_percent("tou_ming_du"));
			}
			
				if(bg_imgs[index]=="")
				{
					
					$('#the_background')
						.css("background-color",bg_colors[index])
						.css("background",bgs[index])
						.css("background-size",bg_sizes[index])
						.css("background-position",bg_poss[index]);
				}
				else
				{
					
					$('#the_background')
						.css("background-color",bg_colors[index])
						.css("background-image",bg_imgs[index])
						.css("background-size",bg_sizes[index])
						.css("background-position",bg_poss[index]);
				}
				$('#the_background_inner_div1,#the_background_inner_div2').hide();
				if(index==30)
				{
					if($('#page_bg_chooser_input').attr("value")=="")
					{
						$('.the_cloud').css("opacity",get_range_value_percent("tou_ming_du"));
					}
					else
					{
						$('#the_background_inner_div1,#the_background_inner_div2').show();
					}
				}
	},function()
	{
		if($('#the_background_inner_div1').attr("src")!=undefined&&cur_page_bg_index==30)
		{
			$('#the_background_inner_div1,#the_background_inner_div2').show();
		}
		if(cur_page_bg_index!=30)
		{
			$('#the_background_inner_div1,#the_background_inner_div2').hide();
		}
		if(cur_page_bg_index!=29)
			{
				$('.the_cloud').css("opacity","0");
			}
		else
		{
			$('.the_cloud').css("opacity",get_range_value_percent("tou_ming_du"));
		}
		var index=cur_page_bg_index;
		if(bg_imgs[index]=="")
			{
				
				$('#the_background')
				.css("background-color",bg_colors[index])
				.css("background",bgs[index])
				.css("background-size",bg_sizes[index])
				.css("background-position",bg_poss[index]);
			}
			else
			{
				$('#the_background')
				.css("background-color",bg_colors[index])
				.css("background-image",bg_imgs[index])
				.css("background-size",bg_sizes[index])
				.css("background-position",bg_poss[index]);
			}
			if(if_use_body_bg==1)
			{
				$('#the_background').css("background","url("+body_bgs[cur_the_background_inner_div_bg_index]+")");
				$('.the_cloud').css("opacity","0");
			}
	})
	
	$('.page_bg_div:not(#page_bg_div30)').click(function()
		{
			$('#the_background_inner_div1,#the_background_inner_div2').hide()
			if_use_body_bg=0;
			body_bgs.length=0;
			var index;
			if(this.id.length==12)
			{
				index=parseInt(this.id.charAt(11));
			}
			else if(this.id.length==13)
			{
				index=parseInt(this.id.substr(11));
			}
			cur_page_bg_index=index;
			if(bg_imgs[index]=="")
			{
				$('#the_background')
				.css("background-color",bg_colors[index])
				.css("background",bgs[index])
				.css("background-size",bg_sizes[index])
				.css("background-position",bg_poss[index]);
			}
			else
			{
				$('#the_background')
				.css("background-color",bg_colors[index])
				.css("background-image",bg_imgs[index])
				.css("background-size",bg_sizes[index])
				.css("background-position",bg_poss[index]);
			}
			update_datas("bg",cur_page_bg_index);
			$(this).stop();
			$(this).animate({"top":"-40px"},500).animate({"top":"0"},500);
			if(cur_page_bg_index!=29)
			{
				$('.the_cloud').hide();
			}
			else
			{
				$('.the_cloud').show();
			}
		})	
		$('#page_bg_div30').click(function()
		{
			
			if_use_body_bg=0;
			body_bgs.length=0;
			$(this).stop();
			$(this).animate({"top":"-40px"},500).animate({"top":"0"},500);
		})
		$("<form action='Index.php?m=Ajax&a=update_body_bg' target='ifm' method='post' enctype='multipart/form-data' id='update_body_bg_form'>")
		.appendTo($('body'));
		
		var page_bg_chooser_input=document.createElement("input");
		page_bg_chooser_input.type="file";
		page_bg_chooser_input.id="page_bg_chooser_input";
		page_bg_chooser_input.name="page_bg_chooser_input";
		document.getElementById("update_body_bg_form").appendChild(page_bg_chooser_input);
		
		$('#page_bg_chooser_input')
			.css("opacity","0")
			.css("position","absolute")
			.css("left","0")
			.css("z-index","-30")
			.css("top","0");
		$('#page_bg_chooser_input').change(function()
		{
			
			var file=this.files[0];
			var reader=new FileReader();
			reader.readAsDataURL(file);
			reader.onload=function(e)
			{
				$('#the_background_inner_div1').attr("src",this.result).show();
				$('#the_background_inner_div2').attr("src",this.result).show();
				cur_page_bg_index=bgs.length-1;
				$('#page_bg_div30').css("background","url("+this.result+")").click();
				if(cur_user_id!=null)
				{
					$('#update_body_bg_form').submit();
				}
			}
			
		})
		$('#page_bg_div'+(bgs.length-2)).mousemove().mouseout();
}

