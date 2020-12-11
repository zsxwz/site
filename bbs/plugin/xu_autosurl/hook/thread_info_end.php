<?php exit;
$n = preg_match_all("/(?:[^\"]|^)(https?\:\/\/[^\x{4e00}-\x{9fa5}\"\s<]+)/u",$first['message_fmt'],$result);
if($n>0){
$newm="\${1}<a href=\"https://bbs.zsxwz.com/go.php?url=\${2}\" target=\"_blank\" rel=\"nofollow\" _href=\"https://bbs.zsxwz.com/go.php?url=\${2}\"><span style=\"color:#0070c0\">\${2}</span></a>";
$first['message_fmt']=preg_replace("/([^\"]|^)((https?\:\/\/|magnet:\?xt=urn:btih:)[^\x{4e00}-\x{9fa5}\"\s<]+)/u",$newm,$first['message_fmt']);
}

