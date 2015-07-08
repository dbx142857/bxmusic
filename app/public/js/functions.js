function show_page_bg_changer()
{
	$('#the_background_chooser').animate({"left":"0","top":"0"},500);
	if(if_use_body_bg==1)
				{
					$('.the_background_inner_div').css("opacity","0");
					$('.the_cloud').css("opacity","0");
					$('#the_background').css("background","url("+body_bgs[cur_the_background_inner_div_bg_index]+")");
					
				}
	change_body_bg_clock=clearInterval(change_body_bg_clock);
	body_bg_change_and_stop_flag=0;
	if(if_use_body_bg==1)
	{
		use_msg_re_canvas("壁纸更换已暂停");
	}
}
function add_body_bg(files)
{
	var files_length=files.length;
	if(files_length==0)
	{
		return false;
	}
	use_msg_re_canvas("亲，您添加了"+files.length+"张图片哦");
	for(var i=0;i<files_length;i++)
	{
		var file=files[i];
		var reader=new FileReader();
		reader.readAsDataURL(file);
		setTimeout("begin_change_bg()",500);
		reader.onload=function(e)
		{
			if_use_body_bg=1;
			if(is_img(file.name)==1)
			{
				body_bgs.push(this.result);
			}
			if(body_bgs.length==1)
			{
				document.getElementById("the_background_inner_div1").src=body_bgs[cur_the_background_inner_div_bg_index];
				document.getElementById("the_background_inner_div2").src=body_bgs[cur_the_background_inner_div_bg_index];
			}
		}
		
	}
	
}
function begin_change_bg()
{
	$('#page_bg_chooser_sure').click();	
}
function change_body_bg()
{
		if(if_use_body_bg==1)
		{
			$(".the_background_inner_div").css("display","block");
		}
		if(body_bgs.length>1)
		{
			var cur_src=body_bgs[cur_the_background_inner_div_bg_index];
			var next_index=cur_the_background_inner_div_bg_index+1;
			if(next_index==body_bgs.length)
			{
				next_index=0;
			}
			var next_src=body_bgs[next_index];
			if(cur_src!=next_src)
			{
				if(the_background_inner_div_who_showing==1)
				{
					
					$("#the_background_inner_div1").animate({"opacity":"0"},1000);
					$("#the_background_inner_div2").animate({"opacity":cur_body_opacity},1000);
					the_background_inner_div_who_showing=0;
				}
				else if(the_background_inner_div_who_showing==0)
				{
					$("#the_background_inner_div1").animate({"opacity":cur_body_opacity},1000);
					$("#the_background_inner_div2").animate({"opacity":"0"},1000);
					the_background_inner_div_who_showing=1;
				}
			}
			
		}
		cur_the_background_inner_div_bg_index++;
		if(cur_the_background_inner_div_bg_index==body_bgs.length)
		{
			cur_the_background_inner_div_bg_index=0;
		}
		setTimeout(function()
		{
			if(the_background_inner_div_who_showing==0)
			{
				document.getElementById("the_background_inner_div1").src=body_bgs[cur_the_background_inner_div_bg_index];
			}
			else if(the_background_inner_div_who_showing==1)
			{
				document.getElementById("the_background_inner_div2").src=body_bgs[cur_the_background_inner_div_bg_index];
			}
		},1500);
}
function read_files(files)
{
	var files_length=files.length;
	if(files_length==0)
	{
		return false;
	}
	use_msg_re_canvas("亲，您添加了"+files_length+"首歌曲哦");
	
				if(which_showing!="local_outer")
				{
					$('#local').click();
				}
				if(which_skin_mode=="mo_fang")
				{
					$('#change_to_normal_mode').click();
				}
				if($('#item12').text()=="显示窗口")
				{
					$('#item12').click();
					$('#change_to_normal_mode').click();
				}
	$('#click_to_add_local_mp3_msg').css("display","none");
	var reading_index=0;
	read_single_file(files[reading_index]);
	function read_single_file(reading_file)
	{
		reading_index++;
		var music_file_reader=new FileReader();
		music_file_reader.readAsDataURL(reading_file);
		var name=reading_file.name;
			var pos=$.inArray("local",music_types);
			if(typeof(every_music_type_length[pos])=="undefined"){
				every_music_type_length[pos]=0;
			}
				var length=every_music_type_length[pos];
				var page_index=parseInt(length/56);
				var song_pos=length-(page_index*56)>56?56:length-(page_index*56);
				
				every_music_type_length[pos]++;
				var length=every_music_type_length[pos];
				if(length>56)
				{
					$('#local_inner').css("width",(page_index+1)*800+"px");
					$('#previous,#next').show();
				}
				var row_index=parseInt(song_pos/7);
				var column_index=song_pos%7;
				var left=(page_index*800)+12+column_index*111;
				var top=12+row_index*72;
				var index=page_index*56+song_pos;
				var $obj=
					$("<div>")
					.html(reading_file.name)
					.appendTo($('#local_inner'))
					.attr({
						id:"local_song"+(index+1),
						class:"local_song song"
					})
					.css({
						left:left+"px",
						top:top+"px",
						color:general_color,
						borderColor:general_color
					})
				music_file_reader.onload=function()
				{
					local_musics.push(this.result);
					if(reading_index<files_length)
					{
						read_single_file(files[reading_index]);
					}
				}
	}
}
//定义随机播放歌曲的方法
var allow_random_music=1;
function random_play_music()
{
	if(allow_random_music==0)
	{
		return false;
	}
	$('#msg').hide();
	var type_index;
	for(var i=0;i<1000;i++)
	{
		type_index=parseInt(Math.random()*music_types.length);
		if(every_music_type_length[type_index]!=0)
		{
			cur_type=music_types[type_index];
			which_music_type=cur_type;
			break;
		}
		
	}
	$('#'+cur_type).click();
	di_ji_shou=parseInt(Math.random()*every_music_type_length[type_index]);
	$obj=$('.'+which_music_type+"_song").eq(di_ji_shou);
	cur_music_list=music_lists[type_index];
	$('#the_small,#now_playing').show();
	cur_type_length=every_music_type_length[type_index];
	cur_type!="local"?play_clicked_song($obj):($obj).click();
	var left=-800*(parseInt(di_ji_shou/56));
	document.getElementById(cur_type+"_inner").style.left=left+"px";
	allow_random_music=0;
	setTimeout(function()
	{
		allow_random_music=1;
	},1000);
}

