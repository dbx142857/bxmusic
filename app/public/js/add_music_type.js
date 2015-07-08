function add_music_type(
	type_id,//类型对应菜单项的id
	content,//菜单项里的文字
	cate_id//分类的id编号
	)
{	
	var $item,$outer,$inner,
		  arr=eval(type_id+"_musics"),
		  arr_length=null,//先不统计数组长度，待第一次音乐数据加载过来之后再统计才准确
		  page_num=null;
	music_types.push(type_id);
	var pos=$.inArray(type_id,music_types);
	var all_class=["gray","blue","green","red","purple","orange"];
	var $item=
			$("<div>")
				.appendTo($(fd))
				.attr({
					id:type_id,
					list_mode:list_mode,
					cate_id:cate_id
				}).one("click",function()
				{
					if(type_id!="favorite"&&type_id!="local")
					{
						$.ajax({
							type:"post",
							url:"index.php?m=Ajax&a=load_music_datas",
							data:{
								cate_id:cate_id
							},
							async:false,
							success:function(msg){
								var pos=$.inArray(type_id,music_types);
								tmp_arr=[];
								var msg=$.parseJSON(msg);
								for(var i in msg){
									var item=msg[i];
									tmp_arr.push(item.name);
								}
                                arr_length=tmp_arr.length;
                                page_num=parseInt(arr_length/56)+1;
                                music_lists[pos]=tmp_arr;
								every_music_type_length[pos]=arr_length;
                                $("#"+type_id+"_inner")
                                	.css({
                                        width:page_num*800+"px"
                                    });
                                switch(pos){
                                	case 0:
                                	{
                                		zui_xin_musics=tmp_arr;
                                		break;
                                	}
                                	case 1:
                                	{
                                		qq_dance_musics=tmp_arr;
                                		break;
                                	}
                                	case 2:
                                	{
                                		dj_musics=tmp_arr;
                                		break;
                                	}
                                	case 3:
                                	{
                                		sleep_musics=tmp_arr;
                                		break;
                                	}
                                }
							}
						})
						if(list_mode=="DIV")
						{
							for(var i=0;i<page_num;i++)
							{
								var sub_num=arr_length-(i*56)>56?56:arr_length-(i*56);
								for(var j=0;j<sub_num;j++)
								{
									add_song_for_div_list_mode(i,j,type_id);
								}
							}
						}
						else
						{
							var list_mode_page_num=parseInt(arr_length/28)+1;
							for(var i=0;i<list_mode_page_num;i++)
							{
								var sub_num=arr_length-(i*28)>28?28:arr_length-(i*28);
								for(var j=0;j<sub_num;j++)
								{
									add_song_for_list_list_mode(i,j,type_id);
								}
							}
						}
					}
				}).click(function()
				{
					if(this.id!="local")
					{
						if(list_mode=="LIST")
						{
							$('#list_mode_spliter').stop().animate({
									opacity:"1"
								},1000);
						}
						else
						{
							$('#list_mode_spliter').stop().animate({
									opacity:"0"
								},1000);
						}
					}
					if(this.id=="favorite"||this.id=="local")
					{
						var pos=$.inArray(this.id,music_types);
						var length=every_music_type_length[pos];
						if(length==0)
						{
							$('#list_mode_spliter').stop().animate({
									opacity:"0"
								},1000);
						}
						else if(list_mode=="LIST")
						{
							$('#list_mode_spliter').stop().animate({
									opacity:"1"
								},1000);
						}
					}
					if($(this).attr("list_mode")!=list_mode)
					{
						$(this).attr("list_mode",list_mode);
						if(list_mode=="LIST")
						{
							change_to_list_list_mode(this);
						}
						else
						{
							change_to_div_list_mode(this);
						}
					}
					if(this.id=="favorite")
					{
						$(this).attr("list_mode",list_mode);
						$('#favorite_inner .list_nums').remove();
						if(list_mode=="LIST")
						{
							change_to_list_list_mode(this);
							if(cur_user_id==null||$.trim($("#favorite_inner").html())==""){
								$('#list_mode_spliter').stop().animate({
									opacity:"0"
								},1000);
							}
						}
						else
						{
							change_to_div_list_mode(this);
						}
					}
					$(fd).animate({
						width:"1100px"
					},200);
					var pos=$.inArray(type_id,music_types);
					$('.music_type_menu_item').not($('#local')).css({
						borderColor:"transparent"
					})
					$(this).css({
						borderColor:temp_page_color,
						borderWidth:type_id=="local"?"2px":"5px"
					})
					cur_type=type_id;
					which_showing=type_id+"_outer";
					setTimeout(function()
								{
									every_music_type_length[pos]>56?$('#previous,#next').show():$('#previous,#next').hide();
									$('#'+which_showing)
										.show()
										.animate({
												width:"800px"
											},200)
								},250);
					$('#theme_changer,.music_outer').not($('#'+type_id+"_outer"))
						.animate({
								width:0
							},200);
				})
	if(type_id!="local")
	{
		$item.attr("class","music_type_menu_item music_type_menu_item_button "+all_class[pos%6]);
		$("<div class='shine'>").appendTo($item).html(content);
		$item.css({
			top:parseInt(pos/2)*80+10+"px",
			left:pos%2*140+20+"px"
		})
	}
	else
	{
		$item.attr("class","music_type_menu_item").attr("title","亲，本地音乐打开后在这里播放哦").html(content);
	}
	var	$outer=
			$("<div>")
			.appendTo($(fd))
			.attr({
				id:type_id+"_outer",
				class:"music_outer"
			})
	var	$inner=
			$("<div>")
			.appendTo($outer)
			.attr({
				id:type_id+"_inner",
				class:"music_inner",
                path:type_id=="local"?"":"http://bxmusic-bxmusic.stor.sinaapp.com/"
			})
}
function add_song_for_list_list_mode(page_index,song_pos,type_id)
{
	var $parent=$('#'+type_id+"_inner");
	var $song=
				$("<div>")
				.appendTo($parent);
	var k=page_index*28+song_pos;
	var $index_num;
			var common_css={
				height:"18px",
				lineHeight:"18px",
				top:(song_pos*21+4)+"px"
			}
			$song.css(common_css).css({
				left:50+400*page_index+"px",
				color:general_color,
				width:"320px",
				border:"none",
				overflow:"hidden",
				padding:"0",
				borderRadius:"0",
				borderBottom:"dashed 1px"
			}).hover(function()
			{
				if(list_mode=="LIST")
				{
					$index_num.css("color","purple");
				}
			},function()
			{
				if(list_mode=="LIST")
				{
					$index_num.css("color","#E26DE2");
				}
			})
            var num;
   			if(k>=0&&k<=8)
            {
            	num="00"+(k+1);
            }
    		else if(k>=9&&k<=98)
            {
            	num="0"+(k+1)
            }
    		else
            {
            	num=(k+1);
            }
			$index_num=$("<div>").html(num)
				.css(common_css)
				.attr({
					class:"list_nums"
				})
				.css({
					left:10+400*page_index+"px",
					background:"rgba(54,54,54,.6)",
					borderRadius:"5px",
					fontSize:"12px",
					width:"30px",
					textAlign:"center",
					color:"#E26DE2"
				}).insertBefore($song);
		set_added_song_attr_and_event($song,type_id,k);
	
}
function add_song_for_div_list_mode(page_index,cur_page_pos,type_id)
{
			var $parent=$('#'+type_id+"_inner");
			var row_index=parseInt(cur_page_pos/7);
			var column_index=cur_page_pos%7;
			var left=(page_index*800)+12+column_index*111;
			var top=12+row_index*72;
			var index=page_index*56+cur_page_pos;
			var $song=
				$("<div>")
				.appendTo($parent)
				.css({
					left:left+"px",
					top:top+"px",
					borderColor:temp_page_color,
					color:temp_page_color
				});
		set_added_song_attr_and_event($song,type_id,index);
}
function set_added_song_attr_and_event($obj,type_id,index)
{
    var arr=eval(""+type_id+"_musics");
	$obj
		.attr({
					class:type_id+"_song song"
				})
		.html(base_name(arr[index]))
		.one("mousemove",function()
				{
					var txt=$(this).text();
					txt=txt.substring(0,txt.indexOf("❤"));
					$(this).attr("title",txt);
				})
		.bind("click",function(e)
				{
					var e=e?e:window.event;
					var tar=e.srcElement||e.target;
					if(jQuery(tar).attr("class").indexOf("song")!=-1)
					{
						cur_music_list=arr;
						$('#the_small,#now_playing,#play_time').show();
						cur_type_length=arr.length;
						which_music_type=type_id;
						di_ji_shou=index;
						play_clicked_song($(this));
					}
				});
}
function play_clicked_song($obj)
{
	var unhandled_music_name=cur_music_list[di_ji_shou];
	music_name=base_name(unhandled_music_name);
	$('#now_playing').html(music_name);
	the_audio.src=$obj.parent().attr("path")+unhandled_music_name;
	the_audio.play();
	use_msg_re_canvas(music_name);
	if(if_playing==0)
	{
		view_system_status_clock=setInterval("view_system_status()",200);
		if_playing=1;
		$('#pause,#mo_fang_pause').css("display","block");
		$('#play,#mo_fang_play').css("display","none");
	}
	document.getElementById("mo_fang_whole_outer").title="正在播放："+music_name;
	$('.song').css({
		borderColor:temp_page_color,
		color:temp_page_color
	});
	$obj.css({
		borderColor:"purple",
		color:"purple"
	});
	if(list_mode=="DIV")
	{
		look_me($obj);
	}
	if(document.getElementById("lrc_area"))
	{
		stop_play_lrc();
	}
	var name=unhandled_music_name.substring(0,unhandled_music_name.length-4);
	request_the_lrc($obj.parent().attr("path")+name);
}
$(function()
{
	var favorite_and_down;
	$('.song').live("mouseenter",function()
				{
					$obj=$(this);
					$(this).css({
								color:"purple",
								borderColor:"purple"
							})
					if(cur_type!="local")
					{
						favorite_and_down=document.createElement("div");
						favorite_and_down.id="favorite_and_down";
						this.appendChild(favorite_and_down);
						if(list_mode=="DIV")
						{
							$(favorite_and_down).css({
								top:"57px",
								left:"0"
							}).animate({"top":"37px"},200);
						}
						else
						{
							$(favorite_and_down).css({
								left:"320px",
								top:"-3px"
							}).animate({"left":"220px"},200);
						}
						show_down_icon(favorite_and_down);
						if($obj.attr("class").indexOf("favorite")==-1)
						{
							var favorite_icon=document.createElement("div");
							favorite_icon.id="favorite_icon";
							favorite_and_down.appendChild(favorite_icon);
							register_favorite_icon_event(favorite_icon);
						}
						else
						{	
							var remove_favorite_icon=document.createElement("div");
							remove_favorite_icon.id="remove_favorite_icon";
							favorite_and_down.appendChild(remove_favorite_icon);
							register_remove_favorite_icon_event(remove_favorite_icon);
						}
					}
					
				})
				.live("mouseleave",function()
				{
					$('.song').not($('.'+which_music_type+"_song").eq(di_ji_shou)).css({
								color:temp_page_color,
								borderColor:temp_page_color
							})
				favorite_and_down.parentNode.removeChild(favorite_and_down);
				})
})
function look_me($obj)
			{
				var $obj_clone=$obj.clone();
				var thi=$obj.get(0);
				$obj_clone
				.appendTo($obj.parent())
				.css({
					left:thi.offsetLeft,
					top:thi.offsetTop
				})
				.animate({
					width:thi.offsetWidth+40+"px",
					height:thi.offsetHeight+40+"px",
					left:thi.offsetLeft-24+"px",
					top:thi.offsetTop-24+"px",
					opacity:"0"
				},800,function()
				{
					$obj_clone.remove();
				});
			}

