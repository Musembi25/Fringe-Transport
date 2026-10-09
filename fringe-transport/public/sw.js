const CACHE_NAME = "fringe-transport-v2";
const APP_SHELL = [
  "/",
  "/manifest.webmanifest",
  "/logo.png",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/favicon.png",
];
const BUILT_ASSETS = [];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll([...new Set([...APP_SHELL, ...BUILT_ASSETS])])),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key.startsWith("fringe-transport-") && key !== CACHE_NAME,
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (
    request.method !== "GET" ||
    new URL(request.url).origin !== self.location.origin
  ) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (!response.ok) return response;
          return caches
            .open(CACHE_NAME)
            .then((cache) => cache.put("/", response.clone()))
            .then(() => response);
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);
          return cachedPage || caches.match("/");
        }),
    );
    return;
  }

  const isAppAsset =
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "image" ||
    request.destination === "font" ||
    new URL(request.url).pathname === "/manifest.webmanifest";

  if (isAppAsset) {
    event.respondWith(
      caches.match(request).then(
        (cached) => cached || fetch(request).then((response) => {
          if (!response.ok) return response;
          return caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(request, response.clone()))
            .then(() => response);
        }),
      ),
    );
  }
});
