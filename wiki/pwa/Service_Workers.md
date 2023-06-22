# Service Workers

Service Workers interact with the webworker api present in web-browsers. This
functionality is not necessarily part of the html or js spec, these are
features that web-browser developers have to build in specific to the pwa spec.
The viability of pwa on a browser will then depend on the features that the
browser implements.

The main function of a service worker is to define the caching and routing
strategy employed by the application, and for very basic conceptions of this
purpose, it seems that chromium browsers may begin auto-generating
service-workers automatically down the line.

A service worker does need to be called or linked by the html at some point; it
doesn't autoload without deliberate intervention. This is most easily achieved
by tail-loading it based on an inline script, placed just before the end of the
body:

```html
<script>
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js', { scope: '/' });
}
</script>
```

`navigator` here is the object which represents the capabilities of the
browser. 

## Workbox

Workbox is a collection of 'Production ready service worker libraries and
tooling'. It can be found [here][google_workbox].

[google_workbox]: https://developer.chrome.com/docs/workbox/

Some of its basic components hilight the main function of service-workers:
defining is the caching and network strategy.

This inherently relies on the [cache interface][mdn_cache_iface], which is
separate from the HTTP cache and can be controlled by javascript on a per-asset
basis, dependent on given conditions, such as if the page is being served in
offline-mode.

[mdn_cache_iface]: https://developer.mozilla.org/docs/Web/API/Cache