function re_vol_by_range(o)
{
		the_audio.volume=o.value/100;
		the_audio1.volume=o.value/100;
}
function over_change_color(obj)
{
	obj.style.borderColor="purple";
}
function out_back_color(obj)
{
	obj.style.borderColor=temp_page_color;
}
function song_mouse_over(obj)
{
	obj.style.borderColor="purple";
	obj.style.fontSize="12px";
	obj.style.color="purple";
}
function song_mouse_out(obj)
{
	obj.style.borderColor=temp_page_color;
	obj.style.fontSize="ppx";
	obj.style.color=temp_page_color;
}

function begin_drag_files(e)
{
	
	draged_files=e.dataTransfer.files;
	e.stopPropagation();
	e.preventDefault();
	
	read_draged_files();
}

var draged_index=1;
function read_draged_files()
{
	if(draged_index==1)
				{
					var draged_mp3_files=[];
					var draged_img_files=[];
					for(var i=0;i<draged_files.length;i++)
					{
						var file=draged_files[i];
						var file_type=file.type.substring(0,5);
						if(file_type=="audio")
						{
							draged_mp3_files.push(file);
						}
						else
						{
							var name=file.name;
							var type=name.substring(name.length-4);
							if(type==".jpg"||type=="jpeg"||type==".bmp"||type==".png"||type==".gif")
							{
								draged_img_files.push(file);
							}
						}
						
					}
				}
	read_files(draged_mp3_files);
	setTimeout(function()
	{
		add_body_bg(draged_img_files);
	},1000);
}
function tell_u_the_volume(index)
	{
		var vv=the_audio.volume+index*(0.1+0.0005*index);
		vv=parseInt(vv*10)/10;
		if(vv==1.1)
		{
			vv=1;
		}
		if(vv==-0.1)
		{
			use_msg_re_canvas("已开启静音模式",100);
			return false;
		}
		the_audio.volume=vv;
		the_audio1.volume=vv;
		document.getElementById("mo_fang_volume_the_range_inner_div").style.left=the_audio.volume*100-5+"px";
		document.getElementById("fd_volume_the_range_inner_div").style.top=fd_volume_the_range_inner_div.parentNode.offsetHeight*(1-the_audio.volume)-8+"px";
		var yin_liang="▁ ▂ ▃ ▄ ▅ ▆ ▇ █ ▉ ▉";
		for(var i=0.1;i<=the_audio.volume;i+=0.1)
		{
			yin_liang=yin_liang.substring(0,parseInt(the_audio.volume*20));
		}
		if(the_audio.volume>0)
		{
			use_msg_re_canvas("当前音量:"+yin_liang,100);
			if(the_audio.muted==true)
			{
				$('#other_controls_inner4_xie_gang,#mo_fang_volume_xie_gang').css("display","block");
			}
			else
			{
				$('#other_controls_inner4_xie_gang,#mo_fang_volume_xie_gang').css("display","none");
			}
		}
		else
		{
			use_msg_re_canvas("已开启静音模式",100);
			$('#other_controls_inner4_xie_gang,#mo_fang_volume_xie_gang').css("display","block");
		}
		update_datas("sys_volume",the_audio.volume);
	}
