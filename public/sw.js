const VERSION = "V1";

self.addEventListener( "install", event => {
    self.skipWaiting(); // Activate SW imediatly

    event.waitUntil((async () => {
       const cache = await caches.open(VERSION);
        cache.add(new Request('/offline.html'));

    })());
    console.log( "WORKER: install event in progress." );
});

self.addEventListener( "activate", event => {
    client.claim(); // Start handling the current page without refreshing
    console.log('WORKER: activate event in progress.');
});

self.addEventListener( "fetch", event => {
  console.log('WORKER: Fetching', event.request);
});
