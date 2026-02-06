/**
 * Service Worker - PWA 离线支持
 * Syurlow's Blog ❄️
 */

const CACHE_NAME = 'syurlow-blog-v1';
const OFFLINE_URL = '/my-blog/';

// 需要缓存的资源
const PRECACHE_URLS = [
	'/my-blog/',
	'/my-blog/manifest.json',
	'/my-blog/favicon/favicon.ico',
];

// 安装事件 - 预缓存关键资源
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => {
				console.log('📦 预缓存资源...');
				return cache.addAll(PRECACHE_URLS);
			})
			.then(() => self.skipWaiting())
	);
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames
					.filter((name) => name !== CACHE_NAME)
					.map((name) => {
						console.log('🗑️ 清理旧缓存:', name);
						return caches.delete(name);
					})
			);
		}).then(() => self.clients.claim())
	);
});

// 请求拦截 - 网络优先，失败时使用缓存
self.addEventListener('fetch', (event) => {
	// 只处理 GET 请求
	if (event.request.method !== 'GET') return;

	// 跳过非同源请求
	const url = new URL(event.request.url);
	if (url.origin !== location.origin) return;

	// 跳过 API 请求
	if (url.pathname.includes('/api/')) return;

	event.respondWith(
		fetch(event.request)
			.then((response) => {
				// 成功获取网络响应，缓存并返回
				if (response.ok) {
					const responseClone = response.clone();
					caches.open(CACHE_NAME).then((cache) => {
						// 只缓存静态资源
						if (shouldCache(url.pathname)) {
							cache.put(event.request, responseClone);
						}
					});
				}
				return response;
			})
			.catch(() => {
				// 网络失败，尝试从缓存获取
				return caches.match(event.request).then((cachedResponse) => {
					if (cachedResponse) {
						return cachedResponse;
					}
					// 如果请求的是页面，返回离线页面
					if (event.request.mode === 'navigate') {
						return caches.match(OFFLINE_URL);
					}
					return new Response('离线状态', { status: 503 });
				});
			})
	);
});

// 判断是否应该缓存
function shouldCache(pathname) {
	const cacheExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.woff2', '.woff'];
	return cacheExtensions.some(ext => pathname.endsWith(ext)) || 
		   pathname.endsWith('/') || 
		   pathname.includes('/posts/');
}

// 监听消息 - 支持手动更新
self.addEventListener('message', (event) => {
	if (event.data === 'skipWaiting') {
		self.skipWaiting();
	}
});