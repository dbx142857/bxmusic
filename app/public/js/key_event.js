var allow_key_press=0,
if_kuai_jin=0,
if_kuai_tui=0;
// document.onmousewheel=function(event)
// {
	// alert("fucku")
	// event.preventDefault();
// }
document.onkeydown=function(e)
	{
		var theEvent=window.event||e;
		var code=theEvent.keyCode||theEvent.which;
		if(code==38||code==40||code==33||code==34||(code==83&&theEvent.ctrlKey))
		{
			e.preventDefault();
		}
		if(code==32&&$('body').attr("if_textarea_focus")!=1)
		{
			e.preventDefault();
		}
		if(code==83&&theEvent.ctrlKey)
		{
			use_msg_re_canvas("亲，本站禁止保存哦");
		}
		if($('#back_from_help_msg').css("display")=="block"&&code==27)
		{
			$('#back_from_help_msg').click();
		}
		if(code==27&&$('#suggest').css("display")!="none")
		{
			$('#suggest #close').click();
		}
		if($('#register_and_log_in').css("display")=="none"&&$('#suggest').css("display")=="none")
		{
			change_music(code,theEvent);
		}
		else
		{
			if(code==27)
			{
				$('#register_and_log_in #close').click();
			}
			if(code==13)
			{
				if(document.getElementById("log_in_form").if_focus==true)
				{
					$('#log_in_form_button').click();
				}
				if(document.getElementById("register_form").if_focus==true)
				{
					$('#register_form_button').click();
				}
			}
			
		}
		
	}
	document.onkeyup=function(e)
	{
		var theEvent=window.event||e;
		var code=theEvent.keyCode||theEvent.which;
		if($('#register_and_log_in').css("display")=="none"&&$('#suggest').css("display")=="none")
		{
			back_color(code,theEvent);
		}
	}
