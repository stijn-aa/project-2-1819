var CACHE_NAME = 'oba-cache-v1';
var urlsToCache = [
  '/offline',
  '/css/styles.css',
  '/js/app.js',
  '/img/logoX500.svg',
  '/img/logoX600.svg'
]
var offline = false; // variable moet client side veranded worden als de offline pagina geladen word. in app.js doet moet hij dan een alert geven inplaats van doorverwijzen naar de detail page

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
    .then(function () {
      self.skipWaiting();
    })
  );
});

self.addEventListener('fetch', function (event) {
  console.log(event.request.url);
  const requestUrl = getPathName(event.request.url) // url gelijk maken aan shit in de url cache
  if (urlsToCache.includes(requestUrl)) {
    event.respondWith(
      caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
    );
  } else if (isHtmlGetRequest(event.request)) {
    
    offline = true
    console.log(offline)

    event.respondWith(
      fetch(event.request).catch(function () {
        return caches.match('/offline');
      })
    ) 
  }
});



// /**
//  * Get a pathname from a full URL by stripping off domain
//  *
//  * @param {Object} requestUrl        The request object, e.g. https://www.mydomain.com/index.css
//  * @returns {String}                Relative url to the domain, e.g. index.css
//  */
function getPathName(requestUrl) {
  const url = new URL(requestUrl);
  return url.pathname;
}

// /**
//  * Checks if a request is a GET and HTML request
//  *
//  * @param {Object} request        The request object
//  * @returns {Boolean}            Boolean value indicating whether the request is a GET and HTML request
//  */
function isHtmlGetRequest(request) {
  return request.method === 'GET' && (request.headers.get('accept') !== null && request.headers.get('accept').indexOf('text/html') > -1);
}