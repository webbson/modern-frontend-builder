# Build ES6 and Sass/Less/Stylus for your Sitecore frontend project.

Setup:

Edit config.json

outputDir: This points to the assets folder in your webpage project.
publicPath: This is the public path to the above folder when served through a web server.
publishedPath: This is the direct path to where you run your local webserver, used for watch and build:dev modes.

To run watch mode:
$ npm run watch

To build unminified code
$ npm run build:dev

To build minified production code
$ npm install && npm run build

---

To build code: add your js, styl, less, sass or scss files anywhere inside the src folder. Just make sure they're named index.\* to be picked up by the build script.
