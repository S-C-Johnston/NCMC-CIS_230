"Create React App" is a quickstart solution distributed on npm and maintained
by Facebook.

It does a lot of the heavy lifting for us without explaining precisely what's
going on, so there are some gaps. Some of this is filled in by reading the
[webpack documentation][webpack_docs], and the [Create React App documentation][cra_docs]

[webpack_docs]: https://webpack.js.org/concepts/
[cra_docs]: https://create-react-app.dev/docs/getting-started

The scripts that ship with 'CRA' - found in the direct dependency, an npm
module, "react-scripts" - include a 'start' and 'build'.

`npm run start` which can be shortened to `npm start`, compiles everything
(somehow, unclear how this is achieved, but it seems to keep objects for the
files), and starts the "[webpack-dev-middleware][gh_webpack_dev_middleware]".
By default, this keeps everything in memory without writing modified build
files out to disk. This can be adjusted by configuration, but it is sufficient
to know that `npm run build` will do the production-ready writing to disk,
although I'm curious about what the "non-optimized" build looks like.
Ultimately, all of this is minified, which is not a look I enjoy.

[gh_webpack_dev_middleware]: https://github.com/webpack/webpack-dev-middleware


