<?php
!defined('DEBUG') AND exit('Access Denied.');

$action = param(3,'list');

$_tpl = APP_PATH.'plugin/piao_seo/htm/';

if($action == 'list') {
	$list = db_find('piao_seo', array(), array(), 1, 100);
	include _include($_tpl.'list.htm');
}
?>