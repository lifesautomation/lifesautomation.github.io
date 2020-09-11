'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "801125fca546f506babac9af4ec061ba",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/fonts/MaterialIcons-Regular.otf": "a68d2a28c526b3b070aefca4bac93d25",
"assets/NOTICES": "34865a7e8abc18b950d0cdf1bd0a3554",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "5a37ae808cf9f652198acde612b5328d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "2bca5ec802e40d3f4b60343e346cedde",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "2aa350bd2aeab88b601a593f793734c0",
"icons/android-icon-144x144.png": "118f120c45a292964a8e36b58abefbf8",
"icons/android-icon-192x192.png": "456b84dd459939ce48cfea8baf8c3636",
"icons/android-icon-36x36.png": "bbac6048281abb27db03910070844a71",
"icons/android-icon-48x48.png": "c0dc9474ef3a7341c8e4c3715061a945",
"icons/android-icon-72x72.png": "f11f1396db1d7d7a25017d9b298d485d",
"icons/android-icon-96x96.png": "20f101b5a6edfc583fa29973af9d0632",
"icons/apple-icon-114x114.png": "b0a670cf4d1fc8358cd3e3ce454fea2e",
"icons/apple-icon-120x120.png": "77bd983cbc6a7fac20a931226da131a8",
"icons/apple-icon-144x144.png": "118f120c45a292964a8e36b58abefbf8",
"icons/apple-icon-152x152.png": "bc94bd16809929a47d7367b310de60f6",
"icons/apple-icon-180x180.png": "a3561f90ad96c0f4568d462b39e028ca",
"icons/apple-icon-57x57.png": "4a10c37667874fdc230e3cb608cfe2d3",
"icons/apple-icon-60x60.png": "72d57947a8f36ad3a164137ef2ea4d1a",
"icons/apple-icon-72x72.png": "f11f1396db1d7d7a25017d9b298d485d",
"icons/apple-icon-76x76.png": "d890a6430ab046f91aac574688ca5a11",
"icons/apple-icon-precomposed.png": "2da0bbb3f959ca5633f3b58d6f76f3c3",
"icons/apple-icon.png": "2da0bbb3f959ca5633f3b58d6f76f3c3",
"icons/favicon-16x16.png": "66bf3b9c3ce1ca1920e260b1d5936324",
"icons/favicon-32x32.png": "4316db2279c75284183f8aff2948d5c3",
"icons/favicon-96x96.png": "20f101b5a6edfc583fa29973af9d0632",
"icons/favicon.ico": "add35dbd6adaa0432afe3c3cc5ed5611",
"icons/ms-icon-144x144.png": "118f120c45a292964a8e36b58abefbf8",
"icons/ms-icon-150x150.png": "9023ed48b27439329abfb15fd8c29701",
"icons/ms-icon-310x310.png": "c7bafd622c18fe5920b417d1ef7a2c00",
"icons/ms-icon-70x70.png": "597b73ce99f15fc1de64a18ab970c6c1",
"index.html": "017a6df4cc2e4980b4910b476429e1b1",
"/": "017a6df4cc2e4980b4910b476429e1b1",
"main.dart.js": "f93ba4286d07fd01b9839e84952c83d2",
"manifest.json": "61520a2b3e9c090937d7faf5a58d5c37"
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
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      // Provide a 'reload' param to ensure the latest version is downloaded.
      return cache.addAll(CORE.map((value) => new Request(value, {'cache': 'reload'})));
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
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#')) {
    key = '/';
  }
  // If the URL is not the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache. Ensure the resources are not cached
        // by the browser for longer than the service worker expects.
        var modifiedRequest = new Request(event.request, {'cache': 'reload'});
        return response || fetch(modifiedRequest).then((response) => {
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
    return self.skipWaiting();
  }

  if (event.message === 'downloadOffline') {
    downloadOffline();
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
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