function add_favorite_song(tmp_path)
{
	$('#log_in_to_favorite_msg').hide();
	var pos=$.inArray("favorite",music_types);
	if(typeof(every_music_type_length[pos])=="undefined"){
		every_music_type_length[pos]=0;
	}
	var length=every_music_type_length[pos];
	var page_index=parseInt(length/56);
	var song_pos=length-(page_index*56)>56?56:length-(page_index*56);
	if(!music_lists[pos]){
		music_lists[pos]=[];
	}
	favorite_musics.push(tmp_path);
	music_lists[pos]=favorite_musics;
	every_music_type_length[pos]++;
	var length=every_music_type_length[pos];
	if(which_music_type=="favorite")
	{
		cur_type_length++;
	}
	if(length>56)
	{
		$('#favorite_inner').css("width",(page_index+1)*800+"px");
	}
	if($('#favorite').attr("list_mode")==undefined)
	{
		$('#favorite').attr("list_mode",list_mode);
	}
	if($('#favorite').attr("list_mode")=="DIV")
	{
		add_song_for_div_list_mode(page_index,song_pos,"favorite");
	}
	else
	{
		var the_length=length-1;
		var page_index=parseInt(the_length/28);
		var song_pos=the_length<28?the_length:the_length-(page_index*28);
		add_song_for_list_list_mode(page_index,song_pos,"favorite");
	}
	req_update_favorites("jia",favorite_musics[length-1]);
}

