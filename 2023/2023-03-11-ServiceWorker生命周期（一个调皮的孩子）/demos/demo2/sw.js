const CACHE_NAME = 'v1';

const REQUESTS_EXPECTED_CACHE = [];

// 一般来处理预加载哪些请求的资源作为缓存到cache storage中
self.addEventListener('install', function (event) {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => cache.addAll(REQUESTS_EXPECTED_CACHE))
	);
});

// 在对应回调中一般来清理旧版本serverWorker缓存的资源
self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys.map((key) => {
					if (CACHE_NAME !== key) {
						return caches.delete(key);
					} else {
						return caches
							.open(CACHE_NAME)
							.then((cache) => cache.addAll(REQUESTS_EXPECTED_CACHE));
					}
				})
			);
		})
	);
	event.waitUntil(clients.claim());
});

// 监听请求事件
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response !== undefined) {
				return response;
			} else {
				return fetch(event.request)
					.then((response) => {
						let responseClone = response.clone();
						caches.open(CACHE_NAME).then((cache) => {
							cache.put(event.request, responseClone);
						});
						return response;
					})
					.catch(() => {
						return new Response('', { status: 404 });
					});
			}
		})
	);
});

// 当前有新的serviceWork正处在handled状态，一直在等待更新，需要接受用户的通知来决定是否跳过等待
self.addEventListener('message', (event) => {
	if (event.data === 'skipWaiting') {
		self.skipWaiting();
	} else {
		event.source.postMessage('Hi client');
	}
});
