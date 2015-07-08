function view_system_status()
{
	if(the_audio.duration<=the_audio.currentTime)
	{
		if(play_mode=="shun_xu")
		{
			if(cur_type_length==di_ji_shou+1)
			{
				if_playing=0;
				var msg_inf=document.getElementById("msg_inf");
				var msg=document.getElementById("msg");
				msg_inf.style.lineHeight="100px";
				msg_inf.style.fontSize="20px";
				msg_inf.innerHTML="亲，已经到最后一首歌曲了哦！";
				$(msg).animate({
				left:(screen.width-msg.offsetWidth)/2+"px",
				top:(screen.height-msg.offsetHeight)/2+50+"px"
			},300)
			.animate({
				left:(screen.width-msg.offsetWidth)/2+"px",
				top:(screen.height-msg.offsetHeight)/2+"px"
			},300);
				$('#the_small,#now_playing,#play_time').hide();
				view_system_status_clock=clearInterval(view_system_status_clock);
			}
			else
			{
				$("#other_controls_inner3").click();
			}
		}
		if(play_mode=="sui_ji")
		{
			random_play_music();
		}
		if(play_mode=="dan_qu_xun_huan")
		{
			the_audio.play();
			use_msg_re_canvas(music_name);
		}
		if(play_mode=="mu_lu_xun_huan")
		{
			if(cur_type_length==di_ji_shou+1)
			{
				di_ji_shou=0;
				var $obj=$('.'+which_music_type+"_song").eq(0);
				if(which_music_type!="local")
				{
					play_clicked_song($obj);
				}
				else
				{
					$obj.click();
				}
			}
			else
			{
				$("#other_controls_inner3").click();
			}
		}

	}
	var tt=parseInt(the_audio.duration);
	var ct=parseInt(the_audio.currentTime);
	var tt_min=parseInt(tt/60);
	var tt_sec=tt-tt_min*60;
	var ct_min=parseInt(ct/60);
	var ct_sec=ct-ct_min*60;
		
		if(ct_sec<10&&tt_sec<10)
		{
			play_time_div.innerHTML=ct_min+":0"+ct_sec+"/"+tt_min+":0"+tt_sec;
		}
		if(ct_sec<10&&tt_sec>=10)
		{
			play_time_div.innerHTML=ct_min+":0"+ct_sec+"/"+tt_min+":"+tt_sec;
		}
		if(ct_sec>=10&&tt_sec<10)
		{
			play_time_div.innerHTML=ct_min+":"+ct_sec+"/"+tt_min+":0"+tt_sec;
		}
		if(ct_sec>=10&&tt_sec>=10)
		{
			play_time_div.innerHTML=ct_min+":"+ct_sec+"/"+tt_min+":"+tt_sec;
		}
		
		if(the_range1_inner_div.if_draging==0)
		{
			the_range1_inner_div.style.left=290*the_audio.currentTime/tt-5+"px";
		}
		if(mo_fang_jin_du_the_range_long_inner_div.if_draging==0)
		{
			mo_fang_jin_du_the_range_long_inner_div.style.left=500*the_audio.currentTime/tt-5+"px";
		}
		if(mo_fang_jin_du_the_range_inner_div.if_draging==0)
		{
			mo_fang_jin_du_the_range_inner_div.style.left=40*the_audio.currentTime/tt-2.5+"px";
		}
	the_cloud1.style.left=the_cloud1.offsetLeft+1+"px";
	if(the_cloud1.offsetLeft==screen.width)
	{
		the_cloud1.style.left="-200px";
	}
}