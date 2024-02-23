let cachePwa = "cachePwa-v1"

let assets = [
  "/lixeira.png",
  "/manifest.json",
  "/service-worker.js",
  "/src/components/index.jsx",
  "/src/components/ItemLista.css",
  "/src/App.css",
  "/src/App.jsx",
  "/src/AppPWA.jsx",
  "/src/index.jsx",
  "/src/index.css",
  "/.eslintrc.cjs",
  "/index.html",
  "/package-lock.json",
  "/package.json",
  "/vite.config.js",
]

self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  event.waitUntil(

    caches.open(cachePwa).then(function (cache) {

      return cache.addAll(assets);

    })

  )
});

self.addEventListener('activate', function activator(event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys
        .filter(function (key) {
          return key.indexOf(cachePwa) !== 0;
        })
        .map(function (key) {
          return caches.delete(key);
        })
      );
    })
  );
});


self.addEventListener('fetch', function (event) {

  event.respondWith(

    caches.match(event.request).then(function (cachedResponse) {

      return cachedResponse || fetch(event.request);

    })

  );

})