function change_music(code,theEvent)
{
	//shift+R随机播放歌曲
	if(theEvent.altKey&&code==82)
	{
		random_play_music();
	}
	if(code==38)
	{
		tell_u_the_volume(1);
	}
	if(code==40)
	{
		tell_u_the_volume(-1);
	}
	//del键开启静音
	if(code==46)
	{
		$('#other_controls_inner4_garbage').click();
	}
	
	//正常模式下按下M键切换为魔方模式
	if(theEvent.shiftKey&&code==77&&which_skin_mode=="normal")
	{
		$('#change_to_mo_fang_mode')
			.mouseenter()
			.css("border-color",temp_page_color)
			.click();
		$('#menu,#menu_item_whole').css("border-color",temp_page_color);
		$('#fd,#mo_fang_whole_outer').css("display","block");
	}
	else if(theEvent.shiftKey&&code==77&&which_skin_mode=="mo_fang")
	{
		use_msg_re_canvas("亲，当前已经是魔方模式了哦")
	}
	//魔方模式下按N键切换为正常模式
	if(theEvent.shiftKey&&code==78&&which_skin_mode=="mo_fang")
	{
		$('#fd,#mo_fang_whole_outer').css("display","block");
		document.getElementById("change_to_normal_mode").click();
	}
	else if(theEvent.shiftKey&&code==78&&which_skin_mode=="normal")
	{
		use_msg_re_canvas("亲，当前已经是正常模式了哦")
	}
	if(code==37)
	{
		allow_key_press=1;
		if(!theEvent.ctrlKey)
		{
			setTimeout(function()
			{
				if(if_playing==1&&allow_key_press==1&&which_music_type!="local")
				{
					if_kuai_tui=1;
				}
				change_progress(-1);
			},1000);
		}
		else
		{
			change_progress(-20);
		}
		if(the_audio.src!="")
		{
				document.getElementById("other_controls_inner2").style.borderColor="purple";
				document.getElementById("mo_fang_shang_yi_qu").style.borderColor="purple";
		}
		
	}
	if(code==39)
	{
		allow_key_press=1;
		if(!theEvent.ctrlKey)
		{
			allow_key_press=1;
			setTimeout(function()
			{
				if(if_playing==1&&allow_key_press==1&&which_music_type!="local")
				{
					if_kuai_jin=1;
				}
				change_progress(1);
			},1000);
		}
		else
		{
			change_progress(20);
		}
		if(the_audio.src!="")
		{
			document.getElementById("other_controls_inner3").style.borderColor="purple";
			document.getElementById("mo_fang_xia_yi_qu").style.borderColor="purple";
		}
	}
	//播放过程中按下空格键暂停播放
	if(code==32)
	{
		document.getElementById("play_or_pause_outer").click();
		document.getElementById("play_or_pause_outer").style.borderColor="purple";
		document.getElementById("mo_fang_play_or_pause_outer").style.borderColor="purple";
	}
	
	//按下回车键隐藏提示框
	if(code==13)
	{
		var msg=document.getElementById("msg");
		if(msg.offsetTop>0)
		{
			$('#sure').click();
		}
		var the_background_chooser=document.getElementById("the_background_chooser");
		if(the_background_chooser.offsetLeft==0)
		{
			$('#page_bg_chooser_sure').click();
		}
		var color_picker=document.getElementById("color_picker");
		if(color_picker.offsetLeft==0)
		{
			$('#que_ding_yan_se').click();
		}
	}
	//alt+O键打开文件
	if(code==79&&theEvent.altKey)
	{
		var obj=document.getElementById("the_file");
		obj.click();
		obj.value="";
	}
	//shift+f收藏当前歌曲
	if(code==70&&theEvent.shiftKey&&the_audio.src!=undefined)
	{
		if(which_music_type=="favorite")
		{
			use_msg_re_canvas("亲，这首歌曲您已经收藏过了哦");
		}
		else
		{
			favorite_icon_click_event(document.getElementsByClassName(which_music_type+"_song")[di_ji_shou]);
		}
		
	}
	//ctrl+alt+L键切换列表
	if(code==76&&theEvent.ctrlKey&&theEvent.altKey)
	{
		list_mode=list_mode=="DIV"?"LIST":"DIV";
		$('#'+cur_type).click();
		update_datas("list_mode",list_mode);
	}
	//按ctrl+alt+b键选择图片切换body背景
	if(code==66&&theEvent.ctrlKey&&theEvent.altKey)
	{
		document.getElementById("change_body_bg_file").click();
	}
	//按ctrl+alt+c键打开颜色管理
	if(code==67&&theEvent.ctrlKey&&theEvent.altKey)
	{
		
		$('#item4').click();
	}
	//按F1+ctrl键停止与继续body背景更换
	if(code==112&&theEvent.ctrlKey)
	{
		
		if(body_bg_change_and_stop_flag==1&&body_bgs.length!=0)
		{
			change_body_bg_clock=clearInterval(change_body_bg_clock);
			use_msg_re_canvas("壁纸更换已暂停");
			body_bg_change_and_stop_flag=0;
			
		}
		else if(body_bg_change_and_stop_flag==0&&body_bgs.length!=0)
		{
			change_body_bg_clock=setInterval("change_body_bg()",2000);
			use_msg_re_canvas("壁纸更换已启用");
			body_bg_change_and_stop_flag=1;
		}
	}
	//ctrl+alt+p打开css3背景选择器
	if(code==80&&theEvent.ctrlKey&&theEvent.altKey)
	{			
		show_page_bg_changer();
	}
	//ctrl+方向键左右切换到上一张下一张body背景
	
		if(code==33&&theEvent.altKey)
		{
			
			if(if_use_body_bg==1)
			{
				cur_the_background_inner_div_bg_index--;
				if(cur_the_background_inner_div_bg_index<=0)
				{
					cur_the_background_inner_div_bg_index=body_bgs.length-1;
				}
				document.getElementById("the_background_inner_div1").src=body_bgs[cur_the_background_inner_div_bg_index];
				document.getElementById("the_background_inner_div2").src=body_bgs[cur_the_background_inner_div_bg_index];
			}
			else
			{
				use_msg_re_canvas("亲，您还未添加壁纸到网页里哦");
			}
			
		}
		if(code==34&&theEvent.altKey)
		{
			if(if_use_body_bg==1)
			{
				cur_the_background_inner_div_bg_index++;
				if(cur_the_background_inner_div_bg_index==body_bgs.length)
				{
					cur_the_background_inner_div_bg_index=0;
				}
				document.getElementById("the_background_inner_div1").src=body_bgs[cur_the_background_inner_div_bg_index];
				document.getElementById("the_background_inner_div2").src=body_bgs[cur_the_background_inner_div_bg_index];
			}
			else
			{
				use_msg_re_canvas("亲，您还未添加壁纸到网页里哦");
			}
		}
	//shift+pg up,shift+pg down调节body透明度
	if(code==34&&theEvent.shiftKey)
	{
		var tmdid=document.getElementById("tou_ming_du_inner_div");
		var new_ol=tmdid.offsetLeft-9;
		if(new_ol<-tmdid.offsetWidth/2)
		{
			new_ol=-tmdid.offsetWidth/2;
		}
		tmdid.style.left=new_ol+"px";
		cur_body_opacity=get_range_value_percent("tou_ming_du");
		$('#the_background,.the_cloud').css("opacity",get_range_value_percent("tou_ming_du"));
		if((cur_page_bg_index!=29)||(cur_page_bg_index==29&&if_use_body_bg!=0))
		{
			$('.the_cloud').css("opacity","0");
		}
		update_datas("bg_opacity",cur_body_opacity);
	}
	if(code==33&&theEvent.shiftKey)
	{
		var tmdid=document.getElementById("tou_ming_du_inner_div");
		var new_ol=tmdid.offsetLeft+9;
		if(new_ol>tmdid.parentNode.offsetWidth-tmdid.offsetWidth/2)
		{
			new_ol=tmdid.parentNode.offsetWidth-tmdid.offsetWidth/2;
		}
		tmdid.style.left=new_ol+"px";
		cur_body_opacity=get_range_value_percent("tou_ming_du");
		$('#the_background,.the_cloud').css("opacity",get_range_value_percent("tou_ming_du"));
		if((cur_page_bg_index!=29)||(cur_page_bg_index==29&&if_use_body_bg!=0))
		{
			$('.the_cloud').css("opacity","0");
		}
		update_datas("bg_opacity",cur_body_opacity);
	}
	if(code==49&&theEvent.ctrlKey)
	{
		$('#adjust_play_mode').click();
	}
	if(code==50&&theEvent.ctrlKey)
	{
		$('#hidden_content').click();
	}
}

