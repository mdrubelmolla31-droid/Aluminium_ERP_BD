const CACHE_NAME = 'alu-erp-v2';
const urlsToCache = [
  './',
  './index.html',
  './profile-discount.html',
  './calculator.html',
  './rubel.jpg',
  './splash-bg.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
