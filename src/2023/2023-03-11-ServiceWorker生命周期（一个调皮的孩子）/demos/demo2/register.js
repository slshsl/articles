// 更新策略二：
// 用户手动确认更新后，通过postMessage触发serverWorker的skipWaiting
// 接着在activate回调中执行clients.claim()，不需要刷新页面就可以完成更新
// 相应改动：
// 1、在activate回调中执行clients.claim()
// 2、不需要在controllerchange事件内刷新页面

if ('serviceWorker' in navigator) {
	// 数据有更新，需要通知用户，来触发skipWaiting
	function postSkipWaiting(curWaitingWorker) {
		console.log('提示用户更新');
		if (window.confirm('站点数据有更新，请手动刷新!')) {
			curWaitingWorker.postMessage('skipWaiting');
		}
	}
	navigator.serviceWorker.register('./sw.js').then((registration) => {
		//当前活跃的serviceWorker
		let curActiveWorker = navigator.serviceWorker.controller;
		//上次更新，已安装完成，处于installed状态，一直等待激活的serviceWorker
		let curWaitingWorker = registration.waiting;

		// 如果用户在第一次更新提示没有选择更新，而是手动刷新页面，则再次弹出提示
		if (
			curWaitingWorker &&
			curActiveWorker &&
			curWaitingWorker !== curActiveWorker
		) {
			postSkipWaiting(curWaitingWorker);
		}
		// 有serviceWorker更新发生
		registration.addEventListener('updatefound', () => {
			// 下面三个变量不可能同时存在,curUpdateWorker一定存在
			// 当前更新的serviceWorker
			let curUpdateWorker = registration.installing;
			// 当前活跃的serviceWorker
			curActiveWorker = registration.active;
			// 上次更新，已安装完成，处于installed状态，一直等待激活的serviceWorker
			curWaitingWorker = registration.waiting;

			console.log(
				`当前更新的serviceWorker目前的状态为${curUpdateWorker.state}`
			);

			if (curWaitingWorker && curWaitingWorker !== curUpdateWorker) {
				curWaitingWorker.addEventListener('statechange', (e) => {
					// 当前安装新的serviceWorker时,如果存在上次更新未最后激活的而一直处于waiting状态的serviceWoker
					// 那么这个之前处于waiting状态的serviceWoker应该被标记为多余状态redundant
					console.log(
						`上次更新未最后激活的而一直处于waiting状态的serviceWoker被标记为${e.target.state}`
					);
				});
			}

			curUpdateWorker.addEventListener('statechange', (e) => {
				// 监听状态改变
				console.log(`当前更新的serviceWorker目前的状态变更为${e.target.state}`);

				// 当前存在活跃的serviceWorker，当前更新的serviceWorker已安装完毕处于installed,可以提示用户更新
				if (
					curActiveWorker &&
					curActiveWorker !== e.target &&
					e.target.state === 'installed'
				) {
					postSkipWaiting(e.target);
				}

				if (e.target.state === 'actived') {
					// 当前更新的serviceWorker变为活跃的，已接管页面与事件，可以开始工作
					console.log('当前更新的serviceWorker已完成，可以开始后续工作.');
				}
			});
		});
	});

	navigator.serviceWorker.addEventListener('message', (event) => {
		console.log(`The service worker sent me a message: ${event.data}`);
	});
} else {
	console.error('Service worker are not supported!');
}
