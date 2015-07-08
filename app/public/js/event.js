var favorite_and_down;

function initial_event()
{
	//处理鼠标事件
	(function(){
		function handle(delta) {
	    var s = delta + ": ";
	    if (delta <0)
	        tell_u_the_volume(-1);
	    else
	        tell_u_the_volume(1);
	}
	 
	function wheel(event){
	    var delta = 0;
	    if (!event) event = window.event;
	    if (event.wheelDelta) {
	        delta = event.wheelDelta/120; 
	        if (window.opera) delta = -delta;
	    } else if (event.detail) {
	        delta = -event.detail/3;
	    }
	    if (delta)
	        handle(delta);
	}
	 
	if (window.addEventListener)
	window.addEventListener('DOMMouseScroll', wheel, false);
	window.onmousewheel = document.onmousewheel = wheel;

	})()
	
	
	//本地音乐图标点击事件:'
	$("#local").click(function(){
		$('#list_mode_spliter').stop().animate({
			opacity:0
		},500);
	})
	var hide_menu=function()
	{
		$('#menu_item_whole')
				.stop()
				.animate({
					height:"0px"
				},200,function()
				{
					$('#menu_item_whole').css({
						overflow:"hidden"
					});
				});
				$('#menu').css({
					borderBottomWidth:"2px",
					borderBottomLeftRadius:"5px",
					borderBottomRightRadius:"5px"
				}).attr({
					title:"点击展开菜单项"
				});
	}
	$('#menu')
		.mouseenter(function(e)
		{
			var e=e?e:window.event;
			var tar=e.srcElement||e.target;
			if(tar.id=="menu"||tar.id=="menu_up"||tar.parentNode.id=="menu"||tar.parentNode.id=="menu_up")
			{
				$('#menu_item_whole')
				.stop()
				.animate({
					height:"205px"
				},200,function()
				{
					$('#menu_item_whole').css({
						overflow:"visible"
					});
				});
				$('#menu').css({
					borderBottomWidth:"0",
					borderBottomLeftRadius:"0px",
					borderBottomRightRadius:"0px"
				}).attr({
					title:"点击收回菜单项"
				});
			}
		});
	$('#the_body').click(function(e)
	{
		var e=e?e:window.event;
		var tar=e.srcElement||e.target;
		if(tar.id=="the_body")
		{
			hide_menu();
		}
		else
		{
			if(tar.id!="menu_item_whole"&&tar.parentNode.parentNode.parentNode.id!="menu_item_whole"&&tar.parentNode.parentNode.id!="menu_item_whole"&&tar.parentNode.id!="menu_item_whole"&&tar.id!="menu"&&tar.id!="menu_up"&&tar.parentNode.id!="menu"&&tar.parentNode.id!="menu_up"&&tar.parentNode.parentNode.parentNode.id!="menu_item_whole")
			{
				hide_menu();
			}
		}
	})
	$('#fd_opacity_range').mousemove(function()
	{
		var opacity=get_range_value_percent("fd_opacity_range");
		document.getElementById("fd_bg_img").style.opacity=opacity;
	}).mouseup(function()
	{
		update_datas("fd_opacity",document.getElementById("fd_bg_img").style.opacity);
	})
	$('#fd_opacity').hover(function()
	{
		$('#fd_opacity_range').css({
			top:"0"
		});
	},function()
	{
		$('#fd_opacity_range').css({
			top:"2000px"
		});
	})
	//鼠标经过某些元素时播放音效
	$('.music_type_menu_item,.mouse_menu_item').live('mouseenter',function()
	{
		var obj=document.getElementById("the_audio1");
		if(obj.src=="")
		{
			obj.src="app/public/media/se.mp3";
		}
		obj.play();
	})
	
	$('.music_type_menu_item').not($('#local')).hover(function()
	{
		$('.music_type_menu_item').not($(this)).not($('#local')).css("opacity","0.4");
	},function()
	{
		$('.music_type_menu_item').css("opacity","1");
	})
	
//魔方模式下鼠标hover时展开菜单
	$("#mo_fang_whole").hover(function()
	{
		$('.mo_fang_item_outer').css("display","block");
	},function()
	{
		$('.mo_fang_item_outer').css("display","none");
	})
	//魔方声音按钮hover时展开调节声音的滑条
	$('#mo_fang_volume_outer').hover(function()
	{
		$('#mo_fang_volume_the_range').css("display","block");
	},function()
	{
		$('#mo_fang_volume_the_range').css("display","none");
	})
	
	$('#local,.other_controls_inner,#play_or_pause_outer,#mo_fang_volume,#mo_fang_play_or_pause_outer,#mo_fang_shang_yi_qu,#mo_fang_xia_yi_qu,#mo_fang_jin_du').mouseover(function()
	{
		over_change_color(this);
	})
	$('#local,.other_controls_inner,#play_or_pause_outer,#mo_fang_volume,#mo_fang_play_or_pause_outer,#mo_fang_shang_yi_qu,#mo_fang_xia_yi_qu,#mo_fang_jin_du').mouseout(function()
	{
		out_back_color(this);
	})
	$('#adjust_play_mode,.theme_div,#change_to_normal_mode,#hidden_content,#change_theme,#change_to_mo_fang_mode,.page_bg_div')
	.bind("mouseenter",function(){
		$(this).css("border-color","purple");
	})
	.bind("mouseleave",function(){
		$(this).css("border-color",temp_page_color);
	})
	$('#menu,#menu_item_whole').hover(function()
	{
		$('#menu,#menu_item_whole').css("border-color","purple");
	},function()
	{
		$('#menu,#menu_item_whole').css("border-color",temp_page_color);
	})
	$('#sure').hover(function()
	{
		$(this).css("background","purple");
	},function()
	{
		$(this).css("background","orange");
	})
	$('#mo_fang_jin_du_outer').hover(function()
	{
		$('#mo_fang_jin_du_the_range_long').css("display","block");
	},function()
	{
		$('#mo_fang_jin_du_the_range_long').css("display","none");
	})
	
	$('#other_controls_inner4').hover(function()
	{
		document.getElementById("fd_volume_the_range").style.display="block";
		fd_volume_the_range_inner_div.style.top=fd_volume_the_range_inner_div.parentNode.offsetHeight*(1-the_audio.volume)-16+"px";
	},function()
	{
		document.getElementById("fd_volume_the_range").style.display="none";
	})
	
	
	
	
	
	
	
	$('#change_theme').one("click",function()
	{
		$('#theme_changer').load("app/public/html/fd_skin_manager.html",{num:Math.random()*99999});
	})
	$('.local_song')
	.live("click",function()
					{
						look_me($(this));
						$group=$('.'+cur_type+'_song');
						$group.css({
							color:general_color,
							borderColor:general_color
						})
							$(this).css({
							color:"purple",
							borderColor:"purple"
						});
							di_ji_shou=$group.index($(this));
							music_name=$(this).text();
							document.getElementById("mo_fang_whole_outer").title="正在播放："+music_name;
							$('#now_playing').html(music_name);
							$('#the_small,#now_playing,#play_time').show();
							var pos=$.inArray("local",music_types);
							cur_type_length=every_music_type_length[pos];
							which_music_type="local";
							the_audio.src=local_musics[di_ji_shou];
							the_audio.play();
							if(if_playing==0) 
							{
								$('#play_or_pause_outer').click();
							}
						})
	$('#tou_ming_du').click(function()
	{
		cur_body_opacity=get_range_value_percent("tou_ming_du");
		update_datas("bg_opacity",cur_body_opacity);
	})
	$('#previous')
	.hover(function()
	{
		$(this).css("border-color","transparent purple transparent transparent").css("opacity","1");
	},function()
	{
		$(this).css("border-color","transparent "+temp_page_color+" transparent transparent").css("opacity","0.7");
	})
	.click(function()
	{
		if(list_mode=="LIST")
		{
			$('#list_mode_spliter').css({
				opacity:"0"
			}).stop().animate({
				opacity:"1"
			},1000);
		}
		var obj=document.getElementById(cur_type+"_inner");
		var ol=obj.offsetLeft;
		if(ol%800==0)
		{
			if(ol==0)
			{
				use_msg_re_canvas("亲，当前已经是第一页了哦");
			}
			else
			{
				
				$(obj).animate({
					left:ol+800+"px"
				},300,function()
				{
					use_msg_re_canvas("第"+(-obj.offsetLeft/800+1)+"页，共"+obj.offsetWidth/800+"页");
				})
			}
		}


	})
	$('#next')
	.hover(function()
	{
		$(this).css("border-color","transparent transparent transparent purple").css("opacity","1");
	},function()
	{
		$(this).css("border-color","transparent transparent transparent "+temp_page_color).css("opacity","0.7");
	})
	.click(function()
	{
		if(list_mode=="LIST")
		{
			$('#list_mode_spliter').css({
				opacity:"0"
			}).stop().animate({
				opacity:"1"
			},1000);
		}
		var obj=document.getElementById(cur_type+"_inner");
		var ol=obj.offsetLeft;
		if(ol%800==0)
		{
			if(ol==800-obj.offsetWidth)
			{
				use_msg_re_canvas("亲，当前已经是最后一页了哦");
			}
			else
			{
				$(obj).animate({
					left:ol-800+"px"
				},300,function()
				{
					use_msg_re_canvas("第"+(-obj.offsetLeft/800+1)+"页，共"+obj.offsetWidth/800+"页");
				})
			}
		}
	})
	$('#other_controls_inner3,#other_controls_inner2').click(function()
	{
		if($(the_audio).attr("src")==undefined)
		{
			use_msg_re_canvas("亲，当前未播放任何歌曲哦");
		}
		else
		{
			
			if(if_playing==0)
			{
				view_system_status_clock=setInterval("view_system_status()",200);
				$('#pause,#mo_fang_pause').css("display","block");
			    $('#play,#mo_fang_play').css("display","none");
			    if_playing=1;
			}
		}
	})
	$('#other_controls_inner3').click(function()
	{
		if($(the_audio).attr("src")!=undefined)
		{
			if(di_ji_shou==cur_type_length-1)
			{
				if(play_mode!="mu_lu_xun_huan")
				{
					use_msg_re_canvas("亲，已经最后一首歌曲了哦");	
				}
				else
				{
					di_ji_shou=0;
					var $obj=$('.'+which_music_type+"_song").eq(0);
					which_music_type!="local"?play_clicked_song($obj):$obj.click();
					var inner=document.getElementById(which_music_type+"_inner");
					$(inner).animate({
						left:"0"
					},300);
				}
			}
			else
			{
				var $obj=$('.'+which_music_type+"_song").eq(di_ji_shou+1);
				if(which_music_type!="local")
				{
					di_ji_shou++;
					play_clicked_song($obj);
					
				}
				else
				{
					$obj.click();
				}
				if(di_ji_shou%56==0&&which_music_type==cur_type&&document.getElementById(cur_type+"_inner").offsetLeft==-(di_ji_shou/56-1)*800)
					{
						$('#next').click();
					}
			}
		}
	})
	$('#other_controls_inner2').click(function()
	{
		if($(the_audio).attr("src")!=undefined)
		{
			if(di_ji_shou==0)
			{
				if(play_mode!="mu_lu_xun_huan")
				{
					use_msg_re_canvas("亲,当前已经第一首歌曲了哦");
				}
				else
				{
					di_ji_shou=cur_type_length-1;
					var $obj=$('.'+which_music_type+"_song").eq(di_ji_shou);
					which_music_type!="local"?play_clicked_song($obj):$obj.click();
					var inner=document.getElementById(which_music_type+"_inner");
					$(inner).animate({
						left:800-inner.offsetWidth+"px"
					},300);
				}
			}
			else
			{
				if(di_ji_shou%56==0&&which_music_type==cur_type&&document.getElementById(cur_type+"_inner").offsetLeft==-parseInt(di_ji_shou/56)*800)
					{
						$('#previous').click();
					}
				var $obj=$('.'+which_music_type+"_song").eq(di_ji_shou-1);
				if(which_music_type!="local")
				{
					di_ji_shou--;
					play_clicked_song($obj);
				}
				else
				{
					$obj.click();
				}
				
			}
		}
	})
	$('#sure').click(function()
	{
		var msg=document.getElementById("msg");
		$(msg).animate({
			left:(screen.width-msg.offsetWidth)/2+"px",
			top:(screen.height-msg.offsetHeight)/2+50+"px"
		},300)
		.animate({
			left:(screen.width-msg.offsetWidth)/2+"px",
			top:-msg.offsetHeight+"px"
		},300)
	})
	$('#the_range1,#mo_fang_jin_du_the_range_long,#mo_fang_jin_du_the_range').bind("click",function()
	{
		
			var jin_du=get_range_value_percent(this);
			the_audio.currentTime=document.getElementById("the_audio").duration*jin_du;
		
	})
	$('#fd_volume_the_range,#mo_fang_volume_the_range').bind("mousemove",function()
	{
		var jin_du=get_range_value_percent(this.id);
		the_audio.volume=jin_du;
		the_audio1.volume=jin_du;
	}).bind("mouseup",function()
	{
		tell_u_the_volume(0);
	})
	
	//正常模式下暂停和播放按钮的点击事件
	$('#play_or_pause_outer').click(function(){
		if(if_playing==0)
		{
			if($(the_audio).attr("src")==undefined)
			{
				use_msg_re_canvas("亲，当前未播放任何歌曲哦");
			}
			else
			{
				view_system_status_clock=clearInterval(view_system_status_clock);
				view_system_status_clock=setInterval("view_system_status()",200);
				if_playing=1;
				the_audio.play();
				$('#pause,#mo_fang_pause').css("display","block");
				$('#play,#mo_fang_play').css("display","none");
				if(check_if_lrc_equals_mp3()==1&&$('#lrc_panel').css("display")!="none")
					{
						stop_play_lrc();
						analysis_lrc();
					}
			}
			
		}
		else
		{
			view_system_status_clock=clearInterval(view_system_status_clock);
			if_playing=0;
			the_audio.pause();
			$('#pause,#mo_fang_pause').css("display","none");
			$('#play,#mo_fang_play').css("display","block");
			cur_lrc_line_index_check_clock=clearInterval(cur_lrc_line_index_check_clock);
		}
	})
	$('#change_to_mo_fang_mode')
	.one("click",function()
	{
		if(if_playing==1)
		{
			$('#mo_fang_play').hide();
		}
		//魔方模式下上一曲点击事件
		document.getElementById("mo_fang_shang_yi_qu_outer").onclick=function()
		{
			document.getElementById("other_controls_inner2").click();
		}
		//魔方模式下下一曲点击事件
		document.getElementById("mo_fang_xia_yi_qu_outer").onclick=function()
		{
			document.getElementById("other_controls_inner3").click();
		}
		//魔方模式下暂停和播放按钮点击事件
		$('#mo_fang_play_or_pause_outer').click(function()
		{
			$('#play_or_pause_outer').click();
		})
		$(this).click(function()
		{
			setTimeout(function()
			{
				$('#menu_item_whole')
				.stop()
				.animate({
					height:"0px"
				},300,function()
				{
					$('#menu_item_whole').css({
						overflow:"hidden"
					});
				});
			},500)
			$(fd).stop();
			$('#mo_fang_whole_outer').stop();
			which_skin_mode="mo_fang";
			if(change_mode_direction%4==1)
			{
				$('#fd')
					.animate({"left":screen.width+"px","top":screen.height+"px","opacity":"0"},500);
				$('#mo_fang_whole_outer')
					.css("left","-208px")
					.css("top","-208px")
					.css("opacity","0")
					.animate({"left":screen.width/2-144+"px","top":screen.height/2-144+"px","opacity":"1"},500);
					
			}
			if(change_mode_direction%4==2)
			{
				$('#fd').animate({"left":screen.width+"px","top":"-604px","opacity":"0"},500);
				$('#mo_fang_whole_outer')
				.css("left","-208px")
				.css("top",screen.height+"px")
				.css("opacity","0")
				.animate({"left":screen.width/2-144+"px","top":screen.height/2-144+"px","opacity":"1"},500);
			
			}
			if(change_mode_direction%4==3)
			{
				$('#fd').animate({"left":"-304px","top":screen.height+"px","opacity":"0"},500);
				$('#mo_fang_whole_outer')
				.css("left",screen.width+"px")
				.css("top","-208px")
				.css("opacity","0")
				.animate({"left":screen.width/2-144+"px","top":screen.height/2-144+"px","opacity":"1"},500);
			
			}
			if(change_mode_direction%4==0)
			{
				$('#fd').animate({"left":"-304px","top":"-304px","opacity":"0"},500);
				$('#mo_fang_whole_outer')
				.css("left",screen.width+"px")
				.css("top",screen.height+"px")
				.css("opacity","0")
				.animate({"left":screen.width/2-144+"px","top":screen.height/2-144+"px","opacity":"1"},500);
			
			}
		}).click();
		$('#change_to_normal_mode').one("click",function()
		{
			$(this).click(function()
			{
				$('#fd').stop();
				$('#mo_fang_whole_outer').stop();
				which_skin_mode="normal";
				var sw=screen.width;
				var sh=screen.height;
				var cl=(screen.width-fd.offsetWidth)/2;
				var ct=screen.height/2-302;
				if(change_mode_direction%4==1)
				{
					$('#mo_fang_whole_outer').animate({"left":"-208px","top":"-208px","opacity":"0"},500);
					$('#fd')
						.css("left",sw+"px")
						.css("top",sh+"px")
						.css("opacity","0")
						.animate({"left":cl+"px","top":ct+"px","opacity":"1"},500);
				}
				if(change_mode_direction%4==2)
				{
					$('#mo_fang_whole_outer').animate({"left":"-208px","top":screen.height+"px","opacity":"0"},500);
					$('#fd')
					.css("left",sw+"px")
					.css("top","-604px")
					.css("opacity","0")
					.animate({"left":cl+"px","top":ct+"px","opacity":"1"},500);
				}
				if(change_mode_direction%4==3)
				{
					$('#mo_fang_whole_outer').animate({"left":screen.width+"px","top":"-208px","opacity":"0"},500);
					$('#fd')
					.css("left","-304px")
					.css("top",sh+"px")
					.css("opacity","0")
					.animate({"left":cl+"px","top":ct+"px","opacity":"1"},500);
				}
				if(change_mode_direction%4==0)
				{
					
					$('#mo_fang_whole_outer').animate({"left":screen.width+"px","top":screen.height+"px","opacity":"0"},500);
					$('#fd')
					.css("left","-304px")
					.css("top","-604px")
					.css("opacity","0")
					.animate({"left":cl+"px","top":ct+"px","opacity":"1"},500);
				}
				change_mode_direction++;
			}).click();
		})
	})
	
	
	
	//隐藏正常模式下右方的列表
	$('#hidden_content').click(function()
	{
		$('#list_mode_spliter').stop().animate({
			opacity:"0"
		},500);
		$(fd).animate({
			width:"300px"
		},500);
		$('#previous,#next').hide();
		if(which_showing!="none")
		{
			var obj=document.getElementById(which_showing);
			$('#'+obj.id).animate({"width":"0"},500).animate({"width":"800px"},0,function()
				{
					var obj=document.getElementById(which_showing);
					obj.style.display="none";
					which_showing="none";
				});
		}
		else
		{
			use_msg_re_canvas("亲，列表已经隐藏了哦");
		}
	})
	//主题切换按钮点击事件
	$('#change_theme').click(function()
	{
		$('#list_mode_spliter').stop().animate({
			opacity:0
		},500);
		which_showing="theme_changer";
		$('#previous,#next').hide();
		$('.music_outer')
						.animate({
								width:0
							},250);
					$(fd).animate({
						width:"1100px"
					},250);
					$('#theme_changer')
						.show()
						.animate({
								width:"800px"
							},250)
	})
	//调整音乐循环模式
	$('#adjust_play_mode').click(function()
	{
		$('.control_play_mode_div').css("display","none");
		if(play_mode=="shun_xu")
		{
			play_mode="sui_ji";
			$(this).attr("title","亲，当前为随机模式，点击切换到单曲循环模式哦");
			$('#sui_ji_mode').css("display","block");
			use_msg_re_canvas("已切换为随机播放模式");
		}
		else if(play_mode=="sui_ji")
		{
			play_mode="dan_qu_xun_huan";
			$(this).attr("title","亲，当前为单曲循环模式，点击切换到目录循环模式哦");
			$('#xun_huan_mode').css("display","block");
			use_msg_re_canvas("已切换为单曲循环模式");
		}
		else if(play_mode=="dan_qu_xun_huan")
		{
			play_mode="mu_lu_xun_huan";
			$(this).attr("title","亲，当前为目录循环播放模式，点击切换到顺序模式哦");
			$('#mu_lu_xun_huan_mode').css("display","block");
			use_msg_re_canvas("已切换为目录循环播放模式");
		}
		else if(play_mode=="mu_lu_xun_huan")
		{
			play_mode="shun_xu";
			$(this).attr("title","亲，当前为顺序播放模式，点击切换到随机播放模式哦");
			$('#shun_xu_mode').css("display","block");
			use_msg_re_canvas("已切换为顺序播放模式");
		}
	})
	$('#the_range1','#mo_fang_jin_du_the_range_long','#mo_fang_jin_du_the_range').click(function()
	{
		if($(the_audio).attr("src")==undefined)
		{
			this.style.left="-5px";
		}
	})
	$('#other_controls_inner4_garbage').click(function()
	{
		if(the_audio.muted==false)
		{
			use_msg_re_canvas("已打开静音模式");
			the_audio.muted=true;
			$('#other_controls_inner4_xie_gang,#mo_fang_volume_xie_gang').css("display","block");
		}
		else if(the_audio.muted==true)
		{
			use_msg_re_canvas("已关闭静音模式");
			the_audio.muted=false;
			$('#other_controls_inner4_xie_gang,#mo_fang_volume_xie_gang').css("display","none");
		}
		
	})
	if(cur_user_id==null)
	{
		var $login_ti_shi=$('#login_ti_shi');
		$login_ti_shi.children().last().one("click",function()
		{
			$('#suggest').load("app/public/html/suggest.html",{num:Math.random()*99999});
		})
		$login_ti_shi.find("a:lt(2)").one("click",function()
			{
				load_form();
			})
	}
	
}