function req_update_favorites(msg,song_name)
{
	if(cur_user_id!=null)
	  	  {
		  $.ajax({
			   type: "GET",
			   url: "index.php?m=Ajax&a=update_favorite_songs",
			   data:"song_name="+song_name+"&msg="+msg
	  	 	});
	  	  }
}
//param必须与数据库中的字段对应
function update_datas(param,value)
{
	if(cur_user_id!=null)
	  	  {
	  	  	$.ajax({
	  	  		type:"POST",
	  	  		url:"index.php?m=Ajax&a=let_me_update",
	  	  		data:param+"="+value,
                success:function(msg){
                }
	  	  	})
	  	  }
}
function load_form()
{
	if($('body').attr("if_form_loaded")==undefined)
	{
		$('#register_and_log_in').load("app/public/html/form.html",function()
		{
			$('body').attr("if_form_loaded",1);
			$('#login_ti_shi').find("a:lt(2)").click(function()
			{
				if($('#suggest').css("display")!="none")
				{
					$('#suggest #close').click();
				}
				if(!document.getElementById("log_in_zhe_zhao"))
				{
					$("<div>")
					.appendTo($('body'))
					.attr({
						id:"log_in_zhe_zhao"
					});
				}
				show_in_center(document.getElementById("register_and_log_in"));
				$("#register_and_log_in")
				.removeClass("slideDown")
				.show()
				.addClass("slideExpandUp");
			})
			$('#login_ti_shi').children().first().click();
		});
		
		
	}
}
function register_remove_favorite_icon_event(remove_favorite_icon)
{
	$(remove_favorite_icon)
				.attr("title","亲，点击取消收藏哦")
				.hover(function()
				{
					$('.remove_favorite_icon_inner_text').css("color","purple");
				},function()
				{
					$('.remove_favorite_icon_inner_text').css("color","pink");
				})
				.click(function()
				{
					var txt=$(this).parent().parent().text();
					txt=txt.substring(0,txt.length-2);
					use_msg_re_canvas("取消收藏："+txt);
					var song=remove_favorite_icon.parentNode.parentNode;
					var songs=document.getElementsByClassName("favorite_song");
					var index=$(songs).index($(song));
					var will_removed_song_name=favorite_musics[index];
					var pos=$.inArray("favorite",music_types);
					var length=every_music_type_length[pos];
					if(list_mode=="LIST"&&index==length-1)
					{
						$(song).prev().remove();
					}
					if(length%56==1)
					{
						var obj=document.getElementById("favorite_inner");
						if(obj.offsetWidth>0)
						{
							obj.style.width=obj.offsetWidth-800+"px";
							if(obj.offsetWidth+obj.offsetLeft==0)
							{
								$(obj).animate({
									left:obj.offsetLeft+800+"px"
								},500);
							}
						}
						
					}
					for(var i=index;i<length-1;i++)
					{
							var obj1=songs[i];
							var obj2=songs[i+1];
							if(list_mode=="LIST"&&i==length-2)
							{
								$(obj2).prev().remove();
							}
							$(obj1).html($(obj2).text());
							$(obj2).html("");
							
					}
					music_lists[pos].splice(index,1);
					every_music_type_length[pos]--;
					if(every_music_type_length[pos]==0)
					{
						$('#log_in_to_favorite_msg').html("亲,可点击❤可以收藏您喜欢的歌曲哦").show();
					}
					$(songs[songs.length-1]).remove();
					req_update_favorites("jan",will_removed_song_name);
					cur_type_length--;
				})
			var content=new Array("╱","╲");
			for(var i=0;i<2;i++)
			{
				var obj=document.createElement("div");
				obj.className="remove_favorite_icon_inner_text";
				obj.innerHTML=content[i];
				remove_favorite_icon.appendChild(obj);
			}
}

function register_favorite_icon_event(favorite_icon)
	{
		$(favorite_icon).attr("title","亲，点击收藏这首歌曲哦");
		favorite_icon.innerHTML="❤";
		$(favorite_icon).click(function()
		{
			var song=this.parentNode.parentNode;
			favorite_icon_click_event(song);
		})
		.hover(function()
		{
			$(this).css("color","purple");
		},function()
		{
			$(this).css("color","pink");
		})
	}
