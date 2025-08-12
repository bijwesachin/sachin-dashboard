const CACHE_NAME = 'sachin-dash-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-180.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k === CACHE_NAME ? null : caches.delete(k))))
  );
  self.clients.claim();
});

function isApiRequest(url) {
  return url.includes('financialmodelingprep.com') || url.includes('tradingeconomics.com');
}

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  if (isApiRequest(url.href)) {
    // Network-first for live data
    e.respondWith(
      fetch(e.request).then(resp => {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return resp;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // Cache-first for app shell
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
      const clone = resp.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
      return resp;
    }).catch(() => caches.match('./index.html')))
  );
});
