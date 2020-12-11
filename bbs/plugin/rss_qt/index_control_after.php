	public function on_rss() {
		$c_threadlist = array();
/**
		$file = $this->conf['tmp_path'] . 'rss_cache.php';
		if(is_file($file)) $c_threadlist = include $file;
*/
		$c_threadlist = $this->runtime->get('rss_cache');
		if(is_array($c_threadlist) && array_key_exists('cachetime', $c_threadlist)) {
			if($c_threadlist['cachetime'] + 900 > time()) $threadlist = $c_threadlist;
		}
		if(empty($threadlist)) {
			$threadlist = $this->thread->get_newlist_rss();
			foreach($threadlist as $k=>&$thread) {
				$thread['lastpost_rss'] = date(DATE_RSS,$thread['lastpost']);
$thread['comments'] = $thread['posts'] -1;
				// 去掉没有权限访问的版块数据
				$fid = $thread['fid'];
				if(!isset($this->conf['forumarr'][$fid])) {
					unset($threadlist[$k]);
					continue;
				}
			}
			$threadlist['cachetime'] = time();
			$threadlist['lastbuilddate'] = date(DATE_RSS);
			$threadlist['pubdate'] = date(DATE_RSS);
			$this->runtime->set('rss_cache',$threadlist);
		}
		$lastbuilddate = $threadlist['lastbuilddate'];
		$pubdate = $threadlist['pubdate'];
		unset($threadlist['cachetime'],$threadlist['lastbuilddate'],$threadlist['pubdate']);
		$this->view->assign('lastbuilddate',$lastbuilddate);
		$this->view->assign('pubdate',$pubdate);
		$this->view->assign('threadlist', $threadlist);
		$this->view->display('rss.htm');
	}
