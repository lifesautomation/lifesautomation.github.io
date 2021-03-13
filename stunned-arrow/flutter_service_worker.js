'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "c28bca237bf53e9d1d8702b89a0ebec1",
"index.html": "163ba1a66bf3f767ecab22231723d4c1",
"/": "163ba1a66bf3f767ecab22231723d4c1",
"main.dart.js": "6b927cdb1bc403091c91b5968a69508b",
"icons/favicon-16x16.png": "66bf3b9c3ce1ca1920e260b1d5936324",
"icons/favicon.ico": "add35dbd6adaa0432afe3c3cc5ed5611",
"icons/apple-icon.png": "2da0bbb3f959ca5633f3b58d6f76f3c3",
"icons/apple-icon-144x144.png": "118f120c45a292964a8e36b58abefbf8",
"icons/android-icon-192x192.png": "456b84dd459939ce48cfea8baf8c3636",
"icons/apple-icon-precomposed.png": "2da0bbb3f959ca5633f3b58d6f76f3c3",
"icons/apple-icon-114x114.png": "b0a670cf4d1fc8358cd3e3ce454fea2e",
"icons/ms-icon-310x310.png": "c7bafd622c18fe5920b417d1ef7a2c00",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/ms-icon-144x144.png": "118f120c45a292964a8e36b58abefbf8",
"icons/apple-icon-57x57.png": "4a10c37667874fdc230e3cb608cfe2d3",
"icons/apple-icon-152x152.png": "bc94bd16809929a47d7367b310de60f6",
"icons/ms-icon-150x150.png": "9023ed48b27439329abfb15fd8c29701",
"icons/android-icon-72x72.png": "f11f1396db1d7d7a25017d9b298d485d",
"icons/android-icon-96x96.png": "20f101b5a6edfc583fa29973af9d0632",
"icons/android-icon-36x36.png": "bbac6048281abb27db03910070844a71",
"icons/apple-icon-180x180.png": "a3561f90ad96c0f4568d462b39e028ca",
"icons/favicon-96x96.png": "20f101b5a6edfc583fa29973af9d0632",
"icons/android-icon-48x48.png": "c0dc9474ef3a7341c8e4c3715061a945",
"icons/apple-icon-76x76.png": "d890a6430ab046f91aac574688ca5a11",
"icons/apple-icon-60x60.png": "72d57947a8f36ad3a164137ef2ea4d1a",
"icons/android-icon-144x144.png": "118f120c45a292964a8e36b58abefbf8",
"icons/apple-icon-72x72.png": "f11f1396db1d7d7a25017d9b298d485d",
"icons/apple-icon-120x120.png": "77bd983cbc6a7fac20a931226da131a8",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/favicon-32x32.png": "4316db2279c75284183f8aff2948d5c3",
"icons/ms-icon-70x70.png": "597b73ce99f15fc1de64a18ab970c6c1",
"manifest.json": "e4e72766c6f17f20c8ebe0dd3511114d",
"assets/AssetManifest.json": "9f7df6857f51e88f4145b3137211451f",
"assets/NOTICES": "fd7712f1bb1707c183f57b1cedbbf30f",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/assets/images/background/bgImage.png": "ad3285768171a5e0bc1ce8a3f094e3c1",
"assets/assets/images/fences/fence01.png": "21cc43345c85ce81b3a6a4925c1391c8",
"assets/assets/images/fences/fence02.png": "3e30972c6a4005dbb5489d0c591a298a",
"assets/assets/images/fences/fence03.png": "189491d52cc7474ed4521d9e1acade35",
"assets/assets/images/arrows/arrowDefault.png": "8b03d999cc1d3037f5a8fc61207c08be",
"assets/assets/images/arrows/arrowPine.png": "a2acb0eef5306164bc6202143eb41df9",
"assets/assets/audio/background/music.mp3": "e89ea67a93b9703b8f52164d1e5a99c2",
"assets/assets/audio/sound/score.mp3": "cb8acf30cd2e44032e08f6195a08039f"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