function show_down_icon(parent_obj)
	{
		var down_ajax_data={
			path:null,
			name:null,
			is_ie:null
		}
		$down_icon=$("<a>")
			.appendTo($(parent_obj))
			.attr({
				id:"down_icon",
				href:"javascript:;",
				//song_href:"index.php?m=Ajax&a=download_mp3_file",
				target:"_black",
				title:"亲，点击下载这首歌曲哦"
			});
		$down_icon_up=$("<div>")
			.appendTo($down_icon)
			.attr({
				id:"down_icon_up"
			})
		make_arraw(8,"down","down_icon_down","pink","down_icon");
		$down_icon.hover(function()
		{
			var $song=$(this.parentNode.parentNode);
			var pos=$.inArray(cur_type,music_types);
			var class_name=$song.attr("class");
			class_name=class_name.substring(0,class_name.indexOf(" "));
			var index=$('.'+class_name).index($song);
			var path=$song.parent().attr("path")+music_lists[pos][index];
			//path=path.substring(0,path.length-3);
			var name=base_name(path);
			name=$.browser.mozilla?name.replace(/[ ]/gi,""):name;
			down_ajax_data={
				path:path,
				name:name,
				is_ie:$.browser.msie?1:0
			}
			//$(this).attr("href","index.php?m=Ajax&a=download_mp3_file&path="+path+"&name="+name+"&is_ie="+$.browser.msie?1:0);
			
			// document.cookie="path="+path;
			// document.cookie="name="+name;
			// if($.browser.msie)
			// {
				// document.cookie="is_ie="+1;
			// }
			// else
			// {
				// document.cookie="is_ie="+0;
			// }
			
			
			$('#'+$(this).attr("id")+"_up").css("background","purple");
			$('#'+$(this).attr("id")+"_down").css("border-color","purple transparent transparent transparent");
		},function()
		{
			$('#'+$(this).attr("id")+"_up").css("background","pink");
			$('#'+$(this).attr("id")+"_down").css("border-color","pink transparent transparent transparent");
		})
		.click(function(){
			$.ajax({
				type:"post",
				url:"index.php?m=Ajax&a=download_mp3_file",
				data:down_ajax_data,
				success:function(e){
					console.log(e);
				}
			})
		})
	}

	
function favorite_icon_click_event(song)
{
	if(cur_user_id==null)
			{
				use_msg_re_canvas("亲，你还未登陆，不能收藏歌曲哦");
			}
			else
			{
			var the_class=song.className;
			var type=the_class.substring(0,the_class.indexOf("song")-1);
			var type_index=$.inArray(type,music_types);
			var name=$(song).text();
			if(name.indexOf("❤")!=-1)
				{
					name=name.substring(0,name.length-1);
				}
			var tmp_path=$(song.parentNode).attr("path")+name;
			var if_cur_song_exist=0;
			for(var i=0;i<favorite_musics.length;i++)
			{
				if(favorite_musics[i]==base_name(tmp_path))
				{
					use_msg_re_canvas("亲，这首歌曲您已经收藏过了哦");
					if_cur_song_exist=1;
					break;
				}
			}
			if(if_cur_song_exist==0)
			{
				var begin_x=get_abs_pos_x(song);
				if(begin_x<fd.offsetLeft+1100&&fd.style.display!="none"&&(which_showing.indexOf(which_music_type)!=-1||which_music_type==null))
				{
					var heart=document.getElementById("heart_png");
					var my=document.getElementById("favorite");
					
					var begin_y=get_abs_pos_y(song);
					var x=get_abs_pos_x(my)+my.offsetWidth/2;
					var y=get_abs_pos_y(my)+my.offsetHeight/2;
					$(heart)
					.css({
						left:begin_x+"px",
						top:begin_y+"px",
						width:"128px",
						height:"128px"
					})
					.fadeIn(200)
					.animate({
						"left":x+"px",
						"top":y+"px",
						"width":"0",
						"height":"0"
					},500).fadeOut(0);
				}
				tmp_path=base_name(tmp_path);
				add_favorite_song(tmp_path);
				use_msg_re_canvas("成功收藏："+name);
			}

			}
	
}
function request_the_lrc(content) 
{
  	$.ajax({
   type: "post",
   url: "index.php?m=Ajax&a=load_lrc",
   data:{lrc_name:content},
   success:function(txt){
   		setTimeout(function()
   		{
   		lrc_value=txt;
   		 if(lrc_value.indexOf("<h1>Not Found</h1>")==-1)
	       {
	       	   lrc_file_name=music_name.substring(0,music_name.length-3)+"lrc";
	       	   if($('#lrc_panel').css("display")=="block")
	       	   {
	       	   		if($('#lrc_panel').get(0).offsetWidth==screen.width)
	       	   		{
	       	   			$('#font_size_jia,#font_size_jian').show();
						$('#lrc_menu_bg').css("height","130px");
	       	   		}
	       	   		analysis_lrc();
	       	   }
		   }
		   else
		   {
		   		$('#no_lrc_msg').css("display","block");
		   }
   		},300);
   }
})
}