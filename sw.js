// Service Worker for Image Caching
const CACHE_NAME = 'ryzup-images-v1';
const IMAGE_CACHE_PATHS = [
    '/assets/catalog/Photography/',
    '/assets/images/',
    '/assets/BL/',
    '/assets/SV/'
];

// Install event - cache essential images
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Image cache opened');
            return cache;
        })
    );
});

// Fetch event - serve cached images or cache new ones
self.addEventListener('fetch', event => {
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.match(event.request).then(response => {
                if (response) {
                    return response;
                }
                
                return fetch(event.request).then(response => {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                });
            })
        );
    }
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
