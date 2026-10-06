/**
 * GOAL OS Service Worker
 * Ensures 100% offline availability in underground metro transit conditions.
 */
const CACHE_NAME = 'goal-os-v4-20261006';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './icon.svg',
  './manifest.json',
  './psi/psi.css',
  './psi/psi-config.js',
  './psi/psi-storage.js',
  './psi/psi-srs.js',
  './psi/psi-question-engine.js',
  './psi/psi-scheduler.js',
  './psi/psi-ui.js',
  './psi/psi-app.js',
  './data/psi/index.js',
  './data/psi/pyq-2021.js',
  './data/psi/gujarat-gk.js',
  './data/psi/law.js',
  './data/psi/ai-practice.js',
  './data/psi/diagnostic-bank.js',
  './data/psi/math-drills.js',
  './data/psi/english-drills.js',
  './data/psi/science-drills.js',
  './data/psi/lexicon.js',
  './data/psi/lessons.js',
  './data/syllabus.js'
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
