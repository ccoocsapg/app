const VERSION = '0.12.0';
const CACHE = 'ccoo-csapg-app-' + VERSION;
const CACHE_PREFIX = 'ccoo-csapg-app-';

const SHELL = [
  './',
  './index.html',
  './styles.css?v=' + VERSION,
  './search.css?v=' + VERSION,
  './app.js?v=' + VERSION,
  './manifest.webmanifest',
  './icon.svg',
  './version.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

async function networkFirst(request, fallbackUrl) {
  const cache = await caches.open(CACHE);
  try {
    const freshRequest = new Request(request, { cache: 'no-store' });
    const response = await fetch(freshRequest);
    if (response && response.ok && request.method === 'GET') {
      cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    if (fallbackUrl) {
      const fallback = await cache.match(fallbackUrl);
      if (fallback) return fallback;
    }
    throw error;
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok && request.method === 'GET') {
    cache.put(request, response.clone()).catch(() => {});
  }
  return response;
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, './index.html'));
    return;
  }

  const path = url.pathname;
  const mustStayFresh =
    path.endsWith('/app.js') ||
    path.endsWith('/styles.css') ||
    path.endsWith('/search.css') ||
    path.endsWith('/manifest.webmanifest') ||
    path.endsWith('/version.json') ||
    path.endsWith('/push-config.json') ||
    path.includes('/data/') ||
    path.includes('/search/');

  if (mustStayFresh) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});


self.addEventListener('push', event => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch (e) {
    payload = { body: event.data ? event.data.text() : '' };
  }

  const title = payload.title || 'CCOO CSAPG';
  const options = {
    body: payload.body || 'Hi ha una nova informació publicada.',
    icon: './icon.svg',
    badge: './icon.svg',
    tag: payload.tag || 'ccoo-csapg-update',
    renotify: !!payload.renotify,
    data: {
      url: payload.url || './#/inicio'
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = new URL(event.notification?.data?.url || './#/inicio', self.location.origin).href;

  event.waitUntil((async () => {
    const windows = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of windows) {
      if ('focus' in client) {
        try {
          if ('navigate' in client) await client.navigate(target);
        } catch (e) {}
        return client.focus();
      }
    }
    if (clients.openWindow) return clients.openWindow(target);
  })());
});
