// 更新策略三：
// 不需要用户手动确认刷新，通过在install回调中执行clients.claim()
// 接着在activate回调中执行clients.claim()，不需要刷新页面就可以完成更新
// 相应改动：
// 1、在install回调中执行self.skipWaiting();
// 2、在activate回调中执行clients.claim()；
// 3、删除postSkipWaiting函数
// 4、删除postMessage相关
// 4、删除场景：处理上次更新未最后激活的而一直处于waiting状态的serviceWoker

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js').then((registration) => {
		// 有serviceWorker更新发生
		registration.addEventListener('updatefound', () => {
			// 当前更新的serviceWorker
			let curUpdateWorker = registration.installing;
			console.log(
				`当前更新的serviceWorker目前的状态为${curUpdateWorker.state}`
			);
			curUpdateWorker.addEventListener('statechange', (e) => {
				// 监听状态改变
				console.log(`当前更新的serviceWorker目前的状态变更为${e.target.state}`);

				if (e.target.state === 'actived') {
					// 当前更新的serviceWorker变为活跃的，已接管页面与事件，可以开始工作
					console.log('当前更新的serviceWorker已完成，可以开始后续工作.');
				}
			});
		});
	});
} else {
	console.error('Service worker are not supported!');
}
