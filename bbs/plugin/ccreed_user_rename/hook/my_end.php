
if ($action == 'rename'){
    if($method == 'GET'){
        include _include(APP_PATH.'plugin/ccreed_user_rename/view/htm/rename.htm');
    } elseif($method == 'POST') {
        $new_username = param('new_username');
        empty($new_username) AND message(-1, lang('please_input_username'));
        $new_username == $user['username']  AND  message(-1, "输入用户名与当前用户名相同，无需修改.");
        !is_username($new_username, $err) AND message(-2, $err);
        $_user = user_read_by_username($new_username);
        $_user AND message(-1, lang('username_is_in_use'));
        user_update($uid, array('username'=>$new_username));
        message(0, "用户名修改成功");
    }
}
