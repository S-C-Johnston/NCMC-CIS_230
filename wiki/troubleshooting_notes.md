## npm start doesn't watch files

TL;DR: Set environment variable `WATCHPACK_POLLING=true`

This is because I'm using it inside a vm which has a volume mounted, being
shared from host os to guest vm for podman to run. The notification feature of
macOS and linux kernel uses different mechanisms, so the advise is to set an
environment variable.

```bash
CHOKIDAR_USEPOLLING=true
```

This may be able to be entered as a command line option during invocation of the container, such as

```bash
podman ... -e CHOKIDAR_USEPOLLING=true ...
```

but the [create-react-app documentation][cra-troubleshooting] on
troubleshooting suggests putting this in a .env file in the project root.

[cra-troubleshooting]: https://create-react-app.dev/docs/troubleshooti://create-react-app.dev/docs/troubleshooting/#npm-start-doesnt-detect-changes 

This is actually inaccurate as of at least 2022-05, see this github issue:
https://github.com/facebook/create-react-app/issues/12397#issue-1235173832

Webpack had a breaking change with that option at some point, now using their
own solution Watchpack to achieve the same function, and wanting instead

```bash
WATCHPACK_POLLING=true
```
