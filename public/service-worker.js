let cachePwa = "cachePwa-v3"

let assets = [
  "/",

  "/192x192.png",
  "/512x512.png",
  "/manifest.json",
  "/service-worker.js",
  "/src/components/ItemLista/index.jsx",
  "/src/components/ItemLista/ItemLista.css",
  "/src/App.css",
  "/src/App.jsx",
  "/src/AppPWA.jsx",
  "/src/index.css",
  "/src/index.jsx",
  "/index.html",
  "/package-lock.json",
  "/package.json",
  "/vite.config.js",
  "/.eslintrc.cjs",
]


self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  console.log(caches.open(cachePwa))
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

let CACHE_CONTAINING_ERROR_MESSAGES = []

addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open(cachePwa)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            .catch(function(err) {       // fallback mechanism
              return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
                .then(function(cache) {
                  return cache.match('/offline.html');
                });
            });
        }
      })
  );
});          