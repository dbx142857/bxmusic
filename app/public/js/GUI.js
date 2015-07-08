var cur_user_id=null;
var which_music_type=null,//当前音乐类型
cur_music_list=null,//当前音乐类型歌曲清单
cur_type="dj",//声明当前显示的which_showing属于哪一个音乐类型的内容,
cur_type_length=null,//当前播放的歌曲类型对应的数组的长度
di_ji_shou,//第几首歌
music_name=null,//音乐名字
which_showing=null,//声明当前哪一个音乐类型的音乐列表部分被显示着
music_types=[],//音乐类型集合
every_music_type_length=[],//每一种音乐类型的歌曲总数
music_lists=[],//音乐清单的集合

if_playing=0,//表示音乐是否播放
change_body_bg_clock,//切换body背景的定时器
body_bg_change_and_stop_flag=0,//表示body的背景是否处于更换或者暂停状态
play_mode="mu_lu_xun_huan",//播放模式
which_skin_mode="normal",//声明当前为哪一种皮肤样式,
list_mode="LIST",
change_mode_direction=1,//不同模式切换之间的方向
body_bgs=new Array(),//body背景src数组

cur_body_opacity=1,//表示当前body透明度
the_background_inner_div_who_showing=1,//哪一个在显示
cur_the_background_inner_div_bg_index=0,//当前背景图片索引
if_use_body_bg=0,//背景壁纸是否在更换，0否，1是
general_color="pink",//预设颜色
temp_page_color="pink",//临时颜色

lrc_shi_jian_chuo=[],
lrc_of_every_line=[],
lrc_file_name="unknown",
cur_lrc_line_index=0,
cur_lrc_line_index_check_clock,
lrc_line_height=24,
tmp_lrc_line_height=56,
lrc_value=null,


the_audio,//播放歌曲的audio标签对象
fd,//音乐面板对象
the_cloud1,//云彩对象
the_range1_inner_div,
mo_fang_jin_du_the_range_long_inner_div,
mo_fang_jin_du_the_range_inner_div,
play_time_div,
view_system_status_clock;


var favorite_musics = [],
local_musics = [],
qq_dance_musics = [],
dj_musics = [],
sleep_musics=[],
zui_xin_musics = [];


