let cacheName = 'c62c-5c92-2144-e58d';
let array128Bit = new Uint32Array(4);
const contentToCache = [
  '/BicycleSpeed/index2.html',
  '/BicycleSpeed/image/bicyclemove.gif',
  '/BicycleSpeed/image/bicyclestatic.png',
  '/BicycleSpeed/image/bicyclestatic2.png',
  '/BicycleSpeed/scripts/main.js',
  '/BicycleSpeed/styles/style.css'
];
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(contentToCache))
  );
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
self.addEventListener('fetch', (e) => {
  //console.log(e.request.url);
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request.url)));
});
self.onmessage = (e) => {
  crypto.getRandomValues(array128Bit);
  cacheName = array128Bit.toString();
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => cache.addAll(contentToCache))
      .then(() => {
        caches.keys().then((keys) => {
          return Promise.all(
            keys.map((key) => {
              if (key !== cacheName) {
                return caches.delete(key);
              }
            })
          );
        });
      })
  );
};
