<?php
class IndexAction extends Action 
{
	function welcome(){
		$this->display();
	}
    public function index()
    {
       $this->bxmusic();
        //$this->display("welcome");
    }
	function bxmusic()
	{
        header("content-type:text/html;charset=utf8");
        //$_SESSION['cur_user_id']=$_COOKIE['cur_user_id']=1;
		if(!empty($_COOKIE['cur_user_id']))
		{
			$_SESSION['cur_user_id']=$_COOKIE['cur_user_id'];
		}
		$cur_user_msg=0;
		if(isset($_SESSION['cur_user_id']))
		{
			$id=$_SESSION['cur_user_id'];
			$db=M('user_page_setting');
			$cur_user_msg=$db->where("user_id=$id")->find();
		}
        $db=M("music_cate");
		echo "<div id=\"CUM\" style=\"display:none\">".json_encode($cur_user_msg)."</div>";
        echo "<div id=\"music_cates\" style=\"display:none\">".json_encode($db->select())."</div>";
        $this->display("index");
	}
	 function test(){
		 $callback = isset($_GET["callback"])?$_GET["callback"]:"callback";  
		 $foo = isset($_GET["foo"])?$_GET["foo"]:"'";  
		 $format = isset($_GET["format"])?$_GET["format"]:"";  
		 $array = array("foo"=>$foo,"format"=>$format,"test"=>"test");  
		 echo @$callback . "(".substr(file_get_contents('http://news.cntv.cn/2015/03/25/VIDE1427282177202861.shtml'),100). ")"; 
	 }
}