const CACHE_NAME = 'erp-cache-v3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Offline Caching[span_15](start_span)[span_15](end_span)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Push Notifications[span_16](start_span)[span_16](end_span)
self.addEventListener('push', function(event) {
  console.log('Push notification received');
});

// Background Sync[span_17](start_span)[span_17](end_span)
self.addEventListener('sync', function(event) {
  console.log('Background sync triggered');
});

// Periodic Background Sync[span_18](start_span)[span_18](end_span)
self.addEventListener('periodicsync', (event) => {
  console.log('Periodic sync triggered');
});
