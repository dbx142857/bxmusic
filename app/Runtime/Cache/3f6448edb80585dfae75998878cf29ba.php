<?php if (!defined('THINK_PATH')) exit();?>﻿<html>
	<head>
		<meta charset="UTF-8">  
		<title>欢迎来到百兴音乐播放器V2.0公测版</title>
	</head>
			<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
			<link rel="stylesheet"  type="text/css" href="app/public/css/1.css" />
			<script src="app/public/js/jquery.min.js" type="text/javascript"></script>
	<!-- 		<script src="app/public/js/js.js"></script> -->
			<script type="text/javascript" src="app/public/js/add_music_type.js"></script>
			<script type="text/javascript" src="app/public/js/GUI.js"></script>
			<script type="text/javascript" src="app/public/js/functions.js"></script>
			<script type="text/javascript" src="app/public/js/personal_functions.js"></script>
			<script type="text/javascript" src="app/public/js/range.js"></script>
			<script type="text/javascript" src="app/public/js/drag.js"></script>
			<script type="text/javascript" src="app/public/js/resize_div.js"></script>
			<script type="text/javascript" src="app/public/js/key_event.js"></script>
			<script type="text/javascript" src="app/public/js/event.js"></script>
			<script type="text/javascript" src="app/public/js/status_checker.js"></script>
			<script type="text/javascript" src="app/public/js/body_bg_chooser.js"></script>
	<!-- 		<script type="text/javascript" src="app/public/js/record.js"></script> -->
	<body onload="initial()" ondragstart='return false' onselectstart="return false" id="the_body" ondrop = "begin_drag_files(event)" ondragenter = "return false" ondragover = "return false">
		<!-- 	<form enctype="multipart/form-data"></form> -->
		<img id="heart_png" src="app/public/images/heart.png" style="display:none;" />
		<img src="app/public/images/cloud.png" id="the_cloud1" class="the_cloud">
		<iframe style="display:none" name="ifm"></iframe>

		<input type="file" multiple="multiple" id="change_body_bg_file" onclick="this.value='';" onchange="add_body_bg(this.files)" accept="image/*" />

		<input type="file" multiple="multiple" id="the_file" onchange="read_files(document.getElementById('the_file').files)" accept="audio/*"/>

		<div id="msg">
			<div id="msg_inf">

			</div>

			<div id="sure">

				确定
			</div>
		</div>
		<audio controls style="width:0; height:0;" id="the_audio">
			<source src=""></source>
		</audio>
		<audio controls style="width:0; height:0;" id="the_audio1">

		</audio>
		<div id="fd">
			<img src="app/public/images/bg/棕色木纹.jpg" id="fd_bg_img" />
			<div id="list_mode_spliter"></div>
			<div id="login_ti_shi">
				<a href="javascript:;">登陆</a>
				<a href="javascript:;">注册</a>
				<a href="javascript:;">我要提建议</a>
			</div>
			<div id="play_time">

			</div>
			<div id="menu" title="点击展开菜单项">
				<div id="menu_up">
					<div class="subDiv"></div>
					<div class="subDiv"></div>
					<div class="subDiv"></div>
				</div>
				<div id="menu_item_whole">
					<div id="hidden_content" title="亲，点击可以隐藏右侧的内容哦">
						<div id="hidden_content_arraw_right"></div>
					</div>
					<div id="change_theme" title="亲，点击可以更换播放器主题哦">
						<div id="ct1"></div>
						<div id="ct2"></div>
						<div id="ct3"></div>
					</div>

					<div id="change_to_mo_fang_mode" title="亲，点击切换到魔方模式哦">
						<div id="change_to_mo_fang_mode_inner_div"></div>
					</div>
					<div id="adjust_play_mode" title="亲，当前为顺序模式，点击切换到随机模式哦">
						<div id="shun_xu_mode" class="control_play_mode_div">
							<div class="shun_xu_inner_heng"></div>
							<div class="shun_xu_inner_heng"></div>
							<div class="shun_xu_inner_heng"></div>
						</div>
						<div id="xun_huan_mode" class="control_play_mode_div">
							<div id="xun_huan_mode_inner_square"></div>
							<div id="xun_huan_mode_inner_shu"></div>
						</div>
						<div id="sui_ji_mode" class="control_play_mode_div">
							<div id="sui_ji_mode_inner_shang">
								<div id="sui_ji_mode_inner_shang_inner_heng"></div>
							</div>
							<div id="sui_ji_mode_inner_xia">
								<div id="sui_ji_mode_inner_xia_inner_heng"></div>
							</div>
						</div>
						<div id="mu_lu_xun_huan_mode" class="control_play_mode_div">

						</div>
					</div>
					<div id="fd_opacity" title="亲，滑动可以调节播放器透明度哦">
						<div id="fd_opacity_inner_div1"></div>
						<div id="fd_opacity_inner_div2"></div>
					</div>
				</div>
			</div>

			<div id="theme_changer">

			</div>
			<small id="the_small">正在播放：</small>
			<div id="now_playing">

			</div>
			<div id="play_or_pause_outer">
				<div id="pause">
					<div id="pause_inner1"></div>
					<div id="pause_inner2"></div>
				</div>
			</div>
		</div>

		<div id="mo_fang_whole_outer">
			<div id="mo_fang_whole">
				<div id="change_to_normal_mode" title="亲，点击可以切换到正常模式哦">
					<div id="change_to_normal_mode_inner_div">

					</div>
				</div>

				<div id="mo_fang_play_or_pause_outer">

					<div id="mo_fang_pause">
						<div id="mo_fang_pause_inner1"></div>
						<div id="mo_fang_pause_inner2"></div>
					</div>
				</div>

				<div id="mo_fang_volume_outer" class="mo_fang_item_outer" title="点击调节系统音量哦">
					<div id="mo_fang_volume">
						<div id="left_square">

						</div>
						<div id="mo_fang_volume_xie_gang"></div>
					</div>
				</div>

				<div id="mo_fang_jin_du_outer" class="mo_fang_item_outer" title="点击调节播放进度哦">
					<div id="mo_fang_jin_du">

					</div>
				</div>

				<div id="mo_fang_shang_yi_qu_outer" class="mo_fang_item_outer" title="点击切换到上一曲哦">
					<div id="mo_fang_shang_yi_qu">

					</div>
				</div>

				<div id="mo_fang_xia_yi_qu_outer" class="mo_fang_item_outer" title="点击切换到下一曲哦">
					<div id="mo_fang_xia_yi_qu">

					</div>
				</div>
			</div>
		</div>
		
		<form action="Index.php?m=Ajax&a=update_fd_bg" target="ifm" method="post" enctype="multipart/form-data" id="update_fd_bg_form">
			<input type="hidden" value="" name="sys_pic" id="sys_pic">
			<input type="file" id="change_bg_file" name="change_bg_file" accept="image/*" />
		</form>

		<div id="color_picker">
		</div>
		<div id="register_and_log_in">
		</div>
		<canvas id="help_canvas">
		</canvas>
		<div id="suggest">
		</div>
		<div id="clock_canvas_outer" style="display:none;">
		</div>
		<div id="local_imgs_show"  ondrop = "dropFile(event)" ondragenter = "return false" ondragover = "return false">
		</div>
		<div id="lrc_panel">
		</div>
		<div id="mouse_menu_outer">
		</div>
		
	</body>
</html>