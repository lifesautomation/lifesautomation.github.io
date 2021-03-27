'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "1385e750bfd99664540c6d22237de579",
"favicon.ico": "3b2d358891ca3adc2e500d0f24639d1a",
"index.html": "387bb06be5c78d04039bb6515b8488d7",
"/": "387bb06be5c78d04039bb6515b8488d7",
"main.dart.js": "eeec5ab392ed24785e6f610b17fa0419",
"icons/favicon-16x16.png": "20e2358fb92db6dc069d19436dc18f39",
"icons/favicon.ico": "d69ce172d6da4868365f7c3392bff9dc",
"icons/apple-icon.png": "f5bbb02af96b9317b4701624b1e6b3a5",
"icons/apple-icon-144x144.png": "529b139ecc15e89ef0b2d905b95d6f9c",
"icons/android-icon-192x192.png": "b075390f2f381994abf052f83fc9d770",
"icons/apple-icon-precomposed.png": "f5bbb02af96b9317b4701624b1e6b3a5",
"icons/apple-icon-114x114.png": "43b8eaa6551cf21fa3dcaec64bef3ce0",
"icons/ms-icon-310x310.png": "718afa341ca3c4846b94fb457d890f90",
"icons/ms-icon-144x144.png": "529b139ecc15e89ef0b2d905b95d6f9c",
"icons/apple-icon-57x57.png": "83b0da85e785ba6016d21ac0f37139c2",
"icons/apple-icon-152x152.png": "b7a38ecc058ca747086c21866a9036d2",
"icons/ms-icon-150x150.png": "f51681c45df4f39502a28628880833e2",
"icons/android-icon-72x72.png": "0dfdded051e5da588095e204b7cb900a",
"icons/android-icon-96x96.png": "29e88b936b5cf851fde8d8c24151e4d7",
"icons/android-icon-36x36.png": "18904e57ab6345f70d33bc5d8e874c72",
"icons/apple-icon-180x180.png": "175b95089842b0d32ebaa10e7f099e56",
"icons/favicon-96x96.png": "29e88b936b5cf851fde8d8c24151e4d7",
"icons/android-icon-48x48.png": "b691d08be601b5586f26ad19de9327f1",
"icons/apple-icon-76x76.png": "a44865385e388021fcacdcd36ce2ec91",
"icons/apple-icon-60x60.png": "53ecce674c240284059af07472eb2ecd",
"icons/android-icon-144x144.png": "529b139ecc15e89ef0b2d905b95d6f9c",
"icons/apple-icon-72x72.png": "0dfdded051e5da588095e204b7cb900a",
"icons/apple-icon-120x120.png": "71f859ef6436882948dac741b1f58cb9",
"icons/favicon-32x32.png": "410e4c0c3f30546911ad277d61ba3dc7",
"icons/ms-icon-70x70.png": "7496f9804429f9f585f19a047e792e52",
"manifest.json": "2c31bcede063b112bbdd3825ab0ba8b8",
"assets/AssetManifest.json": "fc8b35e57b1d979eec95543aaa7b9549",
"assets/NOTICES": "fd7712f1bb1707c183f57b1cedbbf30f",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/assets/images/background/bgImage.png": "ad3285768171a5e0bc1ce8a3f094e3c1",
"assets/assets/images/fences/default/01.png": "21cc43345c85ce81b3a6a4925c1391c8",
"assets/assets/images/fences/default/03.png": "189491d52cc7474ed4521d9e1acade35",
"assets/assets/images/fences/default/02.png": "3e30972c6a4005dbb5489d0c591a298a",
"assets/assets/images/fences/rock/01.png": "c7ccbf1255c177f672dbfaec4ef4ee30",
"assets/assets/images/fences/rock/03.png": "b27d8ca85f183d420d7672564128be93",
"assets/assets/images/fences/rock/02.png": "a6ad73b01d0d5b82c3ec3e00a3fec57d",
"assets/assets/images/buttons/buttonArrow.png": "04208a5882b998c06b97625d7ffa71d0",
"assets/assets/images/buttons/buttonArrowTapped.png": "67c191aa276e71e055b73aa01a81bde9",
"assets/assets/images/buttons/buttonSettings.png": "e648a74ab17a6d4db91374939ca75150",
"assets/assets/images/buttons/buttonSettingsTapped.png": "9036c2dfcaac58e25967d251ef1afae9",
"assets/assets/images/arrows/arrowStingray.png": "a3ad1e408a3cad97d14029554aa43260",
"assets/assets/images/arrows/arrowShrimp.png": "c032b803f28a08df537defb015ca6686",
"assets/assets/images/arrows/arrowMouse.png": "11bef881364d706af64d812aa7201cf6",
"assets/assets/images/arrows/arrowDefault.png": "66c620d6e77ea5b028339c1e8ce3793b",
"assets/assets/images/arrows/arrowPine.png": "a2acb0eef5306164bc6202143eb41df9",
"assets/assets/images/arrows/arrowFish.png": "5dbdd28c7565f42be270c9f9b00d0a3e",
"assets/assets/audio/background/music.mp3": "e89ea67a93b9703b8f52164d1e5a99c2",
"assets/assets/audio/sound/score.mp3": "cb8acf30cd2e44032e08f6195a08039f",
"browserconfig.xml": "a0dea3417d07f1c91fcb63c23d1cdd4b"
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
