const CACHE_NAME = 'v1_cache_BCH_PWA'

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

self.addEventListener('install', e=>{
    e.waitUntil(
        caches.open(CACHE_NAME).then(caches =>{
            return caches.addAll(urlsToCache)
                         .then(()=>{
                            self.skipWaiting()
                         })
        })
        .catch(err => console.log('No se ha registrado el cache', err))
    )
})


self.addEventListener('activate', e=>{

    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
            caches.keys()
                .then(cachesNames =>{
                    return Promise.all(
                        cachesNames.map(cachesNames => {
                            if(cacheWhitelist.indexOf(cachesNames) == -1){
                                return cache.delete(cachesNames)
                            }
                        })
                    )
                })
            )
})
.then(()=>{
    self.clients.claim()
})


self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(res => {
            if(res){
                return res
            }
            return fetch(e.request)
        })
    )
})
