// 🔥 SELF-DESTRUCTING SERVICE WORKER (PURGE ALL CACHES)
self.addEventListener('install', event => {
  // তাৎক্ষণিক নতুন ভার্সন চালু করো
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    // ১. পুরনো সব ক্যাশ মুছে ফেলো
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => caches.delete(key))
      );
    }).then(() => {
      // ২. সব ট্যাব বা ডিভাইসে নতুন নিয়ম প্রয়োগ করো
      return self.clients.claim();
    })
  );
});

// ৩. কোনো ফাইল ক্যাশ করবে না, সরাসরি গিটহাব থেকে নতুন ফাইল আনবে
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
