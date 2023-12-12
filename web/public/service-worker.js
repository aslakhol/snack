const installEvent = () => {
  self.addEventListener("install", () => {
    console.log("service worker installed");
  });
};

installEvent();

const activateEvent = () => {
  self.addEventListener("activate", () => {
    console.log("service worker activated");
  });
};

activateEvent();

const cacheName = "v2";

const cacheClone = async (e) => {
  const res = await fetch(e.request);
  const resClone = res.clone();

  const cache = await caches.open(cacheName);
  await cache.put(e.request, resClone);
  return res;
};

const fetchEvent = () => {
  self.addEventListener("fetch", (e) => {
    if (e.request.url.startsWith("https://app.posthog.com")) {
      return false;
    }

    if (e.request.url.startsWith("http://localhost:3000/ingest")) {
      return false;
    }

    if (e.request.url.startsWith("https://snack.aslak.io/ingest")) {
      return false;
    }

    if (e.request.url.startsWith("https://snack.aslak.io/_vercel/")) {
      return false;
    }

    e.respondWith(
      cacheClone(e)
        .catch(() => caches.match(e.request))
        .then((res) => res),
    );
  });
};

fetchEvent();
