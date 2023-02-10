const CACHE_NAME = "constellation-cache-v1";
const urlsToCache = [
  "/canvas-animation-effects/",
  "/canvas-animation-effects/index.html",
  "/canvas-animation-effects/assets/css/index.css",
  "/canvas-animation-effects/assets/img/screen.avif",
  "/canvas-animation-effects/assets/img/screen2.avif",
  "/canvas-animation-effects/assets/js/app.js",
  "/canvas-animation-effects/assets/js/trail.js",
  "/canvas-animation-effects/assets/js/constellation.js",
  "/canvas-animation-effects/assets/js/console.js",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }

      return fetch(event.request).then(function (response) {
        if (
          !response ||
          response.status !== 200 ||
          response.type !== "basic" ||
          !(event.request.url.indexOf("http") === 0)
        ) {
          return response;
        }

        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
