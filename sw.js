// Assign name
const CACHE_NAME = 'v1_cache_ic_pwa'

//Files configuration
var urlsToCache = [
    './',
    './styles/style.css',
    './img/logo/16x16.ico',
    './img/logo/32x32.ico',
    './img/logo/64x64.ico',
    './img/logo/96x96.ico',
    './img/logo/128x128.ico',
    './img/logo/512x512.png',
    './img/Icon/asterisk.svg'
]

// Event install to install the service worker
self.addEventListener('install', e => {

    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                    })
            })
            .catch(err => console.log('Cache has not been registered', err))
    );

});

// Activate event to work offline

self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if(cacheWhiteList.indexOf(cacheName) == -1)
                        {
                            return cache.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                self.clients.claim();
            })
    );
})

// Fetch event
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    return res;
                }
                return fetch(e.request);

            })
    );
});