/**
 * GOAL service worker — the whole app works offline (underground metro).
 * When you add a content file to index.html, add it here and bump CACHE_NAME.
 */
const CACHE_NAME = 'goal-v2-20261007c';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './app.css',
  './icon.svg',
  './manifest.json',
  './core.js',
  './content/topics.js',
  './content/maths.js',
  './content/reasoning.js',
  './content/english.js',
  './content/writing.js',
  './content/gk.js',
  './content/gujarat.js',
  './legacy/pyq-2021.js',
  './legacy/gujarat-gk.js',
  './legacy/law.js',
  './legacy/ai-practice.js',
  './legacy/diagnostic-bank.js',
  './legacy/math-drills.js',
  './legacy/english-drills.js',
  './legacy/science-drills.js',
  './legacy/lexicon.js',
  './content/legacy.js',
  './ui.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(ASSETS_TO_CACHE.map((a) =>
        cache.add(a).catch((e) => console.warn('[SW] precache miss', a, e))
      ));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

// Stale-while-revalidate. ignoreSearch makes versioned URLs (?v=...) hit the
// precached copy so the app still loads offline. Cross-origin font requests are
// cached too (opaque responses are fine for stylesheets/fonts).
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== self.location.origin && !isFont) return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request, { ignoreSearch: !isFont }).then((cached) => {
        const network = fetch(event.request).then((response) => {
          if (response && (response.status === 200 || response.type === 'opaque')) {
            cache.put(event.request, response.clone());
          }
          return response;
        }).catch(() => null);

        if (cached) {
          event.waitUntil(network);
          return cached;
        }
        return network.then((response) => {
          if (response) return response;
          if (event.request.mode === 'navigate') return cache.match('./index.html');
          return Response.error();
        });
      })
    )
  );
});