function back_color(code,theEvent)
{
	
	if(code==37)
	{
		allow_key_press=0;
		if(!theEvent.ctrlKey)
		{	
			if(if_kuai_tui==0)
			{
				if(which_skin_mode=="normal")
				{
					document.getElementById("other_controls_inner2").click();
				}
				if(which_skin_mode=="mo_fang")
				{
					document.getElementById("mo_fang_shang_yi_qu_outer").click();
				}
			}
		}
		document.getElementById("other_controls_inner2").style.borderColor=temp_page_color;
		document.getElementById("mo_fang_shang_yi_qu").style.borderColor=temp_page_color;
		if_kuai_tui=0;
	}
	if(code==39)
	{
		allow_key_press=0;
		if(!theEvent.ctrlKey)
		{
			if(if_kuai_jin==0)
			{
				if(which_skin_mode=="normal")
				{
					document.getElementById("other_controls_inner3").click();
				}
				if(which_skin_mode=="mo_fang")
				{
					document.getElementById("mo_fang_xia_yi_qu_outer").click();
				}
			}
		}
		
		if_kuai_jin=0;
		document.getElementById("other_controls_inner3").style.borderColor=temp_page_color;
		document.getElementById("mo_fang_xia_yi_qu").style.borderColor=temp_page_color;
	}
	
	if(code==32)
	{
		document.getElementById("play_or_pause_outer").style.borderColor=temp_page_color;
		document.getElementById("mo_fang_play_or_pause_outer").style.borderColor=temp_page_color;
	}
}
function change_progress(step)
{
	if(which_music_type!="local")
			{
				if(if_playing==1&&allow_key_press==1)
				{
					var ct=the_audio.currentTime;
					ct+=step;
					the_audio.currentTime=ct;
					use_msg_re_canvas("快"+(step>0?"进":"退")+"到"+$(play_time_div).html());
				}
			}
			else
			{
				use_msg_re_canvas("亲，本地歌曲请点击进度条快进和快退哦");
			}
}
$(function()
{
	$(window).scroll(function(event)
	{
		 event.stopImmediatePropagation();
		 event.prenentDefault();
	})
})
