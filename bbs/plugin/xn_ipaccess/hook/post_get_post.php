	!ipaccess_check($longip, 'posts') AND message(-1, '防恶意灌水，您的 IP 今日回帖数达到上限，每日回帖数限制为50，请您明天再来。');
	!ipaccess_check_seriate_posts($tid) AND message(-1, '防恶意灌水，您的 IP 今日连续发帖数已经达到上限，连续发帖限制为3，建议您5分钟之后再回帖。');