function change_to_list_list_mode(menu_obj)
{
	if(menu_obj.id!="local")
							{
								$('.'+menu_obj.id+"_song").each(function(k)
								{
									var $index_num;
									var page_index=parseInt(k/28)+1;
									var song_pos=k<28?k:k-((page_index-1)*28);
									var common_css={
										height:"18px",
										lineHeight:"18px",
										top:(song_pos*21+4)+"px"
									}
									$(this).css(common_css).css({
										left:50+400*(page_index-1)+"px",
										width:"320px",
										border:"none",
										overflow:"hidden",
										padding:"0",
										borderRadius:"0",
										borderBottom:"dashed 1px"
									}).hover(function()
									{
										if(list_mode=="LIST")
										{
											$index_num.css("color","purple");
										}
									},function()
									{
										if(list_mode=="LIST")
										{
											$index_num.css("color","#E26DE2");
										}
									})
									$index_num=$("<div>").html(k+1<10?"00"+(k+1):(k+1<100?"0"+(k+1):(k+1)))
										.css(common_css)
										.attr({
											class:"list_nums"
										})
										.css({
											left:10+400*(page_index-1)+"px",
											background:"rgba(54,54,54,.6)",
											borderRadius:"5px",
											fontSize:"12px",
											width:"30px",
											textAlign:"center",
											color:"#E26DE2"
										}).insertBefore($(this));
								})
							}
							else
							{
								$('#list_mode_spliter').stop().animate({
									opacity:"0"
								},1000);
							}
}
function change_to_div_list_mode(menu_obj)
{
	var inner_id='#'+menu_obj.id+"_inner";
	$(inner_id).find($('.list_nums')).each(function()
	{
		$(this).remove();
	})
	if(menu_obj.id!="local")
	{
		$('.'+menu_obj.id+"_song").each(function(k)
		{
			var page_index=parseInt(k/56);
			var cur_page_pos=k<56?k:k-(page_index*56);
			
			var row_index=parseInt(cur_page_pos/7);
			var column_index=cur_page_pos%7;
			var left=(page_index*800)+12+column_index*111;
			var top=12+row_index*72;
			$(this)
				.css({
					left:left+"px",
					top:top+"px",
					borderColor:temp_page_color,
					color:temp_page_color,
					width:"85px",
					height:"47px",
					padding:"5px",
					lineHeight:"17px",
					border:"solid 3px "+general_color,
					borderRadius:"10px"
				});
		})
	}
	else
	{
		$('#list_mode_spliter').stop().animate({
			opacity:"0"
		},1000);
	}
}
