// 保存异步chunk脚本的url与加载结果处理函数loadingEnded
var inProgress = {};
// 自定义数据标识script元素是异步chunk脚本加载创建的
var dataWebpackPrefix = 'analyze:';

//基于 JSONP 实现的异步模块加载函数
__webpack_require__.l = (url, done, key, chunkId) => {
	// 没看懂，不知什么场景下会发生
	if (inProgress[url]) {
		inProgress[url].push(done);
		return;
	}

	var script, needAttach;

	// 没看懂
	if (key !== undefined) {
		var scripts = document.getElementsByTagName('script');
		for (var i = 0; i < scripts.length; i++) {
			var s = scripts[i];
			if (
				s.getAttribute('src') == url ||
				s.getAttribute('data-webpack') == dataWebpackPrefix + key
			) {
				script = s;
				break;
			}
		}
	}

	if (!script) {
		needAttach = true;
		// 创建script脚本
		script = document.createElement('script');
		// 已废弃，干掉
		// script.charset = "utf-8";
		// 没看懂
		script.timeout = 120;
		// csp相关，暂时屏蔽
		// if (__webpack_require__.nc) {
		//   script.setAttribute("nonce", __webpack_require__.nc);
		// }
		script.setAttribute('data-webpack', dataWebpackPrefix + key);
		script.src = url;
	}

	inProgress[url] = [done];

	var onScriptComplete = (prev, event) => {
		//注销事件回调
		script.onerror = script.onload = null;
		//清楚计时器，
		clearTimeout(timeout);

		var doneFns = inProgress[url];
		//移除
		delete inProgress[url];
		//移除script
		script.parentNode && script.parentNode.removeChild(script);

		// 通知异步chunk脚本加载结果
		doneFns && doneFns.forEach((fn) => fn(event));

		if (prev) return prev(event);
	};

	// 异步chunk脚本加载超时，该参数在webpack中可设置
	var timeout = setTimeout(
		onScriptComplete.bind(null, undefined, {
			type: 'timeout',
			target: script
		}),
		120000
	);

	script.onerror = onScriptComplete.bind(null, script.onerror);

	script.onload = onScriptComplete.bind(null, script.onload);

	needAttach && document.head.appendChild(script);
};
