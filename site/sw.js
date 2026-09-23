/**
 * GOAL OS Service Worker
 * Ensures 100% offline availability in underground metro transit conditions.
 */
const CACHE_NAME = 'goal-os-v2-20260923';

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
  './data/psi/lessons.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
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

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to keep cache fresh (stale-while-revalidate for html/scripts)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
        }).catch(() => {
          // Ignore network errors when offline
        });
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(() => {
        // Fallback to cached index.html for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
