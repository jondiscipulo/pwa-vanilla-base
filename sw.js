// Name of the cache. Change this version number when you update your app
// to force the browser to download the new files.
const APP_VERSION = '1.0.0';
const CACHE_NAME = `my-pwa-v${APP_VERSION}`;

// Files to cache immediately upon installation
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    '/icons/icon-192.svg',
    '/icons/icon-512.svg'
];

// 1. INSTALL EVENT: Cache core assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// 2. FETCH EVENT: Intercept network requests and serve from cache if offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Not in cache - fetch from network
                return fetch(event.request).then(
                    networkResponse => {
                        // Optional: Check if we should cache the new network response
                        // For this simple tutorial, we only cache the core assets defined above.
                        return networkResponse;
                    }
                );
            })
    );
});

// 3. ACTIVATE EVENT: Clean up old caches when a new Service Worker takes over
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