function initial()
{
	$(document).one('contextmenu',function(e)
	{
		e.preventDefault();
		$('#mouse_menu_outer').load("app/public/html/right_mouse_menu.html",function()
		{
			contextmenu(e.pageX,e.pageY);
			document.oncontextmenu();
		});
	})
	fd=document.getElementById("fd");
	fd.className="fadeIn";
	fd.style.opacity="1";
	var $music_cates=$("#music_cates"),
		music_cates=$.parseJSON($music_cates.html()),
		tmp_data={};
	for(var i in music_cates){
		var item=music_cates[i];
		add_music_type(item.name,item.chinese_name,item.id);
	}
	$('#zui_xin').click();
	$('body').css({
		width:screen.width+"px",
		height:screen.height+"px"
	});
	//代表播放的小三角
	make_arraw(25,"right","play","pink","play_or_pause_outer");
	//向面板里添加四个圆形的控制div
	for(var i=2;i<=4;i++)
	{
		var obj=document.createElement("div");
		obj.id="other_controls_inner"+i;
		obj.className="other_controls_inner";
		fd.appendChild(obj);
	}
	var other_controls_inner2_inner_div=document.createElement("div");
	other_controls_inner2_inner_div.id="other_controls_inner2_inner_div";
	document.getElementById("other_controls_inner2").appendChild(other_controls_inner2_inner_div);
	make_arraw(15,"left","other_controls_inner2_inner_arraw","pink","other_controls_inner2");
	var other_controls_inner3_inner_div=document.createElement("div");
	other_controls_inner3_inner_div.id="other_controls_inner3_inner_div";
	document.getElementById("other_controls_inner3").appendChild(other_controls_inner3_inner_div);
	make_arraw(4,"left","mu_lu_xun_huan_mode_top_arraw","pink","mu_lu_xun_huan_mode");
	make_arraw(4,"right","mu_lu_xun_huan_mode_bottom_arraw","pink","mu_lu_xun_huan_mode");
	make_arraw(15,"right","other_controls_inner3_inner_arraw","pink","other_controls_inner3");
	//当列表不能容纳下出现翻页的箭头
	make_arraw(25,"left","previous","pink","fd");
	make_arraw(25,"right","next","pink","fd");
	make_arraw(8,"left","hidden_content_arraw","pink","hidden_content");
	make_arraw(5,"right","change_to_normal_mode_arraw","pink","change_to_normal_mode");
	make_arraw(5,"left","change_to_mo_fang_mode_arraw","pink","change_to_mo_fang_mode");
	make_arraw(4,"down","xun_huan_mode_inner_arraw","pink","xun_huan_mode");
	make_arraw(4,"right","sui_ji_mode_inner_shang_inner_arraw","pink","sui_ji_mode_inner_shang");
	make_arraw(4,"right","sui_ji_mode_inner_xia_inner_arraw","pink","sui_ji_mode_inner_xia");
	var other_controls_inner4_arraw=make_arraw(15,"left","other_controls_inner4_arraw","pink","other_controls_inner4");
	var $other_controls_inner4=$('#other_controls_inner4');
	$.each(["other_controls_inner4_left_square","other_controls_inner4_xie_gang","other_controls_inner4_garbage"],function(k,v)
	{
		$("<div>")
		.appendTo($other_controls_inner4)
		.attr({
			id:v
		});
	})
	play_time_div=document.getElementById("play_time");
	the_cloud1=document.getElementById("the_cloud1");
	the_audio=document.getElementById("the_audio");
	now_playing=document.getElementById("now_playing");
	var msg=document.getElementById("msg");
	$(msg).show().css({
		left:(screen.width-msg.offsetWidth)/2+"px",
		top:-msg.offsetHeight+"px"
	})
	$('#clock_canvas_outer').css("display","none");
	
	
    scroll_title_bar("欢迎来到百兴音乐播放器V2.0公测版");
	the_audio.volume="0.1";
	document.getElementById("the_audio1").volume="0.1";
	
	make_arraw(15,"left","mo_fang_volume_arraw","pink","mo_fang_volume");
		var mo_fang_shang_yi_qu_inner=document.createElement("div");
		mo_fang_shang_yi_qu_inner.id="mo_fang_shang_yi_qu_inner";
		document.getElementById("mo_fang_shang_yi_qu").appendChild(mo_fang_shang_yi_qu_inner);
		make_arraw(15,"left","mo_fang_shang_yi_qu_inner_arraw","pink","mo_fang_shang_yi_qu");
		var mo_fang_xia_yi_qu_inner=document.createElement("div");
		mo_fang_xia_yi_qu_inner.id="mo_fang_xia_yi_qu_inner";
		document.getElementById("mo_fang_xia_yi_qu").appendChild(mo_fang_xia_yi_qu_inner);
		make_arraw(15,"right","mo_fang_xia_yi_qu_inner_arraw","pink","mo_fang_xia_yi_qu");
		make_arraw(25,"right","mo_fang_play","pink","mo_fang_play_or_pause_outer");
	if(screen.width>1100)
	{
		$(fd).css("left",(screen.width-1100)/2+"px");
	}
	if(document.body.clientHeight>=600)
	{
		$(fd).css("top",(document.body.clientHeight-600)/2+"px");
	}
	make_range("fd_volume_the_range","other_controls_inner4",0.15,16,100,32);
	make_range("fd_opacity_range","fd_opacity",1,200,16,32);
	the_range1_inner_div=make_range("the_range1","fd",0,290,2,10);
	mo_fang_jin_du_the_range_long_inner_div=make_range("mo_fang_jin_du_the_range_long","mo_fang_jin_du",0,500,2,10);
	mo_fang_jin_du_the_range_inner_div=make_range("mo_fang_jin_du_the_range","mo_fang_jin_du",0,40,2,5);
	make_range("mo_fang_volume_the_range","mo_fang_volume",0.15,100,2,10);
	$('#other_controls').css("z-index","10000");
	$("<div id='log_in_to_favorite_msg'>")
			.appendTo($('#favorite_outer'))
			.html("亲，登陆后可以添加自己喜欢的歌曲哦");
	$("<div id='click_to_add_local_mp3_msg'>")
			.appendTo($('#local_outer'))
			.html("亲，点击鼠标右键打开歌曲可以添加本地音乐文件哦");
	
	make_it_draggable("fd");
	make_it_draggable("mo_fang_whole_outer");
	initial_event();
	$('*').not($(':text'))
		.css("-moz-user-select","none");
	
	(function()
	{
		var result=$('#CUM').html();
       // document.body.innerHTML=result;return false;
		if(result!="0"&&result!="undefined")
		{
			use_msg_re_canvas("恭喜亲登录成功");
			var split=$.parseJSON(result);
			cur_user_id=split.user_id;
			$('#login_ti_shi')
				.html("")
				.append(
					$("<span>")
						.html("亲，欢迎回来！")
						.css({
							marginRight:"10px"
						})
				)
				.append(
					$("<a>")
						.attr({
							href:"javascript:;"
						})
						.html("登出")
						.click(function()
						{
							$.ajax({
							   type: "POST",
							   url: "Index.php?m=Ajax&a=log_out",
							   success: function(){
							    use_msg_re_canvas("恭喜亲登出成功");
							    setTimeout(function()
							    {
							    	location.reload();
							    },1000);
						   }
						});
						})
				)
				.append(
				$("<a>")
					.attr({
						href:"javascript:;"
					})
					.css({
						left:"5px"
					})
					.html("我要提建议")
					.one("click",function()
					{
						$('#suggest').load("app/public/html/suggest.html",{num:Math.random()*99999});
					})
			)
			temp_page_color=split.page_color;
			general_color=temp_page_color;
			cur_body_opacity=split.bg_opacity;
			var if_clock_visible=split.if_clock_visible;
			var bg=split.bg;
			$("body").css({
					background:"url(/app/public/images/body_web_qq_bg.jpg)"
				})
				 initial_bg_chooser();
			if(bg.length<=2)
			{
				$('#page_bg_div'+bg).click();
			}
			else
			{
					$('#the_background_inner_div1').attr("src",bg).show();
					$('#the_background_inner_div2').attr("src",bg).show();
					cur_page_bg_index=30;
					$('.the_cloud').hide();
			}
			var fs=split.favorite_song;
			var fd_bg_src=split.fd_bg_src;
			var volume=split.sys_volume;
			var the_list_mode=split.list_mode;
			if(list_mode!=the_list_mode)
			{
				list_mode=the_list_mode;
				$('#'+cur_type).click();
			}
			if(split.lrc_line_height!=-1)
			{
				tmp_lrc_line_height=split.lrc_line_height;
			}
			var fd_opacity_range_percent=split.fd_opacity;
			document.getElementById("fd_bg_img").style.opacity=fd_opacity_range_percent;
			var fd_opacity_range=document.getElementById("fd_opacity_range_inner_div");
			var fd_opacity_range_parent=document.getElementById("fd_opacity_range");
			var fd_opacity_range_width=parseInt(fd_opacity_range_parent.style.width);
			fd_opacity_range.style.left=fd_opacity_range_width*fd_opacity_range_percent-parseInt(fd_opacity_range.style.width)/2+"px";
			the_audio.volume=volume;
			document.getElementById("the_audio1").volume=volume;
			document.getElementById("mo_fang_volume_the_range_inner_div").style.left=volume*100-5+"px";
			document.getElementById("fd_volume_the_range_inner_div").style.top=fd_volume_the_range_inner_div.parentNode.offsetHeight*(1-volume)-8+"px";
			if(volume==0)
			{
				$('#other_controls_inner4_xie_gang,#mo_fang_volume_xie_gang').css("display","block");
			}
			var $fd_bg_img=$('#fd_bg_img');
			if(fd_bg_src!="")
			{
				if(fd_bg_src.length!=1)
				{
					$fd_bg_img.attr("src",fd_bg_src);
				}
				else
				{
					var theme_names=["棕色木纹","神秘星际","炫酷金属","粉红之夜","黑色木纹","茫茫野草","仰望苍穹","零度诱惑"];
					$fd_bg_img.attr("src","app/public/images/bg/"+theme_names[fd_bg_src]+".jpg");
				}
			}
			else
			{
				$fd_bg_img.attr("src","app/public/images/bg/棕色木纹.jpg");
			}
			$('#log_in_to_favorite_msg').hide();
			if(fs!=""&&fs!=null)
			{
				var pos=$.inArray("favorite",music_types);
				favorite_musics=fs.split("♫");
				music_lists[pos]=favorite_musics;
				var length=favorite_musics.length;
				every_music_type_length[pos]=length;
				if(length>56)
				{
					$('#favorite_inner').css("width",(parseInt((length-1)/56)+1)*800+"px");
				}
					for(var i=0;i<length;i++)
					{
						var page_index=parseInt(i/56);
						var song_pos=i-(page_index*56)>56?56:i-(page_index*56);
						if(list_mode=="DIV")
						{
							document.getElementById("favorite").list_mode="DIV";
							add_song_for_div_list_mode(page_index,song_pos,"favorite");
						}
						else
						{
							document.getElementById("favorite").list_mode="LIST";
							var page_index=parseInt(i/28);
							var song_pos=length<28?i:i-(page_index*28);
							add_song_for_list_list_mode(page_index,song_pos,"favorite");
						}
					}
			}
			else
			{
				$('#log_in_to_favorite_msg').html("亲,可点击❤可以收藏您喜欢的歌曲哦").show();
			}
			$('#color_picker').load("app/public/html/color_manager.html",function()
			{
				change_whole_page_color();
			});
			var tmdid=document.getElementById("tou_ming_du_inner_div");
			tmdid.style.left=tmdid.parentNode.offsetWidth*cur_body_opacity-tmdid.offsetWidth/2+"px";
			$('#the_background,.the_cloud').css("opacity",cur_body_opacity);
			if(if_clock_visible==1)
			{
				$('#clock_canvas_outer').load("app/public/html/canvas_clock.html",function()
				{
					run_clock_clock=clearInterval(run_clock_clock);
					run_clock();
					run_clock_clock=setInterval("run_clock()",1000);
					$('#clock_canvas_outer').fadeIn(0).addClass("fadeIn").css("display","block");
				});
			}
		}
		else
		{
			$("#fd_bg_img").attr("src","app/public/images/bg/棕色木纹.jpg");
			$("body").css({
				background:"url(/app/public/images/body_web_qq_bg.jpg)"
			})
			 initial_bg_chooser();
		}
	})();
    
    
    
    
    
    
    
    
    
   
     /*var $div=$("<div>")
		.appendTo($("body").css("position","relative"))
		.css({
			position:"fixed",
			zIndex:"99999999999999999",
			borderRadius:"5px",
			left:"50%",
			top:"0%",
			background:"rgba(85,90,205,0.8)",
			width:"320px",
			height:"180px",
			marginLeft:"-160px",
			marginTop:"-90px",
			border:"solid 1px #ddd",
			boxShadow:"0 10px 20px rgba(0,0,0,0.08)"
		})
		.html("<p>亲，这里的东西也许你更感兴趣：</p><p><a href='http://meimeirihan.taobao.com/?v=1'>点击进入我的淘宝店铺，美美日韩美衣~谢谢支持~</a></a>")
		.animate({
			top:"50%"
		},500);

	$("<input type='button' value='关闭'>")
		.appendTo($div)
		.css({
			cursor:"pointer"
		})
		.click(function(){
			$(this).parent().remove();
		});
    $div.find("*").css({
			position:"relative",
			color:"black"
		});
    
    
    */
    
    
    random_play_music();
    
    
}